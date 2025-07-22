import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Storefront } from './containers/Storefront';

function App() {
  return (
    <div>
      <Header />
      <div className="px-[5vw] lg:px-[15vw]">
        {/* <div className="md:main-content-size main-content-padding"> */}
        <Storefront />
      </div>
      <Footer />
    </div>
  );
}

export default App;
