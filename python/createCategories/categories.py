import os
from os import path
import errno
import shutil

from PIL import Image

categories = ["all_names", "eggmons", "limited",
              "masterfairs", "pokefairs", "seasonals", "females", "males", "freebies", "six_only"]

no_categories = len(categories)

d = {}


def main():
    # initialize_dict()
    # in_dir = "../fetchImages/all_images_renamed/"
    # traverse_dir(in_dir)
    transfer_to_INFO_after_sorting("../../images/INFO/")
    # add_ex_names()


def transfer_to_INFO_after_sorting(in_dir) -> None:
    for category in categories:
        with open(f'{in_dir}{category}.txt', 'w') as fout:
            with open(f'{category}.txt', 'r') as fin:
                lines = sorted(fin.read().splitlines())  # maybe .strip()?
                l = len(lines)
                for line in lines:
                    # if it's the last line, don't put Enter '\n'
                    if line == lines[l-1]:
                        fout.write(line)
                    else:
                        fout.write(f'{line}\n')


def initialize_dict() -> None:
    for category in categories:
        d[category] = []
        lines = open(category + ".txt", 'r').read().splitlines()
        for line in lines:
            d[category].append(line)


def traverse_dir(in_dir: str) -> None:
    ex_path = "../fetchImages/ex_images/"
    for key in d:
        out_path = "../../images/" + str(key) + '/'
        delete_directory(out_path)
        create_directory(out_path)
    cnt = [0] * no_categories
    for img in sorted(os.listdir(in_dir)):
        img = img.split(".png")[0]
        for i, key in enumerate(d):
            # if key == "all_names" and "Main_Character" in img:
            #     continue
            if img in d[key]:
                out_path = "../../images/" + str(key) + '/'
                rgb_img = Image.open(in_dir + img + ".png")
                rgb_img.save(out_path + 'clr_' + img + ".png")
                ex_file_path = ex_path + img + "_EX.png"
                if (ex_exists(ex_file_path)):
                    # print(ex_file_path)
                    ex_img = Image.open(ex_file_path)
                    ex_img.save(out_path + 'ex_' + img + ".png")
                gray_img = fadeAlpha(rgb_img)
                # gray_img = greyscale_avg(rgb_img)
                # gray_img = Image.fromarray(np.uint8(cm.gist_earth(gray_img)*255))
                gray_img.save(out_path + 'bw_' + img + ".png")
                cnt[i] += 1


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


def ex_exists(in_path: str) -> bool:
    return path.isfile(in_path)


def add_ex_names() -> None:
    in_path = "../fetchImages/ex_images/"
    out_path = "ex_only.txt"
    f = open(out_path, 'w')
    for each in sorted(os.listdir(in_path)):
        f.write(each.split("_EX.png")[0])
        f.write('\n')
    f.close()


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
