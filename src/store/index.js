import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define the initial game levels
const initialLevels = [
  {
    id: 1,
    name: 'Level 1',
    difficulty: 'easy',
    puzzlePieces: 3,
    popitCount: 5,
    balloonCount: 3,
    completed: false,
    unlocked: true,
    imageTheme: 'animals',
  },
  {
    id: 2,
    name: 'Level 2',
    difficulty: 'easy',
    puzzlePieces: 3,
    popitCount: 6,
    balloonCount: 4,
    completed: false,
    unlocked: false,
    imageTheme: 'fruits',
  },
  {
    id: 3,
    name: 'Level 3',
    difficulty: 'medium',
    puzzlePieces: 4,
    popitCount: 8,
    balloonCount: 5,
    completed: false,
    unlocked: false,
    imageTheme: 'toys',
  },
];

// Game state slice
const gameSlice = createSlice({
  name: 'game',
  initialState: {
    levels: initialLevels,
    currentLevelId: 1,
    gameState: 'menu', // 'menu', 'levelSelect', 'puzzle', 'popit', 'balloon', 'complete'
    score: 0,
    
    // Current level state
    currentPuzzle: {
      pieces: [], // Will contain piece positions, rotation, etc.
      completed: false,
    },
    
    currentPopits: {
      items: [], // Will contain popit positions and popped status
      allPopped: false,
    },
    
    currentBalloons: {
      items: [], // Will contain balloon positions and popped status
      allPopped: false,
    },
    
    // Sound settings
    soundEnabled: true,
  },
  reducers: {
    // Navigation actions
    navigateToMenu: (state) => {
      state.gameState = 'menu';
    },
    navigateToLevelSelect: (state) => {
      state.gameState = 'levelSelect';
    },
    
    // Level management
    startLevel: (state, action) => {
      const levelId = action.payload;
      state.currentLevelId = levelId;
      state.gameState = 'puzzle';
      state.currentPuzzle = {
        pieces: generatePuzzlePieces(state.levels.find(l => l.id === levelId)),
        completed: false,
      };
      state.currentPopits = {
        items: [],
        allPopped: false,
      };
      state.currentBalloons = {
        items: [],
        allPopped: false,
      };
    },
    
    // Puzzle interactions
    movePuzzlePiece: (state, action) => {
      const { pieceId, position } = action.payload;
      const pieceIndex = state.currentPuzzle.pieces.findIndex(p => p.id === pieceId);
      if (pieceIndex !== -1) {
        state.currentPuzzle.pieces[pieceIndex].position = position;
      }
    },
    
    snapPuzzlePiece: (state, action) => {
      const { pieceId, snapped } = action.payload;
      const pieceIndex = state.currentPuzzle.pieces.findIndex(p => p.id === pieceId);
      if (pieceIndex !== -1) {
        state.currentPuzzle.pieces[pieceIndex].snapped = snapped;
      }
      
      // Check if all pieces are snapped
      const allSnapped = state.currentPuzzle.pieces.every(p => p.snapped);
      if (allSnapped) {
        state.currentPuzzle.completed = true;
        state.gameState = 'popit';
        state.currentPopits = {
          items: generatePopits(state.levels.find(l => l.id === state.currentLevelId)),
          allPopped: false,
        };
      }
    },
    
    // Popit interactions
    popPopit: (state, action) => {
      const popitId = action.payload;
      const popitIndex = state.currentPopits.items.findIndex(p => p.id === popitId);
      if (popitIndex !== -1) {
        state.currentPopits.items[popitIndex].popped = true;
      }
      
      // Check if all popits are popped
      const allPopped = state.currentPopits.items.every(p => p.popped);
      if (allPopped) {
        state.currentPopits.allPopped = true;
        state.gameState = 'balloon';
        state.currentBalloons = {
          items: generateBalloons(state.levels.find(l => l.id === state.currentLevelId)),
          allPopped: false,
        };
      }
    },
    
    // Balloon interactions
    popBalloon: (state, action) => {
      const balloonId = action.payload;
      const balloonIndex = state.currentBalloons.items.findIndex(b => b.id === balloonId);
      if (balloonIndex !== -1) {
        state.currentBalloons.items[balloonIndex].popped = true;
      }
      
      // Check if all balloons are popped
      const allPopped = state.currentBalloons.items.every(b => b.popped);
      if (allPopped) {
        state.currentBalloons.allPopped = true;
        
        // Complete the level
        const levelIndex = state.levels.findIndex(l => l.id === state.currentLevelId);
        if (levelIndex !== -1) {
          state.levels[levelIndex].completed = true;
          
          // Unlock next level if available
          if (levelIndex + 1 < state.levels.length) {
            state.levels[levelIndex + 1].unlocked = true;
          }
        }
        
        // Update score
        state.score += 100;
        
        // Show level complete screen
        state.gameState = 'complete';
      }
    },
    
    // Level completion
    completeLevel: (state) => {
      state.gameState = 'levelSelect';
    },
    
    // Sound settings
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    
    // Reset game
    resetGame: (state) => {
      state.levels = initialLevels;
      state.currentLevelId = 1;
      state.gameState = 'menu';
      state.score = 0;
    },
  },
});

// Helper functions to generate game elements
function generatePuzzlePieces(level) {
  // This would normally use level data to create appropriate pieces
  const pieceCount = level?.puzzlePieces || 3;
  const pieces = [];
  
  for (let i = 0; i < pieceCount; i++) {
    pieces.push({
      id: `piece-${i}`,
      position: { x: 50 + i * 30, y: 300 }, // Starting positions
      targetPosition: { x: 150 + i * 50, y: 150 }, // Where they should snap to
      snapped: false,
      shape: `shape-${i}`, // Reference to shape asset
    });
  }
  
  return pieces;
}

function generatePopits(level) {
  // Create popit bubbles based on level configuration
  const popitCount = level?.popitCount || 5;
  const popits = [];
  
  for (let i = 0; i < popitCount; i++) {
    popits.push({
      id: `popit-${i}`,
      position: {
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      },
      size: 30 + Math.random() * 20,
      popped: false,
    });
  }
  
  return popits;
}

function generateBalloons(level) {
  // Create balloons based on level configuration
  const balloonCount = level?.balloonCount || 3;
  const balloons = [];
  
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  
  for (let i = 0; i < balloonCount; i++) {
    balloons.push({
      id: `balloon-${i}`,
      position: {
        x: 50 + Math.random() * 250,
        y: 500, // Start at bottom
      },
      color: colors[i % colors.length],
      size: 40 + Math.random() * 20,
      popped: false,
      floatSpeed: 0.5 + Math.random() * 1.5,
    });
  }
  
  return balloons;
}

// Export actions
export const {
  navigateToMenu,
  navigateToLevelSelect,
  startLevel,
  movePuzzlePiece,
  snapPuzzlePiece,
  popPopit,
  popBalloon,
  completeLevel,
  toggleSound,
  resetGame,
} = gameSlice.actions;

// Configure the Redux store
export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});
