/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            lineHeight: {
                'extra-tight': '1.15',
            },
            colors: {
                mygreen: "#4AB252",
                primary: "#4AB252",
                secondary: "#F97316",
                darkblue: "#0D1F3C",
                bluebt: "#002E5F"
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [
        require("flowbite/plugin")
    ],
};
