#!/bin/bash
#
# ~/.bashrc
# By Jordan Bayles (bayles.jordan@gmail.com)
#
# This file contains bash-specific configuration
#

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# History settings
HISTCONTROL=ignoreboth
HISTSIZE=10000
HISTFILESIZE=20000
shopt -s histappend

# Check window size after each command
shopt -s checkwinsize

# Enable color support
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
fi

# Basic aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias vi='vim'
alias ..='cd ..'
alias ...='cd ../..'

# PATH setup
export PATH="$HOME/bin:$HOME/.cargo/bin:$PATH"

# Editor
export EDITOR='vim'

# Google Cloud SDK (if installed)
if [ -f "$HOME/google-cloud-sdk/path.bash.inc" ]; then
    source "$HOME/google-cloud-sdk/path.bash.inc"
fi

if [ -f "$HOME/google-cloud-sdk/completion.bash.inc" ]; then
    source "$HOME/google-cloud-sdk/completion.bash.inc"
fi

# Rust environment
if [ -f "$HOME/.cargo/env" ]; then
    source "$HOME/.cargo/env"
fi
