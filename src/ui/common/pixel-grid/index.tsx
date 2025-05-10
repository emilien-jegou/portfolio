import { component$ } from '@builder.io/qwik';
import type { CSSProperties } from '@builder.io/qwik';
import { cn } from '~/utils/cn';

export type PixelGridProps<T extends string | number> = {
  class?: string;
  style?: CSSProperties;
  // A map of token to css colors
  colorMap: Record<T, string>;
  grid: T[][];
};

export const PixelGrid = component$(function <T extends string | number>({
  class: className,
  style,
  grid,
  colorMap,
}: PixelGridProps<T>) {
  return (
    <div
      class={cn('grid h-full gap-0 w-full', className)}
      style={{
        gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)`,
        gridTemplateRows: `repeat(${grid.length}, 1fr)`,
        ...style,
      }}
    >
      {grid.flatMap((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            class="w-full h-full"
            style={{
              backgroundColor: colorMap[color],
              boxShadow: `0 0 0 0.2px ${colorMap[color]}, 0 0 0 0.4px ${colorMap[color]}, 0 0 0 0.4px ${colorMap[color]}`,
            }}
          />
        )),
      )}
    </div>
  );
});
