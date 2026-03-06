# Breakout Atari Game

Proyecto personal open source inspirado en el clásico **Breakout**, implementado con **Astro** y lógica de juego en **TypeScript** usando `canvas`.

![breakout-game](https://github.com/Fr4n0m/breakout-game/assets/138864214/ae8feeca-dcf6-470a-9b58-f9c546944172)

## Descripción

El objetivo es destruir todos los ladrillos rebotando la bola con la pala, evitando que la bola caiga fuera del área de juego.  
La partida comienza con un menú de dificultad integrado dentro del propio canvas.

## Funcionalidades

- Menú inicial de dificultad: `Fácil`, `Normal`, `Difícil`.
- Velocidad de bola ajustada según dificultad.
- Incremento progresivo de velocidad durante la partida.
- Ladrillos con resistencia variable (1 o 2 impactos).
- Estados visuales de ladrillos dañados.
- Mensaje de `Game Over` y reinicio con tecla.
- Diseño responsive sin scroll vertical.
- Navegación por teclado en el menú de dificultad.

## Controles

- Mover pala: `←` `→` o `A` `D`
- Menú de dificultad:
  - Navegar: `←` `→` (`↑` `↓` también)
  - Confirmar: `Enter` o `Espacio`
- Reiniciar tras `Game Over`: cualquier tecla

## Stack Técnico

- [Astro](https://astro.build/) (sitio y bundling)
- TypeScript (lógica del juego)
- Canvas API (renderizado)
- ESLint (calidad de código)

## Estructura del Proyecto

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

## Instalación y Uso

```bash
npm install
npm run dev
```

Abrir en navegador: `http://localhost:4321`

## Scripts Disponibles

```bash
npm run dev        # entorno de desarrollo
npm run build      # build de producción
npm run preview    # previsualización del build
npm run typecheck  # chequeo de tipos (astro check)
npm run lint       # análisis estático de TypeScript
```

## Calidad

Antes de subir cambios:

```bash
npm run typecheck
npm run lint
npm run build
```

## Roadmap (ideas)

- Sistema de puntuación y HUD en pantalla.
- Niveles/patrones de ladrillos.
- Efectos de sonido y música.
- Pantalla de pausa y reanudación.
- Guardado de récord local.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE`.
