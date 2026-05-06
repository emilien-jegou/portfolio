import { useComputed$, type Signal } from '@builder.io/qwik';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// 1. Configure marked globally (Runs once)
marked.use({
  breaks: true, // Replicates replacing \n with <br/>
  renderer: {
    // Replicates your custom Tailwind classes and target="_blank"
    link(token) {
      return `<a href="${token.href}" target="_blank" rel="noopener noreferrer" class="underline text-blue-600 font-medium">${token.text}</a>`;
    },
  },
});

/**
 * A Qwik hook that takes a string or a Signal of a string,
 * and returns a reactive Signal containing safe, parsed HTML.
 */
export const useMarkdown = (markdownInput: Signal<string> | string) => {
  return useComputed$(() => {
    // Extract the value whether it's a Signal or a raw string
    const text = typeof markdownInput === 'string' ? markdownInput : markdownInput.value;

    if (!text) return '';

    // Parse the markdown (parseInline prevents wrapping the output in <p> tags)
    const rawHtml = marked.parseInline(text, { async: false }) as string;

    // Sanitize the HTML to prevent XSS attacks.
    // ADD_ATTR ensures target="_blank" isn't stripped by strict sanitizers.
    return DOMPurify.sanitize(rawHtml, { ADD_ATTR: ['target'] });
  });
};
