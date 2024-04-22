# Pokedex

A pokedex that utilizes the pokeAPI, where you can view pokemons, and add them to your collection

## Tech Stack

- Remix.run
- Typescript
- Datastore - `localStorage`
- TailwindCSS
- DaisyUI

## Features

- Store and Remove Pokemons from `localStorage`
- Can not store a Pokemon more than once
- Owned Pokemons are showcased on the main page
- Search for Pokemons
    - Debounce mechanism implemented on search
- /pokemons/:id route that contains
    - Image
    - Name
    - Base Experience
    - Height
    - Weight
    - Type
    - Stats - Placed in separate tabs
    - Moves - Placed in separate tabs
- Dark and Light Theme