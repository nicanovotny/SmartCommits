import * as vscode from 'vscode';

const API_KEY_SECRET = 'smartcommits.apiKey';

/**
 * Obtiene la API key almacenada en SecretStorage
 */
export async function getApiKey(context: vscode.ExtensionContext): Promise<string | undefined> {
    try {
        return await context.secrets.get(API_KEY_SECRET);
    } catch (error) {
        console.error('Error getting API key from SecretStorage:', error);
        return undefined;
    }
}

/**
 * Guarda la API key en SecretStorage de forma segura
 */
export async function saveApiKey(context: vscode.ExtensionContext, apiKey: string): Promise<void> {
    try {
        await context.secrets.store(API_KEY_SECRET, apiKey.trim());
    } catch (error) {
        console.error('Error saving API key to SecretStorage:', error);
        throw error;
    }
}

/**
 * Elimina la API key del SecretStorage
 */
export async function deleteApiKey(context: vscode.ExtensionContext): Promise<void> {
    try {
        await context.secrets.delete(API_KEY_SECRET);
    } catch (error) {
        console.error('Error deleting API key from SecretStorage:', error);
        throw error;
    }
}

/**
 * Verifica si la API key está configurada
 */
export async function hasApiKey(context: vscode.ExtensionContext): Promise<boolean> {
    const apiKey = await getApiKey(context);
    return !!apiKey && apiKey.length > 0;
}
