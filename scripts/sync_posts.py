"""
sync_posts.py
─────────────
Scans every folder under blog/posts/ for an en.md file,
extracts frontmatter, and rebuilds blog/posts.json.

Also renames images in each folder:
  - First image  → cover.jpg
  - Second image → photo1.jpg
  - Third image  → photo2.jpg
  - etc.

Images are sorted alphabetically by their original filename,
so phone camera filenames (IMG_0001, IMG_0002...) stay in order.
Existing cover.jpg / photo1.jpg etc. are NOT renamed again.

Run manually:  python scripts/sync_posts.py
GitHub Action: runs nightly at midnight + on every push to blog/posts/
"""

import os
import json
import re
import shutil
try:
    from PIL import Image as PILImage
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

# ── Paths ─────────────────────────────────────────────────────
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(REPO_ROOT, 'blog', 'posts')
OUTPUT    = os.path.join(REPO_ROOT, 'blog', 'posts.json')

IMAGE_EXTS    = {'.jpg', '.jpeg', '.png'}
RESERVED_NAMES = {'cover.jpg', 'cover.jpeg', 'cover.png'}


def parse_frontmatter(text):
    """Extract YAML frontmatter from markdown. Returns a dict."""
    text  = text.replace('\r\n', '\n').replace('\r', '\n')
    match = re.match(r'^---\n(.*?)\n---\n', text, re.DOTALL)
    if not match:
        return {}
    block = match.group(1)
    data  = {}
    lines = block.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        # Nested block (e.g. title: or captions:)
        if re.match(r'^(\w+):\s*$', line):
            key    = line.strip().rstrip(':')
            nested = {}
            i += 1
            while i < len(lines) and lines[i].startswith('  '):
                m = re.match(r'\s+(\w+):\s*(.*)', lines[i])
                if m:
                    nested[m.group(1)] = m.group(2).strip()
                i += 1
            data[key] = nested
            continue
        # Simple key: value
        m = re.match(r'^(\w+):\s*(.*)', line)
        if m:
            key, val = m.group(1), m.group(2).strip()
            try:    val = int(val)
            except ValueError:
                try:    val = float(val)
                except ValueError: pass
            data[key] = val
        i += 1
    return data


def rename_images(folder, slug):
    """
    Sort all raw images alphabetically, then rename them:
      first  → cover.jpg
      second → photo1.jpg
      third  → photo2.jpg
      ...

    Skips files that are already named cover.* or photo*.
    Returns the number of photos available (excluding cover).
    """
    # Names that are already finalised — don't touch
    final_pattern = re.compile(r'^(cover|photo\d+)\.(jpg|jpeg|png)$', re.IGNORECASE)

    # Collect raw images (not yet renamed)
    raw_images = sorted([
        f for f in os.listdir(folder)
        if os.path.splitext(f)[1].lower() in IMAGE_EXTS
        and not final_pattern.match(f)
    ])

    if not raw_images:
        pass  # nothing to rename
    else:
        for idx, fname in enumerate(raw_images):
            src = os.path.join(folder, fname)
            if idx == 0:
                dest_name = 'cover.jpg'
            else:
                dest_name = 'photo' + str(idx) + '.jpg'
            dest = os.path.join(folder, dest_name)
            if not os.path.exists(dest):
                print(f"  [img] {slug}/  '{fname}' → '{dest_name}'")
                shutil.move(src, dest)

    # Count how many photo1, photo2... exist after renaming
    photo_count = sum(
        1 for f in os.listdir(folder)
        if re.match(r'^photo\d+\.(jpg|jpeg|png)$', f, re.IGNORECASE)
    )
    return photo_count


def generate_thumb(folder, slug):
    """
    Creates cover_thumb.jpg at 400x400px from cover.jpg.
    Skips if thumb already exists and is newer than cover.
    Silently skips if Pillow not installed.
    """
    if not HAS_PIL:
        return

    cover = None
    for name in ['cover.jpg', 'cover.jpeg', 'cover.png']:
        path = os.path.join(folder, name)
        if os.path.exists(path):
            cover = path
            break

    if not cover:
        return

    thumb_path = os.path.join(folder, 'cover_thumb.jpg')

    # Skip if thumb is already up to date
    if os.path.exists(thumb_path):
        if os.path.getmtime(thumb_path) >= os.path.getmtime(cover):
            return

    try:
        img = PILImage.open(cover).convert('RGB')
        img.thumbnail((400, 400), PILImage.LANCZOS)
        img.save(thumb_path, 'JPEG', quality=82, optimize=True)
        print(f"  [thumb] {slug}/cover_thumb.jpg ({img.size[0]}x{img.size[1]})")
    except Exception as e:
        print(f"  [thumb] {slug}/ skipped — {e}")


def build_posts():
    posts   = []
    skipped = []

    for slug in sorted(os.listdir(POSTS_DIR)):
        folder = os.path.join(POSTS_DIR, slug)
        if not os.path.isdir(folder):
            continue
        if slug.startswith('MALL') or slug.startswith('.'):
            continue

        md_path = os.path.join(folder, 'en.md')
        if not os.path.exists(md_path):
            skipped.append(slug)
            continue

        # Rename images
        photo_count = rename_images(folder, slug)

        # Generate thumbnail for cover
        generate_thumb(folder, slug)

        # Parse frontmatter
        with open(md_path, encoding='utf-8') as f:
            meta = parse_frontmatter(f.read())

        if not meta.get('type'):
            print(f"  [skip] {slug} — missing 'type' field")
            skipped.append(slug)
            continue

        post_type = meta['type']
        entry = {
            'slug': slug,
            'type': post_type,
            'date': str(meta.get('date', '')),
        }

        if post_type == 'journal':
            entry['day']       = meta.get('day', '')
            entry['location']  = meta.get('location', '')
            entry['km']        = meta.get('km', 0)
            entry['elevation'] = meta.get('elevation', 0)
        else:
            entry['tag'] = meta.get('tag', 'Blog')

        # Title
        if isinstance(meta.get('title'), dict):
            entry['title'] = meta['title']
        else:
            t = str(meta.get('title', slug))
            entry['title'] = {'en': t, 'sv': t, 'it': t}

        # Captions — read from frontmatter if present
        # Format in en.md:
        #   captions:
        #     photo1: The climb out of Genova
        #     photo2: First espresso of the trip
        if isinstance(meta.get('captions'), dict):
            entry['captions'] = meta['captions']

        # Store photo count so post.html knows how many exist
        if photo_count > 0:
            entry['photos'] = photo_count

        posts.append(entry)
        print(f"  [ok]  {slug}  ({post_type}, {entry['date']}, {photo_count} extra photo(s))")

    # Newest first
    posts.sort(key=lambda p: p.get('date', ''), reverse=True)

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)

    print(f"\nDone — wrote {len(posts)} posts to blog/posts.json")
    if skipped:
        print(f"Skipped: {', '.join(skipped)}")


if __name__ == '__main__':
    print("Scanning blog/posts/ ...\n")
    build_posts()
