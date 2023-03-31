/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
            backgroundImage: {
        'home-texture': "url('./assets/images/bg.png')",
      }
    },
  },
  plugins: [],
}
