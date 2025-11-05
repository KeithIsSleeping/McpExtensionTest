import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Register MCP server definition provider
	const provider = vscode.lm.registerMcpServerDefinitionProvider('mcp-remote-server-demo', {
		provideMcpServerDefinitions: async () => {
			const server = new vscode.McpHttpServerDefinition(
				'GitHub Copilot MCP',
				vscode.Uri.parse('https://api.githubcopilot.com/mcp')
			);
			return [server];
		}
	});

	context.subscriptions.push(provider);
}

export function deactivate() {}
