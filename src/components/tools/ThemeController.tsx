import React, { useState } from 'react';

interface Theme {
    name: string;
    description: string;
    previewColor: string;
}

const ThemeController: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [isExpanded, setIsExpanded] = useState(false);

    const themes: Theme[] = [
        { name: 'Default', description: 'Clean and modern look', previewColor: '#570DF8' },
        { name: 'Retro', description: 'Classic vintage style', previewColor: '#E8B059' },
        { name: 'Cyberpunk', description: 'Futuristic neon design', previewColor: '#FF00FF' },
        { name: 'Valentine', description: 'Soft and romantic tones', previewColor: '#FF69B4' },
        { name: 'Aqua', description: 'Cool ocean-inspired theme', previewColor: '#00FFFF' },
    ];

    const handleThemeChange = (themeName: string) => {
        setCurrentTheme(themeName.toLowerCase());
        document.documentElement.setAttribute('data-theme', themeName.toLowerCase());
        setIsExpanded(false); // Collapse after selection
    };

    const currentThemeObject = themes.find(theme => theme.name.toLowerCase() === currentTheme);

    return (
        <div className="bg-base-200 p-4 rounded-t-2xl shadow-lg">
            {!isExpanded ? (
                <div 
                    className="cursor-pointer flex items-center gap-3"
                    onClick={() => setIsExpanded(true)}
                >
                    <div
                        className="w-6 h-6 rounded-full border-2"
                        style={{ backgroundColor: currentThemeObject?.previewColor }}
                    />
                    <div className="font-medium">{currentThemeObject?.name}</div>
                </div>
            ) : (
                <>
                    <h3 className="text-lg font-bold mb-4">Choose Theme</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {themes.map((theme) => (
                            <div
                                key={theme.name}
                                className={`cursor-pointer p-4 rounded-lg transition-all duration-200 ${
                                    currentTheme === theme.name.toLowerCase()
                                        ? 'bg-primary text-primary-content'
                                        : 'bg-base-100 hover:bg-base-300'
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
                                        <div className="text-sm opacity-70">{theme.description}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ThemeController;
