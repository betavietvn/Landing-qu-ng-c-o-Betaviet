import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SocialSidebar from "./components/SocialSidebar";
import MobileContactBar from "./components/MobileContactBar";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="pb-16 lg:pb-0">
        <Header />
        <SocialSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Footer />
        <MobileContactBar />
      </div>
    </Suspense>
  );
}

export default App;
