AMZ = 'https://www.amazon.com/s?k='
def gear(file, name, q=None, alt='', note=''):
    link = f'<a href="{AMZ}{q}" target="_blank" rel="noopener nofollow">See on Amazon</a>' if q else ''
    small = f'<small>{note}</small>' if note else ''
    return f'<figure class="gear"><img src="media/gear/{file}.svg" width="160" height="120" alt="{alt or name}" loading="lazy"><figcaption>{name}{small}{link}</figcaption></figure>'
