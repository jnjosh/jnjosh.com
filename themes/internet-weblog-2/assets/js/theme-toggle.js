// Generated from internet-weblog-2 1.0.0-beta.5 — do not edit here.
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
          color: var(--jnj-color-muted);
          background: transparent;
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
        }

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
          fill: currentColor;
        }

        button[aria-pressed="false"] svg {
          transform: rotate(180deg);
        }
        button[aria-pressed="true"] {
          color: var(--jnj-color-text);
        }

        @media (prefers-reduced-motion: no-preference) {
          svg {
            transition: transform 240ms ease;
          }
        }

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
        <button part="button" type="button" aria-label="Dark appearance" aria-pressed="false">
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
