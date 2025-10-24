#!/usr/bin/env bash

rm -rf $HOME/.*.ml-orig

root=$(git rev-parse --show-toplevel)

for f in .[a-z]* bin; do
	echo "Linking $f..."
	if [[ $f == ".git" ]]; then
		continue
	fi

	rf="$root/$f"
	hf="$HOME/$f"
	mv $hf $hf.ml-orig

	ln -f -s $rf $hf
done

if [ -d "$HOME/.oh-my-zsh" ]; then
	echo "Updating oh my zsh..."
	pushd $HOME/.oh-my-zsh
	git pull
	popd
else
	echo "Installing oh-my-zsh..."
	git clone https://github.com/ohmyzsh/ohmyzsh.git $HOME/.oh-my-zsh
fi

# Install/Update Powerlevel10k
P10K_DIR="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
if [ -d "$P10K_DIR" ]; then
    echo "Updating Powerlevel10k..."
    pushd $P10K_DIR
    git pull
    popd
else
    echo "Installing Powerlevel10k..."
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $P10K_DIR
fi

# Install fzf
if ! [ -x "$(command -v fzf)" ]; then
    echo "Installing fzf..."
    if [[ "$(uname)" == "Darwin" ]]; then
        if ! [ -x "$(command -v brew)" ]; then
            echo "Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install fzf
    else
        if [ -f /etc/debian_version ]; then
            sudo apt-get update
            sudo apt-get install -y fzf
        else
            git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
            ~/.fzf/install --all
        fi
    fi
fi

# Install zsh plugins
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"

# zsh-autosuggestions
if [ ! -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ]; then
    echo "Installing zsh-autosuggestions..."
    git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
fi

# zsh-syntax-highlighting
if [ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]; then
    echo "Installing zsh-syntax-highlighting..."
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
fi