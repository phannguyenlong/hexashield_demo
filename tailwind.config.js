// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          gray: {
            650: '#374151',
            750: '#1f2937',
            850: '#111827',
          }
        },
        animation: {
          pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          spin: 'spin 1s linear infinite',
        },
        keyframes: {
          pulse: {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.5 },
          },
          spin: {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
          },
        },
      },
    },
    plugins: [],
  }