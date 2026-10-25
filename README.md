# Join the Fun

Simple keyboard and touch games for toddlers, with a hub page linking them together.
Every game is a single static HTML file — no build step, no dependencies.

| Game | What it teaches |
|---|---|
| 🎆 Letter Pop | Find the floating letter or number; a firework blows it up |
| 🎉 Key Party | Any key makes an emoji friend and a musical note |
| 🫧 Bubble Pop | Pop rising letter/number bubbles by key or tap |
| 🐮 Peekaboo Farm | Press the number on the wiggling hiding spot to find the animal and hear its name and sound |
| 🎨 Colour Splash | Fling paint and learn colour names |
| 🐤 Duckling Parade | Type the next number to add a duckling; at twenty they all jump in the pond |
| 🎹 Animal Piano | Each keyboard row is an animal that sings a note |
| 🔷 Shape Sorter | Post the falling shape through the matching numbered hole and hear its name, then its colour |
| 🐘 Big & Small | Find the big one or the little one with the left or right half of the keyboard |
| 🍎 How Many Apples? | Count the apples on the tree and press that number; they drop into the basket one by one |
| 🚂 Train Cars | Every key adds a numbered carriage; at five the train toots and chugs away |
| 🚃 My Name | Find each letter of your own name to fill the train's carriages |
| 🦁 Alphabet Zoo | Press a letter and an animal pops out of the zoo gate: "B is for Bear!" |
| 🃏 Pairs | Flip numbered cards to find matching animal pairs |
| 🧩 What Comes Next? | Finish the repeating pattern of fruit and friends |

Each round is shown on an analog countdown clock (`shared/round-timer.js`).

## Grown-up options

The ⚙️ cog in the top-left of the hub page opens the options, behind a quick
sum so little hands can't change them:

- **Length of each game**: 1, 2 (the default), 3, 5 or 10 minutes.
- **Play time per day**: no limit, or 10 minutes up to 2 hours. Time counts
  while a round is running. A round that would go past the limit is cut short,
  and once the time is used up every game shows "All done for today!" until
  tomorrow. The options also show today's total and can reset it.

Settings and today's play time are kept in the browser's `localStorage`
(`shared/parent-settings.js`), so they belong to that browser and device.

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
