export type FontOption = {
  id: string;
  name: string;
  family: string;
  url?: string;
};

export const AVAILABLE_FONTS: FontOption[] = [
  { id: 'system-sans', name: 'System Sans (Default)', family: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
  { id: 'system-serif', name: 'System Serif', family: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' },
  { id: 'system-mono', name: 'System Mono', family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
  { id: 'inter', name: 'Inter', family: '"Inter", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' },
  { id: 'roboto', name: 'Roboto', family: '"Roboto", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' },
  { id: 'lato', name: 'Lato', family: '"Lato", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap' },
  { id: 'montserrat', name: 'Montserrat', family: '"Montserrat", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap' },
  { id: 'merriweather', name: 'Merriweather', family: '"Merriweather", serif', url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap' },
  { id: 'playfair', name: 'Playfair Display', family: '"Playfair Display", serif', url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap' },
  { id: 'fira-code', name: 'Fira Code', family: '"Fira Code", monospace', url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap' }
];

export const getFontById = (id: string | undefined): FontOption => {
  return AVAILABLE_FONTS.find((f) => f.id === id) || AVAILABLE_FONTS[0];
};
