# MCP Remote Server Demo

Reproduces MCP authentication bug where VS Code forces re-authentication every time you switch workspace folders.

## Bug

VS Code prompts for MCP authentication each time you open a folder you haven't opened in the current session, even if already authenticated.

## Repro Steps

1. Create demo folders:
   ```
   C:\DemoRepo\src\Folder1
   C:\DemoRepo\src\Folder2
   C:\DemoRepo\src\Folder3
   ```

2. Launch extension: **F5**

3. Open Folder 1: **File → Open Folder**
   - Observe MCP auth prompt

4. Open Folder 2: **File → Open Folder**
   - Observe MCP auth prompt **again** (should not prompt)

5. Open Folder 3
   - Auth prompt repeats

## Expected Behavior

Should authenticate once per session, not once per folder.
