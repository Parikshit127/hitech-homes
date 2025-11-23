import { useContext, useEffect, useState } from "react";
import {
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Home as HomeIcon,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  ArrowUpRight,
  Shield,
  Zap,
} from "lucide-react";
import { PropertyContext } from "../context/PropertyContext";
import Loader from "../components/Loader";

const Home = ({ setCurrentPage, setSelectedProperty }) => {
  const { properties, loading, fetchProperties } = useContext(PropertyContext);
  const [showStats, setShowStats] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [animateCards, setAnimateCards] = useState(false);

  const heroImages = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80",
  ];

  useEffect(() => {
    fetchProperties();

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    const timeout = setTimeout(() => setShowStats(true), 500);
    const cardsTimeout = setTimeout(() => setAnimateCards(true), 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(cardsTimeout);
    };
  }, []);

  // Get only the most recently uploaded properties (sorted by creation date)
  const featuredProperties = (properties || [])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div
      className="overflow-hidden bg-white"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
    >
      {/* ===== HERO SECTION - PREMIUM ===== */}
      <section className="relative min-h-screen md:min-h-[95vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-12 md:pb-0">
        {/* Background Slideshow with Better Controls */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImage === idx ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.45) saturate(1.15) contrast(1.1)",
            }}
          ></div>
        ))}

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-900/20 to-slate-900/40"></div>

        {/* Animated Particles - Enhanced */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 drop-shadow-xl leading-[1.1] tracking-tight"
            style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              animation: "slideUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            Your Dream
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Home Awaits
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-3xl mx-auto drop-shadow-lg font-light leading-relaxed px-2 animate-fade-in-delay">
            Discover luxury living redefined. Explore our curated collection of premium properties
            and transform your real estate dreams into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 px-2 mb-12 animate-fade-in-delay-2">
            <button
              onClick={() => setCurrentPage("listings")}
              className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg"
            >
              Explore Now
              <ChevronRight
                size={22}
                className="group-hover:translate-x-1 transition-transform sm:w-6"
              />
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm hover:border-white hover:shadow-xl text-base sm:text-lg"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Shield, label: "Verified Properties", desc: "100% authentic listings" },
              { icon: Zap, label: "Quick Process", desc: "Fast & seamless transactions" },
              { icon: Users, label: "Expert Support", desc: "24/7 professional assistance" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 sm:gap-5 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-white group-hover:scale-110 transition-transform">
                    <feature.icon size={24} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{feature.label}</p>
                  <p className="text-xs text-white/60">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENHANCED STATS SECTION ===== */}
      <section
        className={`transition-all duration-1000 ease-out ${
          showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } bg-gradient-to-b from-white via-slate-50 to-white py-16 md:py-28 relative overflow-hidden`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div
            className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Luxury Property"
                className="relative rounded-3xl shadow-2xl w-full h-[350px] sm:h-[450px] md:h-[550px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent rounded-3xl"></div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="mb-8">
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Why Choose Us
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
              </div>

              {[
                {
                  value: "500+",
                  label: "Properties Sold",
                  icon: HomeIcon,
                  color: "from-emerald-500 to-emerald-600",
                },
                {
                  value: "1000+",
                  label: "Happy Clients",
                  icon: Users,
                  color: "from-cyan-500 to-cyan-600",
                },
                {
                  value: "50+",
                  label: "Expert Agents",
                  icon: Award,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  value: "10+",
                  label: "Years Experience",
                  icon: TrendingUp,
                  color: "from-emerald-600 to-cyan-600",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} p-3 text-white flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl sm:text-3xl font-black text-slate-900">
                        {stat.value}
                      </div>
                      <p className="text-sm text-slate-600 font-medium mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES - PREMIUM ===== */}
      <section className="py-16 md:py-28 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-32 -left-64 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute -bottom-32 -right-64 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="mb-16 md:mb-20 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-cyan-100 px-4 py-2 rounded-full mb-4 border border-emerald-200">
              <Sparkles size={16} className="text-emerald-600" />
              <p className="text-emerald-600 font-bold uppercase tracking-wider text-xs sm:text-sm">
                Featured Collection
              </p>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Premium Properties
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Handpicked luxury homes that redefine modern living
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProperties.map((property, idx) => (
                <article
                  key={property._id}
                  onClick={() => {
                    setSelectedProperty(property);
                    setCurrentPage("property-details");
                  }}
                  className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-slate-200 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-slate-200">
                    <img
                      src={
                        property.images?.[0]?.url ||
                        property.images?.[0] ||
                        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                      }
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 transform group-hover:scale-110 transition-transform">
                      <Sparkles size={14} />
                      Featured
                    </div>

                    {/* Price Badge on Hover */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-xl shadow-xl">
                        <span className="text-emerald-600 font-bold text-lg">
                          ₹{property.price?.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    {/* Price */}
                    <div
                      className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      ₹{property.price?.toLocaleString("en-IN")}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg sm:text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {property.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center text-slate-600 mb-5 text-sm font-semibold">
                      <MapPin size={16} className="mr-2 text-emerald-500 flex-shrink-0" />
                      <span>{property.city}</span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: Bed, label: `${property.bhk} BHK`, color: "emerald" },
                        { icon: Bath, label: `${property.bathrooms || 2}`, color: "cyan" },
                        { icon: Square, label: `${property.area || 1200} sqft`, color: "blue" },
                      ].map((feature, idx) => {
                        const colorMap = {
                          emerald: "text-emerald-600",
                          cyan: "text-cyan-600",
                          blue: "text-blue-600",
                        };
                        return (
                          <div
                            key={idx}
                            className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200 group-hover:border-emerald-200 transition-colors"
                          >
                            <div className={`flex justify-center mb-2 ${colorMap[feature.color]}`}>
                              <feature.icon size={18} />
                            </div>
                            <span className="text-xs font-bold text-slate-700">
                              {feature.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setCurrentPage("listings")}
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 text-lg"
            >
              View All Properties
              <ChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ===== PREMIUM CTA SECTION ===== */}
      <section className="py-16 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-blob"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - CTA Card */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity blur-2xl"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-10 text-white border border-white/10">
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 px-4 py-2 rounded-full mb-4 border border-emerald-500/30">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-emerald-300">
                        Ready to Start?
                      </span>
                    </div>

                    <h2
                      className="text-3xl sm:text-4xl font-black leading-tight mb-4"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Find Your Perfect Home Today
                    </h2>
                  </div>

                  <p className="text-lg text-white/80 leading-relaxed">
                    Let our expert team guide you through every step. Your dream property is waiting.
                  </p>

                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                  >
                    Start Your Journey
                    <ArrowUpRight
                      size={22}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Benefits */}
            <div className="space-y-5 order-1 lg:order-2">
              {[
                {
                  icon: Award,
                  title: "Industry Leading",
                  desc: "10+ years of proven excellence in real estate",
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  desc: "50+ professional agents ready to assist you",
                },
                {
                  icon: Zap,
                  title: "Quick Process",
                  desc: "Fast-tracked transactions & seamless experience",
                },
                {
                  icon: Shield,
                  title: "Secure & Safe",
                  desc: "100% verified properties & transparent dealings",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-white group-hover:scale-110 transition-transform">
                        <benefit.icon size={24} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-white/70">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STYLES ===== */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;

























