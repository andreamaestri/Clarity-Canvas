import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import { themes } from "../../data/themes";
import { ThemeButton } from "../common/ThemeButton";
import { useTheme } from "../../context/ThemeContext";

const ThemeController: React.FC = () => {
  const { currentTheme, setTheme, currentThemeObject, isDarkMode } = useTheme();

  return (
    <DialogTrigger>
      <Button
        className={`flex items-center gap-3 ${isDarkMode ? "text-white" : "text-base-content"}`}
      >
        <div
          className="w-6 h-6 rounded-full border-2"
          style={{ backgroundColor: currentThemeObject?.previewColor }}
        />
        <span className="font-medium">{currentThemeObject?.name}</span>
      </Button>
      <Popover>
        <Dialog>
          <div
            className={`p-4 rounded-lg max-h-[80vh] overflow-y-auto ${isDarkMode ? "bg-gray-800" : "bg-base-200"}`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-base-content"}`}
            >
              Choose Theme
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                <ThemeButton
                  key={theme.name}
                  theme={theme}
                  isSelected={currentTheme === theme.name.toLowerCase()}
                  onSelect={setTheme}
                />
              ))}
            </div>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export default ThemeController;
