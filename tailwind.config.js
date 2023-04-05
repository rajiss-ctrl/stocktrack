/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-texture": "url('./assets/images/bg.png')",
      },
      screens: {
        less_sm: "540px",
        // => @media (min-width: 640px) { ... }

        // laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        // desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
