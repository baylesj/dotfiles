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
	git clone https://github.com/robbyrussell/oh-my-zsh.git $HOME/.oh-my-zsh
fi

