import {
  component$,
  useSignal,
  useVisibleTask$,
  useComputed$,
  useTask$,
  $,
  type PropFunction,
  type Signal
} from '@builder.io/qwik';

// --- Separate Search Bar Component ---
interface FontSearchBarProps {
  searchTerm: Signal<string>;
}

export const FontSearchBar = component$<FontSearchBarProps>(({ searchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search fonts..."
      class="border border-gray-300 rounded p-1.5 text-sm w-full bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
      bind:value={searchTerm}
      // Prevent clicks inside the input from closing the dropdown
      onClick$={(e) => e.stopPropagation()}
    />
  );
});

// --- Main Dropdown Component ---
interface FontDropdownProps {
  selectedFont: string;
  onFontChange$: PropFunction<(font: string) => void>;
}

export const FontDropdown = component$<FontDropdownProps>(({ selectedFont, onFontChange$ }) => {
  const fonts = useSignal<string[]>([]);
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);
  const searchTerm = useSignal('');

  // Custom Dropdown & Virtualization States
  const isOpen = useSignal(false);
  const scrollY = useSignal(0);
  const scrollContainerRef = useSignal<Element>();

  const ITEM_HEIGHT = 32; // Fixed height per font row (px)
  const CONTAINER_HEIGHT = 250; // Max height of dropdown (px)
  const OVERSCAN = 5; // Extra items to render off-screen for smooth scrolling

  // Reactively filter the font list based on the search term
  const filteredFonts = useComputed$(() => {
    const query = searchTerm.value.toLowerCase();
    if (!query) return fonts.value;
    return fonts.value.filter(font => font.toLowerCase().includes(query));
  });

  // Reset scroll position to top when search term changes
  useTask$(({ track }) => {
    track(() => searchTerm.value);
    scrollY.value = 0;
    if (scrollContainerRef.value) {
      scrollContainerRef.value.scrollTop = 0;
    }
  });

  // "Just-in-Time" calculation (Virtualization)
  const virtualList = useComputed$(() => {
    const total = filteredFonts.value.length;

    // Calculate which indexes should be rendered based on scroll position
    const startIndex = Math.max(0, Math.floor(scrollY.value / ITEM_HEIGHT) - OVERSCAN);
    const endIndex = Math.min(total, Math.ceil((scrollY.value + CONTAINER_HEIGHT) / ITEM_HEIGHT) + OVERSCAN);

    return {
      items: filteredFonts.value.slice(startIndex, endIndex),
      startIndex,
      totalHeight: total * ITEM_HEIGHT, // Total mock height to force native scrollbar
      offsetY: startIndex * ITEM_HEIGHT   // Y-Offset to push the visible items down
    };
  });

  const loadFonts = $(async () => {
    loading.value = true;
    error.value = null;

    try {
      const nav = navigator as any;

      if (nav.permissions) {
        try {
          const status = await nav.permissions.query({ name: 'local-fonts' as PermissionName });
          if (status.state === 'denied') {
            throw new Error("Font access denied. Please reset permissions in browser settings.");
          }
        } catch (e) {
          // Ignore if permission query isn't supported
        }
      }

      // 1. Verify support
      if (typeof (window as any).queryLocalFonts !== 'function') {
        throw new Error("Local Fonts API is not supported in this browser.");
      }

      // 2. Fetch using window.queryLocalFonts
      const availableFonts = await (window as any).queryLocalFonts();

      // 3. Extract purely the family name
      const fontList: string[] = availableFonts.map((font: any) => font.family);

      // Remove duplicates and sort
      fonts.value = [...new Set(fontList)].sort();
    } catch (err: any) {
      error.value = err.message || 'Failed to load fonts';
      console.error(err);

      // Fallback
      fonts.value = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'system-ui'];
    } finally {
      loading.value = false;
    }
  });

  useVisibleTask$(() => {
    loadFonts();
  });

  return (
    <div class="flex flex-col gap-2 w-full">
      <div class="flex justify-between items-center">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Typography (Local)</label>
        <button
          type="button"
          onClick$={loadFonts}
          disabled={loading.value}
          class="text-[9px] text-blue-500 hover:underline disabled:opacity-50"
        >
          {loading.value ? 'Loading...' : 'Refresh List'}
        </button>
      </div>

      {error.value && <p class="text-[9px] text-red-500">{error.value}</p>}

      {/* Custom Dropdown Container */}
      <div class="relative w-full">
        {/* Toggle Button (Acts as the <select>) */}
        <button
          type="button"
          onClick$={() => (isOpen.value = !isOpen.value)}
          class="w-full border border-gray-300 rounded p-2 text-sm bg-white text-left flex justify-between items-center shadow-sm"
          style={{ fontFamily: selectedFont || 'inherit' }}
        >
          <span class="truncate pr-2">{selectedFont || 'Select a font...'}</span>
          <span class="text-gray-400 text-xs text-transform: scale-y-75">▼</span>
        </button>

        {/* Dropdown Menu Overlay */}
        {isOpen.value && (
          <div class="absolute z-50 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-xl flex flex-col">

            <div class="p-2 border-b border-gray-100">
              <FontSearchBar searchTerm={searchTerm} />
            </div>

            {/* Virtualized Scroll Area */}
            <div
              ref={scrollContainerRef}
              class="overflow-y-auto overflow-x-hidden relative"
              style={{ maxHeight: `${CONTAINER_HEIGHT}px` }}
              onScroll$={(e, el) => { scrollY.value = el.scrollTop; }}
            >
              {filteredFonts.value.length === 0 ? (
                <p class="text-xs text-gray-500 p-4 text-center">No fonts found.</p>
              ) : (
                <div style={{ height: `${virtualList.value.totalHeight}px` }}>
                  {/* Container physically offset down the scrollbar to simulate items above it */}
                  <div style={{ transform: `translateY(${virtualList.value.offsetY}px)` }}>
                    {virtualList.value.items.map((font) => (
                      <button
                        key={font}
                        type="button"
                        onClick$={() => {
                          onFontChange$(font);
                          isOpen.value = false;
                        }}
                        class={`w-full text-left px-3 flex items-center text-sm truncate hover:bg-blue-50 transition-colors
                          ${selectedFont === font ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700'}
                        `}
                        style={{ height: `${ITEM_HEIGHT}px`, fontFamily: font }}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
});
