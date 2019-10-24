#==============================================================================
# Personal ~/.zshrc FILE
# By Jordan Bayles (bayles.jordan@gmail.com)
#
# This file contains aliases, functions, and other features for zsh
#==============================================================================

#==============================================================================
# Definitions
#==============================================================================
ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it"ll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="crcandy"

#==============================================================================
# Exports
#==============================================================================
EDITOR="vim"
TERM="rxvt"

# Make sure that /usr/local/bin is before /usr/bin on Mac OS X, otherwise
# homebrew versions won't supercede older OS versions.
PATH=/usr/local/bin:user/local/sbin:/usr/bin:/bin:/sbin:$PATH

PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin":$PATH

PATH=/user/local/google/home/jophba/bin:$PATH
PATH=/usr/local/src/depot_tools:$PATH
PATH=/usr/local/src/openscreen:$PATH
PATH=/usr/lib/llvm-7/bin/:$PATH
PATH=/usr/local/opt/llvm/bin:$PATH
PATH=/usr/local/Cellar/python/3.7.3/Frameworks/Python.framework/Versions/3.7/bin:$PATH

CHROME_BUILDTOOLS_PATH=/usr/local/src/chromium/src/buildtools
CHROMIUM_BUILDTOOLS_PATH=$CHROME_BUILDTOOLS_PATH
DEFAULT_SIZES="1200x800,1800x1200,2400x1600,1440x900,2160x1350,2880x1800"

GOMA_DIR=$HOME/goma
# Mac override
[ ! -d $GOMA_DIR ] && GOMA_DIR=$HOME/client/out/Release

#==============================================================================
# Aliases
#==============================================================================
alias sai="sudo aptitude install"
alias sau="sudo aptitude update"
alias sadu="sudo aptitude dist-upgrade"
alias sas="aptitude search"

# Helpful coding aliases
alias gs='grep -rnw . -e'

# Google aliases
REPO_DIR="/usr/local/src/"
JPB_HOST="jophba@jpb.kir.corp.google.com"

alias jpb="gcert && ssh -v -X ${JPB_HOST}"
alias jpbd="gcert && ssh -X ${JPB_HOST}"
alias red="cd ${REPO_DIR}"
alias goma="${GOMA_DIR}/goma_ctl.py ensure_start"

FUSE_POINT="${HOME}/jpb-src"
FUSE_FLAGS="reconnect,ServerAliveInterval=15,ServerAliveCountMax=3"
alias jpb-fs="umount ${FUSE_POINT} || echo unmounted && gcert && sshfs -o ${FUSE_FLAGS} ${JPB_HOST}:${REPO_DIR} ${FUSE_POINT}"
alias jpb-fsd="umount ${FUSE_POINT} || echo unmounted  && gcert && sshfs -o debug,${FUSE_FLAGS} ${JPB_HOST}:${REPO_DIR} ${FUSE_POINT}"

# Openscreen aliases
alias os="red && cd openscreen"
alias os2="red && cd openscreen2"
alias crm="red && cd chromium/src"
alias osp="red && cd openscreenprotocol"

alias cdrt="pushd \$(git rev-parse --show-toplevel)"
alias rfm="cdrt && git branch --set-upstream-to=origin/master && ./tools/cl-format.sh"
alias gngen="cdrt && mkdir -p out/Default && gn gen out/Default"
alias gngeng="cdrt && mkdir -p out/Default && gn gen --args=\"use_goma=true\" out/Default"

# Only work easily on Linux...
alias gngenc="cdrt && rm -rf out/Default && mkdir out/Default && gn gen --args=\"is_debug=true\" out/Default"
alias gngena="cdrt && rm -rf out/Default && mkdir out/Default && gn gen --args=\"is_asan=true is_debug=true\" out/Default"
alias gngens="cdrt && rm -rf out/Default && mkdir out/Default && gn gen --args=\"is_asan=true use_static_analyzer=true is_debug=true\" out/Default"

alias ncd="cdrt && autoninja -C out/Default"
alias ut="cdrt && ./out/Default/openscreen_unittests"

alias ntc="os && ninja C out/Default -t compdb cc cxx objc objcxx > compile_commands.json"

alias lock="xscreensaver-command -lock"

alias cmpr="killall compton && compton -b &"
alias set-wallpaper="feh --bg-scale"
alias awm="pushd ~/.config/awesome && vim ./rc.lua"
alias zrc="vim ~/.zshrc"
alias src="source ~/.zshrc"

alias vi="vim"
alias rm="rm -i"
alias cp="cp -i"
alias mv="mv -i"

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

alias du="du -kh"       # Makes a more readable output.
alias df="df -kTh"

alias dt="dmesg | tail"
alias grep="grep --color=auto"

# ls family
alias ll="ls -l --group-directories-first"
alias ls="ls -hF"
alias la="ls -Al"          # show hidden files
alias lx="ls -lXB"         # sort by extension
alias lk="ls -lSr"         # sort by size, biggest last
alias lc="ls -ltcr"        # sort by and show change time, most recent last
alias lu="ls -ltur"        # sort by and show access time, most recent last
alias lt="ls -ltr"         # sort by date, most recent last
alias lm="ls -al |more"    # pipe through "more"
alias lr="ls -lR"          # recursive ls
alias tree="tree -Csu"     # nice alternative to "recursive ls"

alias git-brd="git branch -r --merged | grep -v master | sed 's/origin\///' | xargs -n 1 git push --delete origin"
alias git-bdm="git branch --merged | grep -v \"\*\" | grep -v master | xargs -n 1 git branch -d"
alias git-sync="git co master && git pull && git remote prune origin && git-brd && git-bdm"

# Annoying git workflow stuff
alias hide-git-status="cdrt && echo '\n\n[oh-my-zsh]\n\thide-status=1\n\n' >> .git/config"
alias set-commit-hook="cdrt && cp ~/Dotfiles/commit-msg.chromium-hook ./.git/hooks/commit-msg"

#==============================================================================
# PLUGINS
#==============================================================================
# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
plugins=(
	archlinux
	autopep8
	battery
	colorize
	common-aliases
	debian
	encode64
	git
	github
	gnu-utils
	jsontools
	osx
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

#==============================================================================
# Sources
#==============================================================================
source $ZSH/oh-my-zsh.sh

#==============================================================================
# Commands to run
#==============================================================================
eval $(keychain --eval id_rsa)

#==============================================================================
# Functions
#==============================================================================
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

RPROMPT='$(check_last_exit_code)'