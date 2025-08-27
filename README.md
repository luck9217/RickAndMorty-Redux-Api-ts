<h1 align="center">Rick and Morty Search App</h1>

Discover characters, locations, and episodes from the Rick and Morty universe using the public GraphQL API. Built with Next.js, React, Redux Toolkit, and Apollo Client.

- Live site: https://lucas-chavez-rickandmorty-app.vercel.app/

## Features

- Browse and search characters, locations, and episodes
- Client‑side search (min 3 chars) with GraphQL filters and pagination
- Favorites management persisted in localStorage via Redux Toolkit
- Detail pages for characters, locations, and episodes
- Responsive UI with a collapsible sidebar and mobile hamburger menu
- Deployed to Vercel

## Tech Stack

- Next.js 12 + React 18 + TypeScript
- Apollo Client 3 (GraphQL)
- Redux Toolkit + React Redux
- CSS Modules and styled-components
- Rick and Morty GraphQL API: https://rickandmortyapi.com/graphql

## Getting Started

Prerequisites

- Node.js >= 16 and npm >= 8

Install dependencies

```bash
npm install
```

Run the dev server

```bash
npm run dev
```

Then open http://localhost:3000

Build for production

```bash
npm run build
```

Start the production server

```bash
npm run start
```

Lint

```bash
npm run lint
```

Note: A custom export script is not configured. Prefer Vercel for deployment.

## Project Structure

```
component/
	apollo/           # Apollo client and GraphQL queries
	common/           # Reusable UI (Header, SideBar, Cards, SearchBar, Loading)
	hook/             # Redux typed hooks
	models/           # TS models/interfaces
	store/            # Redux Toolkit store and slice
	styled/           # Styled-components helpers
pages/              # Next.js pages (home, characters, locations, episodes)
public/             # Static assets
styles/             # CSS Modules and global styles
```

Key files

- `component/apollo/client.ts` – Apollo Client pointing to the Rick and Morty GraphQL endpoint
- `component/apollo/queries/*` – GraphQL queries for characters, locations, episodes
- `component/store/*` – Redux store and character slice (favorites)
- `pages/index.tsx` – Home showing favorites with pagination and Refresh
- `pages/characters.tsx` / `pages/locations.tsx` / `pages/episodes.tsx` – Searchable lists

## Usage Notes

- Searching: Start typing (3+ characters) to filter results by name
- Favorites: Use the card actions to add/remove favorites; persisted in localStorage
- Mobile: Use the hamburger button to toggle the sidebar

## Deployment

The project is designed for Vercel. Typical flow:

1. Push to a Git repo (e.g., GitHub)
2. Import the repo in Vercel and deploy with defaults

Live demo: https://lucas-chavez-rickandmorty-app.vercel.app/

## Acknowledgements

- Data: Rick and Morty API (GraphQL) – https://rickandmortyapi.com/
- Framework: Next.js – https://nextjs.org/

## License

No license specified. If you plan to use or modify this project publicly, consider adding a license.
