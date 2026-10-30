"""Draw the lighting-gear illustrations for learn/media/gear/.
One style for all of them: light grey line work, dark metal, glowing
surfaces. 160x120 canvas, transparent, meant for the dark Midnight cards.
Run again to regenerate; edit shapes here, not in the .svg files."""
import os, math
ROOT = __import__('os').path.dirname(__import__('os').path.dirname(__import__('os').path.abspath(__file__)))
OUT = ROOT + '/learn/media/gear'
os.makedirs(OUT, exist_ok=True)

LINE = '#d2d2d7'; METAL = '#2c2c2e'; METAL2 = '#3a3a3c'; DIM = '#8e8e93'
DEFS = '''<defs>
<radialGradient id="warm" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#fffaf0"/><stop offset=".6" stop-color="#ffe9c2"/><stop offset="1" stop-color="#f3c983"/></radialGradient>
<radialGradient id="cool" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfe3ff"/></radialGradient>
<radialGradient id="halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd98a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
<radialGradient id="haloC" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#dcebff" stop-opacity=".45"/><stop offset="1" stop-color="#dcebff" stop-opacity="0"/></radialGradient>
<linearGradient id="board" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d9de"/></linearGradient>
<linearGradient id="disc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e9e9ee"/><stop offset="1" stop-color="#bdbdc4"/></linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eaf3ff" stop-opacity=".35"/><stop offset="1" stop-color="#eaf3ff" stop-opacity="0"/></linearGradient>
<marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="context-stroke"/></marker>
<marker id="ahY" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#ffd60a"/></marker>
<marker id="ahW" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#f5f5f7"/></marker>
</defs>'''

def svg(name, title, body):
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" role="img" aria-label="{title}">'
         f'<title>{title}</title>{DEFS}'
         f'<g fill="none" stroke="{LINE}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">{body}</g></svg>')
    open(f'{OUT}/{name}.svg', 'w').write(s)

def stand(x, top, spread=20, foot=114):
    return (f'<line x1="{x}" y1="{top}" x2="{x}" y2="{foot-6}"/>'
            f'<line x1="{x}" y1="{foot-12}" x2="{x-spread}" y2="{foot}"/>'
            f'<line x1="{x}" y1="{foot-12}" x2="{x+spread}" y2="{foot}"/>'
            f'<line x1="{x}" y1="{foot-12}" x2="{x+4}" y2="{foot+2}"/>'
            f'<rect x="{x-3}" y="{top+10}" width="6" height="5" rx="1" fill="{METAL2}"/>')

def bilerp(q, u, v):
    (x0, y0), (x1, y1), (x2, y2), (x3, y3) = q  # TL, TR, BR, BL
    tx, ty = x0 + (x1 - x0) * u, y0 + (y1 - y0) * u
    bx, by = x3 + (x2 - x3) * u, y3 + (y2 - y3) * u
    return tx + (bx - tx) * v, ty + (by - ty) * v

def poly(pts, **a):
    attrs = ' '.join(f'{k.replace("_","-")}="{v}"' for k, v in a.items())
    return f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" {attrs}/>'

# ---------- softbox ----------
face = [(26, 10), (86, 22), (86, 78), (26, 92)]
inner = [bilerp(face, u, v) for u, v in [(.07, .07), (.93, .07), (.93, .93), (.07, .93)]]
body = (f'<ellipse cx="56" cy="51" rx="52" ry="50" fill="url(#halo)" stroke="none"/>'
        + poly([(86, 22), (122, 44), (122, 58), (86, 78)], fill=METAL)
        + poly([(26, 10), (86, 22), (122, 44)], fill=METAL2, stroke='none')
        + poly(face, fill='url(#warm)')
        + poly(inner, stroke='#e9c98f', stroke_width='1')
        + f'<rect x="120" y="42" width="9" height="18" rx="2" fill="{METAL2}"/>'
        + stand(125, 60))
svg('softbox', 'A softbox on a light stand', body)

# ---------- LED panel ----------
pf = [(36, 20), (102, 30), (102, 70), (36, 80)]
dots = ''.join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="1.9" fill="#fffaf0" stroke="none"/>'
               for i in range(9) for j in range(6)
               for x, y in [bilerp(pf, .08 + i * .105, .12 + j * .152)])
body = (f'<ellipse cx="69" cy="50" rx="50" ry="40" fill="url(#halo)" stroke="none"/>'
        + poly([(102, 30), (108, 33), (108, 68), (102, 70)], fill=METAL)
        + poly(pf, fill='#f3dcb0', stroke=LINE)
        + dots
        + f'<path d="M36 50 H28 V90 H108 V52 H108" />'
        + stand(68, 90, spread=18))
svg('led-panel', 'An LED panel on a stand', body)

# ---------- window ----------
body = (f'<polygon points="34,86 96,86 158,120 0,120" fill="url(#beam)" stroke="none"/>'
        f'<rect x="28" y="8" width="74" height="78" rx="2" fill="url(#cool)"/>'
        f'<ellipse cx="65" cy="46" rx="56" ry="50" fill="url(#haloC)" stroke="none"/>'
        f'<rect x="28" y="8" width="74" height="78" rx="2" stroke-width="3" stroke="{DIM}"/>'
        f'<line x1="65" y1="8" x2="65" y2="86" stroke-width="2.5" stroke="{DIM}"/>'
        f'<line x1="28" y1="47" x2="102" y2="47" stroke-width="2.5" stroke="{DIM}"/>'
        f'<line x1="22" y1="88" x2="108" y2="88" stroke-width="3"/>'
        f'<path d="M110 4 C116 30 106 60 114 96 L132 96 C126 64 136 30 128 4 Z" fill="{METAL2}"/>'
        f'<line x1="104" y1="4" x2="140" y2="4" stroke-width="2"/>')
svg('window', 'A window letting daylight in', body)

# ---------- white foam board ----------
bd = [(70, 10), (122, 18), (122, 88), (70, 98)]
body = (poly(bd, fill='url(#board)', stroke='#bdbdc4')
        + f'<rect x="92" y="88" width="8" height="10" rx="1.5" fill="{METAL2}"/>'
        + stand(96, 98, spread=16, foot=116)
        + '<line x1="8" y1="18" x2="84" y2="44" stroke="#ffd60a" stroke-width="2" marker-end="url(#ahY)"/>'
        + '<line x1="82" y1="58" x2="14" y2="84" stroke="#f5f5f7" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#ahW)"/>')
svg('foam-board', 'A white foam board bouncing light back', body)

# ---------- reflector ----------
body = (f'<ellipse cx="88" cy="56" rx="38" ry="46" fill="url(#disc)" stroke="{DIM}" stroke-width="4"/>'
        f'<ellipse cx="88" cy="56" rx="30" ry="37" stroke="#cfcfd4" stroke-width=".8"/>'
        f'<path d="M66 30 Q80 20 98 24" stroke="#ffffff" stroke-width="3" opacity=".8"/>'
        '<line x1="6" y1="14" x2="62" y2="40" stroke="#ffd60a" stroke-width="2" marker-end="url(#ahY)"/>'
        '<line x1="60" y1="66" x2="8" y2="90" stroke="#f5f5f7" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#ahW)"/>'
        + f'<rect x="84" y="100" width="8" height="6" rx="1.5" fill="{METAL2}"/>' + stand(88, 106, spread=12, foot=118))
svg('reflector', 'A round fold-up reflector', body)

# ---------- Fresnel ----------
lens = ''.join(f'<ellipse cx="52" cy="50" rx="{14 - k * 3.2:.1f}" ry="{23 - k * 5.2:.1f}" stroke="#e6c27f" stroke-width=".9"/>' for k in range(4))
body = (f'<ellipse cx="44" cy="50" rx="44" ry="46" fill="url(#halo)" stroke="none"/>'
        f'<path d="M52 27 L104 30 Q112 50 104 70 L52 73 Z" fill="{METAL}"/>'
        + ''.join(f'<line x1="{x}" y1="31" x2="{x}" y2="37"/>' for x in range(66, 100, 7))
        + f'<ellipse cx="52" cy="50" rx="15" ry="24" fill="url(#warm)"/>' + lens
        + poly([(44, 27), (60, 27), (54, 10), (30, 12)], fill=METAL2)
        + poly([(44, 73), (60, 73), (54, 90), (30, 88)], fill=METAL2)
        + poly([(37, 34), (37, 66), (20, 76), (20, 24)], fill=METAL2)
        + f'<path d="M78 72 V84 H94 V70" />' + stand(86, 84, spread=18))
svg('fresnel', 'A Fresnel spotlight with barn doors', body)

# ---------- LED tube ----------
body = (f'<ellipse cx="80" cy="54" rx="30" ry="56" fill="url(#haloC)" stroke="none"/>'
        f'<rect x="72" y="8" width="16" height="88" rx="8" fill="url(#cool)"/>'
        f'<rect x="72" y="8" width="16" height="9" rx="4" fill="{METAL2}"/>'
        f'<rect x="72" y="87" width="16" height="9" rx="4" fill="{METAL2}"/>'
        f'<rect x="76" y="96" width="8" height="8" rx="1.5" fill="{METAL2}"/>'
        f'<ellipse cx="80" cy="108" rx="22" ry="5" fill="{METAL}"/>')
svg('led-tube', 'A battery LED tube light', body)

# ---------- bare-bulb lamp ----------
body = (f'<circle cx="80" cy="34" r="40" fill="url(#halo)" stroke="none"/>'
        f'<path d="M71 52 Q62 24 80 10 Q98 24 89 52" stroke="{DIM}" stroke-width="1.4"/>'
        f'<circle cx="80" cy="8" r="2.5" fill="{METAL2}"/>'
        f'<path d="M80 18 C70 18 66 26 66 32 C66 40 74 44 75 50 L85 50 C86 44 94 40 94 32 C94 26 90 18 80 18 Z" fill="url(#warm)"/>'
        f'<rect x="74" y="50" width="12" height="9" rx="2" fill="{METAL2}"/>'
        f'<line x1="80" y1="59" x2="80" y2="106" stroke-width="2.2"/>'
        f'<ellipse cx="80" cy="108" rx="24" ry="6" fill="{METAL}"/>')
svg('bare-bulb', 'A household lamp with the shade off', body)

# ---------- overhead diagram: the home setup ----------
def lab(x, y, t, c='#d2d2d7', anchor='middle'):
    return f'<text x="{x}" y="{y}" fill="{c}" stroke="none" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif" font-size="9" font-weight="500" text-anchor="{anchor}">{t}</text>'
def lamp_top(x, y, c):
    return (f'<circle cx="{x}" cy="{y}" r="16" fill="{c}" opacity=".18" stroke="none"/>'
            f'<circle cx="{x}" cy="{y}" r="7" fill="{c}" stroke="none"/>')
home = (f'<rect x="20" y="10" width="280" height="10" rx="2" fill="{METAL2}" stroke="none"/>'
        + lab(160, 34, 'Plain wall', '#8e8e93')
        # person in a chair, seen from above, facing the phone
        + f'<rect x="140" y="88" width="40" height="34" rx="8" fill="{METAL}"/>'
        + f'<ellipse cx="160" cy="112" rx="26" ry="10" fill="#48484a" stroke="none"/>'
        + f'<circle cx="160" cy="108" r="10" fill="#636366" stroke="none"/>'
        + f'<path d="M156 117 L160 122 L164 117 Z" fill="#636366" stroke="none"/>'
        # phone on a tripod
        + f'<rect x="152" y="196" width="16" height="10" rx="2" fill="{METAL2}"/>' + lab(160, 222, 'Your phone')
        # beams
        + '<path d="M242 168 L170 112" stroke="#ffd60a" stroke-width="1.2" stroke-dasharray="3 3" opacity=".8"/>'
        + '<path d="M86 150 L150 114" stroke="#64d2ff" stroke-width="1.2" stroke-dasharray="3 3" opacity=".8"/>'
        + '<path d="M96 50 L152 102" stroke="#bf5af2" stroke-width="1.2" stroke-dasharray="3 3" opacity=".8"/>'
        # key lamp, 45 degrees, camera right
        + lamp_top(250, 174, '#ffd60a') + lab(250, 202, 'Lamp (key)', '#ffd60a')
        # white board, camera left, angled toward the face
        + f'<rect x="66" y="142" width="34" height="6" rx="1" fill="#f5f5f7" transform="rotate(-32 83 145)" stroke="none"/>'
        + lab(78, 176, 'White board (fill)', '#64d2ff')
        # back lamp, behind, across from the key
        + lamp_top(90, 46, '#bf5af2') + lab(90, 74, 'Second lamp (back)', '#bf5af2', 'middle')
        + '<path d="M160 190 L160 128" stroke="#3a3a3c" stroke-width="1" stroke-dasharray="2 3"/>')
s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 232" width="320" height="232" role="img" aria-label="The home setup seen from above: lamp 45 degrees to one side, white board on the other, second lamp behind.">'
     f'<title>The home setup, seen from above</title>'
     f'<g fill="none" stroke="{LINE}" stroke-width="1.4" stroke-linejoin="round">{home}</g></svg>')
open(f'{OUT}/home-setup.svg', 'w').write(s)
print(sorted(os.listdir(OUT)))
