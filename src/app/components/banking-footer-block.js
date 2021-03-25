import arrow from '/assets/triangular-arrow.svg';

const BankingBlock = () => {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
      .banking-block{
        background-color: #fff;
        margin: 1rem 0;
        padding: 1.25rem;
      }
      .banking-block .content{
        background-color: #ebf8f2;
        padding: 1rem;
        display: flex;
      }
      .bubble {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex: 1 0 120px;
        background: #fdc129;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        vertical-align: middle;
        color: #fff;
        font-weight: bold;
        position: relative;
      }
      .bubble:after {
        content: '';
        position: absolute;
        bottom: -30px;
        left: 45px;
        border-style: solid;
        border-width: 17px 14px;
        border-color: #fdc129
        transparent transparent;
        z-index: 0;
      }
      .description{
        margin: 0 1rem;
      }
      .go-button {
        float: right;
      }
      .go-button button {
        border: none;
        background-color: #ee7023;
        color: #fff;
        border-radius: 3px;
        padding: 8px 16px;
      }
      .toggle{
        cursor: pointer;
        text-decoration: underline;
        color: #257886;
        transition: color 0.3s ease;
        display: inline-block;
        vertical-align: middle;
        clear: both;
      }
      .toggle:hover{
          color: #32acc0;
      }
      .toggle-icon svg{
          transform: rotate(-90deg);
          width: 10px;
          height: 10px;
      }
      .read-more{
          display: none;
      }
      @media(max-width: 760px) {
        .banking-block{
          padding: 0.5rem;
        }
        .banking-block .content{
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .description {
          font-size: 12px;
          margin-top: 1rem;
        }

        .go-button {
          float: none;
        }
        .go-button button{
          width: 100%;
          margin-top: 0.5rem;
        }
      }
    </style>

    <div class="banking-block">
        <div class="content">
          <div class="bubble">
            <span>Hello world!</span>
          </div>
          <div class="description">
            <p><strong>Welcome to Swedbank!</strong></p>
            <p>
              With 7.2 million private customers and more than 574 000
              corporate and organisational customers. This makes us Sweden's
              largest bank in terms of number of customers and gives us
              a leading position in our other home markets of Estonia,
              Latvia and Lithuania. As a major bank, we are a significant part
              of the financial system and play an important role in the local
              communities we serve. We are dedicated to helping our customers,
              our shareholders and society as a whole stay financially
              sound and sustainable.
            </p>
            <p class="read-more">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Autem nostrum quo adipisci quibusdam porro. Impedit, assumenda
                quo? Laborum repudiandae exercitationem fugiat debitis.
                In et totam reiciendis ducimus odit natus accusamus
                aspernatur harum dolor eius explicabo fugiat ab voluptas
                officia provident laudantium esse corporis rerum excepturi,
                quo perspiciatis sapiente. Nulla, fuga?
            </p>
            <div class="toggle">
              <span class="toggle-icon">${arrow}</span>
              <span class="toggle-text">Read more</span>
            </div>
            <div class="go-button">
              <button>Go</button>
            </div>
          </div>
        </div>
    </div>
  `;

  return template.content.cloneNode(true); ;
};

export default BankingBlock;
