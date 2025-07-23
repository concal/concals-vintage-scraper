import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';

function App() {
  return (
    <div className="font-mono text-sm">
      <Header />
      <Routes>
        <Route path="/" element={<Storefront />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
