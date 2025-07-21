(function() {
  // Nenu
  const html = `
    <button id="accessibility-toggle" onclick="toggleAccessibilityPanel()">
      <i class="fas fa-universal-access"></i>
    </button>
    <div id="accessibility-panel" style="display:none;">
    </div>
  `;

  // To body
  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', html);
  });


// Toggle Panel
function toggleAccessibilityPanel() {
  const panel = document.getElementById('accessibility-panel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

// Font Size
function increaseFont() {
  document.body.style.fontSize = 'larger';
}
function decreaseFont() {
  document.body.style.fontSize = 'smaller';
}

// Readable Font
function toggleReadableFont() {
  document.body.classList.toggle('readable-font');
}

// Contrast Modes
function toggleContrast() {
  document.body.classList.toggle('high-contrast');
}
function toggleDarkContrast() {
  document.body.classList.toggle('dark-contrast');
}
function toggleLightContrast() {
  document.body.classList.toggle('light-contrast');
}

// Text Alignment
function alignText(direction) {
  document.body.style.textAlign = direction;
}

// Spacing
function toggleLetterSpacing() {
  document.body.classList.toggle('letter-spacing');
}
function toggleLineSpacing() {
  document.body.classList.toggle('line-spacing');
}

// Highlights
function highlightLinks() {
  const style = document.getElementById('link-highlight-style');
  if (style) style.remove();
  else {
    const s = document.createElement('style');
    s.id = 'link-highlight-style';
    s.innerHTML = `a { background: yellow; color: black !important; }`;
    document.head.appendChild(s);
  }
}

function highlightHeadings() {
  const style = document.getElementById('heading-highlight-style');
  if (style) style.remove();
  else {
    const s = document.createElement('style');
    s.id = 'heading-highlight-style';
    s.innerHTML = `h1,h2,h3,h4,h5,h6 { background: lightblue; color: black !important; }`;
    document.head.appendChild(s);
  }
}

function highlightFocus() {
  const existing = document.getElementById('focus-highlight-style');
  if (existing) existing.remove();
  else {
    const style = document.createElement('style');
    style.id = 'focus-highlight-style';
    style.innerHTML = `*:focus { outline: 3px solid orange !important; outline-offset: 2px !important; }`;
    document.head.appendChild(style);
  }
}

// Images
function toggleImages() {
  document.querySelectorAll('img').forEach(img => {
    img.style.display = img.style.display === 'none' ? '' : 'none';
  });
}

// Mute Media
function muteMedia() {
  document.querySelectorAll('video,audio').forEach(el => {
    el.muted = true;
  });
}

// Stop Animations
function stopAnimations() {
  const style = document.createElement('style');
  style.id = 'stop-animation-style';
  style.innerHTML = `* { animation: none !important; transition: none !important; }`;
  document.head.appendChild(style);
}

// Cursor
function toggleCursor() {
  document.body.classList.toggle('big-cursor');
}

// Reading Mode
function toggleReadingMode() {
  document.body.classList.toggle('reading-mode');
}

// Reset
function resetAccessibility() {
  location.reload();
}
