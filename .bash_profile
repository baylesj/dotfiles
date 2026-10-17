#
# ~/.bash_profile
#

# Over SSH, fall back to xterm-256color if this host has no terminfo for the
# client's TERM (e.g. xterm-ghostty), and assume truecolor since ssh doesn't
# forward COLORTERM by default. Locally, keep what the terminal sets.
if [[ -n "$SSH_CONNECTION" ]]; then
  infocmp "$TERM" >/dev/null 2>&1 || export TERM=xterm-256color
  export COLORTERM="${COLORTERM:-truecolor}"
fi

. $HOME/.bashrc

# Make sure the users bin directory will be searched in first place.
if [ -d $HOME/bin ]
then
    export PATH=$HOME/bin:$PATH
fi



[ -f "$HOME/.local/bin/env" ] && . "$HOME/.local/bin/env"

[ -f "$HOME/.cargo/env" ] && . "$HOME/.cargo/env"
