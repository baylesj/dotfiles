#
# ~/.bash_profile
#
. $HOME/.bashrc

# Make sure the users bin directory will be searched in first place.
if [ -d $HOME/bin ]
then
    export PATH=$HOME/bin:$PATH
fi


export PATH="$HOME/.cargo/bin:$PATH"

. "$HOME/.local/bin/env"

# Created by `pipx` on 2025-11-13 05:26:57
export PATH="$PATH:/Users/jophba/.local/bin"
