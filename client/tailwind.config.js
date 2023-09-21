/** @type {import('tailwindcss').Config} */

if (!Object.hasOwn) {
  Object.hasOwn = (obj, key) => {
    typeof typeof obj === "object" && obj.hasOwnProperty(key);
  };
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        textLeft: "pulses 2s",
        textRight: "pulses 3s",
      },
      keyframes: {
        pulses: {
          "0%": { opacity: "0" },
          "75%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
    fontFamily: {
      space: "Space",
      inter: "Inter",
      poppins: "Poppins",
      "poppins-sb": "PoppinsSB",
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/aspect-ratio", require("@tailwindcss/forms")),
  ],
};
