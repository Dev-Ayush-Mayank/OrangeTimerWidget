export interface GoogleFont {
  name: string
  value: string
  category: string
}

export const googleFonts: GoogleFont[] = [
  // Sans Serif Fonts
  { name: "Roboto", value: "Roboto", category: "Sans Serif" },
  { name: "Open Sans", value: "Open Sans", category: "Sans Serif" },
  { name: "Lato", value: "Lato", category: "Sans Serif" },
  { name: "Montserrat", value: "Montserrat", category: "Sans Serif" },
  { name: "Oswald", value: "Oswald", category: "Sans Serif" },
  { name: "Source Sans Pro", value: "Source Sans Pro", category: "Sans Serif" },
  { name: "Raleway", value: "Raleway", category: "Sans Serif" },
  { name: "PT Sans", value: "PT Sans", category: "Sans Serif" },
  { name: "Poppins", value: "Poppins", category: "Sans Serif" },
  { name: "Ubuntu", value: "Ubuntu", category: "Sans Serif" },
  { name: "Nunito", value: "Nunito", category: "Sans Serif" },
  { name: "Work Sans", value: "Work Sans", category: "Sans Serif" },
  { name: "Inter", value: "Inter", category: "Sans Serif" },
  { name: "Rubik", value: "Rubik", category: "Sans Serif" },
  { name: "Mukta", value: "Mukta", category: "Sans Serif" },
  { name: "Noto Sans", value: "Noto Sans", category: "Sans Serif" },
  { name: "Barlow", value: "Barlow", category: "Sans Serif" },
  { name: "Oxygen", value: "Oxygen", category: "Sans Serif" },
  { name: "Quicksand", value: "Quicksand", category: "Sans Serif" },
  { name: "Karla", value: "Karla", category: "Sans Serif" },
  { name: "Cabin", value: "Cabin", category: "Sans Serif" },
  { name: "Hind", value: "Hind", category: "Sans Serif" },
  { name: "Dosis", value: "Dosis", category: "Sans Serif" },
  { name: "Josefin Sans", value: "Josefin Sans", category: "Sans Serif" },
  { name: "Arimo", value: "Arimo", category: "Sans Serif" },
  { name: "Titillium Web", value: "Titillium Web", category: "Sans Serif" },
  { name: "Varela Round", value: "Varela Round", category: "Sans Serif" },
  { name: "Nunito Sans", value: "Nunito Sans", category: "Sans Serif" },
  { name: "Exo 2", value: "Exo 2", category: "Sans Serif" },
  { name: "Manrope", value: "Manrope", category: "Sans Serif" },
  { name: "DM Sans", value: "DM Sans", category: "Sans Serif" },
  { name: "Lexend", value: "Lexend", category: "Sans Serif" },
  { name: "Space Grotesk", value: "Space Grotesk", category: "Sans Serif" },
  { name: "Outfit", value: "Outfit", category: "Sans Serif" },
  { name: "Plus Jakarta Sans", value: "Plus Jakarta Sans", category: "Sans Serif" },

  // Serif Fonts
  { name: "Merriweather", value: "Merriweather", category: "Serif" },
  { name: "Playfair Display", value: "Playfair Display", category: "Serif" },
  { name: "Lora", value: "Lora", category: "Serif" },
  { name: "PT Serif", value: "PT Serif", category: "Serif" },
  { name: "Crimson Text", value: "Crimson Text", category: "Serif" },
  { name: "Libre Baskerville", value: "Libre Baskerville", category: "Serif" },
  { name: "Noto Serif", value: "Noto Serif", category: "Serif" },
  { name: "EB Garamond", value: "EB Garamond", category: "Serif" },
  { name: "Cormorant Garamond", value: "Cormorant Garamond", category: "Serif" },
  { name: "Bitter", value: "Bitter", category: "Serif" },
  { name: "Arvo", value: "Arvo", category: "Serif" },
  { name: "Cardo", value: "Cardo", category: "Serif" },
  { name: "Spectral", value: "Spectral", category: "Serif" },
  { name: "Vollkorn", value: "Vollkorn", category: "Serif" },
  { name: "Alegreya", value: "Alegreya", category: "Serif" },
  { name: "Gelasio", value: "Gelasio", category: "Serif" },
  { name: "Zilla Slab", value: "Zilla Slab", category: "Serif" },
  { name: "Rokkitt", value: "Rokkitt", category: "Serif" },
  { name: "Old Standard TT", value: "Old Standard TT", category: "Serif" },
  { name: "Neuton", value: "Neuton", category: "Serif" },

  // Display Fonts
  { name: "Bebas Neue", value: "Bebas Neue", category: "Display" },
  { name: "Righteous", value: "Righteous", category: "Display" },
  { name: "Pacifico", value: "Pacifico", category: "Display" },
  { name: "Lobster", value: "Lobster", category: "Display" },
  { name: "Permanent Marker", value: "Permanent Marker", category: "Display" },
  { name: "Fredoka One", value: "Fredoka One", category: "Display" },
  { name: "Alfa Slab One", value: "Alfa Slab One", category: "Display" },
  { name: "Bangers", value: "Bangers", category: "Display" },
  { name: "Russo One", value: "Russo One", category: "Display" },
  { name: "Archivo Black", value: "Archivo Black", category: "Display" },
  { name: "Bungee", value: "Bungee", category: "Display" },
  { name: "Righteous", value: "Righteous", category: "Display" },
  { name: "Staatliches", value: "Staatliches", category: "Display" },
  { name: "Fugaz One", value: "Fugaz One", category: "Display" },
  { name: "Passion One", value: "Passion One", category: "Display" },
  { name: "Monoton", value: "Monoton", category: "Display" },
  { name: "Audiowide", value: "Audiowide", category: "Display" },
  { name: "Orbitron", value: "Orbitron", category: "Display" },
  { name: "Righteous", value: "Righteous", category: "Display" },
  { name: "Black Ops One", value: "Black Ops One", category: "Display" },

  // Handwriting Fonts
  { name: "Dancing Script", value: "Dancing Script", category: "Handwriting" },
  { name: "Shadows Into Light", value: "Shadows Into Light", category: "Handwriting" },
  { name: "Indie Flower", value: "Indie Flower", category: "Handwriting" },
  { name: "Caveat", value: "Caveat", category: "Handwriting" },
  { name: "Kaushan Script", value: "Kaushan Script", category: "Handwriting" },
  { name: "Satisfy", value: "Satisfy", category: "Handwriting" },
  { name: "Amatic SC", value: "Amatic SC", category: "Handwriting" },
  { name: "Courgette", value: "Courgette", category: "Handwriting" },
  { name: "Patrick Hand", value: "Patrick Hand", category: "Handwriting" },
  { name: "Architects Daughter", value: "Architects Daughter", category: "Handwriting" },
  { name: "Cookie", value: "Cookie", category: "Handwriting" },
  { name: "Pacifico", value: "Pacifico", category: "Handwriting" },
  { name: "Great Vibes", value: "Great Vibes", category: "Handwriting" },
  { name: "Sacramento", value: "Sacramento", category: "Handwriting" },
  { name: "Allura", value: "Allura", category: "Handwriting" },

  // Monospace Fonts
  { name: "Roboto Mono", value: "Roboto Mono", category: "Monospace" },
  { name: "Source Code Pro", value: "Source Code Pro", category: "Monospace" },
  { name: "Inconsolata", value: "Inconsolata", category: "Monospace" },
  { name: "Fira Code", value: "Fira Code", category: "Monospace" },
  { name: "JetBrains Mono", value: "JetBrains Mono", category: "Monospace" },
  { name: "IBM Plex Mono", value: "IBM Plex Mono", category: "Monospace" },
  { name: "Space Mono", value: "Space Mono", category: "Monospace" },
  { name: "Courier Prime", value: "Courier Prime", category: "Monospace" },
  { name: "Anonymous Pro", value: "Anonymous Pro", category: "Monospace" },
  { name: "Ubuntu Mono", value: "Ubuntu Mono", category: "Monospace" },
  { name: "Overpass Mono", value: "Overpass Mono", category: "Monospace" },
  { name: "PT Mono", value: "PT Mono", category: "Monospace" },
  { name: "Nanum Gothic Coding", value: "Nanum Gothic Coding", category: "Monospace" },
  { name: "VT323", value: "VT323", category: "Monospace" },
  { name: "Azeret Mono", value: "Azeret Mono", category: "Monospace" },
]

export const fontCategories = ["Sans Serif", "Serif", "Display", "Handwriting", "Monospace"]

export function getFontsByCategory(category: string): GoogleFont[] {
  return googleFonts.filter((font) => font.category === category)
}

export function loadGoogleFont(fontName: string) {
  // Check if font is already loaded
  const existingLink = document.querySelector(`link[href*="${fontName.replace(/ /g, "+")}"]`)
  if (existingLink) return

  // Create and append link element to load the font
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, "+")}:wght@400;500;600;700&display=swap`
  document.head.appendChild(link)
}
