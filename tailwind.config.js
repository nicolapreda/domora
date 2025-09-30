module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'domora-gray': '#F5F5F5',
        'domora-dark': '#000000',
        'domora-secondary': '#8E8E8E',
        'domora-white': '#FFFFFF',
        'domora-accent': '#DA1793'
      },
    },
  },
  plugins: [],
};