export interface Theme {
  name: string;
  description: string;
  previewColor: string;
}

export const themes: Theme[] = [ {
    name: "Focus Light",
    description: "Soft and light colors with high contrast",
    previewColor: "#77AEBB",
  },
  {
    name: "Focus Dark",
    description: "Deep and dark colors with vibrant highlights",
    previewColor: "#92B3BB",
  },
  {
    name: "Monochrome",
    description: "Shades of gray for a minimalist look",
    previewColor: "#7D7D7D",
  },
  {
    name: "Flex Light",
    description: "Fresh and light with soft contrasts",
    previewColor: "#77AEBB",
  },
  {
    name: "Flex Dark",
    description: "Deep and subdued with green accents",
    previewColor: "#77AEBB",
  },
  {
    name: "Colourful",
    description: "Vibrant and diverse palette",
    previewColor: "#FFB74D",
  },
];
