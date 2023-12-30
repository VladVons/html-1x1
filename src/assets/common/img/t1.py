import os

def list_files_and_directories():
    current_directory = os.getcwd()
    items = os.listdir(current_directory)

    # Sort folders first, then files
    items.sort(key=lambda x: (os.path.isdir(x), x))

    print(f"Contents of {current_directory}:")

    for item in items:
        item_path = os.path.join(current_directory, item)
        item_type = "File" if os.path.isfile(item_path) else "Directory" if os.path.isdir(item_path) else "Unknown"
        print(f"{item} - {item_type}")

if __name__ == "__main__":
    list_files_and_directories()
