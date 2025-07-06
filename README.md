# 🎥 Movie Search App

## Overview

The **Movie Search App** allows users to search for movies, view details, and save their favorite movies. This project uses the **OMDB API** to fetch movie data.

## Prerequisites

To use this project, you need to get an **API key** from the OMDB API. Follow these steps:

1. Visit the [OMDB API website](https://www.omdbapi.com/apikey.aspx).
2. Enter your email address in the sign-up form.
3. Check your email for a confirmation message and click **Activate Key**.
4. Copy the API key sent to your email.

Replace the placeholder `YOUR_API_KEY` in the JavaScript file (`script.js`) with your API key.

---

## Repository Structure

- **Starter Files**:
  - Includes the complete HTML and CSS files.
  - Allows you to focus on writing JavaScript for functionality.
- **Final Files**:
  - Includes the fully implemented project with HTML, CSS, and JavaScript.

---

## How to Use

1. Add your **API key** to the `API_URL` variable in the `script.js` file:
   ```javascript
   const API_URL = "https://www.omdbapi.com/?apikey=YOUR_API_KEY";
   ```
2. Open the `index.html` file in your browser.
3. Search for movies using the search bar.
4. Add your favorite movies to the favorites section.

---

## Features

- Search for movies using the OMDB API.
- Save favorite movies in **localStorage**.
- Dynamically add and remove movies from the favorites list.

Enjoy coding! 🚀
