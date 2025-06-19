import * as vscode from 'vscode';
import { configApiKey } from './commands/configApiKey';
import { suggestCommit } from './commands/suggestCommit';
import { cleanupExtensionData } from './commands/cleanupData';

export function activate(context: vscode.ExtensionContext) {

	console.log('SmartCommits extension is now active!');

	// Registrar comando: Configurar API Key
	const configCommand = vscode.commands.registerCommand(
		'smartcommits.configApiKey', 
		() => configApiKey(context)
	);

	// Registrar comando: Sugerir Commit
	const suggestCommand = vscode.commands.registerCommand(
		'smartcommits.suggestCommit',
		() => suggestCommit(context)
	);

	// Registrar comando: Limpiar Datos de la Extensión
	const cleanupCommand = vscode.commands.registerCommand(
		'smartcommits.cleanupData',
		() => cleanupExtensionData(context)
	);

	// Registrar comandos en el contexto
	context.subscriptions.push(configCommand);
	context.subscriptions.push(suggestCommand);
	context.subscriptions.push(cleanupCommand);

}

export function deactivate() {}
