#!/usr/bin/env bash

rm -rf $HOME/.*~

root=$(git rev-parse --show-toplevel)

for f in .[a-z]* bin; do
    echo "Linking $f..."
    if [[ $f == ".git" ]]; then
        continue
    fi

    rf="$root/$f"
    hf="$HOME/$f"
    mv $hf $hf~

    ln -f -s $rf $hf
done

# Create kitty config directory
mkdir -p $HOME/.config/kitty

# Link kitty.conf
echo "Linking kitty.conf..."
ln -f -s $root/kitty.conf $HOME/.config/kitty/kitty.conf

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

# Install packages
if [[ "$(uname)" == "Darwin" ]]; then
    if ! [ -x "$(command -v brew)" ]; then
        echo "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    echo "Installing packages with Homebrew..."
    brew install kitty fzf bat eza fd ripgrep git-delta node
elif [ -f /etc/debian_version ]; then
    echo "Installing packages with apt..."
    sudo apt-get update
    sudo apt-get install -y kitty fzf bat fd-find ripgrep git-delta node

    # Create symlinks for bat and fd
    if [ ! -f /usr/local/bin/fd ]; then
        sudo ln -s /usr/bin/fdfind /usr/local/bin/fd
    fi
    if [ ! -f /usr/local/bin/bat ]; then
        sudo ln -s /usr/bin/batcat /usr/local/bin/bat
    fi
else
    echo "Please install the following packages manually: kitty, fzf, bat, eza, fd, ripgrep"
    if ! [ -x "$(command -v fzf)" ]; then
        echo "Installing fzf from git..."
        git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
        ~/.fzf/install --all
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
