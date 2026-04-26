import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, useAuthContext } from './context/AuthContext';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';
import { useAuth } from './hooks/useAuth';
import { useSavedProductIds } from './hooks/useSavedProductIds';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthed, isAuthLoading } = useAuthContext();
  if (isAuthLoading) return null;
  if (!isAuthed) return <Navigate to="/storefront" replace />;
  return <>{children}</>;
}

function App() {
  const auth = useAuth();
  const { isLoaded, onUpdateSavedProduct, savedProducts } = useSavedProductIds(
    auth.token,
  );

  return (
    <AuthContext.Provider value={auth}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/storefront" replace />} />
          <Route path="*" element={<Navigate to="/storefront" replace />} />
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
              <ProtectedRoute>
                <Storefront
                  key="saved"
                  isSavedProductsLoaded={isLoaded}
                  onUpdateSavedProduct={onUpdateSavedProduct}
                  savedProducts={savedProducts}
                  showSaved
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <footer className="py-10" />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
