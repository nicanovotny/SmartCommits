import * as vscode from 'vscode';
import { hasApiKey } from '../utils/configUtils';
import { 
    isGitRepository, 
    hasStagedChanges, 
    getStagedDiff
} from '../utils/gitUtils';
import { generateCommitSuggestion, validateDiffSize } from '../utils/geminiUtils';

/**
 * Comando para sugerir mensaje de commit usando IA
 */
export async function suggestCommit(context: vscode.ExtensionContext): Promise<void> {
    try {
        // Verificar que hay API key configurada
        if (!(await hasApiKey(context))) {
            const choice = await vscode.window.showWarningMessage(
                '❌ No API Key configured. Please configure your Google Gemini API key first.',
                'Configure API Key'
            );
            
            if (choice === 'Configure API Key') {
                await vscode.commands.executeCommand('smartcommits.configApiKey');
            }
            return;
        }

        // Verificar que estamos en un repositorio git
        if (!(await isGitRepository())) {
            vscode.window.showErrorMessage(
                '❌ Not in a git repository. Please open a project with git initialized.'
            );
            return;
        }

        // Verificar que hay cambios staged para commit
        const stagedChanges = await hasStagedChanges();

        if (!stagedChanges) {
            const choice = await vscode.window.showWarningMessage(
                '📝 No staged changes found. Please stage your changes first using `git add`.',
                'Open Source Control',
                'OK'
            );
            
            if (choice === 'Open Source Control') {
                await vscode.commands.executeCommand('workbench.view.scm');
            }
            return;
        }

        // Obtener el diff de cambios staged
        const diff = await getStagedDiff();

        // Validar tamaño del diff
        const validation = validateDiffSize(diff);
        if (!validation.valid) {
            vscode.window.showWarningMessage(`❌ ${validation.reason}`);
            return;
        }

        // Mostrar status mientras se genera
        const statusMessage = vscode.window.setStatusBarMessage(
            '🤖 Generating commit suggestion...'
        );

        try {
            // Generar sugerencia con IA
            //const suggestion = await generateCommitSuggestion(context, diff);
            const suggestion = {
                message: 'feat: comeme las bolas',
                explanation: 'This commit introduces a new user authentication flow to enhance security and user experience.',
                type: 'feat',
                scope: 'auth'
            };
            statusMessage.dispose();

            // Mostrar la sugerencia al usuario
            await showCommitSuggestion(suggestion);

        } catch (error) {
            statusMessage.dispose();
            throw error;
        }

    } catch (error) {
        vscode.window.showErrorMessage(`Failed to suggest commit: ${error}`);
        console.error('Error in suggestCommit:', error);
    }
}

/**
 * Muestra la sugerencia de commit al usuario con opciones
 */
async function showCommitSuggestion(
    suggestion: { message: string; explanation: string; type: string; scope?: string }
): Promise<void> {
    const scopeInfo = suggestion.scope ? ` (scope: ${suggestion.scope})` : '';
    const message = `🤖 **Suggested Commit:**\n\n\`${suggestion.message}\`\n\n**Type:** ${suggestion.type}${scopeInfo}\n\n**Explanation:** ${suggestion.explanation}\n\n**Based on:** staged changes`;

    const choice = await vscode.window.showInformationMessage(
        message,
        { modal: true },
        '✅ Accept & Copy',
        '✏️ Edit & Copy',
        '❌ Reject'
    );

    switch (choice) {
        case '✅ Accept & Copy':
            await copyToClipboard(suggestion.message);
            vscode.window.showInformationMessage(
                '✅ Commit message copied to clipboard!'
            );
            break;

        case '✏️ Edit & Copy':
            const editedMessage = await vscode.window.showInputBox({
                prompt: 'Edit the commit message',
                value: suggestion.message,
                placeHolder: 'Enter your commit message',
                validateInput: (value) => {
                    if (!value || value.trim().length === 0) {
                        return 'Commit message cannot be empty';
                    }
                    if (value.length > 72) {
                        return 'Commit message too long (max 72 characters recommended)';
                    }
                    return null;
                }
            });

            if (editedMessage) {
                await copyToClipboard(editedMessage);
                vscode.window.showInformationMessage(
                    '✅ Edited commit message copied to clipboard!'
                );
            }
            break;

        case '❌ Reject':
            vscode.window.showInformationMessage('Suggestion rejected.');
            break;
    }
}

/**
 * Copia texto al clipboard
 */
async function copyToClipboard(text: string): Promise<void> {
    await vscode.env.clipboard.writeText(text);
}
