(function() {
  const html = `
    <button id="accessibility-toggle" style="
      position: fixed; bottom: 20px; right: 20px; background: #005cbf; color: white; border: none;
      border-radius: 50%; width: 50px; height: 50px; font-size: 22px; cursor: pointer; z-index: 9999;">
      <i class="fas fa-universal-access"></i>
    </button>
    <div id="accessibility-panel" style="
      position: fixed; bottom: 80px; right: 20px; background: white; border: 1px solid #ccc; border-radius: 10px;
      width: 280px; max-height: 80vh; overflow-y: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      font-family: sans-serif; display: none; z-index: 9999; padding: 10px;">
      
      <div class="accessibility-group" style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
        <strong style="display:block; margin-bottom:6px;">טקסט</strong>
        <button onclick="increaseFont()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-search-plus"></i> טקסט+
        </button>
        <button onclick="decreaseFont()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-search-minus"></i> טקסט-
        </button>
        <button onclick="toggleReadableFont()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-font"></i> גופן קריא
        </button>
      </div>

      <div class="accessibility-group" style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
        <strong style="display:block; margin-bottom:6px;">ניגודיות</strong>
        <button onclick="toggleContrast()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-adjust"></i> גבוהה
        </button>
        <button onclick="toggleDarkContrast()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-moon"></i> כהה
        </button>
        <button onclick="toggleLightContrast()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-sun"></i> בהירה
        </button>
      </div>

      <div class="accessibility-group" style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
        <strong style="display:block; margin-bottom:6px;">עיצוב טקסט</strong>
        <button onclick="toggleLetterSpacing()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-text-width"></i> ריווח אותיות
        </button>
        <button onclick="toggleLineSpacing()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-text-height"></i> ריווח שורות
        </button>
        <button onclick="alignText('right')" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-align-right"></i> לימין
        </button>
        <button onclick="alignText('center')" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-align-center"></i> למרכז
        </button>
        <button onclick="alignText('left')" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-align-left"></i> לשמאל
        </button>
      </div>

      <div class="accessibility-group" style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
        <strong style="display:block; margin-bottom:6px;">הדגשות</strong>
        <button onclick="highlightLinks()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-link"></i> קישורים
        </button>
        <button onclick="highlightHeadings()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-heading"></i> כותרות
        </button>
        <button onclick="highlightFocus()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-eye"></i> פוקוס
        </button>
      </div>

      <div class="accessibility-group" style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
        <strong style="display:block; margin-bottom:6px;">הסתרות</strong>
        <button onclick="toggleImages()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-image"></i> הסתרת תמונות
        </button>
        <button onclick="muteMedia()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-volume-mute"></i> השתקה
        </button>
        <button onclick="stopAnimations()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-ban"></i> עצירת אנימציות
        </button>
      </div>

      <div class="accessibility-group" style="margin-bottom:10px;">
        <strong style="display:block; margin-bottom:6px;">תוספות</strong>
        <button onclick="toggleCursor()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-mouse-pointer"></i> סמן גדול
        </button>
        <button onclick="toggleReadingMode()" style="margin:3px 5px 6px 0; padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-book-reader"></i> מצב קריאה
        </button>
      </div>

      <div style="text-align:center; margin-top:10px;">
        <button onclick="resetAccessibility()" style="padding:6px 10px; font-size:13px; cursor:pointer;">
          <i class="fas fa-undo"></i> איפוס
        </button>
      </div>
    </div>
  `;

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('accessibility-toggle').addEventListener('click', toggleAccessibilityPanel);
  });

window.toggleAccessibilityPanel = function () {
  const panel = document.getElementById('accessibility-panel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
};

window.increaseFont = function () {
  document.body.style.fontSize = 'larger';
};

window.decreaseFont = function () {
  document.body.style.fontSize = 'smaller';
};

window.toggleReadableFont = function () {
  document.body.classList.toggle('readable-font');
};

window.toggleContrast = function () {
  document.body.classList.toggle('high-contrast');
};

window.toggleDarkContrast = function () {
  document.body.classList.toggle('dark-contrast');
};

window.toggleLightContrast = function () {
  document.body.classList.toggle('light-contrast');
};

window.alignText = function (direction) {
  document.body.style.textAlign = direction;
};

window.toggleLetterSpacing = function () {
  document.body.classList.toggle('letter-spacing');
};

window.toggleLineSpacing = function () {
  document.body.classList.toggle('line-spacing');
};

window.highlightLinks = function () {
  const style = document.getElementById('link-highlight-style');
  if (style) style.remove();
  else {
    const s = document.createElement('style');
    s.id = 'link-highlight-style';
    s.innerHTML = `a { background: yellow; color: black !important; }`;
    document.head.appendChild(s);
  }
};

window.highlightHeadings = function () {
  const style = document.getElementById('heading-highlight-style');
  if (style) style.remove();
  else {
    const s = document.createElement('style');
    s.id = 'heading-highlight-style';
    s.innerHTML = `h1,h2,h3,h4,h5,h6 { background: lightblue; color: black !important; }`;
    document.head.appendChild(s);
  }
};

window.highlightFocus = function () {
  const existing = document.getElementById('focus-highlight-style');
  if (existing) existing.remove();
  else {
    const style = document.createElement('style');
    style.id = 'focus-highlight-style';
    style.innerHTML = `*:focus { outline: 3px solid orange !important; outline-offset: 2px !important; }`;
    document.head.appendChild(style);
  }
};

window.toggleImages = function () {
  document.querySelectorAll('img').forEach(img => {
    img.style.display = img.style.display === 'none' ? '' : 'none';
  });
};

window.muteMedia = function () {
  document.querySelectorAll('video,audio').forEach(el => {
    el.muted = true;
  });
};

window.stopAnimations = function () {
  if (!document.getElementById('stop-animation-style')) {
    const style = document.createElement('style');
    style.id = 'stop-animation-style';
    style.innerHTML = `* { animation: none !important; transition: none !important; }`;
    document.head.appendChild(style);
  }
};

window.toggleCursor = function () {
  document.body.classList.toggle('big-cursor');
};

window.toggleReadingMode = function () {
  document.body.classList.toggle('reading-mode');
};

window.resetAccessibility = function () {
  location.reload();
};
})();
