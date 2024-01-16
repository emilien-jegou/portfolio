/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      'sans': ['NotoSans', 'system-ui', 'sans-serif'],
    },
    extend: {
      borderWidth: {},
      outlineWidth: {},
      colors: {
        // Background
        'bg-default': 'var(--color-bg-default)',
        'bg-subtle': 'var(--color-bg-subtle)',

        // Text
        'text-default': 'var(--color-text-default)',
        'text-subtle': 'var(--color-text-subtle)',
        'text-subtler': 'var(--color-text-subtler)',
        'text-disabled': 'var(--color-text-disabled)',

        // Border
        'border-default': 'var(--color-border-default)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-subtler': 'var(--color-border-subtler)',

        // Other
        focused: 'var(--color-focused)',
        contrast: 'var(--color-contrast)',
      },
    },
  },
  plugins: [],
};
