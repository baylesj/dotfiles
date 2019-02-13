#!/usr/bin/env sh

rm -rf $HOME/.*.ml-orig

root=$(git rev-parse --show-toplevel)

for f in .[a-z]*; do
	if [[ $f == ".git" ]]; then
		continue
	fi

	rf="$root/$f"
	hf="$HOME/$f"
	mv $hf $hf.ml-orig

	if [[ -d $f ]]; then
		echo "Soft linking $rf to $hf..."
		ln -s $rf $hf
	else
		echo "Hard linking $rf to $hf..."
		ln $rf $hf
	fi
done

