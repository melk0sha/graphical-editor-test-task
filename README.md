# Graphical Editor Test Task

---

## DEPLOYMENT

- [**Graphical Editor Test Task Website link**](https://melk0sha-graphical-editor-test-task.netlify.app/ "Graphical Editor Test Task")

---

## HOW TO USE

- Clone this repository.
- Run `npm install` to install dependencies.
- Run `npm start` to start dev server and watch html result.

---

## TASK OVERVIEW

It is necessary to create a small graphical editor with `<canvas>` element.

#### Requirements:

1. User should be able to draw with the cursor
2. User should be able to change the color of the brush
3. User should be able to erase with the cursor
4. User should be able to reset `<canvas>`

- "Undo-redo" mechanism implementation will be a plus.
- This logic should be implemented using pure JS only.
- Interface needs to be developed using ‘React’.

#### Additional requirements:

1. Use JS spec ES6 and higher
2. Use JS classes
3. Use OOP and design patterns

---

## COMMENTS

To draw continuously, without spaces, I used the [Bresenham's line algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm). You can see its implementation in the `src/utils/brushWithoutSkipping.js` file path.

---

## TOOLS USING

**React**, **JavaScript** and **SCSS** were used here.

---

### DEVELOPMENT

@ 2020 Diana Ivanova (@melk0sha)
