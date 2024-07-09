npm create vite@latest

cd frontend
npm install
npm run dev

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

configurar os paths do template:

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

criar um arquivo index.css e importar:
@tailwind base;
@tailwind components;
@tailwind utilities;

npm i lucide-react

npm install react-router-dom

npm install localforage match-sorter sort-by