/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        degustar: {
          // Usa variáveis CSS para permitir troca de tema (ex: Outubro Rosa)
          // sem precisar mexer nas classes Tailwind espalhadas pelo projeto.
          // O sufixo "<alpha-value>" preserva o suporte a opacidade (ex: bg-degustar-orange/20).
          green: "rgb(var(--color-degustar-green) / <alpha-value>)",
          orange: "rgb(var(--color-degustar-orange) / <alpha-value>)",
          beige: "rgb(var(--color-degustar-beige) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
}
