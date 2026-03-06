import { createBreakoutGame } from "./engine.js";

export function initBreakoutGame({ canvasSelector, spriteSelector }) {
    const canvas = document.querySelector(canvasSelector);
    const spriteSheet = document.querySelector(spriteSelector);
    const ctx = canvas?.getContext("2d");

    if (!canvas || !spriteSheet || !ctx) {
        throw new Error("Breakout initialization failed: canvas, sprite or context is missing.");
    }

    const startGame = () => {
        const game = createBreakoutGame(canvas, ctx, spriteSheet);
        game.start();
    };

    if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
        startGame();
        return;
    }

    spriteSheet.addEventListener("load", startGame, { once: true });
}
