import '../components/home-content';
import '../components/banking-content';
import '../components/loan-calculator';
import '../components/payment';

function Route(path) {
  switch (path) {
    case 'home':
      return `
            <div class="container">
                <home-content />
            </div>
            `;
      break;      

    case 'banking':
      return `
            <div class="container">
                <banking-content />
            </div>
        `;
        break;      

    case 'payment':
      return `
                <div>
                    <payment-content />
                </div>
            `;
      break;      

    case 'calculator':
      return `
            <div>
                <loan-calculator />
            </div>
            `;
      break;      
  }
}
export default Route;
