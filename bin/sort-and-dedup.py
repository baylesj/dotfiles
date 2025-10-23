#!/usr/bin/env python3

def sort_and_deduplicate_file(input_filepath, output_filepath="sorted_unique_lines.txt"):
    """
    Reads a text file, sorts its lines alphabetically, removes duplicate lines,
    and indicates which lines were duplicated.

    Args:
        input_filepath (str): The path to the input text file.
        output_filepath (str): The path to the output text file where
                                 sorted unique lines will be saved.
                                 Defaults to "sorted_unique_lines.txt".
    """
    try:
        with open(input_filepath, 'r') as f_in:
            lines = [line.strip() for line in f_in]
    except FileNotFoundError:
        print(f"Error: Input file '{input_filepath}' not found.")
        return
    except Exception as e:
        print(f"An error occurred while reading the file: {e}")
        return

    if not lines:
        print(f"The input file '{input_filepath}' is empty or contains only whitespace.")
        if output_filepath:
            try:
                with open(output_filepath, 'w') as f_out:
                    pass # Create an empty output file
                print(f"Empty output file '{output_filepath}' created.")
            except Exception as e:
                print(f"An error occurred while creating the empty output file: {e}")
        return

    print(f"--- Processing file: {input_filepath} ---")

    seen_lines = set()
    unique_lines = []
    duplicated_lines_found = set()

    print("\n--- Checking for Duplicates ---")
    for i, line in enumerate(lines):
        if line in seen_lines:
            if line not in duplicated_lines_found: # Print only the first time a duplicate is identified
                print(f"Duplicate found: '{line}'")
                duplicated_lines_found.add(line)
        else:
            seen_lines.add(line)
            unique_lines.append(line)

    if not duplicated_lines_found:
        print("No duplicate lines found.")

    # Sort the unique lines alphabetically
    sorted_unique_lines = sorted(unique_lines)

    print("\n--- Sorted Unique Lines ---")
    for line in sorted_unique_lines:
        print(line)

    if output_filepath:
        try:
            with open(output_filepath, 'w') as f_out:
                for line in sorted_unique_lines:
                    f_out.write(line + '\n')
            print(f"\n--- Output ---")
            print(f"Sorted unique lines have been saved to: {output_filepath}")
        except Exception as e:
            print(f"\nAn error occurred while writing to the output file: {e}")

if __name__ == "__main__":
    # Get input file path from the user
    input_file = input("Enter the path to the input text file: ")

    # Optional: Get output file path from the user
    output_file_choice = input("Enter the path for the output file (or press Enter for default 'sorted_unique_lines.txt'): ").strip()
    if output_file_choice:
        output_file = output_file_choice
    else:
        output_file = "sorted_unique_lines.txt"

    sort_and_deduplicate_file(input_file, output_file)

    # Example of how to create a dummy input file for testing:
    # with open("sample_input.txt", "w") as f:
    #     f.write("banana\n")
    #     f.write("apple\n")
    #     f.write("orange\n")
    #     f.write("apple\n")
    #     f.write("grape\n")
    #     f.write("Banana\n") # Case sensitive, will be treated as different from 'banana'
    #     f.write("apple\n")
    #     f.write("   leading and trailing spaces   \n")
    #     f.write("leading and trailing spaces\n")

    # To run with the sample:
    # sort_and_deduplicate_file("sample_input.txt", "sorted_sample_output.txt")