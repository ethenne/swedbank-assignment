export default class CustomRange extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.props = {
      loanAmount: 0,
    };
    this.state = {};

    this.onLoanChange = this.onLoanChange.bind(this);
  }

  set loanAmount(value) {
    this.props.loanAmount = value;
  }

  get loanAmount() {
    return this.props.loanAmount;
  }

  onLoanChange(val) {
    this.dispatchEvent(new CustomEvent('on-loan-change', {
      bubbles: true,
      composed: true,
      detail: {
        loanAmount: val,
      },
    }));
  }


  connectedCallback() {
    const min = this.getAttribute('min') || '';
    const max = this.getAttribute('max') || '';
    const value = this.getAttribute('value') || '';

    this.shadowRoot.innerHTML = `
            <style>
                .range-container{
                    display: flex;
                    align-items: center;
                }
                .range-wrapper{
                    position: relative;
                    width: 100%;
                }
                .slider {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 100%;
                    height: 10px;
                    background: #d3d3d3;
                    outline: none;
                    opacity: 0.7;
                    -webkit-transition: .2s;
                    transition: opacity .2s;
                }
                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 25px;
                    height: 25px;
                    background: #EE7023;
                    cursor: pointer;
                    border-radius: 50%;
                  }
                  
                  .slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #EE7023; 
                    cursor: pointer;
                    border-radius: 50%;
                  }

                  .output{
                      position: absolute;
                      color: #EE7023;
                      top: -25px;
                      left: -8px;
                      min-width: 65px;
                  }

                  .track{
                    position: absolute;
                    height: 10px;
                    top: 4px;
                    background-color: #EE7023;
                    width: 0;
                  }

                  .label {
                        width: 100px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 0.5rem;
                  }
                  .min, .max{
                      position: absolute;
                      margin-top: 4px;
                  }
                  .min{
                      left: 0;
                  }
                  .max {
                      right: 0;
                  }

                  @media (max-width: 760px) {
                    .range-container{
                        flex-direction: column;
                        align-items: baseline;
                    }
                    .range-wrapper {
                        margin-top: 1rem;
                    }
                    .label {
                        margin-right: 0;
                    }
                    .output {
                        top: -20px;
                    }
                  }
            </style>
            <div class="range-container">
                <label class="label" htmlFor="range">Loan size</label>
                <div class="range-wrapper">
                    <span id="output" class="output"></span>
                    <input
                      id="range"
                      type="range"
                      min="${min}"
                      max="${max}"
                      value="${value}"
                      class="slider"
                    >
                    <div class="track"></div>
                    <div class="min">${min} €</div>
                    <div class="max">${max} €</div>
                </div>
            </div>
        `;

    const slider = this.shadowRoot.querySelector('#range');
    const output = this.shadowRoot.querySelector('#output');
    const trackSize = this.shadowRoot.querySelector('.track');
    output.innerText = `${min} €`;

    slider.oninput = function() {
      const left = ((this.value-min)/(max-min))*100;

      output.innerText = `${this.value} €`;
      output.style.left = left > 80 ? '80%' : `${left}%`;
      trackSize.style.width = `${left}%`;
    };

    slider.addEventListener('input', (evt) => {
      this.onLoanChange(evt.target.value);
    });
  }

  static get observedAttributes() {
    return ['min', 'max', 'value'];
  }
}

customElements.define('custom-range', CustomRange);
