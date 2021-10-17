import os
import io
import errno
import shutil

import requests
from bs4 import BeautifulSoup
from PIL import Image


def main() -> None:
    # url = "https://tiermaker.com/create/pokemon-masters-by-sages-1132341"
    in_path = "test.html"
    fetchImages(in_path)


def fetchImages(in_path: str) -> None:
    out_dir = "all_images_initial/"
    delete_directory(out_dir)
    create_directory(out_dir)
    html = open(in_path, 'r').read()
    soup = BeautifulSoup(html, 'html.parser')
    myimages = soup.find_all("div", {"class": "character"})
    print(len(myimages))
    prefix = "https://tiermaker.com"
    cnt = 0
    for each in myimages:
        each = str(each)
        each = each.split("url(\"")[1]
        each = each.split("\");")[0]
        output_str = each.split('/')[-1]
        r = requests.get(prefix + each)
        image = Image.open(io.BytesIO(r.content))
        image.save(out_dir + output_str)
        cnt += 1


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
