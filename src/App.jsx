import { useState, useContext } from "react";
import { AuthProvider } from "./context/AuthContext";
import { PropertyProvider } from "./context/PropertyContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { PropertyContext } from "./context/PropertyContext";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddProperty from "./pages/AddProperty";
import AdminEnquiries from "./pages/AdminEnquiries";
import "./styles/index.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
      case "listings":
        return (
          <Listings
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
      case "property-details":
        return (
          <PropertyDetails
            property={selectedProperty}
            setCurrentPage={setCurrentPage}
          />
        );
      case "about":
        return <About setCurrentPage={setCurrentPage} />;
      case "contact":
        return <Contact />;
      case "admin-login":
        return <AdminLogin setCurrentPage={setCurrentPage} />;
      case "admin-dashboard":
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      case "admin-enquiries":
        return <AdminEnquiries setCurrentPage={setCurrentPage} />;
      case "add-property":
        return <AddProperty setCurrentPage={setCurrentPage} />;
      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
    }
  };

  const adminPages = ["admin-login", "admin-dashboard", "admin-enquiries", "add-property"];
  const showNavbar = !adminPages.includes(currentPage);
  const showFooter = !adminPages.includes(currentPage);

  return (
    <AuthProvider>
      <PropertyProvider>
        <div className="min-h-screen bg-gray-50">
          {showNavbar && (
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          )}
          {renderPage()}
          {showFooter && <Footer setCurrentPage={setCurrentPage} />}
          {showFooter && (
            <ChatbotWrapper setCurrentPage={setCurrentPage} setSelectedProperty={setSelectedProperty} />
          )}
        </div>
      </PropertyProvider>
    </AuthProvider>
  );
}

function ChatbotWrapper({ setCurrentPage, setSelectedProperty }) {
  const { properties } = useContext(PropertyContext);
  return (
    <Chatbot properties={properties} setCurrentPage={setCurrentPage} setSelectedProperty={setSelectedProperty} />
  );
}

export default App;
