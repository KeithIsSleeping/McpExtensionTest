import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Register MCP server definition provider
	const provider = vscode.lm.registerMcpServerDefinitionProvider('mcp-remote-server-demo', {
		provideMcpServerDefinitions: async () => {
			// Multiple servers with different naming patterns to test reference behavior
			const servers = [
				// Valid TypeScript identifier - should work properly
				new vscode.McpHttpServerDefinition(
					'GitHubCopilot',
					vscode.Uri.parse('https://api.githubcopilot.com/mcp')
				),
				// Contains underscore - valid in TypeScript, should work
				new vscode.McpHttpServerDefinition(
					'GitHub_Copilot',
					vscode.Uri.parse('https://api.githubcopilot.com/mcp')
				),
				// Contains hyphen - invalid in TypeScript but may work in MCP references
				new vscode.McpHttpServerDefinition(
					'GitHub-Copilot',
					vscode.Uri.parse('https://api.githubcopilot.com/mcp')
				),
				// Contains parentheses - invalid in TypeScript
				new vscode.McpHttpServerDefinition(
					'GitHub(Copilot)',
					vscode.Uri.parse('https://api.githubcopilot.com/mcp')
				),
				// Contains space - invalid in TypeScript
				new vscode.McpHttpServerDefinition(
					'GitHub Copilot',
					vscode.Uri.parse('https://api.githubcopilot.com/mcp')
				),
				// Contains @ symbol - invalid in TypeScript
				new vscode.McpHttpServerDefinition(
					'GitHub@Copilot',
					vscode.Uri.parse('https://api.githubcopilot.com/mcp')
				),
				// Contains forward slash - invalid in TypeScript
				new vscode.McpHttpServerDefinition(
					'GitHub/Copilot',
					vscode.Uri.parse('https://api.githubcopilot.com/mcp')
				),
				// Contains backslash - invalid in TypeScript
				new vscode.McpHttpServerDefinition(
					'GitHub\\Copilot',
					vscode.Uri.parse('https://api.githubcopilot.com/mcp')
				),
			];
			return servers;
		}
	});

	context.subscriptions.push(provider);
}

export function deactivate() {}
