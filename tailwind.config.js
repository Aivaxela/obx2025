/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "hover:text-green-400",
    "hover:text-red-400",
    "hover:text-purple-400",
    "hover:text-blue-400",
    "border-green-400",
    "border-red-400",
    "border-purple-400",
    "border-blue-400",
    "hover:bg-green-400",
    "hover:bg-red-400",
    "hover:bg-purple-400",
    "hover:bg-blue-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-red-400",
    "bg-blue-400",
    "text-slate-800",
    "hover:text-slate-800",
  ],
};
