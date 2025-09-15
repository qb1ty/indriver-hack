/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './constants/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "montserrat-regular": 'Montserrat-Regular',
        "montserrat-medium": 'Montserrat-Medium',
        "montserrat-bold": 'Montserrat-Bold',
        "montserrat-semibold": 'Montserrat-SemiBold'
      },
    },
  },
  darkMode: "class",
  plugins: [],
}