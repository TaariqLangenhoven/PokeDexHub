# 🧠 Pokédex Web App

A modular, modern JavaScript Pokédex that fetches data from the [PokéAPI](https://pokeapi.co/) and displays rich Pokémon information like stats, abilities, type effectiveness, moves, and more. Built for speed, scalability, and clarity with a clean folder-based architecture.

---

## 🚀 Features

- 🔍 Search Pokémon by **name** or **ID**
- 📊 View detailed **base stats** (with Chart.js)
- 🌿 Display **types**, **resistances**, **weaknesses**, and **immunities**
- 🧠 View **ability descriptions** (primary and secondary)
- 📜 View **level-up moves** with type icons
- 🧭 Navigate to previous/next Pokémon
- 📦 Modular codebase for clean separation of concerns

---

## 📁 Folder Structure

```
/api
  ├── apiCalls.js          # Fetch functions (fetchPokemon, fetchAbility, etc.)
  └── endpoints.js         # Centralized API endpoint constants

/chart
  └── chartData.js         # Chart.js data generation logic

/ui
  ├── renderAboutSection.js # getAboutSection()
  ├── renderStatsSection.js # getStatsSection()
  ├── renderMovesSection.js # getMovesSection()
  └── renderHeadSection.js  # Renders main Pokémon card/header
  └── eventHandlers.js      # setupNavigationButtons(), setupTabButtons()

/utils
  ├── getAbilitiesInfo.js   # getAbilityDescription()
  ├── getTypeInfo.js        # getTypeInfo()
  ├── helpers.js            # checkAPIResponse(), getSpeciesDescription()
  └── moveListHelpers.js    # getPokemonMovesByLevel(), displayPokemonMovesByLevel()
  └── processPokemonData.js # processPokemonData()
  └── uiHelpers.js          # displaySecondType()

typeClasses.js             # Type-based CSS classes and icons
main.js                    # Main orchestration file
index.html
styles.css
```

---

## 🛠️ Technologies Used

- Vanilla JavaScript (ES6+)
- HTML5 & CSS3
- [Chart.js](https://www.chartjs.org/) for stat visualization
- [FontAwesome](https://fontawesome.com/) for icons
- [PokéAPI](https://pokeapi.co/) as data source

---

## 📦 Getting Started

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/pokedex-app.git
cd pokedex-app
```

2. **Open `index.html` in your browser.**  
   No build tools or dependencies required — it's a pure frontend app.

> Optionally, serve with a local server (e.g. `Live Server` in VSCode) to avoid CORS issues.

---

## ✍️ Future Improvements

- 🔄 Add loading spinners and error UI
- 📱 Make UI fully responsive for desktop
- 🧪 Add unit tests for helper functions
- 🧰 Add advanced filters (by type, generation, etc.)
- 🌐 Add offline caching using localStorage or IndexedDB

---

## 🙌 Credits

- [PokéAPI](https://pokeapi.co/) for the awesome API
- [Chart.js](https://www.chartjs.org/) for charts
- [FontAwesome](https://fontawesome.com/) for icons

---

## 📃 License

MIT © Taariq Langenhoven
