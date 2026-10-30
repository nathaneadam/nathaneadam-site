"""Build a lesson page from the shared shell of learn/three-point-lighting.html.
Usage: mkpage.py <slug>  (reads learn-src/pages/<slug>.py for META and BODY)"""
import sys, re, json, os
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
slug = sys.argv[1]
src = open(ROOT + '/learn/three-point-lighting.html').read()
ns = {}
exec(open(f'{HERE}/pages/{slug}.py').read(), ns)
M = ns['META']
head_end = src.index('<main id="top">')
foot_start = src.index('</main>')
head = src[:head_end]
foot = src[foot_start:]
url = f'https://www.nathaneadam.com/learn/{slug}.html'
og = f'https://www.nathaneadam.com/learn/media/{M["og"]}'
head = re.sub(r'<title>.*?</title>', f'<title>{M["title"]} &mdash; Nathan E Adam</title>', head)
head = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{M["desc"]}">', head)
head = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{url}">', head)
head = re.sub(r'<meta property="og:title" content=".*?">', f'<meta property="og:title" content="{M["title"]}">', head)
head = re.sub(r'<meta property="og:description" content=".*?">', f'<meta property="og:description" content="{M["ogdesc"]}">', head)
head = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{url}">', head)
head = re.sub(r'<meta property="og:image" content=".*?">', f'<meta property="og:image" content="{og}">', head)
head = re.sub(r'<meta property="og:image:alt" content=".*?">', f'<meta property="og:image:alt" content="{M["ogalt"]}">', head)
head = re.sub(r'<meta name="twitter:image" content=".*?">', f'<meta name="twitter:image" content="{og}">', head)
ld = {"@context": "https://schema.org", "@type": "LearningResource", "name": M['h1'], "description": M['desc'],
      "learningResourceType": "Interactive lesson", "educationalLevel": "Beginner", "timeRequired": "PT20M", "inLanguage": "en",
      "isAccessibleForFree": True, "url": url,
      "isPartOf": {"@type": "Course", "name": "Video basics", "url": "https://www.nathaneadam.com/learn/"},
      "author": {"@type": "Person", "name": "Nathan Adam", "url": "https://www.nathaneadam.com/"}}
head = re.sub(r'<script type="application/ld\+json">.*?</script>', '<script type="application/ld+json">\n' + json.dumps(ld, indent=2) + '\n</script>', head, flags=re.S)
if not M.get('three'):
    head = re.sub(r'<script type="importmap">.*?</script>\n', '', head)
foot = foot.replace('<script src="content/three-point-lighting.js"></script>', f'<script src="content/{slug}.js"></script>')
assert f'content/{slug}.js' in foot
page = head + '<main id="top">\n' + ns['BODY'] + '\n' + foot
open(f'{ROOT}/learn/{slug}.html', 'w').write(page)
print('wrote', slug, len(page))
