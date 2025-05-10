import { Slot, component$ } from '@builder.io/qwik';
import type { CSSProperties } from '@builder.io/qwik';
import { PixelGrid } from '../pixel-grid';

type SpeechBubbleProps = {
  class?: string;
  style?: CSSProperties;
  showTail?: boolean;
  expansionCoef: number;
};

const COLOR_MAP = {
  0: 'transparent',
  1: '#fffdff',
  2: '#d8e5f5',
  3: '#9ba9cc',
  4: '#000012',
};

// The expansion coefficient for the border

export const SpeechBubble = component$((props: SpeechBubbleProps) => {
  return (
    <div class={props.class} style={props.style}>
      <div class="relative w-full bg-[#fffdff]">
        <div class="z-100 p-4 text-[#000012] text-lg font-pixel">
          <Slot />
        </div>

        <PixelGrid
          colorMap={COLOR_MAP}
          style={{ width: 3 * props.expansionCoef, height: 3 * props.expansionCoef }}
          class="transition-all absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
          grid={[
            [0, 0, 4],
            [0, 4, 2],
            [4, 2, 1],
          ]}
        />

        <PixelGrid
          colorMap={COLOR_MAP}
          style={{
            height: 3 * props.expansionCoef,
            width: `calc(100% - ${props.expansionCoef * 3}px)`,
            transform: `translateY(-50%) translateX(-50%)`,
          }}
          class="transition-all absolute top-0 left-1/2"
          grid={[[4], [2], [1]]}
        />

        <PixelGrid
          colorMap={COLOR_MAP}
          style={{
            width: 3 * props.expansionCoef,
            height: 3 * props.expansionCoef,
            transform: `translateY(-50%) translateX(-50%)`,
          }}
          class="transition-all absolute top-0 left-full"
          grid={[
            [4, 0, 0],
            [2, 4, 0],
            [2, 2, 4],
          ]}
        />

        <PixelGrid
          colorMap={COLOR_MAP}
          style={{
            width: 3 * props.expansionCoef,
            height: `calc(100% - ${props.expansionCoef * 3}px)`,
            transform: `translateY(-50%) translateX(-50%)`,
          }}
          class="transition-all absolute top-1/2 left-0"
          grid={[[4, 2, 1]]}
        />

        <PixelGrid
          colorMap={COLOR_MAP}
          style={{
            width: 3 * props.expansionCoef,
            height: `calc(100% - ${props.expansionCoef * 3}px)`,
            transform: `translateY(-50%) translateX(-50%)`,
          }}
          class="transition-all absolute top-1/2 left-full"
          grid={[[1, 2, 4]]}
        />

        {props.showTail && (
          <PixelGrid
            colorMap={COLOR_MAP}
            style={{
              width: 9 * props.expansionCoef,
              height: 10 * props.expansionCoef,
              transform: `translateY(-${props.expansionCoef * 1.5}px) translateX(-${props.expansionCoef * 1.5}px)`,
            }}
            class="transition-all z-30 absolute top-full left-0"
            grid={[
              [4, 2, 2, 1, 1, 1, 1, 1, 1],
              [4, 3, 2, 1, 1, 1, 1, 1, 1],
              [4, 3, 3, 1, 1, 1, 1, 1, 3],
              [0, 4, 3, 1, 1, 1, 1, 3, 3],
              [0, 0, 4, 1, 1, 1, 3, 3, 4],
              [0, 0, 4, 1, 1, 3, 3, 4, 0],
              [0, 0, 4, 1, 3, 3, 4, 0, 0],
              [0, 0, 4, 3, 3, 4, 0, 0, 0],
              [0, 0, 4, 3, 4, 0, 0, 0, 0],
              [0, 0, 4, 4, 0, 0, 0, 0, 0],
            ]}
          />
        )}

        <PixelGrid
          colorMap={COLOR_MAP}
          style={{
            height: 6 * props.expansionCoef,
            width: `calc(100% - ${props.expansionCoef * 3}px)`,
            transform: `translateY(-${props.expansionCoef * 2.5}px) translateX(-50%)`,
          }}
          class="transition-all absolute top-full left-1/2"
          grid={[[0], [1], [2], [3], [3], [4]]}
        />

        <PixelGrid
          colorMap={COLOR_MAP}
          style={{
            height: 5 * props.expansionCoef,
            width: 3 * props.expansionCoef,
            transform: `translateY(-${props.expansionCoef * 2.5}px) translateX(-50%)`,
          }}
          class="transition-all absolute top-full left-0"
          grid={[
            [4, 2, 1],
            [4, 3, 2],
            [4, 3, 3],
            [0, 4, 3],
            [0, 0, 4],
          ]}
        />

        <PixelGrid
          colorMap={COLOR_MAP}
          style={{
            height: 5 * props.expansionCoef,
            width: 3 * props.expansionCoef,
            transform: `translateY(-${props.expansionCoef * 2.5}px) translateX(-50%)`,
          }}
          class="transition-all absolute top-full left-full"
          grid={[
            [1, 2, 4],
            [2, 3, 4],
            [3, 3, 4],
            [3, 4, 0],
            [4, 0, 0],
          ]}
        />
      </div>
    </div>
  );
});
