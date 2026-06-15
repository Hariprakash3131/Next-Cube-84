import sys
import os
sys.path.insert(0, r"C:\Users\Admin\AppData\Local\Programs\Python\Python311\Lib\site-packages")

from rembg import remove
from PIL import Image
import io

pub = os.path.join(os.path.dirname(__file__), "public")
out = os.path.join(pub, "nobg")
os.makedirs(out, exist_ok=True)

files = [
    "eleven.png",
    "mike wheeler.png",
    "will buyers.png",
    "nancy.png",
    "dustin.png",
    "Lucas.png",
    "max mayfield.png",
    "steve harington.png",
]

for f in files:
    src = os.path.join(pub, f)
    dst = os.path.join(out, f)
    if os.path.exists(dst):
        print(f"skip {f}")
        continue
    print(f"processing {f} ...")
    with open(src, "rb") as fh:
        data = fh.read()
    result = remove(data)
    with open(dst, "wb") as fh:
        fh.write(result)
    print(f"  saved -> nobg/{f}")

print("done")
