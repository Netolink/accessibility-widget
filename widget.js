(function () {
  const TOGGLE_ID = 'accessibility-toggle';
  const PANEL_ID = 'accessibility-panel';
  const PANEL_TITLE_ID = 'accessibility-panel-title';

  const fontSizeClasses = ['font-size-default', 'font-size-large', 'font-size-xlarge'];
  let fontSizeLevel = 0;
  let lastFocusedElement = null;

  function createWidgetMarkup() {
    return `
      <button id="${TOGGLE_ID}" type="button" aria-label="פתיחת תפריט נגישות" aria-controls="${PANEL_ID}" aria-expanded="false">
        <i class="fas fa-universal-access" aria-hidden="true"></i>
      </button>

      <section id="${PANEL_ID}" role="dialog" aria-modal="false" aria-hidden="true" aria-labelledby="${PANEL_TITLE_ID}" tabindex="-1" hidden>
        <h2 id="${PANEL_TITLE_ID}">אפשרויות נגישות</h2>

        <div class="accessibility-group" role="group" aria-label="טקסט">
          <strong>טקסט</strong>
          <button type="button" data-action="increaseFont"><i class="fas fa-search-plus" aria-hidden="true"></i> טקסט+</button>
          <button type="button" data-action="decreaseFont"><i class="fas fa-search-minus" aria-hidden="true"></i> טקסט-</button>
          <button type="button" data-toggle="readable-font"><i class="fas fa-font" aria-hidden="true"></i> גופן קריא</button>
        </div>

        <div class="accessibility-group" role="group" aria-label="ניגודיות">
          <strong>ניגודיות</strong>
          <button type="button" data-toggle="high-contrast" data-group="contrast"><i class="fas fa-adjust" aria-hidden="true"></i> גבוהה</button>
          <button type="button" data-toggle="dark-contrast" data-group="contrast"><i class="fas fa-moon" aria-hidden="true"></i> כהה</button>
          <button type="button" data-toggle="light-contrast" data-group="contrast"><i class="fas fa-sun" aria-hidden="true"></i> בהירה</button>
        </div>

        <div class="accessibility-group" role="group" aria-label="עיצוב טקסט">
          <strong>עיצוב טקסט</strong>
          <button type="button" data-toggle="letter-spacing"><i class="fas fa-text-width" aria-hidden="true"></i> ריווח אותיות</button>
          <button type="button" data-toggle="line-spacing"><i class="fas fa-text-height" aria-hidden="true"></i> ריווח שורות</button>
          <button type="button" data-action="align-right"><i class="fas fa-align-right" aria-hidden="true"></i> לימין</button>
          <button type="button" data-action="align-center"><i class="fas fa-align-center" aria-hidden="true"></i> למרכז</button>
          <button type="button" data-action="align-left"><i class="fas fa-align-left" aria-hidden="true"></i> לשמאל</button>
        </div>

        <div class="accessibility-group" role="group" aria-label="הדגשות">
          <strong>הדגשות</strong>
          <button type="button" data-style-toggle="link-highlight-style"><i class="fas fa-link" aria-hidden="true"></i> קישורים</button>
          <button type="button" data-style-toggle="heading-highlight-style"><i class="fas fa-heading" aria-hidden="true"></i> כותרות</button>
          <button type="button" data-style-toggle="focus-highlight-style"><i class="fas fa-eye" aria-hidden="true"></i> פוקוס</button>
        </div>

        <div class="accessibility-group" role="group" aria-label="הסתרות">
          <strong>הסתרות</strong>
          <button type="button" data-action="toggleImages"><i class="fas fa-image" aria-hidden="true"></i> הסתרת תמונות</button>
          <button type="button" data-action="muteMedia"><i class="fas fa-volume-mute" aria-hidden="true"></i> השתקה</button>
          <button type="button" data-style-toggle="stop-animation-style"><i class="fas fa-ban" aria-hidden="true"></i> עצירת אנימציות</button>
        </div>

        <div class="accessibility-group" role="group" aria-label="תוספות">
          <strong>תוספות</strong>
          <button type="button" data-toggle="big-cursor"><i class="fas fa-mouse-pointer" aria-hidden="true"></i> סמן גדול</button>
          <button type="button" data-toggle="reading-mode"><i class="fas fa-book-reader" aria-hidden="true"></i> מצב קריאה</button>
        </div>

        <div class="accessibility-actions">
          <button type="button" data-action="reset"><i class="fas fa-undo" aria-hidden="true"></i> איפוס</button>
        </div>
      </section>
    `;
  }

  function ensureFontSizeStyles() {
    if (document.getElementById('accessibility-font-size-style')) return;

    const fontSizeStyles = document.createElement('style');
    fontSizeStyles.id = 'accessibility-font-size-style';
    fontSizeStyles.innerHTML = `
      .font-size-default { font-size: 100% !important; }
      .font-size-large { font-size: 115% !important; }
      .font-size-xlarge { font-size: 130% !important; }
    `;
    document.head.appendChild(fontSizeStyles);
  }

  function updateFontSizeClass() {
    document.body.classList.remove(...fontSizeClasses);
    document.body.classList.add(fontSizeClasses[fontSizeLevel]);
  }

  function setPressed(button, isPressed) {
    button.setAttribute('aria-pressed', String(isPressed));
    button.classList.toggle('is-active', isPressed);
  }

  function togglePanel(forceOpen) {
    const panel = document.getElementById(PANEL_ID);
    const toggleButton = document.getElementById(TOGGLE_ID);
    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : panel.hidden;

    panel.hidden = !shouldOpen;
    panel.setAttribute('aria-hidden', String(!shouldOpen));
    toggleButton.setAttribute('aria-expanded', String(shouldOpen));

    if (shouldOpen) {
      lastFocusedElement = document.activeElement;
      panel.focus();
    } else if (lastFocusedElement && lastFocusedElement.focus) {
      lastFocusedElement.focus();
    }
  }

  function toggleStyleById(styleId) {
    const existing = document.getElementById(styleId);
    if (existing) {
      existing.remove();
      return false;
    }

    const style = document.createElement('style');
    style.id = styleId;

    if (styleId === 'link-highlight-style') {
      style.innerHTML = 'a { background: #ffeb3b; color: #000 !important; text-decoration: underline !important; }';
    } else if (styleId === 'heading-highlight-style') {
      style.innerHTML = 'h1,h2,h3,h4,h5,h6 { background: #bde5ff; color: #000 !important; }';
    } else if (styleId === 'focus-highlight-style') {
      style.innerHTML = '*:focus { outline: 3px solid #ff8c00 !important; outline-offset: 2px !important; box-shadow: 0 0 0 2px #ffcc80 !important; }';
    } else if (styleId === 'stop-animation-style') {
      style.innerHTML = '*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }';
    }

    document.head.appendChild(style);
    return true;
  }

  function handleAction(action) {
    if (action === 'increaseFont' && fontSizeLevel < fontSizeClasses.length - 1) {
      fontSizeLevel += 1;
      updateFontSizeClass();
    }

    if (action === 'decreaseFont' && fontSizeLevel > 0) {
      fontSizeLevel -= 1;
      updateFontSizeClass();
    }

    if (action === 'align-right') document.body.style.textAlign = 'right';
    if (action === 'align-center') document.body.style.textAlign = 'center';
    if (action === 'align-left') document.body.style.textAlign = 'left';

    if (action === 'toggleImages') {
      document.querySelectorAll('img').forEach((img) => {
        img.style.visibility = img.style.visibility === 'hidden' ? '' : 'hidden';
      });
    }

    if (action === 'muteMedia') {
      document.querySelectorAll('video,audio').forEach((el) => {
        el.muted = true;
      });
    }

    if (action === 'reset') {
      location.reload();
    }
  }

  function initializeWidget() {
    if (!document.body || document.getElementById(TOGGLE_ID)) return;

    document.body.insertAdjacentHTML('beforeend', createWidgetMarkup());
    ensureFontSizeStyles();
    document.body.classList.add('font-size-default');

    const panel = document.getElementById(PANEL_ID);
    const toggleButton = document.getElementById(TOGGLE_ID);

    toggleButton.addEventListener('click', () => togglePanel());

    panel.addEventListener('click', (event) => {
      const target = event.target.closest('button');
      if (!target) return;

      const toggleClass = target.dataset.toggle;
      const action = target.dataset.action;
      const styleToggle = target.dataset.styleToggle;

      if (toggleClass) {
        const group = target.dataset.group;

        if (group) {
          panel.querySelectorAll(`button[data-group="${group}"]`).forEach((btn) => {
            const className = btn.dataset.toggle;
            const isActive = btn === target ? !document.body.classList.contains(className) : false;
            if (btn !== target) document.body.classList.remove(className);
            setPressed(btn, isActive);
          });
        }

        const isPressed = document.body.classList.toggle(toggleClass);
        setPressed(target, isPressed);
      }

      if (action) handleAction(action);

      if (styleToggle) {
        const active = toggleStyleById(styleToggle);
        setPressed(target, active);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) {
        togglePanel(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWidget);
  } else {
    initializeWidget();
  }

  window.toggleAccessibilityPanel = togglePanel;
})();
