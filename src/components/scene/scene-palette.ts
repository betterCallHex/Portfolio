import { useEffect, useState } from 'react';
import { Color, SRGBColorSpace } from 'three';

const JAVASCRIPT_LOGO_YELLOW = '#f7df1e';
const ESPRESSO = '#3a2414';

export type ScenePalette = {
  foreground: Color;
  background: Color;
  brand: Color;
  javascript: Color;
  coffee: Color;
  isDark: boolean;
};

export function useScenePalette() {
  const [palette, setPalette] = useState(readScenePalette);

  useEffect(() => {
    const themeObserver = new MutationObserver(() =>
      setPalette(readScenePalette()),
    );
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => themeObserver.disconnect();
  }, []);

  return palette;
}

function readScenePalette(): ScenePalette {
  const tokens = getComputedStyle(document.documentElement);
  const token = (name: string) =>
    colorFromCss(tokens.getPropertyValue(name).trim());

  return {
    foreground: token('--foreground'),
    background: token('--background'),
    brand: token('--brand'),
    javascript: colorFromCss(JAVASCRIPT_LOGO_YELLOW),
    coffee: colorFromCss(ESPRESSO),
    isDark: document.documentElement.classList.contains('dark'),
  };
}

function colorFromCss(cssColor: string) {
  const pixel = document.createElement('canvas');
  pixel.width = 1;
  pixel.height = 1;
  const context = pixel.getContext('2d', { willReadFrequently: true });
  if (!context) return new Color(cssColor);

  context.fillStyle = cssColor;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;

  return new Color().setRGB(red / 255, green / 255, blue / 255, SRGBColorSpace);
}
