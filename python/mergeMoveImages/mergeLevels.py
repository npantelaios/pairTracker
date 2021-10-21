import os
import errno
from time import sleep
import shutil
import psutil

from PIL import Image


def main() -> None:
    # in_path = "images/initial_images_copied/"
    in_path = "images/"
    merge(in_path)


def merge(in_path: str) -> None:
    out_path = "../../images/moveLevels/"
    delete_directory(out_path)
    create_directory(out_path)
    img_list = []
    for img_path in sorted(os.listdir(in_path)):
        rgb_img = open_img_path(in_path + img_path)
        gray_img = fadeAlpha(rgb_img)
        img_list.append(gray_img)
    merged_img = merge_images(img_list)
    merged_img.save(out_path + 'a0.png')
    for i, img_path in enumerate(sorted(os.listdir(in_path))):
        rgb_img = open_img_path(in_path + img_path)
        new_list = img_list.copy()
        new_list[i] = rgb_img
        merged_img = merge_images(new_list)
        merged_img.save(out_path + 'a' + str(i+1) + ".png")


def merge_images(img_list: list) -> Image:
    image1 = img_list[0]
    i = 1
    while i < len(img_list):
        image2 = img_list[i]
        image1 = merge2images(image1, image2)
        i += 1
    return image1


def merge2images(image1: Image, image2: Image) -> Image:
    # resize, first image
    # image1 = image1.resize((426, 240))
    image1_size = image1.size
    image2_size = image2.size
    new_image = Image.new(
        'RGBA', (image1_size[0]+image2_size[0], image1_size[1]))
    new_image.paste(image1, (0, 0))
    new_image.paste(image2, (image1_size[0], 0))
    return new_image


def fadeAlpha(im2: Image):
    im = im2.copy()
    im.putalpha(255)
    width, height = im.size
    pixels = im.load()
    fade255 = 50
    # for y in range(int(height*.55), int(height*.75)):
    for y in range(height):
        # alpha = 255-int((y - height*.55)/height/.20 * 255)
        for x in range(width):
            pixels[x, y] = pixels[x, y][:3] + (fade255,)
    for y in range(y, height):
        for x in range(width):
            pixels[x, y] = pixels[x, y][:3] + (fade255,)
    return im


def open_img_path(img_path: str) -> Image:
    return Image.open(img_path)


def test_image_by_showing(rgb_img: Image) -> None:
    rgb_img.show()
    sleep(2)
    # hide image
    for proc in psutil.process_iter():
        if proc.name() == "display":
            proc.kill()


def delete_directory(out_path: str) -> None:
    try:
        shutil.rmtree(out_path)
    except OSError as e:
        print("Error: %s : %s" % (out_path, e.strerror))


def create_directory(out_path: str) -> None:
    try:
        os.makedirs(out_path)
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise


if __name__ == "__main__":
    main()
