#!/bin/bash

# A script to find directories containing only one of two specified files.

# --- Usage ---
# ./find_exclusive_files.sh <file1> <file2>
#
# --- Example ---
# ./find_exclusive_files.sh README.md LICENSE

# Check for the correct number of arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <file1> <file2>"
    exit 1
fi

FILE1="$1"
FILE2="$2"

# Initialize arrays and counter
declare -a only_file1_dirs
declare -a only_file2_dirs
both_count=0
processed_dirs=0

# Use find to iterate over all directories starting from the current one.
# The -d option for `read` prevents it from mangling backslashes.
# The `|| [[ -n "$dir" ]]` handles the case where the last line doesn't have a newline.
# Process substitution `< <(find ...)` is used to avoid running the loop in a subshell,
# which would prevent variables from being modified.
while read -r dir || [[ -n "$dir" ]]; do
    ((processed_dirs++))
    # Check for the presence of the files in the current directory
    has_file1=false
    has_file2=false
    if [ -f "$dir/$FILE1" ]; then
        has_file1=true
    fi
    if [ -f "$dir/$FILE2" ]; then
        has_file2=true
    fi

    # Categorize the directory based on which files it contains
    if [ "$has_file1" = true ] && [ "$has_file2" = true ]; then
        ((both_count++))
    elif [ "$has_file1" = true ]; then
        only_file1_dirs+=("$dir")
    elif [ "$has_file2" = true ]; then
        only_file2_dirs+=("$dir")
    fi
done < <(find . -type d)

# --- Output Results ---

echo ""
echo "Directories with only '$FILE1':"
if [ ${#only_file1_dirs[@]} -eq 0 ]; then
    echo "  (None)"
else
    printf "  %s\n" "${only_file1_dirs[@]}"
fi

echo ""
echo "Directories with only '$FILE2':"
if [ ${#only_file2_dirs[@]} -eq 0 ]; then
    echo "  (None)"
else
    printf "  %s\n" "${only_file2_dirs[@]}"
fi

echo ""
echo "--- Summary ---"
echo "Found ${#only_file1_dirs[@]} director(y/ies) with only '$FILE1'."
echo "Found ${#only_file2_dirs[@]} director(y/ies) with only '$FILE2'."
echo "Found $both_count director(y/ies) with both files."
echo "Searched a total of $processed_dirs directories."
echo ""
