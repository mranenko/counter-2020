class DoCounter extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }


  /**
   * Getters and setters
   */

  get count() {
    return this.getAttribute('count');
  }

  set count(value) {
    this.setAttribute('count', value);
  }

  static get observedAttributes() {
    return ['count'];
  }


  /**
   * Lifecycle methods
   */

  attributeChangedCallback(attributeName, originalValue, newValue) {
    if (attributeName === 'count') {
      this.render();
      this.addEventListeners();
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        @import 'components/do-counter/do-counter.css';
      </style>
    
      <button class="do-counter-button do-counter-button-decrement">-</button>
      <span class="do-counter-value">${this.count}</span>
      <button class="do-counter-button do-counter-button-increment">+</button>
    `;
  }

 addEventListeners() {
    this.shadow.querySelectorAll('.do-counter-button-decrement').forEach((button) => {
      button.addEventListener('click', () => {
        this.decrementCounter();
      });
    });

    this.shadow.querySelectorAll('.do-counter-button-increment').forEach((button) => {
      button.addEventListener('click', () => {
        this.incrementCounter();
      });
    });
  }

  decrementCounter() {
    this.count = this.count > 0 ? this.count-1 : 0;
  }

  incrementCounter() {
    this.count++;
  }
}

window.customElements.define('do-counter', DoCounter);
