import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';

function App() {
  return (
    <div className="font-mono text-sm">
      <Header />
      <Storefront />
      <Footer />
    </div>
  );
}

export default App;
