"""Derive the Express logo variant set from the authentic vector artwork.

Source: the Express Employment Professionals lock-up published on
expressfranchising.com.au (eep-logo.svg), with the purple "FRANCHISE OPPORTUNITY"
line removed. Colours are normalised to the brand-guide hexes, and the four
approved colour treatments (3-blue / all deep blue / all black / all white) plus
the standalone stylised X are generated from that one source so they cannot drift.

Verified against Express's own eep-logo-3blues.jpg, eep-logo-black.jpg and
eep-logo-white.png: the mono treatments are a flat recolour, because the source
geometry already carries the waist separation in the stylised X.

    python3 scripts/build-logos.py

The PNGs in logo/png/ are rasterised from these SVGs at 1200px wide with a
transparent ground. ImageMagick cannot render the SVG masks correctly, so use a
browser:

    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
      --headless --disable-gpu --hide-scrollbars \
      --default-background-color=00000000 \
      --screenshot=logo/png/<name>.png --window-size=1200,<height> \
      file://<abs path to an html page holding the svg at width:1200px>
"""
import os
import xml.etree.ElementTree as ET
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "logo-source.svg"
OUT = HERE.parent / "logo" / "svg"

SVG = 'http://www.w3.org/2000/svg'
NS = '{%s}' % SVG
ET.register_namespace('', SVG)

LIGHT, MED, DEEP = '#0096D6', '#0077C0', '#005288'
SRC_MED, SRC_LIGHT = '#0076c0', '#0096d6'

# Measured from the rendered artwork at 10px per viewBox unit (Chrome).
VB_FULL = (0, 8.7, 174.8, 45.3)
VB_ICON = (20.2, 8.7, 45.8, 45.2)


def load():
    root = ET.parse(SOURCE).getroot()
    for el in root.iter():
        if el.get('fill') == SRC_MED:
            el.set('fill', MED)
        elif el.get('fill') == SRC_LIGHT:
            el.set('fill', LIGHT)
    return root


def strip_wordmark(root):
    """Leave only the stylised X: drop the deep-blue letterforms and their now-unused masks."""
    g = root.find(NS + 'g')
    for child in list(g):
        if child.tag == NS + 'g' or child.get('fill') == DEEP:
            g.remove(child)
    for m in root.findall(NS + 'mask'):
        root.remove(m)


def prefix_ids(root, token):
    """Namespace the mask ids so several of these can be inlined in one document."""
    for el in root.iter():
        if el.get('id'):
            el.set('id', token + el.get('id'))
        for attr in ('mask', 'fill', 'clip-path'):
            v = el.get(attr)
            if v and v.startswith('url(#'):
                el.set(attr, 'url(#' + token + v[5:])


def build(vb, label, token, colour=None, icon_only=False):
    root = load()
    if icon_only:
        strip_wordmark(root)
    prefix_ids(root, token)
    if colour:
        for el in root.iter():
            if el.get('fill') in (LIGHT, MED, DEEP):
                el.set('fill', colour)
    x, y, w, h = vb
    root.set('viewBox', '%g %g %g %g' % vb)
    root.set('width', '%g' % w)
    root.set('height', '%g' % h)
    root.set('role', 'img')
    root.set('aria-label', label)
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(root, encoding='unicode')


LOCKUP = 'Express Employment Professionals'
XMARK = 'Express Employment Professionals stylised X'

FILES = {
    'logo-primary-3blue.svg':     dict(vb=VB_FULL, label=LOCKUP, token='l3'),
    'logo-primary-deep-blue.svg': dict(vb=VB_FULL, label=LOCKUP, token='ld', colour=DEEP),
    'logo-primary-black.svg':     dict(vb=VB_FULL, label=LOCKUP, token='lk', colour='#000000'),
    'logo-primary-white.svg':     dict(vb=VB_FULL, label=LOCKUP, token='lw', colour='#FFFFFF'),
    'logo-icon-x-3blue.svg':      dict(vb=VB_ICON, label=XMARK, token='x3', icon_only=True),
    'logo-icon-x-deep-blue.svg':  dict(vb=VB_ICON, label=XMARK, token='xd', icon_only=True, colour=DEEP),
    'logo-icon-x-black.svg':      dict(vb=VB_ICON, label=XMARK, token='xk', icon_only=True, colour='#000000'),
    'logo-icon-x-white.svg':      dict(vb=VB_ICON, label=XMARK, token='xw', icon_only=True, colour='#FFFFFF'),
}

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for name, kw in FILES.items():
        (OUT / name).write_text(build(**kw), encoding='utf-8')
        print(OUT / name)
