document.addEventListener("DOMContentLoaded", () => {
  // Get the necessary elements from the DOM
  const colourSchemeFields = document.querySelectorAll(
    'input[name="colour-scheme"]',
  );

  const colourfulOption = document.getElementById("colorful");
  const monochromeOption = document.getElementById("monochrome");
  const flexLight = document.getElementById("flex-light");
  const focusLight = document.getElementById("focus-light");
  const focusDark = document.getElementById("focus-dark");
  const flexDark = document.getElementById("flex-dark");
  const widgets = document.getElementById("initial-widgets");

  // Function to update colour scheme options based on the selected mode
  const updateColourSchemeVisibility = (mode) => {
    if (mode === "flex") {
      // When 'Flex' is selected, show Light, Dark, and Colorful
      colourfulOption.parentElement.style.display = "flex";
      monochromeOption.parentElement.style.display = "none";
      flexLight.style.display = "block";
      focusLight.style.display = "none";
      flexDark.style.display = "block";
      focusDark.style.display = "none";
      widgets.style.display = "block";
    } else if (mode === "focus") {
      // When 'Focus' is selected, show Light, Dark, and Monochrome
      colourfulOption.parentElement.style.display = "none";
      monochromeOption.parentElement.style.display = "flex";
      flexLight.style.display = "none";
      focusLight.style.display = "block";
      flexDark.style.display = "none";
      focusDark.style.display = "block";
      widgets.style.display = "none";
    }
  };

  // Attach onclick to both mode radio buttons
  const focusModeRadio = document.getElementById("focus-mode");
  const flexModeRadio = document.getElementById("flex-mode");

  focusModeRadio.onclick = () => updateColourSchemeVisibility("focus");
  flexModeRadio.onclick = () => updateColourSchemeVisibility("flex");

  // Initially set the visibility based on the pre-selected mode
  if (focusModeRadio.checked) {
    updateColourSchemeVisibility("focus");
  } else if (flexModeRadio.checked) {
    updateColourSchemeVisibility("flex");
  }
});
