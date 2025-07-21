import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';

function App() {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Storefront />
      </div>
      <Footer />
    </div>
  );
}

export default App;
