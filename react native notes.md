useMemo
useLayoutEffect
useEffect
requestAnimationFrame
onLayout
InteractionManager

User Interaction
JavaScript Event Loop
useTransition
setImmediate
requestAnimationFrame
Native Layout Pass
InteractionManager

JavaScript Event Loop
useTransition
setImmediate
Native Layout Pass

========================================================================
screen render
========================================================================

JavaScript (JS) Thread (Business Logic & Application Code)
UI Thread (Main Thread) (Rendering & Native Interactions)
Shadow Thread (Layout Calculation)

The User Taps: The UI Thread captures the physical touch event and passes it over to the JS thread.
The Logic Runs: The JS Thread processes your event logic, changes the state, and creates a virtual DOM diff.
The Layout Computes: The Shadow Thread calculates the exact layout and sizes.
The Screen Updates: The UI Thread takes the calculated layout and updates the physical device screen.

Phase 1: The Render Phase (JS Thread)

- program logic code
- hooks (useState, useMemo,)
- useEffect (defined but inner code skiped)
- return but hit child component
- child component
- child component return jsx
- finish return

=> generated a new tree of elements (the Virtual DOM)

Phase 2: The Commit & Layout Phase (Shadow Thread)

- Fabric Commit: The Virtual DOM is pushed to React Native's native side (Fabric).
- The Shadow Thread takes over. It constructs a Native Shadow Tree and uses the Yoga layout engine to calculate the exact pixel positions, heights, widths, and margins for both Parent and Child elements.
- onLayout run

Phase 3: The Mutation & Paint Phase (UI Thread)

- Native UI Tree Mutation: The UI Thread creates or updates the actual native views (e.g., UIView on iOS, android.view on Android).
- The UI Paints: The OS flushes the graphics buffer. The user can now physically see the UI changes on their device screen.

=> screen is visually updated

Phase 4: Effect Execution (Back to JS Thread)

- useLayoutEffect Fires (Child first, then Parent):
  - standard React (web), useLayoutEffect fires before the browser paints. In React Native, due to the asynchronous nature of the threads, useLayoutEffect fires immediately after the layout is calculated and sent to native, but often practically simultaneous to the paint.
- useEffect Fires (Child first, then Parent):
  - run after the UI is painted and visible

special:
requestAnimationFrame

- Immediately before the next screen redraw/frame tick

========================================================================
user interaction
========================================================================
─── [STEP 1: USER INTERACTION / FRAME TICK] ────────────────────────────────────

1.  Screen Refreshes (New Frame Tick)
2.  ➔ `requestAnimationFrame` callbacks fire (JS Thread)
3.  User touches the screen / starts a navigation animation.
    (InteractionManager registers an active animation; blocks heavy tasks)

─── [STEP 2: JS EXECUTION & RENDERING] ───────────────────────────────────────── 4. Normal State Updates run ➔ Sync Component code runs top-to-bottom. 5. `useTransition` state updates run (Low priority, can be paused if user touches again). 6. Current JS Call Stack finishes ➔ ➔ `setImmediate` callbacks fire. 7. Parent & Child JSX are evaluated (Virtual DOM is generated).

─── [STEP 3: NATIVE LAYOUT & PAINT] ──────────────────────────────────────────── 8. Shadow Tree calculates Yoga layout. 9. UI Thread creates Native Views. 10. ➔ `onLayout` events fire (Native measures the views and alerts JS). 11. 🎨 THE SCREEN PAINTS (User sees the frame change).

─── [STEP 4: EFFECTS & POST-RENDER CLEANSING] ───────────────────────────────── 12. ➔ `useLayoutEffect` fires (Child then Parent). 13. ➔ `useEffect` fires (Child then Parent). 14. The user lets go of the screen, navigation animation finishes. 15. ➔ `InteractionManager.runAfterInteractions` callbacks fire (Safe zone for heavy lifting).
