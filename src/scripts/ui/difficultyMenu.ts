import type { Difficulty } from "../breakout/config";
import { initBreakoutGame } from "../breakout/index";
import { launchWinFireworks } from "./winEffects";

const MENU_SELECTOR = "#difficulty-menu";
const BUTTON_SELECTOR = "[data-difficulty]";

export function setupDifficultyMenu(): void {
    const difficultyMenu = document.querySelector<HTMLDivElement>(MENU_SELECTOR);
    const difficultyButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(BUTTON_SELECTOR));

    if (!difficultyMenu || !difficultyButtons.length) return;
    let activeIndex = difficultyButtons.findIndex((button) => button.dataset.difficulty === "normal");
    if (activeIndex < 0) activeIndex = 0;

    const syncActiveButton = (): void => {
        difficultyButtons.forEach((button, index) => {
            const isActive = index === activeIndex;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
            if (isActive) button.focus();
        });
    };

    const startGameWithDifficulty = (difficulty: Difficulty): void => {
        initBreakoutGame({
            canvasSelector: "#game-canvas",
            spriteSelector: "#sprite",
            difficulty,
            onWin: launchWinFireworks
        });
        difficultyMenu.style.display = "none";
    };

    difficultyButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const difficulty = button.dataset.difficulty as Difficulty | undefined;
            if (!difficulty) return;
            activeIndex = index;
            syncActiveButton();
            startGameWithDifficulty(difficulty);
        });
    });

    difficultyMenu.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            activeIndex = (activeIndex + 1) % difficultyButtons.length;
            syncActiveButton();
            return;
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            activeIndex = (activeIndex - 1 + difficultyButtons.length) % difficultyButtons.length;
            syncActiveButton();
            return;
        }

        if (event.key === "Home") {
            event.preventDefault();
            activeIndex = 0;
            syncActiveButton();
            return;
        }

        if (event.key === "End") {
            event.preventDefault();
            activeIndex = difficultyButtons.length - 1;
            syncActiveButton();
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const activeButton = difficultyButtons[activeIndex];
            const difficulty = activeButton?.dataset.difficulty as Difficulty | undefined;
            if (difficulty) startGameWithDifficulty(difficulty);
        }
    });

    syncActiveButton();
}
