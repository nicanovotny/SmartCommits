// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { configApiKey } from './commands/configApiKey';
import { suggestCommit } from './commands/suggestCommit';
import { cleanupExtensionData } from './commands/cleanupData';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('SmartCommits extension is now active!');

	// Register command: Configure API Key
	const configCommand = vscode.commands.registerCommand(
		'smartcommits.configApiKey', 
		() => configApiKey(context)
	);

	// Register command: Suggest Commit
	const suggestCommand = vscode.commands.registerCommand(
		'smartcommits.suggestCommit',
		() => suggestCommit(context)
	);

	// Register command: Cleanup Extension Data
	const cleanupCommand = vscode.commands.registerCommand(
		'smartcommits.cleanupData',
		() => cleanupExtensionData(context)
	);

	// Register commands in context
	context.subscriptions.push(configCommand);
	context.subscriptions.push(suggestCommand);
	context.subscriptions.push(cleanupCommand);

}


// This method is called when your extension is deactivated
export function deactivate() {}
