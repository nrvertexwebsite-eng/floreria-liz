import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Catalog from './components/Catalog';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';

function App() {
  return (
    <CartProvider>
      <div className="font-sans text-dark bg-background min-h-screen flex flex-col">
        <Navbar />
        <CartSidebar />
        <Toast />

        <main className="flex-grow">
          <Hero />
          <TrustSection />
          <Catalog />
          <AboutSection />
          <Testimonials />
          <FAQ />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
