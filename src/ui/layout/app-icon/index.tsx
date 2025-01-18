import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

// number between 0 and 255
export type RGB = Record<'r' | 'g' | 'b', number>;

type AppIconProps = {
  fg: RGB;
};

const toCssString = (rgb: RGB, opacity = 1) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

//const subtleChanel = (v: number) => 0.7451 * v + 42;
const mapChannels = (v: RGB, mapper: (v: number) => number) => ({
  r: mapper(v.r),
  g: mapper(v.g),
  b: mapper(v.b),
});

const relativeLuminance = ({ r, g, b }: RGB): number => {
  const normalize = (value: number) => {
    const sRGB = value / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  };

  const R = normalize(r);
  const G = normalize(g);
  const B = normalize(b);

  // Relative luminance calculation
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

const subtle = (v: RGB) =>
  mapChannels(v, relativeLuminance(v) > 0.5 ? (v) => v - 26 : (v) => v + 42);

export const AppIcon = component$((props: AppIconProps) => {
  const ref = useSignal<HTMLDivElement | undefined>();
  // eslint-disable-next-line
    useVisibleTask$(async () => {
    if (!ref.value) return;
    ref.value.classList.add('animate-200');
  });
  return (
    <a href="/">
      <svg
        ref={ref}
        id="app-icon__V1"
        fill="var(--app-icon-bg, blue)"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 47 47"
        width="56"
        height="56"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
        project-id="7449c98e938a4c0c8ef8799f56d5721d"
        export-id="32cc99ce07d340e4ab9a4563f910d80f"
        style={{
          border: '1px solid var(--app-icon-border)',
        }}
      >
        <style>{`
#app-icon__V1 {
    pointer-events: all;
}

.animate-200 * {
  animation-duration: 200ms !important;
}

#app-icon__V1:hover #app-icon__V2 {
    animation: app-icon__V2_f_p 200ms linear 1 normal forwards;
}

#app-icon__V1:not(:hover) #app-icon__V2 {
    animation: app-icon__V2_f_p_reverse 0s linear 1 normal forwards;
}

@keyframes app-icon__V2_f_p {
    0% {
        fill: var(--app-icon-bg)
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    100% {
        fill: ${toCssString(subtle(props.fg))};
    }
}

@keyframes app-icon__V2_f_p_reverse {
    0% {
        fill: ${toCssString(subtle(props.fg))};
    }
    100% {
        fill: var(--app-icon-bg);
    }
}

#app-icon__V1:hover #app-icon__V3_tr {
    animation: app-icon__V3_tr__tr 200ms linear 1 normal forwards;
}

#app-icon__V1:not(:hover) #app-icon__V3_tr {
    animation: app-icon__V3_tr__tr_reverse 0s linear 1 normal forwards;
}

@keyframes app-icon__V3_tr__tr {
    0% {
        transform: translate(23.370951px, 23.5px) rotate(0deg);
        animation-timing-function: cubic-bezier(0.175, 0.81, 0.32, 1.11);
    }
    100% {
        transform: translate(23.370951px, 23.5px) rotate(-90.000001deg);
    }
}

@keyframes app-icon__V3_tr__tr_reverse {
    0% {
        transform: translate(23.370951px, 23.5px) rotate(-90.000001deg);
    }
    100% {
        transform: translate(23.370951px, 23.5px) rotate(0deg);
    }
}

#app-icon__V1:hover #app-icon__V3_ts {
    animation: app-icon__V3_ts__ts 200ms linear 1 normal forwards;
}

#app-icon__V1:not(:hover) #app-icon__V3_ts {
    animation: app-icon__V3_ts__ts_reverse 0s linear 1 normal forwards;
}

@keyframes app-icon__V3_ts__ts {
    0% {
        transform: scale(1.042701, 1.042702);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    100% {
        transform: scale(3.48, 3.48);
    }
}

@keyframes app-icon__V3_ts__ts_reverse {
    0% {
        transform: scale(3.48, 3.48);
    }
    100% {
        transform: scale(1.042701, 1.042702);
    }
}

#app-icon__V1:hover #app-icon__V3 {
    animation: app-icon__V3_f_p 200ms linear 1 normal forwards;
}

#app-icon__V1:not(:hover) #app-icon__V3 {
    animation: app-icon__V3_f_p_reverse 0s linear 1 normal forwards;
}

@keyframes app-icon__V3_f_p {
    0% {
        fill: var(--app-icon-bg-subtle);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    100% {
        fill: ${toCssString(props.fg)};
    }
}

@keyframes app-icon__V3_f_p_reverse {
    0% {
        fill: ${toCssString(props.fg)};
    }
    100% {
        fill: var(--app-icon-bg-subtle);
    }
}

#app-icon__V1:hover #app-icon__V4 {
    animation: app-icon__V4_c_o 200ms linear 1 normal forwards;
}

#app-icon__V1:not(:hover) #app-icon__V4 {
    animation: app-icon__V4_c_o_reverse 200ms linear 1 normal forwards;
    animation-duration: 0s;
}

@keyframes app-icon__V4_c_o {
    0% {
        opacity: 1;
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    100% {
        opacity: 0;
    }
}

@keyframes app-icon__V4_c_o_reverse {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
      `}</style>
        <defs>
          <radialGradient
            id="app-icon__V4-fill"
            cx="0"
            cy="0"
            r="1"
            spreadMethod="pad"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-0.135857 22.5491 -22.5491 -0.135857 23.6358 24.4509)"
          >
            <stop id="app-icon__V4-fill-0" offset="0%" stop-color="var(--app-icon-bg, #000)" />
            <stop
              id="app-icon__V4-fill-1"
              offset="100%"
              stop-color="var(--app-icon-bg-hidden, rgba(0,0,0,0))"
            />
          </radialGradient>
        </defs>
        <rect id="app-icon__V2" width="47" height="47" rx="0" ry="0" />
        <g id="app-icon__V3_tr" transform="translate(23.370951,23.5) rotate(0)">
          <g id="app-icon__V3_ts" transform="scale(1.042701,1.042702)">
            <path
              id="app-icon__V3"
              d="M0,3.31802L0,3c0-1.26402.78174-2.345454,1.88812-2.787207L40.1713,47h-4.4289L0,3.31802ZM43.7701,47L5.31278,0h4.42895L46.7419,45.2192C46.2747,46.2685,45.2228,47,44,47h-.2299Z"
              transform="translate(-23.370951,-23.5)"
              clip-rule="evenodd"
              fill="var(--app-icon-bg-subtle)"
              fill-rule="evenodd"
            />
          </g>
        </g>
        <rect
          id="app-icon__V4"
          width="47"
          height="47"
          rx="3"
          ry="3"
          fill="url(#app-icon__V4-fill)"
        />
        <path
          d="M7.64705,17.2318l2.97845-5.014L7.64705,7.20385h2.2885L12.8335,12.2178l-2.90945,5.014h-2.277Zm-.23,8.4925c0-.4753.07283-.8931.2185-1.2535s.33733-.6593.575-.897c.23766-.2453.50983-.4293.8165-.552.30666-.1226.621-.184.943-.184.79735,0,1.40295.2377,1.81695.713.414.4677.621,1.1539.621,2.0585c0,.092-.0038.1879-.0115.2875c0,.0997-.0038.1802-.0115.2415h-3.50745c0,.3527.14566.6325.437.8395.29133.1994.667.299,1.12695.299.2837,0,.552-.0306.805-.092.2607-.0613.4792-.1226.6555-.184l.1955,1.2075c-.2453.0844-.506.1534-.782.207-.276.0614-.5865.092-.9315.092-.45995,0-.87395-.0575-1.24195-.1725-.36034-.1226-.67084-.299-.9315-.529-.253-.2376-.4485-.529-.5865-.874s-.207-.7475-.207-1.2075Zm3.62245-.5635c0-.1456-.0191-.2836-.0575-.414-.0383-.138-.0996-.2606-.184-.368-.0843-.1073-.1916-.1916-.322-.253-.1303-.069-.2913-.1035-.48295-.1035-.184,0-.345.0307-.483.092-.13034.0614-.2415.1457-.3335.253-.08434.1074-.15334.23-.207.368-.046.138-.07667.2799-.092.4255h2.16195Zm5.7155-2.2425c.299,0,.5444.046.736.138s.3412.23.4485.414c.115.184.1917.4179.23.7015.0384.276.0575.6019.0575.9775v3.2315h-1.15v-3.3005c0-.2146-.0153-.3871-.046-.5175-.023-.1303-.0575-.23-.1035-.299-.0383-.069-.0881-.115-.1495-.138-.0536-.023-.1111-.0345-.1725-.0345-.069,0-.1418.0077-.2185.023-.0766.0077-.1456.0269-.207.0575.023.1457.0422.3067.0575.483s.023.3719.023.5865v1.081h-1.15v-1.242c0-.368-.0383-.6248-.115-.7705-.069-.1456-.184-.2185-.345-.2185-.046,0-.1035.0039-.1725.0115-.0613.0077-.1226.0192-.184.0345v4.2435h-1.15v-5.198c.299-.0843.5942-.1495.8855-.1955s.5482-.069.7705-.069c.1994,0,.3757.0269.529.0805.161.046.299.1265.414.2415.1304-.0843.2837-.1571.46-.2185.1764-.069.3604-.1035.552-.1035Zm6.4055,5.106c0,.437-.0536.8012-.161,1.0925-.1073.299-.2568.5367-.4485.713-.184.184-.4063.3144-.667.391-.253.0767-.529.115-.828.115-.368,0-.7091-.046-1.0235-.138-.3143-.092-.6171-.2108-.9085-.3565l.437-1.196c.1917.1074.4217.207.69.299.276.0997.5252.1495.7475.1495.2377,0,.4217-.0728.552-.2185.1304-.138.1955-.3986.1955-.782v-3.9445h-2.185v-1.173h3.5995v5.0485Zm-.1725-6.601c0,.276-.0881.4945-.2645.6555s-.3871.2415-.6325.2415-.4561-.0805-.6325-.2415c-.1686-.161-.253-.3795-.253-.6555c0-.2836.0844-.506.253-.667.1764-.161.3872-.2415.6325-.2415s.4562.0805.6325.2415.2645.3834.2645.667Zm1.679,4.301c0-.4753.0729-.8931.2185-1.2535s.3374-.6593.575-.897c.2377-.2453.5099-.4293.8165-.552.3067-.1226.621-.184.943-.184.7974,0,1.403.2377,1.817.713.414.4677.621,1.1539.621,2.0585c0,.092-.0038.1879-.0115.2875c0,.0997-.0038.1802-.0115.2415h-3.5075c0,.3527.1457.6325.437.8395.2914.1994.667.299,1.127.299.2837,0,.552-.0306.805-.092.2607-.0613.4792-.1226.6555-.184l.1955,1.2075c-.2453.0844-.506.1534-.782.207-.276.0614-.5865.092-.9315.092-.46,0-.874-.0575-1.242-.1725-.3603-.1226-.6708-.299-.9315-.529-.253-.2376-.4485-.529-.5865-.874s-.207-.7475-.207-1.2075Zm3.6225-.5635c0-.1456-.0191-.2836-.0575-.414-.0383-.138-.0996-.2606-.184-.368-.0843-.1073-.1916-.1916-.322-.253-.1303-.069-.2913-.1035-.483-.1035-.184,0-.345.0307-.483.092-.1303.0614-.2415.1457-.3335.253-.0843.1074-.1533.23-.207.368-.046.138-.0766.2799-.092.4255h2.162Zm5.681,2.3115c0,.3374-.1035.5942-.3105.7705-.207.1764-.4446.2645-.713.2645-.138,0-.2683-.023-.391-.069-.1226-.046-.2338-.1111-.3335-.1955-.092-.092-.1686-.1993-.23-.322-.0536-.1303-.0805-.2798-.0805-.4485c0-.161.0269-.3028.0805-.4255.0614-.1303.138-.2376.23-.322.0997-.0843.2109-.1495.3335-.1955.1227-.046.253-.069.391-.069.2684,0,.506.0882.713.2645.207.1764.3105.4255.3105.7475ZM8.82005,37.6438c0,.483.08816.8779.2645,1.1845.184.3067.47533.46.874.46.11495,0,.22235-.0038.32195-.0115s.2032-.0191.3105-.0345v-2.944c-.1073-.0613-.23-.1111-.368-.1495-.138-.046-.28362-.069-.43695-.069-.33734,0-.58267.1342-.736.4025s-.23.6555-.23,1.1615Zm3.18545,2.576c-.2606.0844-.5788.1534-.9545.207s-.7436.0805-1.10395.0805c-.84334,0-1.4835-.2491-1.9205-.7475-.42934-.4983-.644-1.1806-.644-2.047c0-.8816.18016-1.5755.5405-2.0815.368-.5136.9085-.7705,1.6215-.7705.19166,0,.3795.023.56345.069.184.0384.345.0959.483.1725v-2.461l1.4145-.2415v7.82Zm1.1615-2.4955c0-.4753.0729-.8931.2185-1.2535.1457-.3603.3374-.6593.575-.897.2377-.2453.5099-.4293.8165-.552.3067-.1226.621-.184.943-.184.7974,0,1.403.2377,1.817.713.414.4677.621,1.1539.621,2.0585c0,.092-.0038.1879-.0115.2875c0,.0997-.0038.1802-.0115.2415h-3.5075c0,.3527.1457.6325.437.8395.2914.1994.667.299,1.127.299.2837,0,.552-.0306.805-.092.2607-.0613.4792-.1226.6555-.184l.1955,1.2075c-.2453.0844-.506.1534-.782.207-.276.0614-.5865.092-.9315.092-.46,0-.874-.0575-1.242-.1725-.3603-.1226-.6708-.299-.9315-.529-.253-.2376-.4485-.529-.5865-.874s-.207-.7475-.207-1.2075Zm3.6225-.5635c0-.1456-.0191-.2836-.0575-.414-.0383-.138-.0996-.2606-.184-.368-.0843-.1073-.1916-.1916-.322-.253-.1303-.069-.2913-.1035-.483-.1035-.184,0-.345.0307-.483.092-.1303.0614-.2415.1457-.3335.253-.0843.1074-.1533.23-.207.368-.046.138-.0766.2799-.092.4255h2.162Zm4.002,3.22c-.345-.6823-.6976-1.4796-1.058-2.392-.3526-.92-.69-1.9243-1.012-3.013h1.4835c.069.2914.1495.6019.2415.9315.0997.3297.2032.6632.3105,1.0005.1074.3297.2147.6517.322.966.115.3144.2224.6019.322.8625.0997-.2606.2109-.5481.3335-.8625s.2415-.6363.3565-.966c.1227-.3373.2377-.6708.345-1.0005.115-.3296.207-.6401.276-.9315h1.4375c-.322,1.0887-.6785,2.093-1.0695,3.013-.391.9124-.759,1.7097-1.104,2.392h-1.1845Z"
          fill="var(--app-icon-fg)"
        />
      </svg>
    </a>
  );
});
