const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Build your palette here
        transparent: "transparent",
        current: "currentColor",
        grayB: colors.blueGray,
        grayC: colors.gray,
        grayT: colors.trueGray,
        grayW: colors.warmGray,
        tel1: "#17212B",
        tel2: "#0E1621",
        srci: "#242F3D",
        mess: "#182533",
        lime: "#84CC16",
        teal: "#14B8A6",
        cyan: "#06B6D4",
        violet: "#7C3AED",
        fuchsia: "#C026D3",
        rose: "#F43F5E",
        orabge: "#F97316",
        won: "#2B5278",
      },
      height: {
        h9: "86%",
      },
      width: {
        400: "400px",
      },
      zIndex: {
        "-10": "-10",
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
