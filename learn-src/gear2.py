"""More gear drawings, same style as gear.py (which this re-runs first)."""
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gear.py')).read())
F = 'font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"'

def text(x, y, t, c='#d2d2d7', size=8, anchor='middle', weight=500):
    return f'<text x="{x}" y="{y}" fill="{c}" stroke="none" {F} font-size="{size}" font-weight="{weight}" text-anchor="{anchor}">{t}</text>'

# ---------- handheld recorder (XY mics on top) ----------
body = (f'<path d="M58 34 L64 10 L76 10 L80 30 Z" fill="{METAL2}"/><path d="M102 34 L96 10 L84 10 L80 30 Z" fill="{METAL2}"/>'
        f'<ellipse cx="70" cy="11" rx="7" ry="3" fill="{DIM}" stroke="none"/><ellipse cx="90" cy="11" rx="7" ry="3" fill="{DIM}" stroke="none"/>'
        f'<rect x="52" y="30" width="56" height="84" rx="9" fill="{METAL}"/>'
        f'<rect x="60" y="40" width="40" height="26" rx="3" fill="#0b2a1a"/>'
        + ''.join(f'<rect x="{64 + k * 4.2:.1f}" y="{60 - h}" width="3" height="{h}" fill="{c}" stroke="none"/>'
                  for k, (h, c) in enumerate([(6, '#30d158'), (9, '#30d158'), (12, '#30d158'), (14, '#30d158'), (16, '#ffd60a'), (17, '#ffd60a'), (10, '#30d158'), (7, '#30d158')]))
        + f'<circle cx="80" cy="84" r="9" fill="{METAL2}"/><circle cx="80" cy="84" r="3" fill="#ff453a" stroke="none"/>'
        f'<rect x="62" y="100" width="10" height="5" rx="2" fill="{METAL2}"/><rect x="88" y="100" width="10" height="5" rx="2" fill="{METAL2}"/>'
        f'<circle cx="112" cy="58" r="5" fill="{METAL2}"/>' + text(124, 60, 'level', DIM, 7, 'start'))
svg('recorder', 'A handheld audio recorder with two microphones on top', body)

# ---------- USB audio interface with gain knobs ----------
def knob(cx, cy, ang):
    a = math.radians(ang)
    return (f'<circle cx="{cx}" cy="{cy}" r="11" fill="{METAL2}"/>'
            f'<line x1="{cx}" y1="{cy}" x2="{cx + 8 * math.sin(a):.1f}" y2="{cy - 8 * math.cos(a):.1f}" stroke="#fff" stroke-width="2"/>'
            f'<circle cx="{cx}" cy="{cy}" r="14.5" stroke="#30d158" stroke-width="1.6" stroke-dasharray="3 2"/>')
body = (f'<path d="M14 46 L146 46 L140 92 L20 92 Z" fill="{METAL}"/>'
        + knob(46, 66, -40) + knob(82, 66, 30)
        + f'<circle cx="118" cy="66" r="13" fill="{METAL2}"/><line x1="118" y1="66" x2="118" y2="56" stroke="#fff" stroke-width="2"/>'
        + text(46, 89, 'GAIN 1', DIM, 7) + text(82, 89, 'GAIN 2', DIM, 7) + text(118, 89, 'VOLUME', DIM, 7)
        + '<path d="M4 34 C20 30 26 40 30 46" stroke="#8e8e93" stroke-width="2.4"/>')
svg('interface', 'A USB audio interface with gain knobs', body)

# ---------- lav mic ----------
body = ('<path d="M96 30 C120 50 128 80 112 112" stroke="#636366" stroke-width="2"/>'
        f'<rect x="58" y="34" width="22" height="34" rx="11" fill="{METAL}" transform="rotate(-28 69 51)"/>'
        f'<rect x="56" y="30" width="24" height="18" rx="9" fill="#48484a" stroke="{DIM}" transform="rotate(-28 69 51)"/>'
        f'<path d="M78 62 L96 30" stroke="{DIM}" stroke-width="3"/>'
        f'<rect x="84" y="56" width="26" height="10" rx="2" fill="{METAL2}" transform="rotate(-28 97 61)"/>'
        f'<rect x="28" y="88" width="34" height="24" rx="5" fill="{METAL}"/>' + text(45, 104, 'TX', DIM, 8))
svg('lav-mic', 'A small clip-on lavalier microphone', body)

# ---------- shotgun mic on a camera ----------
body = (f'<rect x="20" y="40" width="118" height="14" rx="7" fill="{METAL}"/>'
        + ''.join(f'<line x1="{x}" y1="43" x2="{x}" y2="51" stroke="{DIM}" stroke-width="1"/>' for x in range(30, 96, 6))
        + f'<rect x="20" y="40" width="20" height="14" rx="7" fill="#48484a"/>'
        f'<path d="M70 54 L70 66 M100 54 L100 66" stroke="{DIM}" stroke-width="2"/>'
        f'<path d="M60 66 H112 V72 H60 Z" fill="{METAL2}"/>'
        f'<rect x="44" y="72" width="88" height="40" rx="6" fill="{METAL}"/>'
        f'<circle cx="64" cy="92" r="14" fill="{METAL2}"/><circle cx="64" cy="92" r="7" fill="#1c3a5e" stroke="none"/>')
svg('shotgun-mic', 'A shotgun microphone mounted on top of a camera', body)

# ---------- phone (camera app) ----------
body = (f'<rect x="54" y="6" width="56" height="108" rx="11" fill="{METAL}"/>'
        f'<rect x="58" y="16" width="48" height="86" rx="4" fill="#0e0e0e"/>'
        f'<circle cx="82" cy="54" r="15" fill="none" stroke="#ffd60a" stroke-width="1.4"/>'
        f'<rect x="62" y="20" width="40" height="7" rx="2" fill="#1d1d1f" stroke="none"/>'
        + text(82, 25.5, 'f/1.8  1/50  ISO 100', '#ffd60a', 4.6)
        + f'<circle cx="82" cy="94" r="5" fill="#fff" stroke="none"/>')
svg('phone', 'A phone camera app', body)

# ---------- prime lens ----------
body = (f'<ellipse cx="44" cy="60" rx="14" ry="38" fill="{METAL2}"/>'
        f'<path d="M44 22 L116 26 L116 94 L44 98 Z" fill="{METAL}"/>'
        + ''.join(f'<line x1="{x}" y1="{25 + (x - 44) * .055:.1f}" x2="{x}" y2="{95 - (x - 44) * .055:.1f}" stroke="{DIM}" stroke-width=".8"/>' for x in range(70, 96, 3))
        + f'<ellipse cx="116" cy="60" rx="12" ry="34" fill="{METAL2}"/>'
        f'<ellipse cx="44" cy="60" rx="11" ry="31" fill="#1c3a5e"/><ellipse cx="41" cy="50" rx="3" ry="8" fill="#9fc3ff" stroke="none" opacity=".6"/>'
        + text(80, 112, '50mm  f/1.8', DIM, 8))
svg('prime-lens', 'A 50mm f/1.8 prime lens', body)

# ---------- mirrorless camera ----------
body = (f'<path d="M22 36 H58 L64 26 H96 L102 36 H138 V100 H22 Z" fill="{METAL}"/>'
        f'<rect x="22" y="36" width="20" height="64" rx="4" fill="{METAL2}"/>'
        f'<circle cx="80" cy="68" r="27" fill="{METAL2}"/><circle cx="80" cy="68" r="20" fill="#1c3a5e"/>'
        f'<ellipse cx="74" cy="60" rx="5" ry="7" fill="#9fc3ff" stroke="none" opacity=".5"/>'
        f'<circle cx="122" cy="30" r="6" fill="{METAL2}"/>' + text(122, 20, 'A / Av', '#ffd60a', 7))
svg('camera', 'A camera with interchangeable lenses', body)

# ---------- iris at three f-stops ----------
def iris(cx, cy, open_r, label):
    blades = 8
    pts = []
    for k in range(blades):
        a = 2 * math.pi * k / blades + .2
        pts.append((cx + open_r * math.cos(a), cy + open_r * math.sin(a)))
    hole = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return (f'<circle cx="{cx}" cy="{cy}" r="44" fill="{METAL}" stroke="{DIM}" stroke-width="3"/>'
            f'<circle cx="{cx}" cy="{cy}" r="38" fill="#3a3a3c" stroke="none"/>'
            + ''.join(f'<line x1="{cx}" y1="{cy}" x2="{cx + 38 * math.cos(2 * math.pi * k / blades + .6):.1f}" y2="{cy + 38 * math.sin(2 * math.pi * k / blades + .6):.1f}" stroke="#48484a" stroke-width="1"/>' for k in range(blades))
            + f'<polygon points="{hole}" fill="url(#warm)" stroke="none"/>'
            + text(cx, cy + 64, label, '#f5f5f7', 13, 'middle', 600))
s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" width="360" height="140" role="img" aria-label="The lens opening at f/1.8, f/5.6 and f/16: wide open, middle, and tiny.">'
     f'<title>The iris at f/1.8, f/5.6 and f/16</title>{DEFS}<g fill="none" stroke="{LINE}" stroke-width="1.6">'
     + iris(60, 56, 33, 'f/1.8') + iris(180, 56, 17, 'f/5.6') + iris(300, 56, 6, 'f/16') + '</g></svg>')
open(f'{OUT}/iris-stops.svg', 'w').write(s)

# ---------- annotated meter ----------
def x_of(db):  # -48..0 dBFS across 30..330
    return 30 + (db + 48) / 48 * 300
m = (f'<rect x="30" y="34" width="300" height="22" rx="4" fill="#1d1d1f" stroke="#48484a"/>'
     f'<rect x="30" y="34" width="{x_of(-12) - 30:.1f}" height="22" rx="4" fill="#2c4a35" stroke="none"/>'
     f'<rect x="{x_of(-12):.1f}" y="34" width="{x_of(-6) - x_of(-12):.1f}" height="22" fill="#30d158" stroke="none"/>'
     f'<rect x="{x_of(-6):.1f}" y="34" width="{x_of(-.6) - x_of(-6):.1f}" height="22" fill="#ffd60a" stroke="none"/>'
     f'<rect x="{x_of(-.6):.1f}" y="34" width="{330 - x_of(-.6):.1f}" height="22" fill="#ff453a" stroke="none"/>'
     + ''.join(f'<line x1="{x_of(d):.1f}" y1="58" x2="{x_of(d):.1f}" y2="64" stroke="#8e8e93"/>' + text(x_of(d), 76, str(d), '#8e8e93', 10) for d in [-48, -36, -24, -18, -12, -6, 0])
     + text(x_of(-9), 14, 'Aim here', '#30d158', 11, 'middle', 600)
     + f'<path d="M{x_of(-12):.1f} 31 V20 H{x_of(-6):.1f} V31" stroke="#30d158" stroke-width="1.2"/>'
     + text(x_of(-30), 26, 'Too quiet', '#8e8e93', 11)
     + text(x_of(0) - 2, 26, 'Clip', '#ff453a', 11, 'end', 600)
     + text(180, 100, 'dBFS: decibels below the ceiling', '#8e8e93', 10))
s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 110" width="360" height="110" role="img" aria-label="A level meter from -48 to 0 dBFS. Aim for peaks between -12 and -6. Zero is clipping.">'
     f'<title>Reading a level meter</title><g fill="none">{m}</g></svg>')
open(f'{OUT}/meter.svg', 'w').write(s)

# ---------- mic distance ----------
def head(x, y):
    return (f'<circle cx="{x}" cy="{y}" r="16" fill="#48484a" stroke="none"/><path d="M{x+15} {y-2} l6 4 l-6 3" fill="#48484a" stroke="none"/>')
def mic(x, y):
    return f'<rect x="{x}" y="{y-5}" width="26" height="10" rx="5" fill="{METAL2}" stroke="{DIM}"/><rect x="{x-6}" y="{y-6}" width="9" height="12" rx="4" fill="#636366" stroke="none"/>'
s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" width="360" height="150" role="img" aria-label="Close mic: strong voice, quiet room. Far mic: weak voice, loud room.">'
     f'<title>Mic distance</title><g fill="none">'
     + head(40, 40) + mic(72, 42) + text(36, 72, 'Close', '#30d158', 11, 'start', 600)
     + '<path d="M104 42 H130" stroke="#30d158" stroke-width="5"/><path d="M104 32 H118" stroke="#636366" stroke-width="2"/>'
     + text(140, 36, 'voice', '#30d158', 10, 'start') + text(140, 48, 'room', '#8e8e93', 10, 'start')
     + head(40, 112) + mic(156, 114) + text(36, 144, 'Far', '#ff9f0a', 11, 'start', 600)
     + '<path d="M188 114 H198" stroke="#30d158" stroke-width="2"/><path d="M188 104 H214" stroke="#8e8e93" stroke-width="5"/>'
     + text(222, 108, 'room', '#8e8e93', 10, 'start') + text(222, 120, 'voice', '#30d158', 10, 'start')
     + '</g></svg>')
open(f'{OUT}/mic-distance.svg', 'w').write(s)
print('done')
