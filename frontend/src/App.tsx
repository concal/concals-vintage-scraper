import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';
import { useSavedProductIds } from './hooks/useSavedProductIds';

function App() {
  const { isLoaded, onUpdateSavedProduct, savedProducts } = useSavedProductIds();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/storefront" />} />
        <Route
          path="/storefront"
          element={
            <Storefront
              key="storefront"
              isSavedProductsLoaded={isLoaded}
              onUpdateSavedProduct={onUpdateSavedProduct}
              savedProducts={savedProducts}
            />
          }
        />
        <Route
          path="/saved"
          element={
            <Storefront
              key="saved"
              isSavedProductsLoaded={isLoaded}
              onUpdateSavedProduct={onUpdateSavedProduct}
              savedProducts={savedProducts}
              showSaved
            />
          }
        />
      </Routes>
      <footer className="py-10" />
    </div>
  );
}

export default App;
