# Join the Fun

Simple keyboard and touch games for toddlers, with a hub page linking them together.
Every game is a single static HTML file — no build step, no dependencies.

| Game | What it teaches |
|---|---|
| 🎆 Letter Pop | Find the floating letter or number; a firework blows it up |
| 🎉 Key Party | Any key makes an emoji friend and a musical note |
| 🫧 Bubble Pop | Pop rising letter/number bubbles by key or tap |
| 🐮 Peekaboo Farm | Find the hiding animal and hear its name and sound |
| 🎨 Colour Splash | Fling paint and learn colour names |
| 🐤 Duckling Parade | Count ducklings to ten, then they jump in the pond |
| 🎹 Animal Piano | Each keyboard row is an animal that sings a note |

Each round lasts two minutes, shown on an analog countdown clock
(`shared/round-timer.js`).

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8765
```

## Docker

Pushes to `master` build and publish `ghcr.io/tonycollett/join-the-fun:latest`
via GitHub Actions. The image is nginx (non-root) serving on port 8080:

```bash
docker run --rm -p 8080:8080 ghcr.io/tonycollett/join-the-fun:latest
```
