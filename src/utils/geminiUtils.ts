import * as vscode from 'vscode';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getApiKey } from './configUtils';

interface CommitSuggestion {
    message: string;
    explanation: string;
    type: string;
    scope?: string;
}

/**
 * Genera una sugerencia de commit usando Google Gemini
 */
export async function generateCommitSuggestion(
    context: vscode.ExtensionContext,
    gitDiff: string
): Promise<CommitSuggestion> {
    const apiKey = await getApiKey(context);
    if (!apiKey) {
        throw new Error('No API key configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = createCommitPrompt(gitDiff);

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return parseCommitResponse(text);
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error(`Failed to generate commit suggestion: ${error}`);
    }
}

/**
 * Crea el prompt para Gemini con las reglas de conventional commits
 */
function createCommitPrompt(gitDiff: string): string {
    return `You are an expert Git commit message generator. Analyze the following git diff and create a commit message following Conventional Commits specification.

RULES:
1. Format: <type>[optional scope]: <description>
2. Types: feat, fix, docs, style, refactor, test, chore, ci, build, perf
3. Description: imperative mood, no capital, no period
4. Max 50 characters for the first line
5. Be specific and descriptive

EXAMPLES:
- feat(auth): add user login validation
- fix(api): resolve null pointer in user service
- docs: update installation instructions
- refactor(utils): simplify date formatting logic

Git Diff (staged changes):
\`\`\`
${gitDiff}
\`\`\`

Please respond in this EXACT JSON format:
{
  "message": "the complete commit message",
  "explanation": "brief explanation of what changed and why this message was chosen",
  "type": "the commit type used",
  "scope": "the scope if applicable, or null"
}

Important: Respond ONLY with valid JSON, no additional text.`;
}

/**
 * Parsea la respuesta de Gemini y extrae la sugerencia de commit
 */
function parseCommitResponse(response: string): CommitSuggestion {
    try {
        // Limpiar la respuesta por si tiene markdown
        const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleanResponse);

        if (!parsed.message || !parsed.explanation || !parsed.type) {
            throw new Error('Invalid response format from AI');
        }

        return {
            message: parsed.message,
            explanation: parsed.explanation,
            type: parsed.type,
            scope: parsed.scope || undefined
        };
    } catch (error) {
        console.error('Error parsing Gemini response:', response);
        throw new Error('Failed to parse AI response. Please try again.');
    }
}

/**
 * Valida que el diff no sea demasiado grande para la API
 */
export function validateDiffSize(diff: string): { valid: boolean; reason?: string } {
    const maxLength = 8000; // Límite conservador para Gemini
    const lines = diff.split('\n').length;
    const maxLines = 200;

    if (diff.length > maxLength) {
        return {
            valid: false,
            reason: `Diff too large (${diff.length} characters). Consider staging smaller changes.`
        };
    }

    if (lines > maxLines) {
        return {
            valid: false,
            reason: `Too many changes (${lines} lines). Consider breaking into smaller commits.`
        };
    }

    return { valid: true };
}
