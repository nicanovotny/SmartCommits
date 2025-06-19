import * as vscode from 'vscode';
import { saveApiKey, getApiKey } from '../utils/configUtils';

/**
 * Comando para configurar la API key de Google Gemini
 */
export async function configApiKey(context: vscode.ExtensionContext): Promise<void> {
    try {
        // Verificar si ya hay una API key configurada
        const existingKey = await getApiKey(context);
        let message = 'Enter your Google Gemini API Key';
        
        if (existingKey) {
            message = `Update your Google Gemini API Key (current: ${existingKey.substring(0, 4)}...)`;
        }

        // Mostrar input box para la API key
        const apiKey = await vscode.window.showInputBox({
            prompt: message,
            placeHolder: 'Paste your API key here',
            password: true, // Oculta el texto mientras se escribe
            ignoreFocusOut: true, // No cancelar si el usuario cambia de ventana
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'API Key cannot be empty';
                }
                if (value.trim().length < 10) {
                    return 'API Key seems too short (minimum 10 characters)';
                }
                // Validación básica para Google API keys (suelen empezar con AIza)
                if (!value.trim().startsWith('AIza')) {
                    return 'Google Gemini API keys typically start with "AIza"';
                }
                return null;
            }
        });

        // Si el usuario canceló
        if (!apiKey) {
            vscode.window.showWarningMessage('API Key configuration cancelled');
            return;
        }

        // Guardar en SecretStorage
        await saveApiKey(context, apiKey);

        // Confirmar al usuario
        const action = existingKey ? 'updated' : 'configured';
        vscode.window.showInformationMessage(
            `✅ API Key ${action} successfully and stored securely`
        );

    } catch (error) {
        vscode.window.showErrorMessage(`Failed to configure API Key: ${error}`);
        console.error('Error in configApiKey:', error);
    }
}


