let sounds = [
  {
    key: "A",
    sound: "Clap",
    voice: new URL("/sounds/clap.wav", import.meta.url),
  },
  {
    key: "S",
    sound: "Hihat",
    voice: new URL("/sounds/hihat.wav", import.meta.url),
  },
  {
    key: "D",
    sound: "Kick",
    voice: new URL("/sounds/kick.wav", import.meta.url),
  },
  {
    key: "F",
    sound: "Openhat",
    voice: new URL("/sounds/openhat.wav", import.meta.url),
  },
  {
    key: "G",
    sound: "boom",
    voice: new URL("/sounds/boom.wav", import.meta.url),
  },
  {
    key: "H",
    sound: "ride",
    voice: new URL("/sounds/ride.wav", import.meta.url),
  },
  {
    key: "J",
    sound: "snare",
    voice: new URL("/sounds/snare.wav", import.meta.url),
  },
  {
    key: "K",
    sound: "Tom",
    voice: new URL("/sounds/tom.wav", import.meta.url),
  },
  {
    key: "L",
    sound: "Tink",
    voice: new URL("/sounds/tink.wav", import.meta.url),
  },
];

let container = document.getElementsByTagName("div")[0];

// NEW: Pre-load audio elements for better performance
// (Original created new Audio on each click)
const audioElements = {};
sounds.forEach((element) => {
  audioElements[element.key] = new Audio(element.voice);
});

sounds.forEach((element) => {
  let button = document.createElement("div");
  button.classList.add("button");
  button.setAttribute("data-key", element.key);
  button.innerText = element.key;

  button.addEventListener("click", () => {
    const audio = audioElements[element.key];
    audio.currentTime = 0; // Reset audio position
    audio.play();

    button.classList.add("active");

    // REPLACED setTimeout with transitionend
    // Original: setTimeout(() => button.classList.remove("active"), 200);
    // New: More precise timing based on actual CSS transition
    button.addEventListener("transitionend", function handler(e) {
      // Only remove class when scale transition completes
      if (e.propertyName !== "scale") return;
      button.classList.remove("active");
      // Clean up event listener
      button.removeEventListener("transitionend", handler);
    });
  });

  // Original sound name span creation (unchanged)
  let soundName = document.createElement("span");
  soundName.classList.add("sound");
  soundName.innerText = element.sound;
  button.appendChild(soundName);
  container.appendChild(button);
});

window.addEventListener("keypress", (e) => {
  let key = e.key.toUpperCase();
  let button = document.querySelector(`div[data-key=${key}]`);
  if (button) {
    button.click(); // Triggers our modified click handler
  }
});
