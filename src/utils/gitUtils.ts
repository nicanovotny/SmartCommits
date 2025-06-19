import * as vscode from 'vscode';
import * as cp from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(cp.exec);

/**
 * Verifica si el workspace actual está en un repositorio git
 */
export async function isGitRepository(): Promise<boolean> {
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            return false;
        }

        await execAsync('git rev-parse --git-dir', { 
            cwd: workspaceFolder.uri.fsPath 
        });
        return true;
    } catch {
        return false;
    }
}

/**
 * Obtiene el git diff de los cambios staged
 */
export async function getStagedDiff(): Promise<string> {
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            throw new Error('No workspace folder found');
        }

        const { stdout } = await execAsync('git diff --cached', {
            cwd: workspaceFolder.uri.fsPath,
            maxBuffer: 1024 * 1024 // 1MB limit
        });

        return stdout.trim();
    } catch (error) {
        throw new Error(`Failed to get staged diff: ${error}`);
    }
}

/**
 * Verifica si hay cambios staged para commit
 */
export async function hasStagedChanges(): Promise<boolean> {
    try {
        const diff = await getStagedDiff();
        return diff.length > 0;
    } catch {
        return false;
    }
}
