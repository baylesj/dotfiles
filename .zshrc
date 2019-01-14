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

PATH=/bin:/sbin:/usr/bin:/usr/local/bin:user/local/sbin:$PATH
PATH=/usr/local/texlive/2015/bin/x86_64-darwin:$PATH
PATH=/opt/local/bin:$PATH
PATH=~/.rvm/bin:$PATH

P4CONFIG=/Users/jbayles/expedia/p4.ini
BUNDLE_GEMFILE=~/expedia/expweb/trunk/ui/smoketest/cucumber/Gemfile

#==============================================================================
# Aliases
#==============================================================================
alias sai="sudo aptitude install"
alias sau="sudo aptitude update"
alias sadu="sudo aptitude dist-upgrade"
alias as="aptitude search"

alias svn="python2 /home/jordan/bin/svn-color/svn-color.py"
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
alias ls="ls -hF --color"  # add colors for filetype recognition
alias la="ls -Al"          # show hidden files
alias lx="ls -lXB"         # sort by extension
alias lk="ls -lSr"         # sort by size, biggest last
alias lc="ls -ltcr"        # sort by and show change time, most recent last
alias lu="ls -ltur"        # sort by and show access time, most recent last
alias lt="ls -ltr"         # sort by date, most recent last
alias lm="ls -al |more"    # pipe through "more"
alias lr="ls -lR"          # recursive ls
alias tree="tree -Csu"     # nice alternative to "recursive ls"

alias gcb="sudo rm -rf build; ./gradlew clean build"
alias gcbf="sudo rm -rf build; ./gradlew -x :minification:minifyResources clean -xCheck build"
alias gds="./gradlew -x test -Pdebug startExpwebNoSpawn"
alias gdss="./gradlew -Pdebug -Pstub startExpwebNoSpawn"
alias gss="./gradlew -Pstub startExpwebNoSpawn"

alias p4="p4 set P4CONFIG=/Users/jbayles/expedia/p4.in && p4 -p perforce:1994"

alias exp="cd ~/expedia"
alias ew="exp && cd expweb"
alias trunk="ew && cd trunk"

alias src="source ~/.zshrc"
alias edit="vim ~/.zshrc"

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

