#!/usr/bin/env sh

echo "merging main into all local branches..."
for branch in $(git branch --format '%(refname:short)'); do
    if [[ "$branch" != "main" ]]; then
        git checkout "$branch"
        git merge main
    fi
done
git checkout main
