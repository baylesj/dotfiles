# dotfiles

Shell, editor, terminal and git config for macOS (Apple Silicon), with Debian
Linux still supported. Ghostty + zsh/oh-my-zsh/Powerlevel10k + Vim 9.

## Install

```sh
git clone git@github.com:baylesj/dotfiles.git ~/Dotfiles
cd ~/Dotfiles
./configure.sh
```

`configure.sh` is safe to re-run. It:

- symlinks every top-level dotfile and `bin/` into `$HOME` (an existing file is
  moved to `<name>~` first) and links `ghostty/` to `~/.config/ghostty`
- installs or updates oh-my-zsh, Powerlevel10k, zsh-autosuggestions and
  zsh-syntax-highlighting
- installs CLI tools with Homebrew or apt: fzf, bat, eza, fd, ripgrep,
  git-delta, node, shfmt
- on macOS, installs Ghostty and the fonts in [FONTS.md](FONTS.md)
- installs vim plugins

`configure-python.sh` separately installs uv, ruff, ty and Python language
servers.

Machine-specific settings and secrets go in `~/.zshenv.local`, which is
sourced from `.zshenv` and not tracked.

## What's here

| Path | What it is |
| --- | --- |
| `.zshrc`, `.zshenv` | zsh: oh-my-zsh plugins, aliases, functions, `PATH` |
| `.bashrc`, `.bash_profile` | bash, for machines where zsh isn't the login shell |
| `.vimrc`, `.vim/spell/` | Vim config and personal spelling dictionary |
| `.gitconfig`, `.gitconfig-chromium` | git settings and aliases; the second switches to the work email for googlesource/sso remotes |
| `.gitignore` | this repo's ignores, and also the global excludes file |
| `ghostty/` | Ghostty config and custom themes |
| `bin/` | scripts on `PATH` (below) |
| `FONTS.md` | installed fonts and how to try them |

### Scripts in `bin/`

- `git-update-all`: update main and merge it into every local branch;
  runs `gclient sync` in Chromium checkouts
- `git-file-size-diff`: file size changes between commits
- `decorpify`: rewrite corp-internal Google URLs (Gerrit, etc.) to public
  ones; reads stdin or files. Tests: `python3 bin/test_decorpify.py`
- `find_exclusive_files.sh`, `sort-and-dedup.py`: small utilities

## Notes

**Ghostty.** Theme follows macOS light/dark (Noctis Lux / TokyoNight). Ghostty's
ssh integration installs its terminfo on remote hosts, and the shells only
fall back to `TERM=xterm-256color` inside SSH sessions that don't know the
client's terminal, so `TERM` isn't overridden locally.

**Vim.** vim-plug bootstraps itself on first launch. LSP uses
[yegappan/lsp](https://github.com/yegappan/lsp) and only turns on servers whose
binary is on `PATH` (clangd, rust-analyzer, pyright or pylsp, gopls,
typescript-language-server, bash-language-server), so installing a server is
all it takes to enable it.

| Keys | Action |
| --- | --- |
| `Ctrl-P` / `<leader>b` / `<leader>g` | files / buffers / ripgrep (fzf) |
| `<leader>n` / `<leader>f` | toggle NERDTree / reveal current file |
| `gd` `gr` `K` | definition, references, hover |
| `<leader>r` / `<leader>a` | rename / code action |
| `[d` `]d` | previous / next diagnostic |
| `gcc`, `cs"'`, `ysiw)` | comment, change surround, add surround |

Arrow keys are disabled on purpose.

**zsh.** The oh-my-zsh `plugins=(...)` list has to stay above
`source $ZSH/oh-my-zsh.sh`. vi-mode is on.

**git.** Chromium workflow aliases live in `.gitconfig`: `git acp` (amend,
presubmit, upload), `git sync`, `git update`, `git cf`, `git poh`. Repos with
a `*.googlesource.com` or `sso://` remote automatically commit with the work
email.
