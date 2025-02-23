const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    // 'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
      },
    },
  },
  plugins: [
    // require('flowbite/plugin'),
    flowbite.plugin(),
    require("tailwind-scrollbar"),
  ],
};
