import * as vscode from 'vscode';
import { deleteApiKey } from '../utils/configUtils';

/**
 * Comando para limpiar todos los datos de la extensión
 */
export async function cleanupExtensionData(context: vscode.ExtensionContext): Promise<void> {
    try {
        const choice = await vscode.window.showWarningMessage(
            '⚠️  This will permanently delete all SmartCommits data including your API key.\n\nThis action cannot be undone.',
            { modal: true },
            'Delete All Data',
        );

        if (choice === 'Delete All Data') {
            await deleteApiKey(context);
            vscode.window.showInformationMessage(
                '✅ All SmartCommits data has been deleted successfully.\n\nYou can safely uninstall the extension now.'
            );
        }

    } catch (error) {
        vscode.window.showErrorMessage(`Failed to cleanup extension data: ${error}`);
        console.error('Error in cleanupExtensionData:', error);
    }
}
