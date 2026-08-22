/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        section: '#000000',
        panel: '#252A2E',
        dot: '#F1F4F2',
        accent: '#BFFAF5',
        mint: '#74E6D5',
        lime: '#B7F36B',
        ink: '#F1F4F2',
        dim: '#9CA6AA',
        line: '#353C42',
      },
      fontFamily: {
        display: ['"Archivo"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['"Inter"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
