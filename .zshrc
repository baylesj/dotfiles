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

CHROME_BUILDTOOLS_PATH=/usr/local/src/depot_tools
DEFAULT_SIZES="1200x800,1800x1200,2400x1600,1440x900,2160x1350,2880x1800"

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
alias jpb="gcert && ssh -v -X jophba@jpb.kir.corp.google.com"

# Openscreen aliases
alias os="cd /usr/local/src/openscreen"
alias os2="cd /usr/local/src/openscreen2"
alias gngen="os && rm -rf out/Default && mkdir out/Default && gn gen --args=\"is_debug=true\" out/Default"

# Only work easily on Linux...
alias gngena="os && rm -rf out/Default && mkdir out/Default && gn gen --args=\"is_asan=true is_debug=true\" out/Default"
alias gngens="os && rm -rf out/Default && mkdir out/Default && gn gen --args=\"is_asan=true is_static_analyzer=true is_debug=true\" out/Default"

alias ncd="os && autoninja -C out/Default"
alias ut="os && ./out/Default/unittests"
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

#==============================================================================
# PLUGINS
#==============================================================================
# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
plugins=(git systemd github gnu-utils battery archlinux colorize)

#==============================================================================
# Sources
#==============================================================================
source $ZSH/oh-my-zsh.sh

#==============================================================================
# Commands to run
#==============================================================================
eval $(keychain --eval id_rsa)

