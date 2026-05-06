
/* hidden metadata that still appears in the pdf */
type DocMetaProps = { d: string; };
export const DocMeta = (_props: DocMetaProps) => <></>/*(
  <>
    <span class="print:hidden absolute group inline-block align-middle cursor-help">
      <span class="relative w-4 h-4 -translate-x-2 -translate-y-2">
        <span class="absolute w-2 h-2 left-1/2 top-1/2 bg-red-600/40 group-hover:bg-red-600 rounded-full" aria-hidden="true" />
      </span>

      <span class="
        pointer-events-none
        invisible group-hover:visible 
        absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 
        w-max max-w-xs p-2 
        bg-gray-900 text-white text-[10px] leading-tight rounded shadow-lg 
        z-50
      ">
        {props.d}
        <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </span>
    </span>

    <span
      class="document-metadata"
      style={{
        position: 'absolute',
        left: 0,
        userSelect: 'none',
        //whiteSpace: 'nowrap',
        fontFamily: 'monospace',
        fontSize: '3.5px',
        maxWidth: '100vw',
        color: 'rgba(0, 0, 0, 0.01)',
        letterSpacing: '-0.7px',
        "pointer-events": 'none',
      }}>
      {props.d}{' '}
    </span>
  </>
);*/
