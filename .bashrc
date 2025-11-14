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

# PATH setup
export PATH="~/bin:~/.cargo/bin:~/.local/bin:$PATH"

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

# Editor
export EDITOR='vim'

# Google Cloud SDK (if installed)
if [ -f "~/google-cloud-sdk/path.bash.inc" ]; then
    source "~/google-cloud-sdk/path.bash.inc"
fi

if [ -f "~/google-cloud-sdk/completion.bash.inc" ]; then
    source "~/google-cloud-sdk/completion.bash.inc"
fi

# Rust environment
if [ -f "~/.cargo/env" ]; then
    source "~/.cargo/env"
fi
