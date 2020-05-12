# TSCode.zip

A Typescript library for working with HTML5 canvas and making 2D games.

## Installation

Use `git clone` to clone the repository.

```bash
git clone https://github.com/kubiGamer6000/tscode.zip.git
```

## Usage

Write all game code in the `game.ts` file, compile it with `tsc` (Node module) and run it using the `start.html`. Explanation of `game.ts` here:
```js
function update(): void {
// Code in here executes every 10ms
}

function draw(): void {
// Execute canvas and ctx functions here
}

function keyup(key: number): void {
// Function gets called every time a keyup event is triggered
}

function mouseup(): void {
// Function gets called every time a mouseup is triggered
}
```

## Info
Fork of [code.zip V9](http://iashu.free.bg/code.zip) by Ivo and Iashu. Added `tryToLoad` function from newer versions (for loading images). Some minor improvements of stability. Equipped with all [ES8](https://www.freecodecamp.org/news/es8-the-new-features-of-javascript-7506210a1a22/) modern features.
