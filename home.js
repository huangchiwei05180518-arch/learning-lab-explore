// Preserve links to the original slideshow after introducing its home page.
if (/^#(?:page=\d+|sources|phases)$/.test(location.hash)) {
  location.replace('moon.html' + location.hash);
}
