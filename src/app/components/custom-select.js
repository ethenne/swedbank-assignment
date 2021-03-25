export default class CustomSelect extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.props = {
      period: 0,
      interest: 0,
    };
    this.state = {};

    this.onPerionChange = this.onPerionChange.bind(this);
    this.onInterestChange = this.onInterestChange.bind(this);
  }

  set period(value) {
    this.props.period = value;
  }

  get period() {
    return this.props.period;
  }

  set interest(value) {
    this.props.interest = value;
  }

  get interest() {
    return this.props.interest;
  }

  onPerionChange(val) {
    this.state.period = val;
    this.dispatchEvent(new CustomEvent('on-period-change', {
      bubbles: true,
      composed: true,
      detail: {
        period: val,
      },
    }));
  }

  onInterestChange(val) {
    this.state.interest = val;
    this.dispatchEvent(new CustomEvent('on-interest-change', {
      bubbles: true,
      composed: true,
      detail: {
        interest: val,
      },
    }));
  }


  connectedCallback() {
    Object.keys(this.props).forEach((propName) => {
      if (this.hasOwnProperty(propName)) {
        const value = this[propName];
        delete this[propName];
        this[propName] = value;
      }
    });
    const name = this.getAttribute('name') || '';
    const id = this.getAttribute('id') || '';
    let options = this.getAttribute('options') || '';

    options = options.split(',') || [];

    this.shadowRoot.innerHTML = `
            <style>
            .select-container{
                display: flex;
                align-items: center;
            }
            .select-wrapper{
                width: 100%;
            }
                .custom-select {
                    padding: 0.4rem;
                    margin: 0.2rem;
                    width: 100%;
                    background-color: #ebf8f2;
                    border: 1px solid #bcd8db;
                    border-radius: 3px;
                }
                .label {
                    flex: 1 0 120px;
                    max-width: 220px;
                }
                @media (max-width: 760px) {
                    .select-container {
                        flex-direction: column;
                        align-items: baseline;
                    }

                    .label{
                        flex: 1 0 20px;
                    }
    
                }
        </style>
            <div class="select-container">
                <label class="label" htmlFor="${id}">${name}</label>
                <select class="custom-select" name="${name}" id="${id}">
                    ${options}
                </select>
            </div>
        `;

    const label = this.shadowRoot.querySelector(`.label`);

    if (window.innerWidth >= 960 && label.innerText === '') {
      label.style.display = 'none';
    } else {
      label.style.display = 'block';
    }


    options.forEach((option, index) => {
      const child = document.createElement('option');
      child.setAttribute('value', index);
      child.innerText = `${option}`;
      options = this.shadowRoot.querySelector(`#${id}`).appendChild(child);
    });

    const select = this.shadowRoot.querySelector(`#${id}`);

    select.addEventListener('click', () => {
      if (id === 'period') {
        this.onPerionChange(select.options[select.selectedIndex].value);
      } else {
        this.onInterestChange(select.options[select.selectedIndex].value);
      }
    });
  }

  static get observedAttributes() {
    return ['name', 'id', 'options'];
  }
}

customElements.define('custom-select', CustomSelect);
