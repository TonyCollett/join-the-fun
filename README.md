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
| 😊 How Do I Feel? | A big face shows a feeling; find the matching small face |
| 🧸 Dress Teddy | Pick the right clothes for sun, rain or snow and Teddy dances |

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
