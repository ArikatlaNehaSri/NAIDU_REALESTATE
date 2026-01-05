import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="pt-20 pb-16">
        <Home />
      </div>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;
