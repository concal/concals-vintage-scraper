import { Storefront } from './containers/Storefront';

function App() {
  return (
    <div>
      <header>
        <h1>Product Catalog</h1>
      </header>
      <div className="main-content">
        <Storefront />
      </div>
    </div>
  );
}

export default App;
