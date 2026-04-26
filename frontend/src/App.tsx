import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/storefront" />} />
        <Route path="/storefront" element={<Storefront key="storefront" />} />
        <Route path="/saved" element={<Storefront key="saved" showSaved={true} />} />
      </Routes>
      <footer className="py-10" />
    </div>
  );
}

export default App;
