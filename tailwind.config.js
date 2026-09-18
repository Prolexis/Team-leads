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
          bg: '#0b0f19',        // Deep elegant charcoal slate
          bgLight: '#f9fafb',   // Pure clean porcelain slate
          card: '#111827',      // Tailored card background
          cardLight: '#ffffff', // Crisp white card
          cardHover: '#1f2937',
          border: '#1f2937',    // Subtle dark border
          borderLight: '#e5e7eb', // Soft light border
          text: '#f3f4f6',      // Soft high-contrast white
          textLight: '#111827', // Slate 900
          secondary: '#9ca3af', // Balanced muted gray
          secondaryLight: '#6b7280',
          muted: '#6b7280',
        },
        brand: {
          warm: '#d97706',      // Refined amber ember
          dark: '#b45309',
          light: '#fef3c7',
        },
        payer: {
          DEFAULT: '#059669',   // Refined executive emerald
          light: '#10b981',
          dark: '#047857',
        },
        wsp: {
          DEFAULT: '#15803d',   // Professional dark forest WhatsApp
          light: '#16a34a',
        }
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'dark-premium': '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
