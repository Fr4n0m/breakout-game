# Breakout Atari Game

[![Astro](https://img.shields.io/badge/Astro-5A13EB?logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Canvas API](https://img.shields.io/badge/Canvas-API-1F2937)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

Proyecto open source inspirado en el clásico **Breakout**, desarrollado con **Astro** y lógica de juego en **TypeScript** usando `canvas`.

![breakout-game](https://github.com/Fr4n0m/breakout-game/assets/138864214/ae8feeca-dcf6-470a-9b58-f9c546944172)

## 🌐 Navegación rápida / Quick Navigation

- [Español](#es)
- [English](#en)

---

<a id="es"></a>
## 🇪🇸 Versión en español

### 🎮 Descripción

El objetivo es destruir todos los ladrillos rebotando la bola con la pala, evitando que la bola caiga fuera del área de juego.  
La partida comienza con un menú de dificultad integrado dentro del propio canvas.

### ✨ Funcionalidades

- Menú inicial de dificultad: `Fácil`, `Normal`, `Difícil`.
- Velocidad de bola ajustada según dificultad.
- Incremento progresivo de velocidad durante la partida.
- Ladrillos con resistencia variable (1 o 2 impactos).
- Estados visuales de ladrillos dañados.
- Mensaje de `Game Over` y reinicio con tecla.
- Diseño responsive sin scroll vertical.
- Navegación por teclado en el menú de dificultad.

### 🎯 Controles

- Mover pala: `←` `→` o `A` `D`
- Menú de dificultad: navegar con `←` `→` (también `↑` `↓`) y confirmar con `Enter` o `Espacio`
- Reiniciar tras `Game Over`: cualquier tecla

### 🧰 Stack técnico

- [Astro](https://astro.build/) (sitio y bundling)
- TypeScript (lógica del juego)
- Canvas API (renderizado)
- ESLint (calidad de código)

### 🗂️ Estructura del proyecto

```text
src/
  pages/
    index.astro
  scripts/
    breakout/
      config.ts
      state.ts
      engine.ts
      index.ts
```

### ⚙️ Instalación y uso

```bash
npm install
npm run dev
```

Abrir en navegador: `http://localhost:4321`

### 📜 Scripts disponibles

```bash
npm run dev        # entorno de desarrollo
npm run build      # build de producción
npm run preview    # previsualización del build
npm run typecheck  # chequeo de tipos (astro check)
npm run lint       # análisis estático de TypeScript
```

### 🧪 Calidad

Antes de subir cambios:

```bash
npm run typecheck
npm run lint
npm run build
```

### 🤝 Contribuciones

Las contribuciones son bienvenidas. Si quieres mejorar el juego o proponer nuevas ideas:

- Abre un issue para discutir cambios grandes.
- Envía un Pull Request con una descripción clara.
- Mantén el estilo de código y pasa los checks (`typecheck`, `lint`, `build`).

### 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE).

---

<a id="en"></a>
## 🇬🇧 English version

### 🎮 Description

This open-source project is inspired by the classic **Breakout**, built with **Astro** and game logic in **TypeScript** using `canvas`.

The goal is to destroy all bricks by bouncing the ball with the paddle while preventing the ball from falling outside the play area.  
Each game starts with a difficulty menu rendered directly in the canvas.

### ✨ Features

- Difficulty menu: `Easy`, `Normal`, `Hard`.
- Ball speed adjusted by difficulty.
- Progressive speed increase during gameplay.
- Variable brick resistance (1 or 2 hits).
- Visual states for damaged bricks.
- `Game Over` message and keyboard restart.
- Responsive layout with no vertical scroll.
- Keyboard navigation in the difficulty menu.

### 🎯 Controls

- Move paddle: `←` `→` or `A` `D`
- Difficulty menu: navigate with `←` `→` (`↑` `↓` also supported) and confirm with `Enter` or `Space`
- Restart after `Game Over`: any key

### 🧰 Tech stack

- [Astro](https://astro.build/) (site and bundling)
- TypeScript (game logic)
- Canvas API (rendering)
- ESLint (code quality)

### 🗂️ Project structure

```text
src/
  pages/
    index.astro
  scripts/
    breakout/
      config.ts
      state.ts
      engine.ts
      index.ts
```

### ⚙️ Installation and usage

```bash
npm install
npm run dev
```

Open in browser: `http://localhost:4321`

### 📜 Available scripts

```bash
npm run dev        # development mode
npm run build      # production build
npm run preview    # preview production build
npm run typecheck  # type check (astro check)
npm run lint       # TypeScript static analysis
```

### 🤝 Contributing

Contributions are welcome. If you want to improve the game or propose new ideas:

- Open an issue first for major changes.
- Submit a Pull Request with a clear description.
- Keep code style consistent and pass all checks (`typecheck`, `lint`, `build`).

### 📄 License

This project is released under the MIT License. See [LICENSE](./LICENSE).

---

Portfolio: [Fr4n0m - codebyfran.es](https://codebyfran.es)
