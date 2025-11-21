/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        ivory: '#FAF8F3',
        charcoal: '#1A1A1A',
        'warm-stone': '#C9B8A3',
        
        // Secondary Colors
        'deep-navy': '#2C3E50',
        'brushed-gold': '#B8956A',
        'warm-gray': '#8B857F',
        
        // Neutrals
        'pure-white': '#FFFFFF',
        'soft-black': '#0F0F0F',
        'light-sand': '#F2EDE7',
        'border-color': '#E0D9D0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(26, 26, 26, 0.04)',
        'medium': '0 4px 12px rgba(26, 26, 26, 0.06)',
        'elevated': '0 8px 24px rgba(26, 26, 26, 0.12)',
        'high': '0 20px 60px rgba(26, 26, 26, 0.15)',
      },
    },
  },
  plugins: [],
}