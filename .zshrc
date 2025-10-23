# ──────────────────────────────────────────────────────────────────────────────
# Personal ~/.zshrc
# By Jordan Bayles (bayles.jordan@gmail.com)
#
# ZSH configuration with oh-my-zsh, custom aliases, and functions
# Optimized for Google/Chromium development workflows
# ──────────────────────────────────────────────────────────────────────────────

# ──────────────────────────────────────────────────────────────────────────────
# Oh-My-Zsh Configuration
# ──────────────────────────────────────────────────────────────────────────────
export ZSH="$HOME/.oh-my-zsh"
export ZSH_THEME="crcandy"

# Load oh-my-zsh
source $ZSH/oh-my-zsh.sh

# ──────────────────────────────────────────────────────────────────────────────
# History Configuration
# ──────────────────────────────────────────────────────────────────────────────
export HISTSIZE=50000
export SAVEHIST=50000
export HISTFILE="$HOME/.zsh_history"

# History options
setopt EXTENDED_HISTORY          # Write timestamp to history
setopt HIST_EXPIRE_DUPS_FIRST   # Expire duplicates first when trimming history
setopt HIST_IGNORE_DUPS         # Don't record duplicate entries
setopt HIST_IGNORE_ALL_DUPS     # Delete old duplicate entries
setopt HIST_FIND_NO_DUPS        # Don't display duplicates when searching
setopt HIST_IGNORE_SPACE        # Don't record entries starting with space
setopt HIST_SAVE_NO_DUPS        # Don't write duplicates to history file
setopt HIST_REDUCE_BLANKS       # Remove superfluous blanks
setopt SHARE_HISTORY            # Share history between sessions

# ──────────────────────────────────────────────────────────────────────────────
# ZSH Configuration
# ──────────────────────────────────────────────────────────────────────────────
# Vi-mode key timeout (reduce lag when switching modes)
export KEYTIMEOUT=1

# Completion settings
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' # Case-insensitive completion
setopt COMPLETE_IN_WORD
setopt AUTO_MENU
setopt AUTO_LIST

# ──────────────────────────────────────────────────────────────────────────────
# PATH Configuration
# ──────────────────────────────────────────────────────────────────────────────
# Using ZSH path array - entries added to beginning have highest priority

# Initialize with system paths (lowest priority)
path=(
	/usr/local/bin
	/usr/local/sbin
	/usr/bin
	/bin
	/sbin
	$path
)

# Development tools (conditional)
[[ -d /snap/bin ]] && path=(/snap/bin $path)
[[ -d /usr/local/opt ]] && path=(/usr/local/opt $path)
[[ -d /usr/local/opt/llvm/bin ]] && path=(/usr/local/opt/llvm/bin $path)

# Python (use latest available)
for pydir in /opt/homebrew/Cellar/python@3.*/*/bin(N); do
	path=($pydir $path)
	break
done

# Google/Chromium tools (conditional)
[[ -d /usr/local/src/depot_tools ]] && path=(/usr/local/src/depot_tools $path)
[[ -d /usr/local/google/home/jophba/bin ]] && path=(/usr/local/google/home/jophba/bin $path)

# Xcode tools (macOS only)
if [[ -d "/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin" ]]; then
	path=("/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin" $path)
fi

# VS Code (macOS)
if [[ -d "/Applications/Visual Studio Code.app/Contents/Resources/app/bin" ]]; then
	path=("/Applications/Visual Studio Code.app/Contents/Resources/app/bin" $path)
fi

# Homebrew (macOS)

# User tools (highest priority)
[[ -d $HOME/.cargo/bin ]] && path=($HOME/.cargo/bin $path)
[[ -d $HOME/bin ]] && path=($HOME/bin $path)

# Export path and remove duplicates
typeset -U path
export PATH

# ──────────────────────────────────────────────────────────────────────────────
# Homebrew Setup (macOS)
# ──────────────────────────────────────────────────────────────────────────────
if [[ -f "/opt/homebrew/bin/brew" ]]; then
	eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# ──────────────────────────────────────────────────────────────────────────────
# Plugins
# ──────────────────────────────────────────────────────────────────────────────
# oh-my-zsh plugins (found in ~/.oh-my-zsh/plugins/*)
# Custom plugins go in ~/.oh-my-zsh/custom/plugins/

# OS-specific plugins
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
	plugins=(debian archlinux systemd)
elif [[ "$OSTYPE" == "darwin"* ]]; then
	plugins=(macos)
fi

# Common plugins (cross-platform)
plugins+=(
	autopep8
	battery
	colorize
	encode64
	git
	github
	gnu-utils
	jsontools
	pep8
	pip
	pylint
	python
	sudo
	urltools
	vi-mode
	vscode
)

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - System Package Management
# ──────────────────────────────────────────────────────────────────────────────
alias sai="sudo aptitude install"
alias sau="sudo aptitude update"
alias sadu="sudo aptitude dist-upgrade"
alias sas="aptitude search"

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - Navigation
# ──────────────────────────────────────────────────────────────────────────────
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias cdrt="pushd \$(git rev-parse --show-toplevel)"

# Repository shortcuts
alias red="cd ${REPO_DIR}"
alias os="red && cd openscreen"
alias os2="red && cd openscreen2"
alias crm="red && cd chromium/src"
alias osp="red && cd openscreenprotocol"

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - File Operations
# ──────────────────────────────────────────────────────────────────────────────
# Modern ls using eza (modern fork of exa)
DISABLE_LS_COLORS=true
alias ls="eza"
alias la="eza -la"

# File utilities
alias vi="vim"
alias mkdir="mkdir -p"
alias encoding="file -bi"
alias du="du -kh"
alias df="df -kTh"

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - Modern CLI Tools
# ──────────────────────────────────────────────────────────────────────────────
# Use modern replacements if available
command -v bat &> /dev/null && alias cat="bat --style=plain --paging=never"
command -v batcat &> /dev/null && alias cat="batcat --style=plain --paging=never"
command -v fd &> /dev/null && alias find="fd"

# Only override grep if rg is available, otherwise keep colorized grep
if command -v rg &> /dev/null; then
	alias grep="rg"
else
	alias grep="grep --color=auto"
fi

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - Shell Utilities
# ──────────────────────────────────────────────────────────────────────────────
alias h="history"
alias j="jobs -l"
alias path="echo -e ${PATH//:/\\n}"
alias libpath="echo -e ${LD_LIBRARY_PATH//:/\\n}"
alias dt="dmesg | tail"
alias dusage='du -h -d 1 | sort -h'

# Shell management
alias zrc="vim ~/.zshrc"
alias src="source ~/.zshrc && source ~/.zshenv && source ~/.zshenv.local"
alias reload='exec zsh'

# Network utilities
alias ports='lsof -i -P'
alias myip='curl -s ifconfig.me'

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - Development & Search
# ──────────────────────────────────────────────────────────────────────────────
# Recursive search for lines matching a regex (e.g., "gs foo")
alias gs='grep -rnw . -e'

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - Google/Chromium Workflow
# ──────────────────────────────────────────────────────────────────────────────
# SSH utilities
alias ssh-status="echo \"available agents:\n\" && ls /tmp/ssh-* && echo \"\nSSH_AUTH_SOCK:\" $SSH_AUTH_SOCK"
alias gemini='/google/bin/releases/gemini-cli/tools/gemini'

# GN/Build configuration
alias gngen="cdrt && mkdir -p out/Default && gn gen out/Default"
alias gngeng="cdrt && mkdir -p out/Default && gn gen --args=\"use_reclient=true\" out/Default"
alias gngend="cdrt && mkdir -p out/Default && gn gen --args=\"is_debug=true\" out/Default"
alias gngena="cdrt && mkdir -p out/Default && gn gen --args=\"is_asan=true is_debug=true\" out/Default"
alias gngens="cdrt && mkdir -p out/Default && gn gen --args=\"is_asan=true is_static_analyzer=true is_debug=true\" out/Default"
alias gngencc="gn gen --add-export-compile-commands=\"*\" out/Default"

# Build & test
alias ca="cdrt && python ./tools/traffic_annotation/scripts/check_annotations.py --build-path ./out/Default"
alias acd="cdrt && autoninja -C out/Default"
alias fcd="cdrt && ninja -j 50 -C out/Default"
alias mcd="cdrt && ninja -j 1000 -C out/Default"
alias ut="cdrt && ./out/Default/*unittests"
alias e2e="cdrt && ./out/Default/e2e*"

# Git workflow (on Mac, don't use git cl - it uses wrong CIPD client)
alias gcl="git-cl"
alias gcf="git-cl format"
alias acp="git add -A && git can && git cl presubmit --upload"
alias hide-git-status="cdrt && echo '\n\n[oh-my-zsh]\n\thide-status=1\n\n' >> .git/config"

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - Git Branch Management
# ──────────────────────────────────────────────────────────────────────────────
# List merged remote branches (excluding main)
alias git-brm="git branch -r --merged | grep -v main | sed 's/origin\///'"

# Delete merged remote branches
alias git-brd="git branch -r --merged | grep -v main | sed 's/origin\///' | xargs -n 1 git push --delete origin"

# Delete merged local branches
alias git-bdm="git branch --merged | grep -v \"\*\" | grep -v main | xargs -n 1 git branch -d"

# Full sync: checkout main, pull, prune, delete merged branches
alias git-sync="git co main && git pull && git remote prune origin && git-brd && git-bdm"

# Update current branch with main
alias git-update="git fetch origin main:main && git merge main"

# Quick git commit with message
alias gcm='git commit -m'

# ──────────────────────────────────────────────────────────────────────────────
# Aliases - Desktop Environment (Linux)
# ──────────────────────────────────────────────────────────────────────────────
alias lock="xscreensaver-command -lock"
alias cmpr="killall compton && compton -b &"
alias set-wallpaper="feh --bg-scale"
alias awm="pushd ~/.config/awesome && vim ./rc.lua"

# ──────────────────────────────────────────────────────────────────────────────
# Functions
# ──────────────────────────────────────────────────────────────────────────────
# Display exit code of last command in right prompt
function check_last_exit_code() {
	local LAST_EXIT_CODE=$?
	if [[ $LAST_EXIT_CODE -ne 0 ]]; then
		local EXIT_CODE_PROMPT=' '
		EXIT_CODE_PROMPT+="%{$fg[red]%}-%{$reset_color%}"
		EXIT_CODE_PROMPT+="%{$fg_bold[red]%}$LAST_EXIT_CODE%{$reset_color%}"
		EXIT_CODE_PROMPT+="%{$fg[red]%}-%{$reset_color%}"
		echo "$EXIT_CODE_PROMPT"
	fi
}

RPROMPT='$(check_last_exit_code)'

# Create and enter directory
function mkcd() {
	mkdir -p "$1" && cd "$1"
}

# Extract any archive type
function extract() {
	if [ -f "$1" ]; then
		case "$1" in
			*.tar.bz2)   tar xjf "$1"    ;;
			*.tar.gz)    tar xzf "$1"    ;;
			*.bz2)       bunzip2 "$1"    ;;
			*.rar)       unrar x "$1"    ;;
			*.gz)        gunzip "$1"     ;;
			*.tar)       tar xf "$1"     ;;
			*.tbz2)      tar xjf "$1"    ;;
			*.tgz)       tar xzf "$1"    ;;
			*.zip)       unzip "$1"      ;;
			*.Z)         uncompress "$1" ;;
			*.7z)        7z x "$1"       ;;
			*)           echo "'$1' cannot be extracted via extract()" ;;
		esac
	else
		echo "'$1' is not a valid file"
	fi
}

# Find and cd to git repository root
function groot() {
	local root=$(git rev-parse --show-toplevel 2>/dev/null)
	if [[ -n "$root" ]]; then
		cd "$root"
	else
		echo "Not in a git repository"
		return 1
	fi
}

# ──────────────────────────────────────────────────────────────────────────────
# FZF Integration
# ──────────────────────────────────────────────────────────────────────────────
# Setup fzf if available
if command -v fzf &> /dev/null; then
	# Key bindings (Ctrl-R for history, Ctrl-T for files, Alt-C for cd)
	if [[ -f ~/.fzf.zsh ]]; then
		source ~/.fzf.zsh
	elif [[ -f /usr/share/fzf/key-bindings.zsh ]]; then
		source /usr/share/fzf/key-bindings.zsh
		source /usr/share/fzf/completion.zsh
	elif [[ -f /opt/homebrew/opt/fzf/shell/key-bindings.zsh ]]; then
		source /opt/homebrew/opt/fzf/shell/key-bindings.zsh
		source /opt/homebrew/opt/fzf/shell/completion.zsh
	fi

	# FZF options
	export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'

	# Use fd instead of find if available
	if command -v fd &> /dev/null; then
		export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
		export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
	fi
fi

# ──────────────────────────────────────────────────────────────────────────────
# External Tool Integration
# ──────────────────────────────────────────────────────────────────────────────
# Keychain (SSH agent manager)
if command -v keychain &> /dev/null; then
	if [[ -f "$HOME/.ssh/id_rsa" ]] || [[ -f "$HOME/.ssh/github_rsa" ]]; then
		eval $(keychain --eval --quiet id_rsa github_rsa 2>/dev/null)
	fi
fi

# Travis CI
[[ -f $HOME/.travis/travis.sh ]] && source $HOME/.travis/travis.sh

# Rust/Cargo
[[ -f $HOME/.cargo/env ]] && source $HOME/.cargo/env 2>/dev/null

# Google g4d completion
[[ -f /etc/bash_completion.d/g4d ]] && source /etc/bash_completion.d/g4d 2>/dev/null

# Google Cloud SDK
if [[ -f "$HOME/google-cloud-sdk/path.zsh.inc" ]]; then
	source "$HOME/google-cloud-sdk/path.zsh.inc"
fi

if [[ -f "$HOME/google-cloud-sdk/completion.zsh.inc" ]]; then
	source "$HOME/google-cloud-sdk/completion.zsh.inc"
fi

. "$HOME/.local/bin/env"

# ──────────────────────────────────────────────────────────────────────────────
# Homebrew Path Prioritization
# ──────────────────────────────────────────────────────────────────────────────
if [[ -f "/opt/homebrew/bin" ]]; then
eval "$(/opt/homebrew/bin/brew shellenv)"
fi

