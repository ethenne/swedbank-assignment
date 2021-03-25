import './loan-calculator';
import Route from '../helpers/page-router';
import BankingBlock from './banking-footer-block';

export default class Banking extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.props = {
      activeTab: 'payment',
    };
  }

  openRoute(evt, route) {
    const tablinks = this.shadowRoot.querySelectorAll('.tab-links');
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    this.props.activeTab = route;
    evt.currentTarget.className += ' active';
    this.changeTabContent();
  }

  changeTabContent() {
    const tabContent = this.shadowRoot.querySelector('.tabs-content');

    tabContent.innerHTML = Route(this.props.activeTab);
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.banking-footer')
        .appendChild(BankingBlock());

    const toggle = this.shadowRoot.querySelector('.toggle');
    const more = this.shadowRoot.querySelector('.read-more');
    toggle.addEventListener('click', () => {
      if (more.style.display === '' || more.style.display === 'none' ) {
        more.style.display = 'block';
        more.style.transition = '0.3s ease';
        this.shadowRoot.querySelector('.toggle-text').innerText = 'Read less';
      } else {
        more.style.display = 'none';
        this.shadowRoot.querySelector('.toggle-text').innerText = 'Read more';
      }
    });


    const tabContent = this.shadowRoot.querySelector('.tabs-content');

    const tabLinks = this.shadowRoot.querySelectorAll('.tab-links');
    Array.from(tabLinks).forEach((link) => {
      link.addEventListener('click', (evt) => {
        this.openRoute(evt, evt.currentTarget.id);
      });
    });

    tabContent.innerHTML = Route(this.props.activeTab);
  }

  render() {
    this.shadow.innerHTML = `
        <style>
        .container{
            margin-top: 2rem;
        }
        .banking-header{
            color: #ee7023;
            margin-left: 1rem;
        }
        
        .tab {
          overflow: hidden;
        }
        
        .tab button {
          background-color: #f7f5f3;
          float: left;
          border: none;
          outline: none;
          cursor: pointer;
          padding: 14px 16px;
          transition: 0.3s;
        }
        
        .tab button:hover {
          background-color: #ddd;
        }
        
        .tab button.active {
          background-color: #fff;
        }
        .tabs-content{
            background-color: #fff;
        }
        </style>
        <div class="container">
            <h1 class="banking-header">Igapäevapangandus</h1>
            <div class="tab">
                <button id="payment" class="tab-links active">Payment</button>
                <button id="calculator" class="tab-links">Calculator</button>
            </div>
            <div class="tabs-content"></div>
            <div class="banking-footer" />
            </div>
      `;
  }
};
customElements.define('banking-content', Banking);
