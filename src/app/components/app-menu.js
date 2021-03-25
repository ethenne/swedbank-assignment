import logo from '/assets/swedbank_logo.png';
import homeIcon from '/assets/home.svg';
import walletIcon from '/assets/wallet.svg';
import Route from '../helpers/page-router';

export default class Menu extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});

    this.state = {
      selectedView: 'home',
    };
  }

  static get ObservedAttributes() {
    return ['view'];
  }

  get selectedView() {
    return this.shadowRoot.querySelector('.selected-view').hasAttribute('view');
  }

  set selectedView(val) {
    if (val) {
      this.setAttribute('view', val);
    } else {
      this.setAttribute('view', 'home');
    }
  }

  navigationRouter() {
    const deviceTouch = (typeof Touch === 'object');

    const menuItems = this.shadowRoot.querySelectorAll('.menu-item');
    const pageTemplate = this.shadowRoot.querySelector('.selected-view');
    const hoverBlock = this.shadowRoot.querySelector('.hover');

    menuItems.forEach((item) => item.addEventListener('click', (evt) => {
      pageTemplate.setAttribute('view', evt.target.id);
      pageTemplate.innerHTML = Route(evt.target.id);
      this.changeActive(evt.target.id);
    }));

    if (!deviceTouch && window.innerWidth >= 960) {
      menuItems.forEach((item) => item.addEventListener('mouseenter', (evt) => {
        hoverBlock.className += ' active';
      }));
      menuItems.forEach((item) => item.addEventListener('mouseleave', (evt) => {
        hoverBlock.className = hoverBlock.className.replace(' active', '');
      }));
    }
  }

  changeActive(id) {
    const menuItems = this.shadowRoot.querySelectorAll('.menu-item');

    menuItems.forEach((item) => {
      if (item.id === id) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  toggleMobileNav() {
    const menuItems = this.shadowRoot.querySelectorAll('.menu-item');
    const mobileNav = this.shadowRoot.querySelector('.mobile-navigation');
    const burger = this.shadowRoot.querySelector('.burger-menu');
    const navigationBlock = this.shadowRoot.querySelector('.navigation');
    const hoverBlock = this.shadowRoot.querySelector('.hover');

    mobileNav.addEventListener('click', () => {
      if (navigationBlock.style.display === '' ||
            navigationBlock.style.display === 'none') {
        burger.className += ' cross';
        navigationBlock.style.display = 'block';
        hoverBlock.className += ' active';
      } else {
        burger.className = burger.className.replace(' cross', '');
        navigationBlock.style.display = 'none';
        hoverBlock.className = hoverBlock.className.replace(' active', '');
      }
    });
    if (window.innerWidth <= 960){
      menuItems.forEach((item) => item.addEventListener('click', (evt) => {
        burger.className = burger.className.replace(' cross', '');
        hoverBlock.className = hoverBlock.className.replace(' active', '');
        navigationBlock.style.display = 'none';
      }));
    }
  }

  connectedCallback() {
    this.render();
    this.navigationRouter();
    this.toggleMobileNav();
    const pageTemplate = this.shadowRoot.querySelector('.selected-view');

    pageTemplate.innerHTML = Route(this.state.selectedView);
  }

  render() {
    this.shadow.innerHTML = `
            <style>
                .header {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    margin: 0 auto;
                    height: 60px;
                    z-index: unset;
                    background-color: #fff;
                }

                .logo{
                    margin-left: 2rem;
                }

                .navigation {
                    position: relative;
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .menu-item {
                    border: solid;
                    border-width: 1px 1px 0 0;
                    border-color: #dadada;
                    padding: 0.5rem;
                    width: 100%;
                    color: #512B2B;
                    transition: border-color 0.3s ease,
                                background-color 0.3s ease;
                }
                .menu-item:last-child{
                    border-right: none
                }
                .menu-item:hover {
                    background-color: #f8f8f8;
                    border-top-color: #ee7023;
                }


                .menu-item.active {
                    color: #ee7023;
                }
                .menu-icon {
                    display: block;
                    padding: 0.2rem;
                    width: 20px;
                    height: 19px;
                    margin: 0 auto;
                }
                .selected-view .container {
                    position: relative;
                    z-index: 1;
                    max-width: 1260px;
                    margin: 0 auto;
                }
                .hover{
                    display: none;
                }
                .hover.active{
                    display: block;
                    position: absolute;
                    top: 126px;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    background-color: #785f5f;
                    opacity: 0.7;
                    z-index: 2;
                }
                .mobile-navigation{
                    display: none;
                }

                @media (max-width: 960px){
                    .navigation{
                        display: none;
                        text-align: left;
                    }
                    .menu-icon{
                        display: none;
                    }
                    .header{
                        justify-content: space-between;
                    }
                    .hover.active{
                        top: 140px;
                    }

                    .mobile-navigation{
                        display: block;
                        margin-right: 1rem;
                    }

                    .burger-menu {
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                        position: relative
                    }

                    .burger-item {
                        display: block;
                        width: 30px;
                        height: 2px;
                        background-color: #785f5f;
                        margin: 0.4rem;
                        transition: transform 0.3s ease;
                    }

                    .burger-menu.cross .burger-item {
                        position: absolute;
                        right: -12px;
                        top: -6px;
                    }

                    .burger-menu.cross .burger-item.third {
                        display: none;
                    }
                    .burger-menu.cross .burger-item.first {
                        transform: rotate(45deg)
                    }
                    .burger-menu.cross .burger-item.second {
                        transform: rotate(-45deg)
                    }
                }
            </style>

            <div class="menu">
                <div class="header">
                    <img class="logo" src="${logo}" alt="logo"/>
                    <div class="mobile-navigation">
                        <ul class="burger-menu">
                            <li class="burger-item first"></li>
                            <li class="burger-item second"></li>
                            <li class="burger-item third"></li>
                        </ul>
                    </div>
                </div>
                <ul class="navigation">
                    <li id="home" class="menu-item active">
                        <div class="menu-icon">${homeIcon}</div>
                        <span>Home</span>
                    </li>
                    <li id="banking" class="menu-item">
                        <div class="menu-icon">${walletIcon}</div>
                        <span>Everyday Banking</span>
                    </li>
                </ul>
                <div class="hover"></div>
                <div view="home" class="selected-view"></div>
            </div>
        `;
  }
}

customElements.define('app-header', Menu);
