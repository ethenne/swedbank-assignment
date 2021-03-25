import './custom-select';
import './custom-range';
import {
  periodOption,
  interestOption,
  amount
} from '../helpers/calculator-helper';


export default class LoanCalculator extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.props = {};

    this.state = {
      period: 0,
      interest: 0,
      loanAmount: 0,
      paymentAmount: 0,
    };

    this.addEventListener('on-period-change', this.onPeriodChange);
    this.addEventListener('on-interest-change', this.onInterestChange);
    this.addEventListener('on-loan-change', this.onLoanChange);

    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.onInterestChange = this.onInterestChange.bind(this);
    this.onLoanChange = this.onLoanChange.bind(this);
    this.onAmountUpdate = this.onAmountUpdate.bind(this);
  }

  set paymentAmount(value) {
    this.props.paymentAmount = value;
  }

  get paymentAmount() {
    return this.props.paymentAmount;
  }

  onPeriodChange(evt) {
    this.state.period = evt.detail.period;
    this.onAmountUpdate();
  };

  onInterestChange(evt) {
    this.state.interest = evt.detail.interest;
    this.onAmountUpdate();
  };

  onLoanChange(evt) {
    this.state.loanAmount = evt.detail.loanAmount;
    this.onAmountUpdate();
  }

  onAmountUpdate() {
    this.state.paymentAmount =
    amount(this.state.period, this.state.interest, this.state.loanAmount);

    this.updateChildren();
  }

  updateChildren() {
    this.shadowRoot.querySelector('#period').period = this.state.period;
    this.shadowRoot.querySelector('#interest').interest = this.state.interest;
    this.shadowRoot.querySelector('#loan').loanAmount = this.state.loanAmount;
    this.shadowRoot.querySelector('#payment-amount').innerHTML = `<span>${this.state.paymentAmount}</span> EUR`;
  }

  connectedCallback() {
    this.render();
    this.onAmountUpdate();
    this.updateChildren();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .container{
            max-width: 1260px;
            margin: 0 auto;
            display: flex;
            padding: 1rem 1.75rem;
        }
        .parameters{
            flex: 2;
            border: solid #dadada;
            border-width: 0 1px 0 0;
        }
        .parameters-wrapper{
            max-width: 500px;
            margin: 0 auto;
        }
        .parameters-wrapper div{
            padding-top: 2rem; 
        }
        .amount{
            flex: 1;
            padding: 0 2rem;
        }

        .payment {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #dadada;
        }
        .payment-amount {
            color: #ee7023;
            font-size: 1.25rem;
          }
        
        .apply button {
            border: none;
            background-color: #ee7023;
            color: #fff;
            border-radius: 3px;
            padding: 8px 16px;
        }
        .apply {
            margin-top: 2rem;
          }
        
        @media (max-width: 960px) and (min-width: 759px) {
            .container{
                display: block;
                margin: 0 auto;
                padding: 0.5rem 1rem;
              }
        
            .parameters, .payment {
                border: none;
              }
        
            .amount {
                padding: 0;
                display: flex;
                justify-content: space-around;
              }
        
            .payment-label {
                margin-right: 1rem;
              }
        
            .apply{
                margin: 1rem 0;
            }
          }
        
        
        @media (max-width: 760px) {
            .container{
                display: block;
                margin: 0 auto;
                padding: 0.5rem 1rem;
              }
        
            .parameters, .payment {
                border: none;
              }
        
            .amount {
                padding: 0;
              }
        
            .apply{
                margin: 1rem 0;
            }
            .apply button {
                width: 100%;
            }
        
        }
      </style>
      <div class="container">
          <div class="parameters">
              <div class="parameters-wrapper">
                  <div class="slidecontainer">
                    <custom-range
                      min="32000"
                      max="320000"
                      value="50"
                      class="slider"
                      id="loan"
                    />
                  </div>
                  <div class="period-selector">
                      <custom-select
                        name="Period"
                        id="period"
                        options="${periodOption}"
                      />
                  </div>
                  <div class="interest-selector">
                      <custom-select
                        name="Interest"
                        id="interest"
                        options="${interestOption}"
                      />
                  </div>
              </div>
          </div>
          <div class="amount">
              <div class="payment">
                  <p class="payment-label">Monthly payment</p>
                  <p id="payment-amount" class="payment-amount"></p>
              </div>
              <div class="apply">
                  <button>Apply</button>
              </div>
          </div>
      </div>
     `;
  }
}

customElements.define('loan-calculator', LoanCalculator);
