# codedmachines.com

Jekyll site, built by GitHub Pages from `main`. A build log with three kinds
of entries in `_posts/`, set by `type:` in the front matter:

- `photo`: the weekly bench photo (`photo:` path, body is the caption)
- `demo`: a song made with the device (`audio:` path, `specs:`, body is commentary)
- `note`: progress notes (title and body)

"Week N" is counted from `build_start` in `_config.yml` (a Monday).

## Weekly photo

This repo is public and its history is permanent, so webcam stills never
enter it unreviewed.

1. Sundays at 20:00 the `bench-candidates.timer` user unit runs `bin/bench candidates --notify`.
   It writes a private review page to `~/storage/office/review/` (served only on
   rig at <http://rig.local/office/review/>), sends a Pushover link and adds a
   Todoist task due that day (unless the previous one is still open). The page
   points at the originals in the archive; nothing is copied.
2. Look at the stills full size. Check screens, notes, labels, addresses, people.
   Drag to crop, type a caption, press Publish and confirm.
3. Publish runs `bin/bench photo DATE/HH-MM-SS "Caption" [--crop WxH+X+Y]`, which
   strips metadata, resizes to 1600px, writes the post, commits only those two
   files and pushes. "Commit only" (`--no-push`) lets you look at it locally first.
   The same command works from a terminal; the page shows it under "Or run it by hand".

The page is served by `bench-review.service` (`bin/bench serve`, 127.0.0.1:8797)
behind Caddy's `/office/review/` route, so it is reachable on the LAN and
Tailscale only. It publishes nothing on its own: one still, named by you, per click.

Backfill: the review page always lists the days of every build week that has
no published photo (latest day selected). Pick an older day from the menu and
publish it the same way. `bin/bench candidates DATE` stages a single day.

## Songs and notes

    bin/bench demo punch-beat "Punch Beat"   # from ~/projects/megasampler/demos, MP3 only, tags stripped
    bin/bench note "Title"

Both only draft a post. Write it, then commit and push yourself.

## Preview

    bundle install
    bundle exec jekyll serve

## Brand

`favicon.svg` is the mark. `brand/instagram-profile.png` (1080px, safe inside
Instagram's circle crop) and `brand/og.png` are rendered from the SVGs next to
them with `rsvg-convert`.
