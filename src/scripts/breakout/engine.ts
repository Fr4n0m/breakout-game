import {
    BROKEN_COLORS,
    BRICK_STATUS,
    CONFIG,
    DIFFICULTY_PRESETS,
    KEY_BINDINGS,
    SPRITES,
    type Difficulty,
    type SpriteKey
} from "./config";
import { createDimensions, createInitialState, type Dimensions, type GameState } from "./state";

type GameOptions = {
    difficulty?: Difficulty;
    forceWinOnStart?: boolean;
    onWin?: () => void;
};

function clampSpeedWithDirection(value: number, min: number, max: number): number {
    const sign = Math.sign(value) || 1;
    const clampedMagnitude = Math.min(Math.max(Math.abs(value), min), max);
    return clampedMagnitude * sign;
}

export function createBreakoutGame(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    spriteSheet: HTMLImageElement,
    options: GameOptions = {}
): { start: () => void } {
    const difficulty: Difficulty = options.difficulty && DIFFICULTY_PRESETS[options.difficulty] ? options.difficulty : "normal";
    const gameConfig = {
        ...CONFIG,
        ball: {
            ...CONFIG.ball,
            ...DIFFICULTY_PRESETS[difficulty]
        }
    };

    canvas.width = CONFIG.canvas.width;
    canvas.height = CONFIG.canvas.height;

    const dimensions: Dimensions = createDimensions(SPRITES);
    const state: GameState = createInitialState(canvas, dimensions, gameConfig.ball);
    let hasTriggeredWinEffect = false;

    function drawSprite(spriteKey: SpriteKey, x: number, y: number, width: number, height: number): void {
        const sprite = SPRITES[spriteKey];
        ctx.drawImage(
            spriteSheet,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            x,
            y,
            width,
            height
        );
    }

    function drawBall(): void {
        drawSprite("ball", state.ball.x, state.ball.y, state.ball.width, state.ball.height);
    }

    function drawPaddle(): void {
        drawSprite("paddle", state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);
    }

    function drawBricks(): void {
        for (let column = 0; column < CONFIG.bricks.columns; column++) {
            for (let row = 0; row < CONFIG.bricks.rows; row++) {
                const brick = state.bricks[column][row];
                if (brick.status !== BRICK_STATUS.DESTROYED) {
                    drawSprite(brick.color, brick.x, brick.y, dimensions.brickWidth, dimensions.brickHeight);
                }
            }
        }
    }

    function clearCanvas(): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawEndScreen(): void {
        const title = state.game.isWon ? "You Win!" : "Game Over";
        const subtitle = state.game.isWon ? "Press any key to play again" : "Press any key to restart";
        ctx.font = "24px Arial";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(title, canvas.width / 2, canvas.height / 2);
        ctx.font = "16px Arial";
        ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 30);
    }

    function hasRemainingBricks(): boolean {
        for (let column = 0; column < CONFIG.bricks.columns; column++) {
            for (let row = 0; row < CONFIG.bricks.rows; row++) {
                if (state.bricks[column][row].status !== BRICK_STATUS.DESTROYED) {
                    return true;
                }
            }
        }
        return false;
    }

    function updateBrickCollisions(): void {
        for (let column = 0; column < CONFIG.bricks.columns; column++) {
            for (let row = 0; row < CONFIG.bricks.rows; row++) {
                const currentBrick = state.bricks[column][row];
                if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

                const isBallCollidingWithBrick =
                    state.ball.x + state.ball.width > currentBrick.x &&
                    state.ball.x < currentBrick.x + dimensions.brickWidth &&
                    state.ball.y + state.ball.height > currentBrick.y &&
                    state.ball.y < currentBrick.y + dimensions.brickHeight;

                if (!isBallCollidingWithBrick) continue;

                state.ball.dy = -state.ball.dy;
                if (currentBrick.hits === 1) {
                    currentBrick.status = BRICK_STATUS.DESTROYED;
                } else {
                    currentBrick.hits = 1;
                    currentBrick.status = BRICK_STATUS.HIT;
                    if (currentBrick.color in BROKEN_COLORS) {
                        currentBrick.color = BROKEN_COLORS[currentBrick.color as keyof typeof BROKEN_COLORS];
                    }
                }
            }
        }

        if (!hasRemainingBricks()) {
            state.game.isOver = true;
            state.game.isWon = true;
        }
    }

    function updateBallMovement(): void {
        const currentTime = performance.now();
        const deltaTime = (currentTime - state.game.lastTime) / 1000;
        const accelerationFactor = 1 + gameConfig.ball.speedIncrement * deltaTime;

        state.ball.dx = clampSpeedWithDirection(
            state.ball.dx * accelerationFactor,
            gameConfig.ball.minSpeed,
            gameConfig.ball.maxSpeed
        );
        state.ball.dy = clampSpeedWithDirection(
            state.ball.dy * accelerationFactor,
            gameConfig.ball.minSpeed,
            gameConfig.ball.maxSpeed
        );

        state.game.lastTime = currentTime;

        const nextX = state.ball.x + state.ball.dx;
        const nextY = state.ball.y + state.ball.dy;

        if (nextX > canvas.width - state.ball.width || nextX < 0) {
            state.ball.dx = -state.ball.dx;
        }
        if (nextY < 0) {
            state.ball.dy = -state.ball.dy;
        }

        const ballCenterX = state.ball.x + state.ball.width / 2;
        const isBallInsidePaddle =
            ballCenterX > state.paddle.x &&
            ballCenterX < state.paddle.x + state.paddle.width;
        const isBallTouchingPaddle = state.ball.y + state.ball.dy + state.ball.height > state.paddle.y;

        if (isBallInsidePaddle && isBallTouchingPaddle) {
            state.ball.dy = -state.ball.dy;
            state.ball.y = state.paddle.y - state.ball.height;
        } else if (nextY > canvas.height - state.ball.height) {
            state.game.isOver = true;
            state.game.isWon = false;
        }

        state.ball.x += state.ball.dx;
        state.ball.y += state.ball.dy;
    }

    function updatePaddleMovement(): void {
        if (state.input.rightPressed && state.paddle.x < canvas.width - state.paddle.width - 2) {
            state.paddle.x += CONFIG.paddle.sensitivity;
        } else if (state.input.leftPressed && state.paddle.x > 2) {
            state.paddle.x -= CONFIG.paddle.sensitivity;
        }
    }

    function resetGame(): void {
        document.location.reload();
    }

    function onKeyDown(event: KeyboardEvent): void {
        if (state.game.isOver) {
            resetGame();
            return;
        }

        const { key } = event;
        if (KEY_BINDINGS.right.has(key)) {
            state.input.rightPressed = true;
        } else if (KEY_BINDINGS.left.has(key)) {
            state.input.leftPressed = true;
        }
    }

    function onKeyUp(event: KeyboardEvent): void {
        const { key } = event;
        if (KEY_BINDINGS.right.has(key)) {
            state.input.rightPressed = false;
        } else if (KEY_BINDINGS.left.has(key)) {
            state.input.leftPressed = false;
        }
    }

    function initEvents(): void {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
    }

    function loop(): void {
        clearCanvas();

        if (!state.game.isOver) {
            drawBall();
            drawPaddle();
            drawBricks();
            updateBrickCollisions();
            updateBallMovement();
            updatePaddleMovement();
            window.requestAnimationFrame(loop);
            return;
        }

        if (state.game.isWon && !hasTriggeredWinEffect) {
            hasTriggeredWinEffect = true;
            options.onWin?.();
        }
        drawEndScreen();
    }

    function start(): void {
        initEvents();
        if (options.forceWinOnStart || !hasRemainingBricks()) {
            state.game.isOver = true;
            state.game.isWon = true;
        }
        loop();
    }

    return { start };
}
