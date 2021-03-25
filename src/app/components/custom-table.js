export default class CustomTable extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});

    this.props = {

    };
  }

  static get observedAttributes() {
    return ['data'];
  }

  fillTable(data, cols) {
    const template = document.createElement('template');

    template.innerHTML = `
            <div class="header-row"></div>
            <div class="content-row"></div>
            <div class="total-row"></div>
        `;

    const col = cols;

    for (let i = 0; i < col.length; i++) {
      const header = document.createElement('div');
      header.innerHTML = `<slot name=${col[i]}>${col[i]}</slot>`;
      header.className = ' header';
      template.content.querySelector('.header-row').appendChild(header);
    }

    for (let i = 0; i < data.length; i++) {
      const contentRow = document.createElement('div');
      contentRow.className = ' content';
      template.content.querySelector('.content-row').appendChild(contentRow);
      for (let j = 0; j < col.length; j++) {
        const child = document.createElement('span');
        const tabCell = contentRow.appendChild(child);
        if (col[j] === 'account') {
          tabCell.innerHTML = `
              <slot name='account'>
                <a href="#">${data[i].name}</a>
                ${data[i].card}
              </slot>
            `;
        } else {
          tabCell.innerHTML = data[i][col[j]];
        }
      }
    }

    const totalRow = document.createElement('div');
    totalRow.className = ' total';
    template.content.querySelector('.total-row').appendChild(totalRow);
    for (let j = 0; j < col.length; j++) {
      const child = document.createElement('span');
      const tabCell = totalRow.appendChild(child);
      if (col[j] === 'account') {
        tabCell.innerHTML = `<slot name='total'>Total:</slot>`;
      } else {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += Number(data[i][col[j]]);
        }
        tabCell.innerHTML = `<slot name='total-sum'>${sum}</slot>`;
      }
    }


    this.shadowRoot.querySelector('.table-container')
        .appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
    let data = this.getAttribute('data') || '';
    let cols = this.getAttribute('cols') || '';
    data = JSON.parse(data);
    cols = cols.split(',');
    this.fillTable(data, cols);
  }

  render() {
    this.shadow.innerHTML = `
        <style>
            .header-row,
            .content-row .content,
            .total-row .total{
                display: flex;
                align-items: center;
                padding: 0.5rem;
            }
            .header-row {
                background-color: #e9f7fb;
            }
            .header-row .header,
            .content-row .content span,
            .total-row .total span{
                flex: 1;
                padding: 0.2rem 1rem; 
            }
            .header-row .header:first-child,
            .content-row .content span:first-child,
            .total-row .total span:first-child{
                flex: 2;
            }
            .total-row{
                font-weight: bold;
            }
            @media(max-width: 760px) {
                .header-row .header,
                .content-row .content span,
                .total-row .total span {
                    display: none;
                }

                .content-row .content span:last-child,
                .content-row .content span:first-child,
                .total-row .total span:last-child,
                .total-row .total span:first-child {
                    display: block;
                    font-size: 12px;
                }
                .header-row .header:last-child,
                .header-row .header:first-child{
                    font-size: 16px;
                    display: block;
                    padding: 0.5rem;
                }
            }
        </style>
            <div class="table-container"></div>
        `;
  }
}

customElements.define('custom-table', CustomTable);
