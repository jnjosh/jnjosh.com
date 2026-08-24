// Generated from internet-weblog-2 1.0.0-beta.1 — do not edit here.
import { JnjElement } from './jnj-element.js';












const KEY = 'jnj-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

export class ThemeToggle extends JnjElement {
  
  onSystemChange = () => this.sync();

  render() {
    this.media = matchMedia(DARK_QUERY);

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Private, component-scoped tokens — genuinely encapsulated by Shadow DOM;
             they do NOT leak to the page, unlike a private token on :root would. This
             is the private-token experiment, and it survives the control shrinking. */
          --_jnj-control-size: 2rem;
          --_jnj-icon-size: 1.25rem;
          display: inline-block;
        }
        button {
          display: grid;
          place-items: center;
          inline-size: var(--_jnj-control-size);
          block-size: var(--_jnj-control-size);
          padding: 0;
          /* Public semantic tokens inherit across the shadow boundary for free. */
          color: var(--jnj-color-muted);
          background: transparent;
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
        }

        /* 44×44 target without a 44px-tall control. A deliberate copy of
           the sheet's shared rule rather than a share: a shadow root inherits no page
           CSS, and that isolation is the point of the boundary.

           This expansion now grows the area in BOTH axes — the old three-label control
           was already wider than 44px, so it only grew vertically. 6px per side here.
           Its only neighbour is the space switch, and the controls row separates them
           with space-between rather than a gap, so at 375px roughly 190px sits between
           the two areas. Re-measure if anything else joins that row. */
        button::after {
          content: "";
          position: absolute;
          inset-block-start: 50%;
          inset-inline-start: 50%;
          translate: -50% -50%;
          inline-size: max(100%, var(--jnj-target-min));
          block-size: max(100%, var(--jnj-target-min));
        }

        svg {
          inline-size: var(--_jnj-icon-size);
          block-size: var(--_jnj-icon-size);
          /* The artwork is a filled silhouette, so it is drawn filled and never
             stroked — stroking it collapses the half-fill into a circle with a line
             through it, which reads as nothing. */
          fill: currentColor;
        }

        /* The pressed cue is WHICH HALF IS FILLED, carried by a half turn. Shape and
           position, not color, so it clears the non-color-cue bar on its own; the
           color step below only reinforces it. The glyph is symmetric about its
           horizontal axis, so a 180° rotation lands exactly on its own mirror image —
           which is why one piece of artwork covers both states. */
        button[aria-pressed="false"] svg {
          /* The transform shorthand, NOT the independent rotate property the ::after
             rule above uses. On an <svg> element, rotate: 180deg computes straight back
             to 0deg in WebKit — measured, not assumed — while transform applies, and
             transform-box: view-box puts the origin at the glyph's center for free. */
          transform: rotate(180deg);
        }
        button[aria-pressed="true"] {
          color: var(--jnj-color-text);
        }

        /* Motion is the affordance, not decoration: the half turn is the visible answer
           to a tap on a control whose other feedback (the whole page changing) is too
           big to read as a response. Removed entirely under reduced motion, where the
           end state still differs. */
        @media (prefers-reduced-motion: no-preference) {
          svg {
            transition: transform 240ms ease;
          }
        }

        /* Hover is an enhancement only — the control is fully usable without it, and
           on touch it simply never fires. */
        @media (hover: hover) {
          button:hover {
            color: var(--jnj-color-text);
            background: color-mix(in oklch, var(--jnj-color-text) 10%, transparent);
          }
        }
        button:focus-visible {
          outline: 2px solid var(--jnj-color-link);
          outline-offset: 2px;
        }
      </style>
      <!-- part="button" is a deliberate widening of this component's public surface, not a
             convenience. ::part() is the controlled seam for styling a
             shadow internal from outside — "opt-in, not accidental bleed" — and the toolbar
             needs exactly that: it has to put an opaque chip and the accent color on this
             control, and both are decisions belonging to the TOOLBAR rather than to the
             toggle. Baking them in here would make a general component toolbar-specific. -->
        <button part="button" type="button" aria-label="Dark appearance" aria-pressed="false">
        <!-- The artwork (dark-mode.svg), inlined verbatim apart from a dropped XML
             prolog and the 100pt width/height that CSS now sets. A ring with one half
             filled — the appearance/contrast symbol, not a moon.

             Inline and local on purpose: this is the first icon in the repo, and
             rather than inventing an icon system around a sample of one. -->
        <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <path d="m50 5c-24.852 0-45 20.148-45 45s20.148 45 45 45 45-20.148 45-45-20.148-45-45-45zm-39 45c0-21.504 17.496-39 39-39v21c9.9414 0 18 8.0586 18 18s-8.0586 18-18 18v21c-21.504 0-39-17.496-39-39z"/>
          <path d="m50 32c-9.9414 0-18 8.0586-18 18s8.0586 18 18 18z"/>
        </svg>
      </button>
    `;

    this.button = this.shadowRoot.querySelector('button');
    this.button.addEventListener('click', () => this.toggle());
    this.sync();
  }

  connectedCallback() {
    super.connectedCallback();
    
    
    
    this.media?.addEventListener('change', this.onSystemChange);
  }

  disconnectedCallback() {
    this.media?.removeEventListener('change', this.onSystemChange);
  }

  
  get stored() {
    try {
      const v = localStorage.getItem(KEY);
      return v === 'light' || v === 'dark' ? v : null;
    } catch {
      return null;
    }
  }

  
  get systemAppearance() {
    return this.media.matches ? 'dark' : 'light';
  }

  
  get appearance() {
    return this.stored ?? this.systemAppearance;
  }

  toggle() {
    const next = this.appearance === 'dark' ? 'light' : 'dark';
    
    
    const following = next === this.systemAppearance;
    try {
      if (following) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {}
    
    document.documentElement.style.colorScheme = following ? '' : next;
    this.sync();
  }

  sync() {
    this.button.setAttribute('aria-pressed', String(this.appearance === 'dark'));
  }
}

if (!customElements.get('jnj-theme-toggle')) {
  customElements.define('jnj-theme-toggle', ThemeToggle);
}
