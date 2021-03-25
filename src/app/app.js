import './components/app-menu';
import './components/footer';

function App() {
  const template = document.createElement('template');

  template.innerHTML = `
        <style>
            .container {
                position: relative;
                border-top: 5px solid;
                border-image: linear-gradient(to right, #fb6f21, #f5b140) 30;
            }    
        </style>
        <div class="container">
            <app-header></app-header>
            <app-footer></app-footer>
        </div>
    `;

  return template.content.cloneNode(true);
}
export default App;
