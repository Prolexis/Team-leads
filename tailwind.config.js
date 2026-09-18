/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crm: {
          bg: '#0f111a',
          bgLight: '#f8fafc',
          card: '#181b26',
          cardLight: '#ffffff',
          cardHover: '#202434',
          border: '#262a3b',
          borderLight: '#e2e8f0',
          text: '#f1f5f9',
          textLight: '#0f172a',
          secondary: '#94a3b8',
          secondaryLight: '#64748b',
          muted: '#64748b',
        },
        brand: {
          warm: '#ea580c', // Soft warm terracotta / fire
          gold: '#d97706', // Subtle amber gold
          light: '#fef3c7',
        },
        payer: {
          DEFAULT: '#10b981', // Clean emerald
          light: '#34d399',
          dark: '#059669',
        },
        wsp: {
          DEFAULT: '#16a34a',
          dark: '#15803d',
          light: '#22c55e',
        }
      }
    },
  },
  plugins: [],
}
