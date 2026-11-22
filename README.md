# FocusBoard

FocusBoard is a responsive, single-user task management dashboard built with React, Vite, JavaScript, and CSS. It provides full task CRUD operations, live search, status and priority filtering, dynamic dashboard statistics, a three-slide Focus Notes carousel, and browser persistence via `localStorage`.

## Key Features

- **Dynamic Dashboard Statistics**: Calculates Total Tasks, In Progress count, Completed count, and Completion Percentage directly from task state without hardcoded metrics.
- **Focus Notes Carousel**: Three interactive slides (`1 OF 3`, `2 OF 3`, `3 OF 3`) with Previous/Next buttons, slide indicators, and responsive styling.
- **Create, Edit & Delete Tasks**: Modal task form with title validation and confirmation dialog before deleting any task.
- **Status Updates**: Switch task status between `To do`, `In progress`, and `Completed` directly from each task card with immediate state and statistics updates.
- **Search & Multi-Filter Controls**: Case-insensitive title search combined with status tabs (`All`, `To do`, `In progress`, `Completed`), priority filter (`High`, `Medium`, `Low`), and filter reset.
- **Browser Persistence (`localStorage`)**: Persists task updates under `focusboard_tasks` across page reloads while initializing with six sample tasks only when no saved data exists.
- **Responsive & Accessible UI**: Supports desktop (`1440px`), tablet (`768px`), and mobile (`390px`) viewports with semantic elements, labels, keyboard escape handling, and focus outlines.

## Tech Stack

- React.js + Vite
- JavaScript (ES6+)
- CSS3 (Flexbox, CSS Grid, Media Queries)
- Lucide React (`lucide-react`)
- Browser `localStorage`

## Project Structure

```text
focusboard/
├── public/
├── screenshots/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FilterTabs.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── data/
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── AI_USAGE.md
├── index.html
├── package.json
└── README.md