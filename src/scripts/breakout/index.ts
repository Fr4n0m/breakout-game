import { type Difficulty } from "./config";
import { createBreakoutGame } from "./engine";

type InitBreakoutGameParams = {
    canvasSelector: string;
    spriteSelector: string;
    difficulty?: Difficulty;
    forceWinOnStart?: boolean;
    onWin?: () => void;
};

export function initBreakoutGame({
    canvasSelector,
    spriteSelector,
    difficulty = "normal",
    forceWinOnStart = false,
    onWin
}: InitBreakoutGameParams): void {
    const canvas = document.querySelector<HTMLCanvasElement>(canvasSelector);
    const spriteSheet = document.querySelector<HTMLImageElement>(spriteSelector);
    const ctx = canvas?.getContext("2d");

    if (!canvas || !spriteSheet || !ctx) {
        throw new Error("Breakout initialization failed: canvas, sprite or context is missing.");
    }

    const startGame = (): void => {
        const game = createBreakoutGame(canvas, ctx, spriteSheet, { difficulty, forceWinOnStart, onWin });
        game.start();
    };

    if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
        startGame();
        return;
    }

    spriteSheet.addEventListener("load", startGame, { once: true });
}
