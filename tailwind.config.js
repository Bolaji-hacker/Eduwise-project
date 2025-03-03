/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary_b_dark: "#001797",
                primary_b: "#000B46",
                primary_b_100: "#F5F8FC26",
                light_b: "#E6E9FA",
                text_1: "#303030",
                text_2: "#404040",
                text_3: "#777777",
                text_4: "#667085",
                // orange
                orange: "#FF9500",
                // /'red'
                red_1: "#E34444",
                // green
                green_1: "#44B649",
                // yellow
                yellow_1: "#FFC22E",
            },
            fontFamily: {
                circular: ["Euclid Circular A", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
