import facebook from '/assets/social-media-icons/facebook.svg';
import instagram from '/assets/social-media-icons/instagram.svg';
import skype from '/assets/social-media-icons/skype.svg';
import twitter from '/assets/social-media-icons/twitter.svg';
import youtube from '/assets/social-media-icons/youtube.svg';

export default class Footer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  };

  connectedCallback() {
    this.render();

    const expandable = this.shadowRoot.querySelectorAll('.footer-item');

    Array.from(expandable).forEach((el) => {
      el.addEventListener('click', (evt) => {
        const more = evt.currentTarget.querySelector('.more');
        if (more.style.display === '' || more.style.display === 'none') {
          more.style.display = 'flex';
          evt.currentTarget.className += ' expanded';
        } else {
          more.style.display = 'none';
          evt.currentTarget.className =
          evt.currentTarget.className.replace(' expanded', '');
        }
      });
    });
  };

  render() {
    this.shadow.innerHTML = `
        <style>
        p {
            margin: 10px 0 0;
        }
        .footer-container {
            width: 100%;
            background-color: #fff;
            border-top: 5px solid;
            border-image: linear-gradient(to right, #fb6f21, #f5b140) 30;
        }
        .footer {
            display: flex;
            flex-direction: row;
            align-items: baseline;
            justify-content: center;
            width: 100%;
            background-color: #ebe7e2;
        }
        .footer-item {
            display: flex;
            flex-direction: column;
            padding: 0 1rem;
            flex-basis: 25%;
        }
        .more {
            display: flex;
            flex-direction: column;
        }
        .phone {
            color: #ee7023;
            font-weight: bold;
            font-size: 1.75rem;
            margin-bottom: 0.5rem; 
        }
    
        .bank-info{
            max-width: 10rem;
        }
    
        .footer-link {
            text-decoration: none;
            color: #512B2B;
        }
        .footer-link:before {
            content: "";
            background: url('/triangular-icon.svg') no-repeat;
            display: inline-block;
            vertical-align: middle;
        }
    
        .disclamer{
            text-align: center;
            max-width: initial;
            box-sizing: border-box;
            color: #a38b80;
            line-height: 16px;
            font-size: 13px;
            padding: 1rem;
        }
            @media (max-width: 760px){
                .footer {
                    flex-direction: column;
                }

                .footer-item.expanded .expandable:after{
                    transform: scaleX(1.5) rotate(-180deg);
                    vertical-align: middle;
               }        
    
                .expandable:after {
                    content: '˅';
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    font-weight: bold;
                    color: #ee7023;
                    font-size: 16px;
                    transform: scaleX(1.5);
                    margin-left: 0.5rem;
                    transition: transform 0.3s ease;
                }

                .more {
                    display: none;
                }
            }
    
        </style>
        <div class="footer-container">
          <div class="footer">
            <div class="footer-item contacts">
                <p>Contacts</p>
                <p class="phone"><strong>6 310 310</strong></p>
                <a href="mailto=info@swedbank.ee">info@swedbank.ee</a>
                <p class="bank-info">
                    SWEDBANK AS LIIVALAIA
                    8, 15040 TALLINN
                    SWIFT code/BIC: HABAEE2X
                    Reg. number: 10060701
                </p>
                <div class="social-networks">
                    <span>${facebook}</span>
                    <span>${instagram}</span>
                    <span>${youtube}</span>
                    <span>${twitter}</span>
                    <span>${skype}</span>
                </div>
            </div>
            <div class="footer-item quick-links">
                <p class="expandable">Quicklinks</p>
                <div class="more">
                    <a class="footer-link" href="#">Calculators</a>
                    <a class="footer-link" href="#">Prices</a>
                    <a class="footer-link" href="#">Terms of service</a>
                    <a class="footer-link" href="#">Privacy and security</a>
                </div>
            </div>
            <div class="footer-item join-swedbank">
                <p class="expandable">Join Swedbank</p>
                <div class="more">
                    <a class="footer-link" href="#">Client programs</a>
                    <a class="footer-link" href="#">Business customers</a>
                    <a class="footer-link" href="#">Jobs</a>
                    <a class="footer-link" href="#">Internships</a>
                </div>
            </div>
            <div class="footer-item vacancies">
                <p class="expandable">Come to us</p>
                <div class="more">
                    <a class="footer-link" href="#">Everyday banking</a>
                    <a class="footer-link" href="#">Loans</a>
                    <a class="footer-link" href="#">Insurance</a>
                    <a class="footer-link" href="#">Cards</a>
                    <a class="footer-link" href="#">Stocks</a>
                </div>
            </div>
          </div>
          <div class="disclamer">
            <p>
                This is a website of companies offering financial
                services – Swedbank AS, Swedbank Liising AS,
                Swedbank P&C Insurance AS, Swedbank Life Insurance SE,
                and Swedbank Investeerimisfondid AS. Before entering
                into any agreement read the terms and conditions of the
                respective service. Consult a specialist, where necessary.
                Swedbank AS does not provide a credit advisory service for
                the purposes of the Creditors and Credit Intermediaries Act.
                The borrower makes the decision of taking out a loan, who
                assesses the suitability of the loan product and contractual
                terms to his/her personal loan interest, need and financial
                situation on the basis of the information and warnings presented
                by the bank and is responsible for the consequences related
                to concluding the agreement.
            </p>
          </div>
        </div>
      `;
  }
};

customElements.define('app-footer', Footer);
