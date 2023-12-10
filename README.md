# Ye Old Invaders

Ye Old Invaders is a classic space invaders game with a magical twist! Instead of spaceships, you control a wizard defending the realm against goblin invaders. Cast spells, dodge goblins, and see how long you can protect the magical kingdom.

## Table of Contents

- [Classes](#classes)
  - [Wizard](#1-wizard-class)
  - [Goblin](#2-goblin-class)
  - [Projectile](#3-projectile-class)
  - [GameAudio](#4-gameaudio-class)
  - [Game](#5-game-class)


## Classes

### 1. Wizard Class

The `Wizard` class represents the player character in the game. It encapsulates the logic for player movement and animation handling.

##### Key Features

- **Movement:** The wizard can move left and right within the game grid.
- **Animation:** Utilizes animations for smooth movement transitions.

##### Usage Example

```typescript
// Create a new Wizard instance
const wizard = new Wizard();

// Example of handling movement
wizard.moveLeft();
wizard.moveRight();
```

### 2. Goblin Class

The `Goblin` class represents the antagonistic entities in the game. Goblins move horizontally and vertically on the game grid, providing a challenge for the player.

##### Key Features

- **Movement:** Goblins can move left, right, and down on the game grid.
- **Initialization:** Creates a new goblin instance with specified initial coordinates.
- **Movement Direction:** Utilizes a static attribute to determine the horizontal movement direction.

##### Usage Example

```typescript
// Create a new Goblin instance with initial coordinates (x, y)
const goblin = new Goblin(xCoordinate, yCoordinate);

// Example of handling goblin movement
goblin.moveLeft();
goblin.moveRight();
goblin.moveDown();
```

Goblins are automatically added to the game board upon instantiation. Their movement direction is determined by the static attribute movementDirection, which is toggled between "left" and "right" after moving down due to reaching the game board boundaries.

### 3. Projectile Class

The `Projectile` class is a versatile class responsible for managing and creating various projectiles in the game. While currently implemented for fireballs, it can be extended to support other projectiles like goblin arrows in the future.

##### Key Features

- **Creation:** Generates projectiles at specified coordinates.
- **Animation:** Implements animations for the movement of projectiles.

##### Usage Example

```typescript
// Create a new fireball projectile
const fireball = new Projectile(xCoordinate, yCoordinate, "images/fireball.png");

// Example of creating a different projectile (e.g., goblin arrow)
const goblinArrow = new Projectile(xCoordinate, yCoordinate, "images/goblin_arrow.png");
```

### 4. GameAudio Class

The `GameAudio` class is responsible for managing audio elements in the game, providing functionality for playing, stopping, and controlling the volume of audio files. This class is crucial for creating an immersive gaming experience with dynamic audio effects.

##### Key Features

- **Initialization:** Creates a new `GameAudio` instance with the specified audio source and volume.
- **Audio Playback:** Enables playing audio with customizable volume.
- **Audio Control:** Supports stopping audio playback and adjusting volume during runtime.
- **Continuous Playback:** Allows for setting intervals for continuous audio playback.

##### Usage Example

```typescript
// Create a new GameAudio instance with audio source and optional volume (default is 1)
const gameAudio = new GameAudio("audio/battle-theme.mp3", 0.8);

// Example of playing audio
gameAudio.playAudio();

// Example of stopping audio
gameAudio.stopAudio();

// Example of setting audio volume
gameAudio.setAudioVolume(0.5);

// Example of starting continuous audio playback at a specified interval
gameAudio.startAudioInterval(3000);

// Example of stopping continuous audio playback
gameAudio.stopAudioInterval();
```

### 5. Game Class

The `Game` class serves as the core of the game, managing goblins, the wizard, projectiles, and game audio. Its standout features include:

- Dynamic Gameplay: Controls goblin movements, wizard actions, and fireball interactions for an interactive gaming experience.
- Audio Integration: Incorporates audio elements for battle theme, fireball whoosh, impact, goblin death, defeat, and victory, enhancing the game's atmosphere.
- Game State Management: Monitors goblin positions, wizard movements, and fireball collisions to determine game outcomes, leading to victory or defeat.
- User Input Handling: Listens for keyboard inputs to control wizard movements (left, right) and fireball creation (space), allowing player engagement.
- Interval-based Mechanics: Utilizes intervals for goblin movements, fireball updates, collision checks, and game-over conditions, ensuring smooth game progression.
- Win/Loss Feedback: Displays tailored messages and images on the game board for victory and defeat scenarios, enhancing player feedback.
- Game Reset: Enables game reset functionality, clearing intervals, the game board, and restarting with a fresh game state.

## Usage Example

```typescript
// Create a new Game instance
const game = new Game();

// Start the game
game.startGame();

// Stop the game with a victory condition
game.stopGame(true);

// Stop the game with a defeat condition
game.stopGame(false);

// Reset the game state to the initial configuration
game.resetGame();
```
