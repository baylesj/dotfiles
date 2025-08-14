#===============================================================================
# Personal ~/.zshrc FILE
# By Jordan Bayles (bayles.jordan@gmail.com)
#
# This file contains aliases, functions, and other features for zsh
#===============================================================================

#===============================================================================
# Definitions
#===============================================================================
ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it"ll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="crcandy"

#===============================================================================
# Exports
#===============================================================================
EDITOR="vim"
TERM="rxvt"

PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin":$PATH
PATH="/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/":$PATH
PATH=/user/local/google/home/jophba/bin:$PATH
PATH=/usr/local/src/depot_tools:$PATH
PATH=/usr/local/src/openscreen:$PATH
PATH=/usr/lib/llvm-7/bin:$PATH
PATH=/usr/local/opt:$PATH
PATH=/usr/local/opt/llvm/bin:$PATH
PATH=/opt/homebrew/Cellar/python@3.11/3.11.3/bin/:$PATH
PATH=/snap/bin:$PATH
PATH=$HOME/.cargo/bin:$PATH
PATH=$HOME/bin:$PATH
# Make sure that /usr/local/bin is before /usr/bin on Mac OS X, otherwise
# homebrew versions won't supercede older OS versions.
PATH=/usr/local/bin:user/local/sbin:/usr/bin:/bin:/sbin:$PATH
PATH=/Users/jophba/.rustup/toolchains/nightly-aarch64-apple-darwin/bin/:$PATH

PATH=/opt/homebrew/bin/:$PATH

echo "set path..."

SKIP_GCE_AUTH_FOR_GIT=1
REPO_DIR="/usr/local/src/"

HOMEBREW_EXE="/opt/homebrew/bin/brew"
if [[ -f "$HOMEBREW_EXE" ]]; then
	eval "$($HOMEBREW_EXE shellenv)"
fi

#===============================================================================
# Sources
#===============================================================================
source $ZSH/oh-my-zsh.sh

echo "set oh my zsh..."

#===============================================================================
# Aliases
#===============================================================================
alias sai="sudo aptitude install"
alias sau="sudo aptitude update"
alias sadu="sudo aptitude dist-upgrade"
alias sas="aptitude search"

# Helpful coding aliases
# Recursive search for lines matching a regex. E.g. "gs foo"
alias gs='grep -rnw . -e'

# Google aliases
alias ssh-status="echo \"available agents:\n\" && ls /tmp/ssh-* && echo \"\nSSH_AUTH_SOCK:\" $SSH_AUTH_SOCK"
alias gemini='/google/bin/releases/gemini-cli/tools/gemini'

# Openscreen aliases
alias red="cd ${REPO_DIR}"
alias os="red && cd openscreen"
alias os2="red && cd openscreen2"
alias crm="red && cd chromium/src"
alias osp="red && cd openscreenprotocol"

alias cdrt="pushd \$(git rev-parse --show-toplevel)"
alias gngen="cdrt && mkdir -p out/Default && gn gen out/Default"
alias gngeng="cdrt && mkdir -p out/Default && gn gen --args=\"use_reclient=true\" out/Default"
alias gngend="cdrt && mkdir -p out/Default && gn gen --args=\"is_debug=true\" out/Default"
alias gngena="cdrt && mkdir -p out/Default && gn gen --args=\"is_asan=true is_debug=true\" out/Default"
alias gngens="cdrt && mkdir -p out/Default && gn gen --args=\"is_asan=true is_static_analyzer=true is_debug=true\" out/Default"

alias gngencc="gn gen --add-export-compile-commands=\"*\" out/Default"

alias ca="cdrt && python ./tools/traffic_annotation/scripts/check_annotations.py --build-path ./out/Default"
alias acd="cdrt && autoninja -C out/Default"
alias fcd="cdrt && ninja -j 50 -C out/Default"
alias mcd="cdrt && ninja -j 1000 -C out/Default"
alias ut="cdrt && ./out/Default/*unittests"
alias e2e="cdrt && ./out/Default/e2e*"

# AwesomeWM shortcuts
alias lock="xscreensaver-command -lock"
alias cmpr="killall compton && compton -b &"
alias set-wallpaper="feh --bg-scale"
alias awm="pushd ~/.config/awesome && vim ./rc.lua"

# ZShell shortcuts
alias zrc="vim ~/.zshrc"
alias src="source ~/.zshrc"

# General shell aliases
# See https://explainshell.com/explain for a breakdown of any command.
alias vi="vim"

# -> Prevents accidentally clobbering files.
alias mkdir="mkdir -p"
alias encoding="file -bi"

alias h="history"
alias j="jobs -l"
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."

alias path="echo -e ${PATH//:/\\n}"
alias libpath="echo -e ${LD_LIBRARY_PATH//:/\\n}"

# More readable file size outputs
alias du="du -kh"
alias df="df -kTh"

alias dt="dmesg | tail"
alias grep="grep --color=auto"

# ls family. We don't want zsh trying to colorize through the alias, when we
# can use exa instead.
DISABLE_LS_COLORS=true
alias ls="exa"
alias la="exa -la"

# Annoying branch cleanup
alias git-brm="git branch -r --merged | grep -v main | sed 's/origin\///'"
alias git-brd="git branch -r --merged | grep -v main | sed 's/origin\///' | xargs -n 1 git push --delete origin"
alias git-bdm="git branch --merged | grep -v \"\*\" | grep -v main | xargs -n 1 git branch -d"
alias git-sync="git co main && git pull && git remote prune origin && git-brd && git-bdm"
alias git-update="git fetch origin main:main && git merge main"

# Annoying git workflow stuff
alias acp="git add -A && git can && git cl presubmit --upload"
alias hide-git-status="cdrt && echo '\n\n[oh-my-zsh]\n\thide-status=1\n\n' >> .git/config"
alias set-commit-hook="cdrt && cp ~/dotfiles/commit-msg.chromium-hook ./.git/hooks/commit-msg"

# On Mac, don't use git cl -- it uses the wrong CIPD client.
alias gcl="git-cl"
alias gcf="git-cl format"

echo "set aliases..."

#===============================================================================
# PLUGINS
#===============================================================================
# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
plugins=(
	archlinux
	autopep8
	battery
	colorize
	debian
	encode64
	git
	github
	gnu-utils
	jsontools
	macos
	pep8
	pip
	pylint
	python
  # Disable for accessing Google network
  # ssh-agent
	sudo
	systemd
	urltools
	vi-mode
	vscode
)

echo "set plugins..."

#===============================================================================
# Commands to run
#===============================================================================
if type "$keychain" > /dev/null; then
	eval $(keychain --eval id_rsa github_rsa)
fi

#===============================================================================
# Functions
#===============================================================================
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

# added by travis gem
[ -f /Users/jophba/.travis/travis.sh ] && source /Users/jophba/.travis/travis.sh

source $HOME/.cargo/env > /dev/null 2>&1
source /etc/bash_completion.d/g4d > /dev/null 2>&1

export PATH=/usr/local/src/fuchsia/.jiri_root/bin:$PATH
source /usr/local/src/fuchsia/scripts/fx-env.sh

RPROMPT='$(check_last_exit_code)'

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/jophba/google-cloud-sdk/path.zsh.inc' ]; then . '/Users/jophba/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/Users/jophba/google-cloud-sdk/completion.zsh.inc' ]; then . '/Users/jophba/google-cloud-sdk/completion.zsh.inc'; fi

echo "ran commands..."
echo "done"
