import './custom-select';
import './custom-input';

export default class Payments extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.props = {};

    this.state = {
      account: '',
      paymentAmount: 0,
      paymentName: '',
      currency: '',
    };

    this.addEventListener('on-account-change', this.onAccountChange);
    this.addEventListener('on-payment-amount-change', this.onAmountChange);
    this.addEventListener('on-payment-name-change', this.onPaymentNameChange);
    this.addEventListener('on-currency-change', this.onCurrencyChange);

    this.onAccountChange = this.onAccountChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onPaymentNameChange = this.onPaymentNameChange.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
  }

  onAccountChange(evt) {
    this.updateChildren();
  };
  onAmountChange(evt) {
    this.state.amount = evt;
    this.updateChildren();
  };
  onPaymentNameChange(evt) {
    this.state.paymentName = evt;
    this.updateChildren();
  };
  onCurrencyChange(evt) {
    this.state.currency = evt;
    this.updateChildren();
  };

  updateChildren() {
    this.shadowRoot.querySelector('#amount')
        .amount = this.state.amount;
    this.shadowRoot.querySelector('#account')
        .account = this.state.account;
    this.shadowRoot.querySelector('#saved-payments')
        .paymentName = this.state.paymentName;
    this.shadowRoot.querySelector('#currency')
        .currency = this.state.currency;
  }


  connectedCallback() {
    this.render();
    this.updateChildren();
  }

  render() {
    this.shadow.innerHTML = `
            <style>
                .container{
                    width: 40%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem;
                }
                .amount-wrapper{
                    display: flex;
                }
                .amount-wrapper custom-input{
                    flex: 2;
                }
                .amount-wrapper custom-select{
                    flex:0 0 90px;
                }
                .buttons {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-top: 1rem;
                }
                .btn {
                    border: none;
                    color: #fff;
                    border-radius: 3px;
                    padding: 8px 16px;
                }

                .btn.pay-btn {
                    background-color: #ee7023;
                }
                .btn.save-btn {
                    background-color: #31a3ae;
                    margin-right: 8px;
                }

                @media (max-width: 960px) {
                    .container{
                        display: flex;
                        flex-direction: column;
                        padding: 1rem 0.5rem;
                        width: 100%;
                        max-width: 320px;
                    }
    
                    .buttons{
                        display: flex;
                        flex-direction: column;
                    }

                    .btn {
                        margin: 0.25rem 0;
                        width: 100%;
                    }
                    
                    .btn.save-btn {
                        margin-right: 0;
                    }
                }

            </style>
            <div class="container">
                <div>
                    <custom-select
                        id="account"
                        name="account"
                        options="Account1, Account2, Account3"
                    />
                </div>
                <div>
                    <custom-select
                        id="saved-payments"
                        name="saved-payments"
                        options="Payment1, Payment2, Payment3"
                    />
                </div>
                <div class="amount-wrapper">
                    <custom-input id="amount" name="amount"></custom-input>
                    <custom-select id="currency" options="EUR, USD"/>
                </div>
                <div>
                    <custom-input
                        id="description"
                        name="description"
                    ></custom-input>
                </div>

                <div class="buttons">
                    <button class="btn save-btn"> Save</button>
                    <button class="btn pay-btn">Pay</button>
                </div>
            </div>
        `;
  }
}
customElements.define('payment-content', Payments);
