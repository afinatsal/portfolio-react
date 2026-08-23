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
        dot: '#F5F0EB',
        accent: '#F5F0EB',
        mint: '#F5F0EB',
        lime: '#B7F36B',
        ink: '#F5F0EB',
        dim: 'rgba(245,240,235,0.54)',
        line: '#353C42',
      },
      fontFamily: {
        display: ['"Archivo"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['"Inter Variable"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
