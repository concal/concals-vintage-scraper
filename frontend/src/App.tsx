import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';
import { Routes, Route } from 'react-router-dom';

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
