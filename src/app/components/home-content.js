import {accounts, cols} from '../mocks/table-mock';
import './custom-table';
import HomeBlock from './home-footer-block';

export default class HomeContent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.props={
      tableData: accounts,
      tableCols: cols,
    };
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.home-footer').appendChild(HomeBlock());
    const toggle = this.shadowRoot.querySelector('.toggle');
    const more = this.shadowRoot.querySelector('.read-more');
    toggle.addEventListener('click', () => {
      if (more.style.display === '' || more.style.display === 'none') {
        more.style.display = 'block';
        more.style.transition = '0.3s ease';
        this.shadowRoot.querySelector('.toggle-text').innerText = 'Read less';
      } else {
        more.style.display = 'none';
        this.shadowRoot.querySelector('.toggle-text').innerText = 'Read more';
      }
    });
  }

  render() {
    this.shadow.innerHTML = `
    <style>
      .home-header{
        color: #ee7023;
        margin-left: 1rem;
      }
      .home-content{
        background-color: #fff;
        padding: 1rem;
      }
    </style>
      <div class="container">
        <h1 class="home-header">Home</h1>
        <div class="home-content">
          <h3>Your Swedbank owerview</h3>
          <div class="interactive-table">
            <custom-table
              data=${JSON.stringify(this.props.tableData)}
              cols="${this.props.tableCols}"
            />
          </div>
        </div>
        <div class="home-footer" />
      </div>
    `;
  }
}

customElements.define('home-content', HomeContent);
