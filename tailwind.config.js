/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F0E17",
        surface: "#1A1826",
        surface2: "#221F32",
        line: "#332E48",
        paper: "#F3F0FF",
        muted: "#948FB0",
        amber: "#F2A93B",
        violet: "#7C6CF2",
        coral: "#F2685C",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        bar1: { "0%,100%": { height: "30%" }, "50%": { height: "90%" } },
        bar2: { "0%,100%": { height: "70%" }, "50%": { height: "20%" } },
        bar3: { "0%,100%": { height: "50%" }, "50%": { height: "100%" } },
        bar4: { "0%,100%": { height: "90%" }, "50%": { height: "40%" } },
      },
      animation: {
        bar1: "bar1 0.9s ease-in-out infinite",
        bar2: "bar2 1.1s ease-in-out infinite",
        bar3: "bar3 0.7s ease-in-out infinite",
        bar4: "bar4 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
