import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: '#4353FF',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
		animation: {
			'spin-slow': 'spin 20s linear infinite',
			'fade-in': 'fadeIn 0.2s ease-out forwards',
			'pulse': 'pulse 2s ease-in-out infinite',
			scanning: 'scanning 1.2s linear infinite',
			confettiFall: 'confettiFall 2.5s linear forwards',
		},
		keyframes: {
			fadeIn: {
				'0%': { opacity: '0', transform: 'translateY(50px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' },
			},
			pulse: {
				'0%, 100%': {
					transform: 'scale(1)',
					opacity: '1',
				},
				'50%': {
					transform: 'scale(1.2)',
					opacity: '0.7',
				},
			},
			scanning: {
				'0%': { transform: 'translateX(-100%)' },
				'100%': { transform: 'translateX(100%)' },
			},
			confettiFall: {
				'0%': {
					transform: 'translateY(0) rotateZ(0deg)',
					opacity: '1',
				},
				'100%': {
					transform: 'translateY(100vh) rotateZ(720deg)',
					opacity: '0',
				},
			},
		},
	},
	safelist: [
		{ pattern: /col-span-(1|2)/ }, // Génère col-span-1 et col-span-2
		{ pattern: /row-span-(1|2)/ }, // Génère row-span-1 et row-span-2
	],
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
