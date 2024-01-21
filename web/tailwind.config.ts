import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffb784",
        "on-primary": "#4f2500",
        "primary-container": "#713700",
        "on-primary-container": "#ffdcc6",
        secondary: "#e4bfa8",
        "on-secondary": "#422b1b",
        "secondary-container": "#5b412f",
        "on-secondary-container": "#ffdcc6",
        tertiary: "#c8ca94",
        "on-tertiary": "#30330b",
        "tertiary-container": "#47491f",
        "on-tertiary-container": "#e4e6ae",
        error: "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",
        background: "#201a17",
        "on-background": "#ece0da",
        surface: "#201a17",
        "on-surface": "#ece0da",
        "surface-variant": "#52443b",
        "on-surface-variant": "#d6c3b7",
        outline: "#9f8d83",
        "inverse-on-surface": "#201a17",
        "inverse-surface": "#ece0da",
        "inverse-primary": "#944a00",
        shadow: "#000000",
        "surface-tint": "#ffb784",
        "outline-variant": "#52443b",
        scrim: "#000000",
      },
      fontSize: {
        "display-large": [
          "57px",
          {
            lineHeight: "64px",
            letterSpacing: "-0.25px",
            fontWeight: "400",
          },
        ],
        "display-medium": [
          "45px",
          {
            lineHeight: "52px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "display-small": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "headline-large": [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "headline-medium": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "headline-small": [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "body-large": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0.50px",
            fontWeight: "400",
          },
        ],
        "body-medium": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.25px",
            fontWeight: "400",
          },
        ],
        "body-small": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.40px",
            fontWeight: "400",
          },
        ],
        "label-large": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.10px",
            fontWeight: "500",
          },
        ],
        "label-medium": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.50px",
            fontWeight: "500",
          },
        ],
        "label-small": [
          "11px",
          {
            lineHeight: "16px",
            letterSpacing: "0.50px",
            fontWeight: "500",
          },
        ],
        "title-large": [
          "22px",
          {
            lineHeight: "28px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "title-medium": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "title-small": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.10px",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
