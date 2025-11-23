/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1B4D3E', // Verde Bosque Profundo
                    light: '#2C6E58',
                    dark: '#113228',
                },
                secondary: {
                    DEFAULT: '#F2DBD6', // Rosa Palo
                    light: '#FFF0EB',
                    dark: '#D9BDB5',
                },
                accent: {
                    DEFAULT: '#D4AF37', // Dorado Suave
                    light: '#E5C565',
                },
                background: '#FAFAF9', // Crema muy claro
                dark: '#1F2937', // Texto oscuro
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Montserrat"', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'slide-in-right': 'slideInRight 0.5s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                }
            }
        },
    },
    plugins: [],
}
