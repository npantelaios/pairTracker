import os
import psutil
from time import sleep

import numpy as np
import cv2
from PIL import Image, ImageDraw
from matplotlib import cm


def main() -> None:
    in_path = "images/initial_images_copied/"
    mc_distinguish(in_path)


def mc_distinguish(in_path: str) -> None:
    # TODO: makedir if not exists
    for i, img_path in enumerate(sorted(os.listdir(in_path))):
        rgb_img = open_img_path(in_path + img_path)
        # test image
        # test_image_by_showing(rgb_img)
        gray_img = greyscale_avg(rgb_img)
        gray_img = Image.fromarray(np.uint8(cm.gist_earth(gray_img)*255))
    # TODO: save greyscale images with bw_ + number and with clr_ + number
    # TODO: copy folders to ../images/all_both


def open_img_path(img_path: str) -> Image:
    return Image.open(img_path)


def test_image_by_showing(rgb_img: Image) -> None:
    rgb_img.show()
    sleep(2)
    # hide image
    for proc in psutil.process_iter():
        if proc.name() == "display":
            proc.kill()


def greyscale_avg(img: Image):
    img = np.array(img, copy=True)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    h = img.shape[0]
    w = img.shape[1]
    total_sum = 0
    for y in range(0, h):
        line_sum = 0
        for x in range(0, w):
            line_sum += img[y, x]
        total_sum += line_sum
    avg = total_sum//(w*h)
    # print(avg)
    T = avg
    for y in range(0, h):
        for x in range(0, w):
            # threshold the pixel
            img[y, x] = 0 if img[y, x] <= T else 255
    return img


def add_black_box(img: Image, w: int, h: int, paste_x: int, paste_y: int) -> Image:
    W, H = img.size
    img_box = Image.new('RGB', (w, h), color=(0, 0, 0))
    img.paste(img_box, (paste_x, paste_y))
    return img


def rgb2gray(rgb):
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    gray = 0.2989 * r + 0.5870 * g + 0.1140 * b
    return gray


if __name__ == "__main__":
    main()
