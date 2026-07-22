/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // Custom colors - sophisticated palette
        black: "#0D0D0D",
        ink: {
          950: "#15201D",
          900: "#1B2925",
          800: "#263631",
        },
        chalk: {
          50: "#FBFCFA",
          100: "#F3F5F2",
          200: "#E9EDE9",
        },
        steel: {
          300: "#CBD3CE",
          500: "#85928A",
          600: "#68756E",
        },
        copper: {
          400: "#E07A52",
          500: "#D5653E",
          600: "#B9502F",
        },
        navy: {
          900: "#15201D",
          800: "#1B2925",
          700: "#263631",
        },
        charcoal: {
          900: "#15201D",
          800: "#1B2925",
          700: "#68756E",
        },
        sand: {
          100: "#F3F5F2",
          200: "#E9EDE9",
          300: "#CBD3CE",
        },
        olive: {
          600: "#6b7c53",
          700: "#5a6845",
          800: "#495438",
        },
        clay: {
          500: "#c97e5a",
          600: "#b8694a",
          700: "#a5553a",
        },
        yellow: {
          400: "#D5653E",
          300: "#E07A52",
          500: "#B9502F",
          600: "#A6472A",
        },
        red: {
          600: "#E53935",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        bebas: ["var(--font-geist-sans)", "sans-serif"],
        oswald: ["var(--font-geist-sans)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        inter: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        bounce: "bounce 2s infinite",
        fadeInUp: "fadeInUp 0.6s ease-out",
        slideInLeft: "slideInLeft 0.8s ease-out",
        slideInRight: "slideInRight 0.8s ease-out",
        scaleIn: "scaleIn 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(21, 32, 29, 0.06)',
        'medium': '0 18px 48px rgba(21, 32, 29, 0.09)',
        'hard': '0 28px 80px rgba(21, 32, 29, 0.14)',
        'glow': '0 16px 36px rgba(213, 101, 62, 0.22)',
      },
    },
  },
  plugins: [],
};
