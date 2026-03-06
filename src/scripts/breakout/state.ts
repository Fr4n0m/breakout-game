import { BRICK_COLORS, BRICK_STATUS, CONFIG, type BrickColorKey, type BrickStatus, type SpritesMap } from "./config";

export type Dimensions = {
    paddleWidth: number;
    paddleHeight: number;
    ballWidth: number;
    ballHeight: number;
    brickWidth: number;
    brickHeight: number;
};

export type Brick = {
    x: number;
    y: number;
    status: BrickStatus;
    color: BrickColorKey;
    hits: 1 | 2;
};

type BallConfig = {
    initialSpeed: number;
    speedIncrement: number;
    maxSpeed: number;
    minSpeed: number;
    scale: number;
};

export type GameState = {
    game: {
        isOver: boolean;
        lastTime: number;
    };
    input: {
        rightPressed: boolean;
        leftPressed: boolean;
    };
    paddle: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    ball: {
        x: number;
        y: number;
        width: number;
        height: number;
        dx: number;
        dy: number;
    };
    bricks: Brick[][];
};

export function createDimensions(sprites: SpritesMap): Dimensions {
    return {
        paddleWidth: sprites.paddle.width * CONFIG.paddle.scale,
        paddleHeight: sprites.paddle.height * CONFIG.paddle.scale,
        ballWidth: sprites.ball.width * CONFIG.ball.scale,
        ballHeight: sprites.ball.height * CONFIG.ball.scale,
        brickWidth: sprites.blueBrick.width * CONFIG.bricks.scale,
        brickHeight: sprites.blueBrick.height * CONFIG.bricks.scale
    };
}

function createBrick(column: number, row: number, brickWidth: number, brickHeight: number): Brick {
    const x = column * (brickWidth + CONFIG.bricks.padding) + CONFIG.bricks.offsetLeft;
    const y = row * (brickHeight + CONFIG.bricks.padding) + CONFIG.bricks.offsetTop;
    const color = BRICK_COLORS[Math.floor(Math.random() * BRICK_COLORS.length)];
    const hits: 1 | 2 = Math.random() < 0.5 ? 1 : 2;
    return { x, y, status: BRICK_STATUS.ACTIVE, color, hits };
}

export function createBricks(brickWidth: number, brickHeight: number): Brick[][] {
    return Array.from({ length: CONFIG.bricks.columns }, (_, column) =>
        Array.from({ length: CONFIG.bricks.rows }, (_, row) => createBrick(column, row, brickWidth, brickHeight))
    );
}

export function createInitialState(canvas: HTMLCanvasElement, dimensions: Dimensions, ballConfig: BallConfig = CONFIG.ball): GameState {
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
        dx: ballConfig.initialSpeed,
        dy: -ballConfig.initialSpeed
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
