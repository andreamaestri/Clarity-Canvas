export interface Theme {
  name: string;
  description: string;
  previewColor: string;
  colors: {
    primary: string;
    baseContent: string;
    secondary: string;
    secondaryContent: string;
    primaryContent: string;
    accent: string;
    base100: string;
    base300: string;
  };
}

export const themes: Theme[] = [
  {
    name: "Focus Light",
    description: "Soft and light colors with high contrast",
    previewColor: "#77AEBB",
    colors: {
      primary: "#cdc4cf",
      baseContent: "#80858a",
      secondary: "#f3d3d7",
      secondaryContent: "#ffffff",
      primaryContent: "#000000",
      accent: "#bae3d5",
      base100: "#f7f7f7",
      base300: "#d0d4d9",
    },
  },
  {
    name: "Focus Dark",
    description: "Deep and dark colors with vibrant highlights",
    previewColor: "#92B3BB",
    colors: {
      primary: "#77AEBB",
      baseContent: "#E0E0E0",
      secondary: "#79C279",
      secondaryContent: "#E0E0E0",
      primaryContent: "#E0E0E0",
      accent: "#79C279",
      base100: "#141717",
      base300: "#1E2424",
    },
  },
  {
    name: "Monochrome",
    description: "Shades of gray for a minimalist look",
    previewColor: "#7D7D7D",
    colors: {
      primary: "#7D7D7D",
      baseContent: "#E0E0E0",
      secondary: "#4D4D4D",
      secondaryContent: "#E0E0E0",
      primaryContent: "#E0E0E0",
      accent: "#BFBFBF",
      base100: "#121212",
      base300: "#1E1E1E",
    },
  },
  {
    name: "Flex Light",
    description: "Fresh and light with soft contrasts",
    previewColor: "#77AEBB",
    colors: {
      primary: "#77AEBB",
      baseContent: "#2D3E44",
      secondary: "#79C279",
      secondaryContent: "#2D3E44",
      primaryContent: "#F5FCFB",
      accent: "#79C279",
      base100: "#E8F5F4",
      base300: "#2D3E44",
    },
  },
  {
    name: "Flex Dark",
    description: "Deep and subdued with green accents",
    previewColor: "#77AEBB",
    colors: {
      primary: "#77AEBB",
      baseContent: "#D8E4E6",
      secondary: "#4C8A4C",
      secondaryContent: "#D8E4E6",
      primaryContent: "#D8E4E6",
      accent: "#4C8A4C",
      base100: "#121717",
      base300: "#1B2424",
    },
  },
  {
    name: "Colourful",
    description: "Vibrant and diverse palette",
    previewColor: "#FFB74D",
    colors: {
      primary: "#77AEBB",
      baseContent: "#2D3E44",
      secondary: "#79C279",
      secondaryContent: "#2D3E44",
      primaryContent: "#F9FCFD",
      accent: "#FFB74D",
      base100: "#E8F4F7",
      base300: "#2D3E44",
    },
  },
];
