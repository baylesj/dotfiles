# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal dotfiles repository for managing Unix/Linux/macOS configuration files and custom scripts. The repository uses symlinks to install dotfiles from this directory to the home directory.

**Environment:** Cross-platform (macOS + Linux), heavily customized for Google/Chromium development workflows.

## Installation and Setup

**Initial installation:**
```bash
./make-links.sh
```

This script:
- Creates symlinks for all dotfiles (`.bashrc`, `.zshrc`, `.vimrc`, `.gitconfig`, etc.) from the repository to `$HOME`
- Backs up existing files to `*.ml-orig` before symlinking
- Installs/updates oh-my-zsh from the official ohmyzsh/ohmyzsh repository
- Links the `bin/` directory to `$HOME/bin`

**Note:** After installation, you may need to install `eza` (modern `ls` replacement):
```bash
# macOS
brew install eza

# Linux (Debian/Ubuntu)
sudo apt install eza
```

## Repository Structure

### Core Configuration Files
- `.zshrc` - ZSH shell configuration with extensive aliases and functions
- `.bashrc` - Bash shell configuration
- `.bash_profile` - Bash shell profile (sources `.bashrc`)
- `.vimrc` - Vim editor configuration with vim-plug plugin manager
- `.gitconfig` - Git configuration with extensive aliases and modern features
- `.hyper.js` - Hyper terminal configuration
- `.Xdefaults`, `.xinitrc` - X11 window system configuration (Linux only)
- `.conkyrc` - Conky system monitor configuration (Linux only)

### Directories
- `bin/` - Custom utility scripts (symlinked to `$HOME/bin`)
- `.vim/` - Vim plugins, colors, and support files
- `.fonts/` - Custom fonts

### Key Scripts in `bin/`
- `git-update-all` - Updates main branch and merges it into all local branches (auto-detects Chromium repos with `gclient sync`)
- `git-file-size-diff` - Shows file size differences in commits

## Important Aliases and Workflows

### Git Workflow (Chromium/Google-specific)
The dotfiles are heavily customized for Google/Chromium development:

**Git aliases** (from `.gitconfig`):
- `git can` - Commit amend with no edit
- `git up` - Upload to code review (cl upload)
- `git poh` - Push to Gerrit (refs/for/main)

**ZSH aliases** (from `.zshrc`):
- `acp` - Add all, commit amend, and upload to review
- `git-sync` - Checkout main, pull, prune, delete merged branches
- `git-update` - Fetch and merge main into current branch

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
- `red` - Change to `$REPO_DIR` (default: `/usr/local/src/`)
- `os`, `os2`, `crm`, `osp` - Navigate to specific repositories

### General Shell Aliases
- `ls`, `la` - Uses `eza` (modern fork of exa) instead of traditional ls
- `vi` - Aliased to `vim`
- `zrc` - Edit `.zshrc`
- `src` - Reload `.zshrc`

## Development Environment

**Editor:** Vim (configured in `.vimrc`)
- **Plugin manager:** vim-plug (auto-installs on first run)
- Line numbers enabled
- 80-column marker
- Spell check toggle (F6/F7)
- Custom color scheme (buttercream)
- Arrow keys disabled (vim hardmode)
- To add plugins: Edit `.vimrc` Plug section and run `:PlugInstall`

**Shell:** ZSH with oh-my-zsh
- Theme: `crcandy`
- Vi-mode enabled
- Extensive plugin configuration

**PATH priorities:**
1. `$HOME/bin` (custom scripts)
2. `$HOME/.cargo/bin` (Rust tools)
3. `/usr/local/bin` (Homebrew takes precedence on macOS)
4. Various Google/Chromium-specific tool paths

## Special Configuration Notes

### Git Configuration
- Default editor: `vim`
- Default branch: `main` for new repos
- Auto-setup remote when pushing new branches
- Auto-prune deleted remote branches on fetch
- Pager disabled for branches (`pager.branch = false`)
- Core pager set to `cat` (immediate output)
- SSL verification disabled (Google corporate network)
- Google chrome-internal URL rewrite configured
- Extensive git aliases (see `.gitconfig:36-187`)

### Environment-Specific
- Homebrew integration for Apple Silicon Macs (`/opt/homebrew`)
- Google Cloud SDK integration (if installed)
- Depot tools and OpenScreen paths (Google/Chromium development)
- Rust/Cargo integration
- Path priority: `$HOME/bin` → `~/.cargo/bin` → `/usr/local/bin` → system paths

## Testing Changes

After modifying dotfiles:
1. Test the symlink script in a safe environment or backup first
2. Reload shell configuration: `source ~/.zshrc`
3. Verify vim configuration: `vim` and check for errors
4. Test git aliases: `git st`, `git l`, etc.
