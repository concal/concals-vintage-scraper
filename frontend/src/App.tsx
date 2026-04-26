import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';
import { useAuth } from './hooks/useAuth';
import { useSavedProductIds } from './hooks/useSavedProductIds';

function App() {
  const auth = useAuth();
  const { isLoaded, onUpdateSavedProduct, savedProducts } = useSavedProductIds(auth.token);

  return (
    <AuthContext.Provider value={auth}>
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
    </AuthContext.Provider>
  );
}

export default App;
