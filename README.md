# Spin The Wheel – React UI Documentation

## Overview

This project is a **multi-step Spin-the-Wheel wellness experience** built with **React + TypeScript + Vite**. Users answer a few questions, spin a wheel, and receive a personalized wellness tip based on:

* Selected category
* Wheel result
* Crew type (Onshore / Offshore)

The experience includes animations, confetti celebration, and clean UI styling.

---

## Tech Stack

* **React + TypeScript** – UI and state management
* **Vite** – Development & build tool
* **Tailwind CSS** – Styling
* **Framer Motion** – Animations (steps & wheel rotation)
* **react-confetti** – Celebration effect
* **shadcn/ui** – UI components (`Button`, `Card`)

---

## Application Flow

### Step 1 – User Info

* Collects **name** and **email** (required)
* Cannot proceed unless required fields are filled

### Step 2 – Category Selection

* User selects a wellness category:

  * Sleep
  * Stress
  * Energy
  * Focus
  * Fitness
  * Nutrition

### Step 3 – Crew Type

* User selects:

  * **Onshore** or **Offshore**
* Determines which tip dataset is used

### Step 4 – Spin the Wheel

* Animated wheel spins
* Arrow at the top indicates the final result
* Confetti burst appears on landing
* Displays:

  * Chosen category
  * Landed category
  * Personalized tip

Button behavior:

* **Spin Now** → spins the wheel
* **Re-spin** → resets wheel and result

---

## Key Concepts

### Wheel Rendering

* The wheel uses a **conic-gradient** background
* Labels are rendered using **SVG textPath**
* Text follows the arc of each slice

### Accurate Result Matching

* Each slice angle is calculated dynamically:

  ```ts
  const slice = 360 / wheelItems.length;
  ```
* The wheel rotates so the **center of the chosen slice** aligns perfectly with the arrow

This guarantees:

* Visual slice = logic result

---

## Tip Logic

Tips are stored in two datasets:

* `onshoreTips`
* `offshoreTips`

Structure:

```ts
Record<ChosenCategory, Record<LandedCategory, TipText>>
```

Final tip is selected by:

```ts
const tipsSource = crewType === 'Offshore' ? offshoreTips : onshoreTips;
const tip = tipsSource[category][landed];
```

---

## Confetti Behavior

* Confetti triggers after a successful spin
* Large burst for visual impact
* Automatically stops after a few seconds

---

## Reusability & Extension Ideas

You can easily:

* Add more categories
* Add sound effects
* Add analytics on spins
* Persist results to backend
* Add weighted probabilities per slice

---

## Running Locally (Summary)

```bash
npm install
npm run dev
```

Make sure Tailwind and shadcn/ui are configured.

---

## UX Notes

* Required steps are enforced
* Back button allows safe navigation
* Button states prevent invalid actions
* Wheel result always matches arrow position

---

## Author Notes

This component is designed to be:

* Deterministic (no mismatch between UI and logic)
* Animation-safe
* Easy to maintain and extend

---

✅ Ready for production UI iteration or backend integration.
