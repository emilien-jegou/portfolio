/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      dm: ['DM Sans', 'system-ui', 'sans-serif'],
      sans: ['NotoSans', 'system-ui', 'sans-serif'],
      pixel: ['Jersey', 'serif'],
      mono: ['FiraCode','ui-monospace', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
    },
    variants: {
      extend: {
        ringColor: ['focus-visible'],
        ringOffsetWidth: ['focus-visible'],
        ringWidth: ['focus-visible'],
      },
    },
    extend: {
      ringColor: {
        DEFAULT: 'var(--color-focused)',
      },
      outlineColor: {
        DEFAULT: 'var(--color-focused)',
      },
      borderWidth: {},
      ringWidth: {
        3: '4px',
      },
      outlineWidth: {
        0: '0px',
        2.5: '3px',
      },
      colors: {
        // Background
        'bg-default': 'var(--color-bg-default)',
        'bg-subtle': 'var(--color-bg-subtle)',
        'bg-subtler': 'var(--color-bg-subtler)',
        'bg-stronger': 'var(--color-bg-stronger)',
        'bg-contrast': 'var(--color-bg-contrast)',

        // Text
        'text-default': 'var(--color-text-default)',
        'text-subtle': 'var(--color-text-subtle)',
        'text-subtler': 'var(--color-text-subtler)',
        'text-contrast': 'var(--color-text-contrast)',
        'text-disabled': 'var(--color-text-disabled)',
        'text-link': 'var(--color-text-link)',

        // Border
        'border-default': 'var(--color-border-default)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-subtler': 'var(--color-border-subtler)',

        // Focus states
        focused: 'var(--color-focused)',
        'focused-subtle': 'var(--color-focused-subtle)',

        // Other
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        transparent: 'transparent',

      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
