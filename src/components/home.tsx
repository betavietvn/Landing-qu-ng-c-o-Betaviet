import { useEffect } from "react";
import HeroSection from "./HeroSection";
import ContactForm from "./ContactForm";
import BenefitsSection from "./BenefitsSection";
import CustomerFeedback from "./CustomerFeedback";
import ProcessFlow from "./ProcessFlow";
import ArchitectureProjects from "./ArchitectureProjects";
import InteriorProjects from "./InteriorProjects";
import ConstructionVisit from "./ConstructionVisit";
import VideoReview from "./VideoReview";
import RegisterSection from "./RegisterSection";
import WhyChooseBetaviet from "./WhyChooseBelaviet";
import AboutUs from "./AboutUs";
import Header from "./Header";
import Footer from "./Footer";
import SocialSidebar from "./SocialSidebar";
import MobileContactBar from "./MobileContactBar";
import trackingManager from "@/lib/trackingManager";

function Home() {
  useEffect(() => {
    // Khởi tạo tracking manager khi component mount
    trackingManager.init();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <SocialSidebar />
      <MobileContactBar />

      {/* Hero Section with Contact Form */}
      <div className="relative pt-16">
        <HeroSection />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[400px] hidden lg:block">
          <ContactForm />
        </div>
      </div>

      {/* Main Content in requested order */}
      <WhyChooseBetaviet />
      <CustomerFeedback />
      <ProcessFlow />
      <ArchitectureProjects />
      <InteriorProjects />
      <ConstructionVisit />
      <BenefitsSection />
      <VideoReview />
      <AboutUs />
      <RegisterSection />
      <Footer />
    </div>
  );
}

export default Home;
