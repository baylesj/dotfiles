#!/usr/bin/env bash

root=$(git rev-parse --show-toplevel)
cd "$root"

for f in .[a-z]* bin; do
	echo "Linking $f..."
	if [[ $f == ".git" ]]; then
		continue
	fi

	rf="$root/$f"
	hf="$HOME/$f"

	if [ -L "$hf" ] && [ "$(readlink "$hf")" == "$rf" ]; then
		echo "$f already linked correctly"
		continue
	fi

	# Backup existing file/directory
	if [ -e "$hf" ] || [ -L "$hf" ]; then
		echo "Backing up $hf to $hf~..."
		rm -rf "$hf~"
		if ! mv "$hf" "$hf~"; then
			echo "Error: Failed to move $hf to $hf~. Skipping $f."
			continue
		fi
	fi

	echo "Linking $f..."
	ln -s "$rf" "$hf"
done

# Link the Ghostty config directory (config.ghostty + themes/)
mkdir -p $HOME/.config
if [ -d "$HOME/.config/ghostty" ] && ! [ -L "$HOME/.config/ghostty" ]; then
	echo "Backing up $HOME/.config/ghostty to $HOME/.config/ghostty~..."
	rm -rf "$HOME/.config/ghostty~"
	mv "$HOME/.config/ghostty" "$HOME/.config/ghostty~"
fi
echo "Linking ghostty..."
ln -sfn $root/ghostty $HOME/.config/ghostty

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
	brew install fzf bat eza fd ripgrep git-delta nodejs shfmt
	brew install --cask ghostty

	# Fonts; see FONTS.md. font-sf-mono is omitted because its .pkg needs sudo.
	echo "Installing fonts with Homebrew..."
	brew install --cask \
		font-atkinson-hyperlegible font-atkinson-hyperlegible-next font-atkinson-hyperlegible-mono \
		font-fira-code font-jetbrains-mono font-cascadia-code font-monaspace font-iosevka \
		font-victor-mono font-maple-mono font-recursive font-lilex font-hasklig font-commit-mono \
		font-geist-mono font-intel-one-mono font-0xproto font-martian-mono font-ibm-plex-mono \
		font-source-code-pro font-hack font-meslo-lg font-ubuntu-mono font-inconsolata \
		font-roboto-mono font-red-hat-mono font-space-mono font-anonymous-pro font-mononoki \
		font-fantasque-sans-mono font-comic-mono font-symbols-only-nerd-font
elif [ -f /etc/debian_version ]; then
	echo "Installing packages with apt..."
	sudo apt update
	sudo apt install -y vim fzf bat fd-find ripgrep git-delta nodejs shfmt

	# Create symlinks for bat and fd
	if [ ! -f /usr/local/bin/fd ]; then
		sudo ln -s /usr/bin/fdfind /usr/local/bin/fd
	fi
	if [ ! -f /usr/local/bin/bat ]; then
		sudo ln -s /usr/bin/batcat /usr/local/bin/bat
	fi
else
	echo "Please install the following packages manually: vim, fzf, bat, eza, fd, ripgrep"
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

# Install/update vim plugins (vim-plug bootstraps itself from .vimrc)
echo "Installing vim plugins..."
vim -Es -u "$HOME/.vimrc" +'PlugUpdate --sync' +qa || true
