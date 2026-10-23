import Navbar from "./components/layout/Navbar";
import Features from "./components/sections/Features";
import Hero from "./components/sections/Hero";


function App() {
  return (
    <>
      <Navbar />
      <main id="home">
        {/* Hero and other sections will go here */}
<Hero />
<Features />
      </main>
    </>
  );
}

export default App;