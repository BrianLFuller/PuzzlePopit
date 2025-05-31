# Puzzle Popit 🧩🫧🎈

A colourful, kid-friendly mobile game built with **React Native + Expo**.  
Players solve 3-4 piece shape puzzles, pop satisfying **pop-it bubbles**, then pop floating balloons before moving on to the next level. Bright colours, haptics and sound effects keep the experience playful and rewarding.

---

## 🎮 Game Mechanics

1. **Puzzle Phase**  
   • Drag 3-4 large pieces into the outline.  
   • Pieces **snap** when close enough (visual & haptic feedback).

2. **Pop-it Phase**  
   • A silicone-style pop-it appears once the puzzle is complete.  
   • Tap every bubble to pop it (sound + haptic + particles).

3. **Balloon Phase**  
   • Balloons float upward with gentle sway physics.  
   • Tap to pop them all – balloons burst with particles.

4. **Level Complete**  
   • Stars, confetti and a continue button.  
   • Next level unlocks; score increases.

Key design points:

- Large touch targets & high-contrast colours for young players.  
- Positive reinforcement: confetti, stars, celebratory sounds.  
- No ads or in-app purchases in this prototype.

---

## ✨ Features

| Category | Details |
|---|---|
| State Management | Redux Toolkit – levels, progression, sound toggle |
| Navigation | React Navigation (Native Stack) |
| Gestures | react-native-gesture-handler |
| Animations | react-native-reanimated 3 + Moti |
| Haptics | expo-haptics |
| Audio | expo-av (pop, success, balloon-pop) |
| UI Kit | react-native-paper (Material Design) |
| Platforms | Android, iOS, Web (via Expo) |

---

## 🛠️ Quick Start

1. **Install Expo CLI**

```bash
npm install -g expo-cli
```

2. **Clone & Install**

```bash
git clone https://github.com/BrianLFuller/PuzzlePopit.git
cd PuzzlePopit
npm install        # or yarn
```

3. **Add Assets** (see "Required Assets" below).

4. **Run the App**

```bash
npm start          # opens Expo DevTools
# or
npm run android    # physical / virtual device
npm run ios        # macOS + Xcode
npm run web
```

---

## 📦 Required Assets

Place files under **`assets/`**. Replace with your own art or keep names identical.

### Images (`assets/images/`)

| File | Purpose |
|---|---|
| animal_outline.png / fruit_outline.png / toy_outline.png | Transparent outlines for puzzle board |
| piece1.png – piece4.png | Individual puzzle pieces (match outline) |
| star_filled.png / star_burst.png | Level-complete graphics |
| animal_icon.png / fruit_icon.png / toy_icon.png | Icons on level cards |
| mascot.png | Fun character on Home screen |
| cloud1.png / cloud2.png | Decorative clouds |
| default_piece.png / default_outline.png | Fallbacks (optional) |

### Audio (`assets/sounds/`)

| File | Used for |
|---|---|
| pop.mp3 | Piece snap, pop-it tap |
| success.mp3 | Stage transitions & level complete |
| balloon-pop.mp3 | Balloon popping |

> Tip: keep clips short (≤ 200 KB) for faster loading.

---

## 🔧 Editing / Adding Levels

Open **`src/store/index.js`**, modify the `initialLevels` array:

```js
{
  id: 4,
  name: 'Level 4',
  difficulty: 'medium',     // easy | medium | hard
  puzzlePieces: 4,
  popitCount: 8,
  balloonCount: 6,
  imageTheme: 'fruits',     // must match your asset filenames
  unlocked: false,
  completed: false,
},
```

Add matching outline & piece images in `assets/images/`, plus an icon for the level theme.

---

### Built with ❤️ by Brian Fuller & the React Native community
