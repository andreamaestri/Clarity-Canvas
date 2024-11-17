import { useState } from "react";
import {
    Button,
    Dialog,
    DialogTrigger,
    Popover,
} from "react-aria-components";

interface Theme {
    name: string;
    description: string;
    previewColor: string;
}

const ThemeController: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState("default");

    const themes: Theme[] = [
        {
            name: "Default",
            description: "Clean and modern look",
            previewColor: "#570DF8",
        },
        {
            name: "Retro",
            description: "Classic vintage style",
            previewColor: "#E8B059",
        },
        {
            name: "Cyberpunk",
            description: "Futuristic neon design",
            previewColor: "#FF00FF",
        },
        {
            name: "Valentine",
            description: "Soft and romantic tones",
            previewColor: "#FF69B4",
        },
        {
            name: "Aqua",
            description: "Cool ocean-inspired theme",
            previewColor: "#00FFFF",
        },
        {
            name: "Light",
            description: "Clean light theme",
            previewColor: "#ffffff",
        },
        {
            name: "Dark",
            description: "Elegant dark theme",
            previewColor: "#2a303c",
        },
        { name: "Cupcake", description: "Pastel colors", previewColor: "#faf7f5" },
        {
            name: "Bumblebee",
            description: "Yellow and black",
            previewColor: "#fbbf24",
        },
        {
            name: "Emerald",
            description: "Green professional",
            previewColor: "#10b981",
        },
        {
            name: "Corporate",
            description: "Business style",
            previewColor: "#4b6bfb",
        },
        {
            name: "Synthwave",
            description: "80s synthwave",
            previewColor: "#e779c1",
        },
        { name: "Halloween", description: "Spooky theme", previewColor: "#ff7518" },
        {
            name: "Garden",
            description: "Natural and fresh",
            previewColor: "#5c7f67",
        },
        { name: "Forest", description: "Deep woods", previewColor: "#1eb854" },
        { name: "Lofi", description: "Soft and calm", previewColor: "#808080" },
        {
            name: "Pastel",
            description: "Light soft colors",
            previewColor: "#ffb3ba",
        },
        { name: "Fantasy", description: "Magical theme", previewColor: "#bf95f9" },
        {
            name: "Wireframe",
            description: "Minimalist design",
            previewColor: "#b8b8b8",
        },
        { name: "Black", description: "Pure black", previewColor: "#000000" },
        { name: "Luxury", description: "Gold and black", previewColor: "#d4af37" },
        { name: "Dracula", description: "Dark purple", previewColor: "#ff79c6" },
        { name: "Cmyk", description: "Printer colors", previewColor: "#00bcd4" },
        { name: "Autumn", description: "Fall colors", previewColor: "#d45d00" },
        {
            name: "Business",
            description: "Professional blue",
            previewColor: "#1e3a8a",
        },
        { name: "Acid", description: "Bright neon", previewColor: "#00ff00" },
        { name: "Lemonade", description: "Fresh yellow", previewColor: "#fef08a" },
        { name: "Night", description: "Dark blue", previewColor: "#1a1b26" },
        { name: "Coffee", description: "Warm brown", previewColor: "#6f4e37" },
        { name: "Winter", description: "Cold blues", previewColor: "#d3e3f7" },
        { name: "Dim", description: "Low contrast", previewColor: "#2d3436" },
        { name: "Nord", description: "Arctic colors", previewColor: "#5e81ac" },
        { name: "Sunset", description: "Warm evening", previewColor: "#fa8072" },
    ];

    const handleThemeChange = (themeName: string) => {
        setCurrentTheme(themeName.toLowerCase());
        document.documentElement.setAttribute(
            "data-theme",
            themeName.toLowerCase(),
        );
    };

    const currentThemeObject = themes.find(
        (theme) => theme.name.toLowerCase() === currentTheme,
    );

    return (
        <DialogTrigger>
            <Button className="flex items-center gap-3 text-base-content">
                <div
                    className="w-6 h-6 rounded-full border-2"
                    style={{ backgroundColor: currentThemeObject?.previewColor }}
                />
                <span className="font-medium">{currentThemeObject?.name}</span>
            </Button>
            <Popover>
                <Dialog>
                    <div className="p-4 bg-base-200 rounded-lg max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-bold mb-4 text-base-content">
                            Choose Theme
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {themes.map((theme) => (
                                <button
                                    key={theme.name}
                                    className={`p-4 rounded-lg transition-all duration-200 ${
                                        currentTheme === theme.name.toLowerCase()
                                            ? "bg-primary text-primary-content"
                                            : "bg-base-100 hover:bg-base-300 text-base-content"
                                    }`}
                                    onClick={() => handleThemeChange(theme.name)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-6 h-6 rounded-full border-2"
                                            style={{ backgroundColor: theme.previewColor }}
                                        />
                                        <div>
                                            <div className="font-medium">{theme.name}</div>
                                            <div className="text-sm opacity-70">
                                                {theme.description}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </Dialog>
            </Popover>
        </DialogTrigger>
    );
};

export default ThemeController;
