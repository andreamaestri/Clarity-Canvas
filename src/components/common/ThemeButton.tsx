import { Button } from "react-aria-components";
import type { Theme } from "../../data/themes";

interface ThemeButtonProps {
  theme: Theme;
  isSelected?: boolean;
  onSelect: (themeName: string) => void;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({
  theme,
  isSelected,
  onSelect,
}) => (
  <Button
    onPress={() => onSelect(theme.name)}
    className={`p-4 rounded-lg transition-all duration-200 w-full text-left ${
      isSelected
        ? "bg-primary text-primary-content"
        : "bg-base-100 hover:bg-base-300 text-base-content"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-6 h-6 rounded-full border-2"
        style={{ backgroundColor: theme.previewColor }}
      />
      <div>
        <div className="font-medium">{theme.name}</div>
        <div className="text-sm opacity-70">{theme.description}</div>
      </div>
    </div>
  </Button>
);
