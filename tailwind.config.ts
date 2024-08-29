import type { Config } from "tailwindcss";

const config: Config = {
  mode:"jit",
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app/auth/ondc/components/**/*.{js,ts,jsx,tsx}',
    './src/app/globals.css',
    "./node_modules/flowbite/**/*.js",
    './src/layouts/DashboardLayout.tsx',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  corePlugins: {},

  variants: {
    extend: {},
  },
};
export default config;
