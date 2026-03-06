export type SpriteRect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const SPRITES = {
    blueBrick: { x: 772, y: 390, width: 384, height: 128 },
    blueBrokeBrick: { x: 0, y: 0, width: 384, height: 128 },
    greenLightBrick: { x: 0, y: 130, width: 384, height: 128 },
    greenLightBrokeBrick: { x: 0, y: 260, width: 384, height: 128 },
    purpleBrick: { x: 0, y: 390, width: 384, height: 128 },
    purpleBrokeBrick: { x: 0, y: 520, width: 384, height: 128 },
    redBrick: { x: 772, y: 260, width: 384, height: 128 },
    redBrokeBrick: { x: 772, y: 130, width: 384, height: 128 },
    orangeBrick: { x: 772, y: 0, width: 384, height: 128 },
    orangeBrokeBrick: { x: 772, y: 650, width: 384, height: 128 },
    blueLightBrick: { x: 386, y: 650, width: 384, height: 128 },
    blueLightBrokeBrick: { x: 386, y: 520, width: 384, height: 128 },
    yellowBrick: { x: 386, y: 390, width: 384, height: 128 },
    yellowBrokeBrick: { x: 386, y: 260, width: 384, height: 128 },
    greenBrick: { x: 386, y: 130, width: 384, height: 128 },
    greenBrokeBrick: { x: 386, y: 0, width: 384, height: 128 },
    grayBrick: { x: 772, y: 520, width: 384, height: 128 },
    grayBrokeBrick: { x: 0, y: 650, width: 384, height: 128 },
    brownBrick: { x: 386, y: 780, width: 384, height: 128 },
    brownBrokeBrick: { x: 0, y: 780, width: 384, height: 128 },
    paddle: { x: 0, y: 910, width: 347, height: 64 },
    ball: { x: 1403, y: 652, width: 64, height: 64 }
} as const satisfies Record<string, SpriteRect>;

export type SpriteKey = keyof typeof SPRITES;
export type BrickColorKey = Exclude<SpriteKey, "paddle" | "ball">;
export type Difficulty = "easy" | "normal" | "hard";
export type SpritesMap = typeof SPRITES;
export type BallDifficultySettings = {
    initialSpeed: number;
    speedIncrement: number;
    maxSpeed: number;
};

export const CONFIG = {
    canvas: { width: 448, height: 400 },
    paddle: { scale: 0.2, sensitivity: 8, marginBottom: 10 },
    ball: { scale: 0.2, initialSpeed: 3, minSpeed: 1, maxSpeed: 10, speedIncrement: 0.02 },
    bricks: { rows: 7, columns: 7, padding: 2, offsetTop: 20, offsetLeft: 15, scale: 0.15 }
} as const;

export const DIFFICULTY_PRESETS: Record<Difficulty, BallDifficultySettings> = {
    easy: { initialSpeed: 2.3, speedIncrement: 0.01, maxSpeed: 7 },
    normal: { initialSpeed: 3, speedIncrement: 0.02, maxSpeed: 10 },
    hard: { initialSpeed: 3.8, speedIncrement: 0.03, maxSpeed: 13 }
};

export const BRICK_STATUS = { ACTIVE: 1, HIT: 2, DESTROYED: 0 } as const;
export type BrickStatus = (typeof BRICK_STATUS)[keyof typeof BRICK_STATUS];

export const BRICK_COLORS = [
    "blueBrick",
    "blueLightBrick",
    "greenLightBrick",
    "purpleBrick",
    "redBrick",
    "orangeBrick",
    "yellowBrick",
    "greenBrick",
    "grayBrick",
    "brownBrick"
] as const satisfies readonly BrickColorKey[];

export const BROKEN_COLORS = {
    blueBrick: "blueBrokeBrick",
    blueLightBrick: "blueLightBrokeBrick",
    greenLightBrick: "greenLightBrokeBrick",
    purpleBrick: "purpleBrokeBrick",
    redBrick: "redBrokeBrick",
    orangeBrick: "orangeBrokeBrick",
    yellowBrick: "yellowBrokeBrick",
    greenBrick: "greenBrokeBrick",
    grayBrick: "grayBrokeBrick",
    brownBrick: "brownBrokeBrick"
} as const;

export const KEY_BINDINGS = {
    right: new Set(["Right", "ArrowRight", "d"]),
    left: new Set(["Left", "ArrowLeft", "a"])
} as const;
