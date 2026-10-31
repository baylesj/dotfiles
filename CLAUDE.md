# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Personal dotfiles, installed by symlinking from this directory into `$HOME`.
Primary machine is macOS (Apple Silicon); Linux (Debian) is still supported by
`configure.sh`. Parts of the shell and git config are for Chromium/Open Screen
development.

## Installation and Setup

```bash
./configure.sh
```

This script:
- Symlinks every top-level dotfile (`.[a-z]*`) and `bin/` into `$HOME`, backing up
  an existing file to `<name>~` first
- Symlinks `ghostty/` to `~/.config/ghostty`
- Installs/updates oh-my-zsh, Powerlevel10k, zsh-autosuggestions and
  zsh-syntax-highlighting
- Installs CLI tools (fzf, bat, eza, fd, ripgrep, git-delta, ...) with Homebrew or apt
- On macOS, installs Ghostty and the fonts listed in `FONTS.md`
- Installs vim plugins with vim-plug

`configure-python.sh` sets up Python tooling separately.

## Repository Structure

- `.zshrc` - ZSH config: oh-my-zsh, aliases, functions. `.zshenv` holds env vars;
  machine-specific secrets/overrides go in the untracked `.zshenv.local`
- `.bashrc`, `.bash_profile` - Bash config
- `.vimrc` - Vim 9 config (vim-plug, yegappan/lsp, fzf.vim, gruvbox-material)
- `.vim/spell/` - Personal spelling dictionary (the only tracked part of `.vim/`;
  plugins, vim-plug itself and undo history are generated and gitignored)
- `.gitconfig` - Git config and aliases. Commits default to jophba@chromium.org
- `.gitignore` - Both this repo's ignore file and the global excludes file
  (`core.excludesfile = ~/.gitignore`)
- `ghostty/` - Ghostty terminal config (`config.ghostty`) and custom `themes/`
- `bin/` - Utility scripts (symlinked to `$HOME/bin`)
- `FONTS.md` - Installed fonts and how to try them in Ghostty

### Key Scripts in `bin/`
- `git-update-all` - Updates main branch and merges it into all local branches (auto-detects Chromium repos with `gclient sync`)
- `git-file-size-diff` - Shows file size differences in commits

## Important Aliases and Workflows

### Git Workflow (Chromium/Google-specific)

**Git aliases** (from `.gitconfig`):
- `git can` - Commit amend with no edit
- `git up` - Upload to code review (cl upload)
- `git poh` - Push to Gerrit (refs/for/main)
- `git acp` - Add all, commit amend, presubmit and upload
- `git sync` - Checkout main, pull, prune, delete merged branches
- `git update` - Fetch and merge main into current branch
- `git cf` - `git cl format`

### Build Commands (Chromium/GN)
- `gngen` - Generate GN build files in out/Default
- `gngeng` - Generate with reclient enabled
- `gngend` - Generate debug build
- `gngena` - Generate with ASAN enabled
- `gngens` - Generate with ASAN and static analyzer
- `acd` - Build with autoninja
- `ut` - Run unit tests from out/Default
- `e2e` - Run e2e tests from out/Default

### Navigation Shortcuts
- `cdrt` - Change to repository root
- `red` - Change to `/usr/local/src`
- `os`, `os2`, `osp` - Navigate to Open Screen checkouts under it

### General Shell Aliases
- `ls`, `la` - `eza`
- `vi` - `vim`
- `src` - Reload zsh config (`omz reload`)

## Development Environment

**Terminal:** Ghostty. Theme follows macOS light/dark (Noctis Lux / TokyoNight).

**Editor:** Vim 9 (`.vimrc`)
- vim-plug auto-installs itself and plugins on first run; `:PlugUpdate` to update
- LSP via yegappan/lsp; servers are registered only if their binary is on `$PATH`
  (clangd, rust-analyzer, pyright, gopls, typescript-language-server,
  bash-language-server)
- `<C-p>` files, `<leader>g` ripgrep, `<leader>b` buffers, `<leader>n` NERDTree
- `gd`/`gr`/`K`/`<leader>r`/`<leader>a`/`[d`/`]d` for LSP navigation
- Arrow keys disabled; spell check on for prose filetypes (F6/F7 toggle)

**Shell:** ZSH with oh-my-zsh and Powerlevel10k
- The `plugins=(...)` list must stay above `source $ZSH/oh-my-zsh.sh`
- vi-mode plugin is enabled (`KEYTIMEOUT=1`)

## Special Configuration Notes

### Git Configuration
- Editor `vim`, pager `delta`; difftool/mergetool presets for VS Code, Zed and Jetski
- Default branch `main`, `push.autoSetupRemote`, `fetch.prune`
- `pager.branch = false`
- TERM is only overridden in SSH sessions (see `.zshenv`); Ghostty handles outgoing ssh

### Environment-Specific
- Homebrew on Apple Silicon (`/opt/homebrew`)
- depot_tools at `~/depot_tools`
- `SDKROOT` comes from `xcrun` rather than a hardcoded Xcode.app path
- Rust/Cargo integration

## Testing Changes

After modifying dotfiles:
1. `bash -n configure.sh` and `zsh -n .zshrc` for syntax
2. Reload shell configuration: `omz reload`
3. Vim: open a file and check `:messages`; `:LspServer show status` in a C file
4. Ghostty: `ghostty +validate-config`
5. Git: `git config -f .gitconfig --list >/dev/null`
