#==============================================================================
# Personal ~/.zshrc FILE
# By Jordan Bayles (jangofett481@gmail.com)
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

PATH=$PATH:$HOME/bin
PATH=$PATH:/usr/local/bin
PATH=$PATH:/usr/local/texlive/2011/bin/x86_64-linux
PATH=$PATH:~/android-sdk-linux/platform-tools
PATH=$PATH:$HOME/.rvm/bin

#==============================================================================
# Aliases
#==============================================================================
alias python="python3"
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

# Compile alias
alias upgrub="sudo grub-mkconfig -o /boot/grub/grub.cfg"

# Oregon State related aliases
alias flip="ssh baylesj@flip.engr.oregonstate.edu"
alias onid="ssh baylesj@shell.onid.oregonstate.edu"
alias gcc="gcc -lm -Wall -Werror -std=gnu99 -g"
alias gcc99="gcc -lm -Wall -Werror -std=c99 -g"
alias g++="g++ -ansi -pedantic -Wall"
alias valgrindv="valgrind --leak-check=full --track-origins=yes --show-reachable=yes -v"
alias db="cd /home/jordan/Dropbox"
alias sw="cd /home/jordan/Dropbox/schoolwork/"
alias cs="cd /home/jordan/Dropbox/schoolwork/classes"

# Course specific aliases
alias kelleymac="sudo macchanger -e eth0 --mac=24:BE:05:0E:57:EF"
alias osc="ssh baylesj@os-class.engr.oregonstate.edu"
alias avr-gcc="avr-gcc -mmcu=atmega128"

# General aliases
alias minecraft="optirun java -jar -Xmx1024M -Xms512M /home/jordan/bin/minecraft.jar"
alias cctags="ctags -R --languages=C,C++ --c++-kinds=+p --fields=+iaS --extra=+q ./"
alias indentkr="indent -kr -i8"
alias indentkernel="indent -kr -i8 -ts8 -sob -l80 -ss -bs -psl"

#==============================================================================
# OPTIONAL CONFIGURATION SETTINGS
#==============================================================================
# Uncomment following line if you want red dots to be displayed while waiting for completion
# COMPLETION_WAITING_DOTS="true"

# Uncomment following line if you want to disable marking untracked files under
# VCS as dirty. This makes repository status check for large repositories much,
# much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

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

# Customize to your needs...

