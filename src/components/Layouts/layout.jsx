
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-safeher-ivory">
      <Navbar />

      <main>
        {children}
      </main>

      {/* Footer will be added here later */}
      <Footer />
    </div>
  );
}

export default Layout;
