import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';

function App() {
  return (
    <div className="font-mono text-sm">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/storefront" />} />
        <Route path="/storefront" element={<Storefront />} />
        <Route path="/saved" element={<Storefront showSaved={true} />} />
        <Route path="*" element={<Navigate to="/storefront" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
