import { BRICK_COLORS, BRICK_STATUS, CONFIG } from "./config.js";

export function createDimensions(sprites) {
    return {
        paddleWidth: sprites.paddle.width * CONFIG.paddle.scale,
        paddleHeight: sprites.paddle.height * CONFIG.paddle.scale,
        ballWidth: sprites.ball.width * CONFIG.ball.scale,
        ballHeight: sprites.ball.height * CONFIG.ball.scale,
        brickWidth: sprites.blueBrick.width * CONFIG.bricks.scale,
        brickHeight: sprites.blueBrick.height * CONFIG.bricks.scale
    };
}

function createBrick(column, row, brickWidth, brickHeight) {
    const x = column * (brickWidth + CONFIG.bricks.padding) + CONFIG.bricks.offsetLeft;
    const y = row * (brickHeight + CONFIG.bricks.padding) + CONFIG.bricks.offsetTop;
    const color = BRICK_COLORS[Math.floor(Math.random() * BRICK_COLORS.length)];
    const hits = Math.random() < 0.5 ? 1 : 2;
    return { x, y, status: BRICK_STATUS.ACTIVE, color, hits };
}

export function createBricks(brickWidth, brickHeight) {
    return Array.from({ length: CONFIG.bricks.columns }, (_, column) =>
        Array.from({ length: CONFIG.bricks.rows }, (_, row) => createBrick(column, row, brickWidth, brickHeight))
    );
}

export function createInitialState(canvas, dimensions) {
    const paddle = {
        x: (canvas.width - dimensions.paddleWidth) / 2,
        y: canvas.height - dimensions.paddleHeight - CONFIG.paddle.marginBottom,
        width: dimensions.paddleWidth,
        height: dimensions.paddleHeight
    };

    const ball = {
        x: canvas.width / 2 - dimensions.ballWidth / 2,
        y: canvas.height - 30 - dimensions.ballHeight / 2,
        width: dimensions.ballWidth,
        height: dimensions.ballHeight,
        dx: CONFIG.ball.initialSpeed,
        dy: -CONFIG.ball.initialSpeed
    };

    return {
        game: {
            isOver: false,
            lastTime: performance.now()
        },
        input: {
            rightPressed: false,
            leftPressed: false
        },
        paddle,
        ball,
        bricks: createBricks(dimensions.brickWidth, dimensions.brickHeight)
    };
}
