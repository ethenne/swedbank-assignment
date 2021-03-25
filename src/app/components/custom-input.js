export default class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.props = {
      amount: null,
      error: '',
    };
    this.state = {};

    this.onAmountChange = this.onAmountChange.bind(this);
  }

  static get observedAttributes() {
    return ['name', 'id'];
  }


  set amount(value) {
    this.props.amount = value;
  }

  get amount() {
    return this.props.amount;
  }


  onAmountChange(evt) {
    const amount = parseInt(evt.target.value, 10);
    this.dispatchEvent(new CustomEvent('on-payment-amount-change', {
      bubbles: true,
      composed: true,
      detail: {
        amount,
      },
    }));
  }

  inputValidation(id, val) {
    const input = this.shadowRoot.querySelector(`#${id}`);
    const errorMessage = this.shadowRoot.querySelector(`.error-message`);
    if (Number(val) || val === '') {
      this.props.error = '';
      errorMessage.innerText = this.props.error;
      input.className = input.className.replace(' error', '');
    } else {
      this.props.error = 'Amount access only numbers';
      this.shadowRoot.querySelector(`#${id}`).className += ' error';
      errorMessage.innerText = this.props.error;
    }
  }

  updateChildren(id) {
    this.shadowRoot.querySelector(`#${id}`).value = this.props.amount;
  }


  connectedCallback() {
    this.render();

    Object.keys(this.props).forEach((propName) => {
      if (this.hasOwnProperty(propName)) {
        const value = this[propName];
        delete this[propName];
        this[propName] = value;
      }
    });

    const id = this.getAttribute('id') || '';

    this.shadowRoot.querySelector(`#${id}`)
        .addEventListener('input', this.onAmountChange);
    this.shadowRoot.querySelector(`#${id}`).addEventListener('blur', (evt) => {
      this.inputValidation(evt.currentTarget.id, evt.target.value);
    });


    this.updateChildren(id);
  }

  render() {
    const name = this.getAttribute('name') || '';
    const id = this.getAttribute('id') || '';

    this.shadow.innerHTML = `
        <style>
            .input-container{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }

            .input-wrapper{
                flex: 1 1 70%;
                display: flex;
                flex-wrap: wrap;
            }
            .label {
                flex: 0 1 120px;
                max-width: 160px;
            }

            .custom-input {
                width: 100%;
                padding: 0.4rem;
                margin: 0.2rem;
                border: 1px solid #bcd8db;
                border-radius: 3px;
            }

            .error-message{
                display: block;
                color: red;
                visibility: hidden;
                opacity: 0;
                transition: opacity 0.3s ease;
                margin-left: 0.5rem;
                font-size: 12px;
            }
            .error {
                border: 1px solid red;
            }
            .error ~ .error-message {
                visibility: visible;
                opacity: 1;
                transition: opacity 0.3s ease;
            }

            @media (max-width: 760px) {
                .input-container {
                    flex-direction: column;
                    align-items: baseline;
                }

                .input-wrapper {
                    width: 100%;
                }

                .label{
                    flex: 1 0 auto;
                }
            }
        </style>
        <div class="input-container">
            <label class="label" htmlFor="${id}">${name}</label>
            <div class="input-wrapper">
                <input class="custom-input" name="${name}" id="${id}" />
                <span class="error-message"></span>
            </div>
        </div>
    `;
  }
}

customElements.define('custom-input', CustomInput);
