#!/usr/bin/env python
import cgi
import os
import json

# Set the path to the directory where you want to store uploaded images
UPLOAD_DIR = 'uploads/'

# Create the 'uploads' directory if it doesn't exist
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Function to save the uploaded file
def save_file(file_item):
    filename = os.path.join(UPLOAD_DIR, file_item.filename)
    with open(filename, 'wb') as f:
        f.write(file_item.file.read())
    return filename

# Parse the form data
form = cgi.FieldStorage()

# Check if the 'image' field is present in the form data
if 'image' in form:
    try:
        # Get the file item from the form data
        image_file = form['image']

        # Save the uploaded image and get the file path
        image_path = save_file(image_file)

        # Respond with a JSON object containing the image URL
        response = {'success': 1, 'file': {'url': image_path}}
    except Exception as e:
        # If an error occurs, respond with an error message
        response = {'success': 0, 'error': str(e)}
else:
    # If the 'image' field is not present, respond with an error message
    response = {'success': 0, 'error': 'Image file not found in the form data'}

# Set the content type to JSON
print("Content-type: application/json\n")

# Print the JSON response
print(json.dumps(response))
