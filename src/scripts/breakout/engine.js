import { BROKEN_COLORS, BRICK_STATUS, CONFIG, KEY_BINDINGS, SPRITES } from "./config.js";
import { createDimensions, createInitialState } from "./state.js";

function clampSpeedWithDirection(value, min, max) {
    const sign = Math.sign(value) || 1;
    const clampedMagnitude = Math.min(Math.max(Math.abs(value), min), max);
    return clampedMagnitude * sign;
}

export function createBreakoutGame(canvas, ctx, spriteSheet) {
    canvas.width = CONFIG.canvas.width;
    canvas.height = CONFIG.canvas.height;

    const dimensions = createDimensions(SPRITES);
    const state = createInitialState(canvas, dimensions);

    function drawSprite(spriteKey, x, y, width, height) {
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

    function drawBall() {
        drawSprite("ball", state.ball.x, state.ball.y, state.ball.width, state.ball.height);
    }

    function drawPaddle() {
        drawSprite("paddle", state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);
    }

    function drawBricks() {
        for (let column = 0; column < CONFIG.bricks.columns; column++) {
            for (let row = 0; row < CONFIG.bricks.rows; row++) {
                const brick = state.bricks[column][row];
                if (brick.status !== BRICK_STATUS.DESTROYED) {
                    drawSprite(brick.color, brick.x, brick.y, dimensions.brickWidth, dimensions.brickHeight);
                }
            }
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawGameOver() {
        ctx.font = "24px Arial";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        ctx.font = "16px Arial";
        ctx.fillText("Press any key to restart", canvas.width / 2, canvas.height / 2 + 30);
    }

    function updateBrickCollisions() {
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
                    currentBrick.hits -= 1;
                    currentBrick.status = BRICK_STATUS.HIT;
                    currentBrick.color = BROKEN_COLORS[currentBrick.color];
                }
            }
        }
    }

    function updateBallMovement() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - state.game.lastTime) / 1000;
        const accelerationFactor = 1 + CONFIG.ball.speedIncrement * deltaTime;

        state.ball.dx = clampSpeedWithDirection(
            state.ball.dx * accelerationFactor,
            CONFIG.ball.minSpeed,
            CONFIG.ball.maxSpeed
        );
        state.ball.dy = clampSpeedWithDirection(
            state.ball.dy * accelerationFactor,
            CONFIG.ball.minSpeed,
            CONFIG.ball.maxSpeed
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
        }

        state.ball.x += state.ball.dx;
        state.ball.y += state.ball.dy;
    }

    function updatePaddleMovement() {
        if (state.input.rightPressed && state.paddle.x < canvas.width - state.paddle.width - 2) {
            state.paddle.x += CONFIG.paddle.sensitivity;
        } else if (state.input.leftPressed && state.paddle.x > 2) {
            state.paddle.x -= CONFIG.paddle.sensitivity;
        }
    }

    function resetGame() {
        document.location.reload();
    }

    function onKeyDown(event) {
        const { key } = event;
        if (KEY_BINDINGS.right.has(key)) {
            state.input.rightPressed = true;
        } else if (KEY_BINDINGS.left.has(key)) {
            state.input.leftPressed = true;
        } else if (state.game.isOver) {
            resetGame();
        }
    }

    function onKeyUp(event) {
        const { key } = event;
        if (KEY_BINDINGS.right.has(key)) {
            state.input.rightPressed = false;
        } else if (KEY_BINDINGS.left.has(key)) {
            state.input.leftPressed = false;
        }
    }

    function initEvents() {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
    }

    function loop() {
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

        drawGameOver();
    }

    function start() {
        initEvents();
        loop();
    }

    return { start };
}
