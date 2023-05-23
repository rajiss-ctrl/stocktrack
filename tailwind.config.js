/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(225,225,225,0.17)",
        "dark-purp-hover": "#213a84",
      },
      backgroundImage: {
        "home-texture": "url('./assets/images/bg.png')",
      },
      screens: {
        less_sm: "540px",
        less_md: "712px",
        tab: "768px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        // desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
