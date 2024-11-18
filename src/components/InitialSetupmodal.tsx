import { useState, useEffect, memo } from "react";
import { ThemeButton } from "../components/common/ThemeButton";
import { themes } from "../data/themeConstats";
import { useTheme } from "../context/ThemeContext";

interface InitialSetupModalProps {
    onComplete: (data: {
        username: string;
        mode: "focus" | "flex";
        theme: string;
        widgets: string[];
    }) => void;
}

export const InitialSetupModal = memo(({ onComplete }: InitialSetupModalProps) => {
    const { currentTheme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<"focus" | "flex">("flex");
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);

    useEffect(() => {
        const hasCompletedSetup = localStorage.getItem("initialSetupCompleted");
        if (!hasCompletedSetup) {
            setIsOpen(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Apply the theme immediately
        setTheme(selectedTheme);

        const data = {
            username: formData.get("username") as string,
            mode: selectedMode,
            theme: selectedTheme,
            widgets: ["coin-flip", "timer", "to-do-list", "white-noise"].filter(
                (widget) => formData.get(widget),
            ),
        };

        localStorage.setItem("initialSetupCompleted", "true");
        localStorage.setItem("selectedTheme", selectedTheme);
        localStorage.setItem("selectedMode", selectedMode);
        setIsOpen(false);
        onComplete(data);

        // Ensure page refresh happens after state updates
        setTimeout(() => window.location.reload(), 0);
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Clarity Canvas</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name:</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="input input-bordered"
                            required
                            placeholder="Your name here"
                        />
                        <span className="label-text-alt">
                            This name will be shown next to anything you write in the workspace.
                        </span>
                    </div>

                    {/* Mode Selection */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mode Type:</span>
                        </label>
                        <div className="flex gap-4">
                            <label className="label cursor-pointer">
                                <input
                                    type="radio"
                                    name="mode"
                                    value="focus"
                                    className="radio"
                                    checked={selectedMode === "focus"}
                                    onChange={() => setSelectedMode("focus")}
                                />
                                <span className="label-text ml-2">Focus</span>
                            </label>
                            <label className="label cursor-pointer">
                                <input
                                    type="radio"
                                    name="mode"
                                    value="flex"
                                    className="radio"
                                    checked={selectedMode === "flex"}
                                    onChange={() => setSelectedMode("flex")}
                                />
                                <span className="label-text ml-2">Flex</span>
                            </label>
                        </div>
                    </div>

                    {/* Theme Selection */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Theme:</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            {themes.map((theme) => (
                                <div key={theme.name}>
                                    <ThemeButton
                                        theme={theme}
                                        isSelected={selectedTheme === theme.name.toLowerCase()}
                                        onSelect={(themeName) => {
                                            setSelectedTheme(themeName);
                                            setTheme(themeName);
                                            // Defer reload to next tick to ensure state updates
                                            setTimeout(() => window.location.reload(), 0);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Get Started
                    </button>
                </form>
            </div>
        </div>
    );
});
