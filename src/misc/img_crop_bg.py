'''
VladVons, 2023.11.20
crop outer solid background from image
'''

import os
import re
from PIL import Image, ImageFilter


def ImgResize(aImg, aMaxSize: int = 1024) -> object:
    Width, Height = aImg.size
    MaxSize = max(Width, Height)
    if (MaxSize > aMaxSize):
        Ratio = aMaxSize / MaxSize
        NewWidth = int(Width * Ratio)
        NewHeight = int(Height * Ratio)
        aImg = aImg.resize((NewWidth, NewHeight))
    return aImg

def ImgCropBg(aImg) -> object:
    grayscale_image = aImg.convert("L")
    blurred_image = grayscale_image.filter(ImageFilter.GaussianBlur(radius=5))
    threshold_value = 200
    mask = blurred_image.point(lambda x: 255 if x > threshold_value else 0)
    foreground = Image.eval(mask, lambda x: 255 - x)
    bounding_box = foreground.getbbox()
    return aImg.crop(bounding_box)

def DirWalk(aPath: str, aMask: str = '.*', aType: str = 'f', aDepthMax: int = 99) -> iter:
    def Recurs(aPath: str, aDepth: int) -> iter:
        for File in sorted(os.listdir(aPath)):
            Path = aPath + '/' + File
            Type = 'd' if (os.path.isdir(Path)) else 'f'
            if (Type == 'd') and (aDepth < aDepthMax) and (not os.path.islink(Path)):
                yield from Recurs(Path, aDepth + 1)

            if (Type in aType) and ((aMask == '.*') or (re.search(aMask, File))):
                yield (Path, Type, aDepth)
    yield from Recurs(aPath, 0)


def Optimize(aDirIn: str, aDirOut: str, aMaxDim: int = 1024, aQuality: int = 75):
    for Idx, (PathIn, _Type, _aDepth) in enumerate(DirWalk(DirIn, '.jpg$')):
        print(Idx+1, PathIn)
        Dir, File = PathIn.rsplit('/', maxsplit=1)
        Dir = DirOut + Dir.replace(DirIn, '')
        os.makedirs(Dir, exist_ok=True)
        PathOut = f'{Dir}/{File}'

        Img = Image.open(PathIn)
        Img = ImgCropBg(Img)
        Img = ImgResize(Img, aMaxDim)
        Img.save(PathOut, quality = aQuality)


DirIn = '/home/vladvons/Projects/py/temp/03/2/taceci'
DirOut = '/home/vladvons/Projects/py/temp/img_opt'
Optimize(DirIn, DirOut, 800, 60)
