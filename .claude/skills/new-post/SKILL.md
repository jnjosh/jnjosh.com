---
name: new-post
description: Scaffold a new jnjosh.com entry — asks for the space, the type and a slug, then creates the file with correct TOML front matter and opens it in BBEdit. Sets up the file only; never writes a title, a body, or any content. Use when Josh says "new post", "start a post", "new entry", "new photo", "new link post", "new video", or asks to set up a post to write in.
---

# New post

Scaffold one empty entry in the correct place, with the correct front matter, and open it.

**This skill does not write.** No title, no body, no summary, no suggested content, no offer to
draft one. Josh writes in BBEdit. Creating the file is the entire job — stop when it opens.

## 1. Confirm the repo

The working directory must be the jnjosh.com site repo. Check that `content/workshop/posts`
exists. If it does not, say so and stop — do not create directories, and do not guess at
another location.

## 2. Ask for the destination

If Josh already named the space and type in his message ("new link post", "a studio photo"),
take him at his word and skip the matching question. Otherwise ask with `AskUserQuestion`,
space first, then type — the type options depend on the space:

- **Workshop** → `post` · `link post`
- **Studio** → `post` · `photo` · `video`

There are only these five destinations. **Do not offer microposts** — They are retired them
from authoring, and they render only for the archive's sake.

| destination | directory |
|---|---|
| Workshop post, Workshop link post | `content/workshop/posts/` |
| Studio post | `content/studio/posts/` |
| Studio photo | `content/studio/photos/` |
| Studio video | `content/studio/videos/` |

**For a link post, also ask for the external URL** — that is the whole point of the type, and
Josh has the URL in hand at that moment.

## 3. Ask for the slug

Take it from the invocation if he passed one (`/new-post a-post-about-things`), otherwise ask
in plain chat — a slug is free text, so do not use `AskUserQuestion` for it.

Validate before writing. Reject, explain, and ask again if the slug:

- is not lowercase kebab (`a-z`, `0-9`, `-`), or starts/ends with a hyphen
- is `_index` or `index` — those are section pages, not entries
- names a file that already exists in the target directory

**Never overwrite an existing entry**, and never "helpfully" pick a variant slug — an existing
file means stop and ask.

## 4. Write the file

Path is `content/<space>/<type-dir>/<slug>.md`. Always `.md` (some archive files are
`.markdown`; new ones are not).

Front matter is **TOML**, `+++`-delimited, with the **date quoted** — that matches 164 of the
196 files in the archive. Get the timestamp from Python, because BSD `date` has no `%:z` and
Hugo wants the colon in the offset:

```bash
python3 -c "import datetime;print(datetime.datetime.now().astimezone().isoformat(timespec='seconds'))"
```

`title` is left **empty**. Do not derive one from the slug: in this archive slugs do not
predict titles (`KotlinFromCpp` → "Calling Kotlin from C++"), so a derived title is usually
wrong and always something to delete.

The body after the closing `+++` is **empty**. No `<!--more-->`, no headings, no placeholder.

### post — Workshop or Studio

```toml
+++
title = ""
date = "2026-08-24T16:40:00-04:00"
categories = []
+++
```

### link post — Workshop only

```toml
+++
title = ""
date = "2026-08-24T16:40:00-04:00"
externalurl = "https://the-url-he-gave.example.com/article"
categories = []
+++
```

### photo — Studio only

```toml
+++
title = ""
date = "2026-08-24T16:40:00-04:00"
categories = []
location = ""
camera = ""
lens = ""
aperture = ""
shutter = ""
iso = ""
film = ""
+++
```

### video — Studio only

```toml
+++
title = ""
date = "2026-08-24T16:40:00-04:00"
poster = ""
+++
```

## 5. Open it — only if BBEdit is actually there

Check first:

```bash
command -v bbedit
```

If it resolves, open the file:

```bash
bbedit "content/<space>/<type-dir>/<slug>.md"
```

If it does not resolve, the shell is not Josh's Mac — some environments mount the repo into a
sandbox that has the files but none of his applications. That is expected, not a failure.
**Skip the open step silently.** Do not run `bbedit` anyway to see what happens, do not hunt
for another editor, and do not offer computer use, Finder, or any other route to get the file
open — he has BBEdit in front of him. Report the path as usual and add that he'll need to open
it himself. One clause, not an apology.

## 6. Report, briefly

One line: the path created. Then stop.

Two exceptions worth one extra line each, because both fail silently rather than loudly:

- **video** — the body needs a `{{< youtube >}}` or `{{< vimeo >}}` shortcode, and a **Vimeo
  entry needs `poster` filled in**. Without it the card falls back to the plain text shape
  instead of showing a thumbnail. Say this; do not write the shortcode.
- **link post** — the title becomes the outbound link, so an empty title means an empty link.

Do not suggest what to write about. Do not offer to draft, outline, or research anything. Do
not ask "want me to start it?" The file is open in BBEdit; Josh takes it from there.