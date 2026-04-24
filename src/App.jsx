import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import AIChatWidget from "./components/chat/AIChatWidget";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<div className="p-8 text-center">Home coming soon</div>}
            />
            <Route
              path="/about"
              element={
                <div className="p-8 text-center">About Section coming soon</div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="p-8 text-center">
                  Contact Us Section coming soon
                </div>
              }
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<BookingPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BookingProvider>
  );
}
