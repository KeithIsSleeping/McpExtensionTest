# MCP Remote Server Demo

Reproduces GitHub Copilot Chat bug where MCP servers with special characters in their names cannot be properly referenced using `#` notation.

## Bug

GitHub Copilot Chat fails to properly reference MCP servers when using the `#` notation if the MCP server name contains certain special characters such as spaces, `@` symbols, slashes, or parentheses. Instead of creating a proper reference to the MCP server, it adds the name as plain text to the chat request, preventing proper prioritization of that MCP server's tools.

## Test MCP Servers

This extension provides multiple MCP servers to demonstrate which characters work and which fail:

| Server Name | Character Issue | Actual Behavior |
|-------------|----------------|-----------------|
| `GitHubCopilot` | ✅ Valid identifier | ✅ Works properly |
| `GitHub_Copilot` | ✅ Contains underscore | ✅ Works properly |
| `GitHub-Copilot` | Contains hyphen | ✅ Works properly |
| `GitHub(Copilot)` | Contains parentheses | ❌ Fails to create reference |
| `GitHub Copilot` | Contains space | ❌ Fails to create reference |
| `GitHub@Copilot` | Contains @ symbol | ❌ Fails to create reference |
| `GitHub/Copilot` | Contains forward slash | ❌ Fails to create reference |
| `GitHub\Copilot` | Contains backslash | ❌ Fails to create reference |

## Repro Steps

1. Launch the extension: Press **F5** to start debugging
   - This will launch a new VS Code window with the extension loaded
   - The extension provides multiple MCP servers with different naming patterns

2. Open GitHub Copilot Chat in the Extension Development Host window

3. **Test the working cases:**
   - Type `#` in the chat input to trigger the reference picker
   - Select `GitHubCopilot` (no special characters)
   - Observe: A proper reference chip/tag is created ✅
   - Try `GitHub_Copilot` (underscore) - Also works ✅
   - Try `GitHub-Copilot` (hyphen) - Also works ✅

4. **Test servers with failing special characters:**
   - Type `#` and select `GitHub Copilot` (contains space)
   - Observe: Text is inserted as plain text, no reference chip ❌
   
5. **Repeat for other failing variations:**
   - Try `GitHub(Copilot)`, `GitHub@Copilot`, `GitHub/Copilot`, `GitHub\Copilot`
   - Observe: All fail to create proper references

6. Type a request like "list your tools" and submit
   - For working names (`GitHubCopilot`, `GitHub_Copilot`, `GitHub-Copilot`): Tools should be prioritized ✅
   - For servers with failing characters: Tools are not prioritized ❌

## Expected Behavior

The MCP server should be properly referenced (displayed as a chip/tag), and when specifically invoked using `#`:
- The tools from that MCP server should be prioritized for the request being made
- The agent should deterministically use those tools rather than just having them available as options
- This should work similar to how other references work (e.g., `#file`, `#selection`)

## Actual Behavior

The MCP server name is inserted as plain text only, without creating an actual reference. The MCP server's tools are not prioritized for the request.
