import confetti from "canvas-confetti";

let activeOverlay: HTMLCanvasElement | null = null;
let activeIntervalId: number | null = null;
let cleanupTimeoutId: number | null = null;

function createFullscreenOverlay(): HTMLCanvasElement {
    const overlay = document.createElement("canvas");
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "transparent";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "9999";
    document.body.appendChild(overlay);
    return overlay;
}

function clearActiveTimers(): void {
    if (activeIntervalId !== null) {
        window.clearInterval(activeIntervalId);
        activeIntervalId = null;
    }
    if (cleanupTimeoutId !== null) {
        window.clearTimeout(cleanupTimeoutId);
        cleanupTimeoutId = null;
    }
}

function removeActiveOverlay(): void {
    if (activeOverlay) {
        activeOverlay.remove();
        activeOverlay = null;
    }
}

function fireBurst(fire: ReturnType<typeof confetti.create>): void {
    fire({
        particleCount: 85,
        spread: 82,
        startVelocity: 52,
        ticks: 240,
        scalar: 1.05,
        origin: { x: 0.15 + Math.random() * 0.7, y: 0.18 + Math.random() * 0.28 }
    });
    fire({
        particleCount: 45,
        spread: 58,
        startVelocity: 62,
        ticks: 220,
        scalar: 1.1,
        origin: { x: 0.02, y: 0.75 }
    });
    fire({
        particleCount: 45,
        spread: 58,
        startVelocity: 62,
        ticks: 220,
        scalar: 1.1,
        origin: { x: 0.98, y: 0.75 }
    });
}

export function launchWinFireworks(): void {
    clearActiveTimers();
    removeActiveOverlay();

    const overlay = createFullscreenOverlay();
    activeOverlay = overlay;

    const fire = confetti.create(overlay, { resize: true, useWorker: true });
    fireBurst(fire);
    activeIntervalId = window.setInterval(() => fireBurst(fire), 320);

    cleanupTimeoutId = window.setTimeout(() => {
        clearActiveTimers();
        fire.reset();
        removeActiveOverlay();
    }, 2200);
}
