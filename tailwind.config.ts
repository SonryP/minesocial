import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';
import fs from 'fs';

const BLOCK_DIR = 'imgs/blocks';
const ITEM_DIR = 'imgs/items';
const PAINTING_DIR = 'imgs/paintings';
const BLOCK_SPACING_MAX = 99;

const backgroundObj: Record<string, string> = {};
const spacingObj: Record<string, string> = {};

// Dynamically generate background and spacing objects.
fs.readdirSync(`./public/${BLOCK_DIR}`).forEach(file => {
  const blockName = `block-${file.split('.')[0]}`;
  backgroundObj[blockName] = `url('/${BLOCK_DIR}/${file}')`;
});

fs.readdirSync(`./public/${ITEM_DIR}`).forEach(file => {
  const itemName = `item-${file.split('.')[0]}`;
  backgroundObj[itemName] = `url('/${ITEM_DIR}/${file}')`;
});

fs.readdirSync(`./public/${PAINTING_DIR}`).forEach(file => {
  const paintingName = `painting-${file.split('.')[0]}`;
  backgroundObj[paintingName] = `url('/${PAINTING_DIR}/${file}')`;
});

Array.from({ length: BLOCK_SPACING_MAX }, (_, i) => i + 1).forEach(i => {
  spacingObj[`${i}-block`] = `calc(var(--block-size) * ${i})`;
});

// Tailwind configuration.
const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
      minecraft: ['Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
      'minecrafter': ['Minecrafter', 'Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
      'minecrafter-alt': ['Minecrafter Alt', 'Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
      'minecraft-evenings': ['Minecraft Evenings', 'Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
      mono: ['Monocraft', ...defaultTheme.fontFamily.mono],
      monocraft: ['Monocraft', 'Minecraft', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        link: '#aaaaff',
        panel: '#C6C6C6',
        'panel-dark': '#373737',
        gold: '#FFAA00',
        gray: '#AAAAAA',
        blue: '#5555FF',
        green: '#55FF55',
        aqua: '#55FFFF',
        red: '#FF5555',
        'light-purple': '#FF55FF',
        yellow: '#FFFF55',
      },
      backgroundImage: {
        sign: "url(/imgs/ui/sign.pngs)",
        ...backgroundObj,
      },
      spacing: {
        '1/16-block': 'calc(var(--block-size) / 16)',
        '1/8-block': 'calc(var(--block-size) / 8)',
        '1/4-block': 'calc(var(--block-size) / 4)',
        '1/2-block': 'calc(var(--block-size) / 2)',
        ...spacingObj,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
