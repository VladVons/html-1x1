'''
VladVons, 2023.11.20
crop outer solid background from image
'''

from PIL import Image, ImageFilter

def crop_background_pil(input_path, output_path):


    image = Image.open(input_path)

    # Convert the image to grayscale
    grayscale_image = image.convert("L")

    # Apply GaussianBlur to reduce noise
    blurred_image = grayscale_image.filter(ImageFilter.GaussianBlur(radius=5))

    # Use color thresholding to create a binary mask of the background
    threshold_value = 200
    mask = blurred_image.point(lambda x: 255 if x > threshold_value else 0)

    # Invert the mask to get the foreground (object)
    foreground = Image.eval(mask, lambda x: 255 - x)

    # Find the bounding box of the object
    bounding_box = foreground.getbbox()

    # Crop the image to the bounding box
    cropped_result = image.crop(bounding_box)

    cropped_result.save(output_path)


input_image_path = 'img_in.jpg'
output_image_path = 'img_out.jpg'
crop_background_pil(input_image_path, output_image_path)
