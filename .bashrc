#==============================================================================
# Personal ~/.bashrc FILE
# By Jordan Bayles (jangofett481@gmail.com)
#
# Last modified: Mon May 14 14:08:16 PDT 2012
# This file contains aliases, functions, and other features for bash
#==============================================================================

shopt -s extglob

#==============================================================================
# Exports
#==============================================================================
export EDITOR='vim'
export TERM='xterm-256color'
export UNCRUSTIFY_CONFIG='/home/jordan/dotfiles/uncrustify.cfg'
PATH=$PATH:"/home/jordan/matlab2011b/bin:/usr/local/texlive/2011/bin/x86_64-linux:/home/jordan/bin:/home/jordan/android-sdk-linux/platform-tools"
export PATH

#==============================================================================
# Sources
#==============================================================================
source /usr/share/git/completion/git-completion.bash
source ~/.git-prompt.sh
source /opt/intel/bin/compilervars.sh intel64

#==============================================================================
# Aliases
#==============================================================================
alias sbrc='source ~/.bashrc'
alias vi='vim'
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
# -> Prevents accidentally clobbering files.
alias mkdir='mkdir -p'
alias encoding='file -bi'

alias h='history'
alias j='jobs -l'
alias which='type -a'
alias ..='cd ..'
alias path='echo -e ${PATH//:/\\n}'
alias libpath='echo -e ${LD_LIBRARY_PATH//:/\\n}'
alias print='/usr/bin/lp -o nobanner -d $LPDEST'
            # Assumes LPDEST is defined (default printer)
alias pjet='enscript -h -G -fCourier9 -d $LPDEST'
            # Pretty-print using enscript

alias du='du -kh'       # Makes a more readable output.
alias df='df -kTh'

alias dt='dmesg | tail'
alias grep='grep --color=auto'

# ls family
alias ll="ls -l --group-directories-first"
alias ls='ls -hF --color'  # add colors for filetype recognition
alias la='ls -Al'          # show hidden files
alias lx='ls -lXB'         # sort by extension
alias lk='ls -lSr'         # sort by size, biggest last
alias lc='ls -ltcr'        # sort by and show change time, most recent last
alias lu='ls -ltur'        # sort by and show access time, most recent last
alias lt='ls -ltr'         # sort by date, most recent last
alias lm='ls -al |more'    # pipe through 'more'
alias lr='ls -lR'          # recursive ls
alias tree='tree -Csu'     # nice alternative to 'recursive ls'

# Compile alias
alias upgrub='sudo grub-mkconfig -o /boot/grub/grub.cfg'

# Oregon State related aliases
alias flip='ssh baylesj@flip.engr.oregonstate.edu'
alias gcc='gcc -lm -Wall -Werror -std=gnu99 -g'
alias gcc99='gcc -lm -Wall -Werror -std=c99 -g'
alias g++='g++ -ansi -pedantic -Wall'
alias valgrindv='valgrind --leak-check=full --track-origins=yes --show-reachable=yes -v'
alias db='cd /home/jordan/Dropbox'
alias sw='cd /home/jordan/Dropbox/schoolwork/'

# Course specific aliases
alias gibson='cd /home/jordan/Dropbox/extracurricular/gibson_research/'
alias share='if mount|grep "/media/science"; 
             then cd /media/science/Share/gibsonn/Bayles
             else sudo mount /media/science && cd /media/science/Share/gibsonn/Bayles
             fi'
alias cs='sw && cd cs311'
alias kelleymac='sudo macchanger -e eth0 --mac=24:BE:05:0E:57:EF'
alias osc='ssh baylesj@os-class.engr.oregonstate.edu'
alias python='python2'

# General aliases
alias fbstatus='fbcmd STATUS'
alias minecraft='optirun java -jar -Xmx1024M -Xms512M /home/jordan/bin/minecraft.jar'
alias cctags='ctags -R --languages=C,C++ --c++-kinds=+p --fields=+iaS --extra=+q ./'
alias indentkr='indent -kr -i8'

#==============================================================================
# Some general settings
#==============================================================================

# Use extended pattern matching (not sure if toggled on reboot or not)
# shopt -s extglob
# Check using rm !(args).

export TERM=xterm-color
export GREP_OPTIONS='--color=auto' GREP_COLOR='1;32'
export CLICOLOR=1
export LSCOLORS=ExFxCxDxBxegedabagacad

ulimit -S -c 0 # Don't post core dumps

shopt -u mailwarn
unset MAILCHECK # Don't warn of new mail

export HOSTFILE=$HOME/.hosts # Put list of remote hosts in local file

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

#==============================================================================
# Greeting, motd (message of the day) settings
#==============================================================================

export COLOR_NC='\e[0m' # No Color
export COLOR_WHITE='\e[1;37m'
export COLOR_BLACK='\e[0;30m'
export COLOR_BLUE='\e[0;34m'
export COLOR_LIGHT_BLUE='\e[1;34m'
export COLOR_GREEN='\e[0;32m'
export COLOR_LIGHT_GREEN='\e[1;32m'
export COLOR_CYAN='\e[0;36m'
export COLOR_LIGHT_CYAN='\e[1;36m'
export COLOR_RED='\e[0;31m'
export COLOR_LIGHT_RED='\e[1;31m'
export COLOR_PURPLE='\e[0;35m'
export COLOR_LIGHT_PURPLE='\e[1;35m'
export COLOR_BROWN='\e[0;33m'
export COLOR_YELLOW='\e[1;33m'
export COLOR_GRAY='\e[0;30m'
export COLOR_LIGHT_GRAY='\e[0;37m'

echo -e "${COLOR_BLUE}Welcome to BASH, version ${COLOR_LIGHT_BLUE}${BASH_VERSION%.*}${COLOR_NC}"
function_exit() { # Function to run when exiting shell
	echo -e "${RED}exiting...${NC}"
}
trap _exit EXIT

#==============================================================================
# Shell Prompt
#==============================================================================

if [[ "${DISPLAY%%:0*}" != "" ]]; then
	HILIT=${red} # remote machine
else
	HILIT=${cyan} # local machine
fi

# Replace \W with \w in promts for full paths
function fastprompt() {
    case $TERM in
        *term | rxvt )
             PS1='\e[33;1m\u@\h: \xe[31m\W\e[0m\$ '  ;;
             #PS1="${red}[\u@\h]${blue} \W > \[\033]0;\${TERM} [\u@\h] \w\007" ;;
         linux )
             PS1="${HILIT}[\h]$NC \W > " ;;
        *)
            PS1="[\h] \W > " ;;
    esac
}

function testprompt() {
case $TERM in
     xterm*|rxvt*)
         local TITLEBAR='\[\033]0;\u: ${PWD}\007\]'
          ;;
     *)
         local TITLEBAR=""
          ;;
    esac

local UC=$COLOR_BLUE                # user's color
[ $UID -eq "0" ] && UC=$COLOR_RED   # root's color

# Important lesson here:
# For variables to change after bash is instantiated, you need to escape the
# "$" character, otherwise it is expanded on instantiation of the bash instance.
PS1="$TITLEBAR\n${UC}\u@\h ${COLOR_LIGHT_GREEN}\${PWD} ${COLOR_CYAN}\$(__git_ps1)${COLOR_NC}\n-> "

# Single quotes do NOT expand variable names. The following $PS1 fixes the git
# issue, but adds some color related ones.
#PS1='$TITLEBAR\n${UC}\u@\h ${COLOR_LIGHT_GREEN}\${PWD} ${COLOR_CYAN}$(__git_ps1)${COLOR_NC}\n-> '
}

#fastprompt
testprompt

#==============================================================================
# Process/system related functions:
#==============================================================================

function my_ps() { ps $@ -u $USER -o pid,%cpu,%mem,bsdtime,command ; }
function pp() { my_ps f | awk '!/awk/ && $0~var' var=${1:-".*"} ; }

function ii()   # get current host related info
{
    echo -e "\nYou are logged on ${RED}$HOST"
    echo -e "\nAdditional information:$NC " ; uname -a
    echo -e "\n${RED}Users logged on:$NC " ; w -h
    echo -e "\n${RED}Current date :$NC " ; date
    echo -e "\n${RED}Machine stats :$NC " ; uptime
    echo -e "\n${RED}Memory stats :$NC " ; free
	echo
}

# Misc utilities:

function repeat()       # repeat n times command
{
    local i max
    max=$1; shift;
    for ((i=1; i <= max ; i++)); do  # --> C-like syntax
        eval "$@";
    done
}

function ask()
{
    echo -n "$@" '[y/n] ' ; read ans
    case "$ans" in
        y*|Y*) return 0 ;;
        *) return 1 ;;
    esac
}

#==============================================================================
# File & strings related functions:
#==============================================================================

# Find a file with a pattern in name:
function ff() { find . -type f -iname '*'$*'*' -ls ; }

# Find a file with pattern $1 in name and Execute $2 on it:
function fe() { find . -type f -iname '*'$1'*' -exec "${2:-file}" {} \;  ; }

# find pattern in a set of files and highlight them:
function fstr()
{
    OPTIND=1
    local case=""
    local usage="fstr: find string in files.
Usage: fstr [-i] \"pattern\" [\"filename pattern\"] "
    while getopts :it opt
    do
        case "$opt" in
        i) case="-i " ;;
        *) echo "$usage"; return;;
        esac
    done
    shift $(( $OPTIND - 1 ))
    if [ "$#" -lt 1 ]; then
        echo "$usage"
        return;
    fi
    local SMSO=$(tput smso)
    local RMSO=$(tput rmso)
    find . -type f -name "${2:-*}" -print0 | xargs -0 grep -sn ${case} "$1" 2>&- | \
sed "s/$1/${SMSO}\0${RMSO}/gI" | more
}

function cuttail() # cut last n lines in file, 10 by default
{
    nlines=${2:-10}
    sed -n -e :a -e "1,${nlines}!{P;N;D;};N;ba" $1
}

function lowercase()  # move filenames to lowercase
{
    for file ; do
        filename=${file##*/}
        case "$filename" in
        */*) dirname==${file%/*} ;;
        *) dirname=.;;
        esac
        nf=$(echo $filename | tr A-Z a-z)
        newname="${dirname}/${nf}"
        if [ "$nf" != "$filename" ]; then
            mv "$file" "$newname"
            echo "lowercase: $file --> $newname"
        else
            echo "lowercase: $file not changed."
        fi
    done
}

function swap()         # swap 2 filenames around
{
    local TMPFILE=tmp.$$
    mv "$1" $TMPFILE
    mv "$2" "$1"
    mv $TMPFILE "$2"
}

# Local Variables:
# mode:shell-script
# sh-shell:bash
# End:
