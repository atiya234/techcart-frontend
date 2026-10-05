
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { CartProvider } from "@/Context/CartContext";
import { WishlistProvider } from "@/Context/WishlistContext";
import AuthProvider from "@/Context/AuthContext";
import { OrderProvider } from "@/Context/OrderContext";
import NotificationPopup from "@/Components/NotificationPopUp";
import ThemeProvider from "@/Context/ThemeContext";


export const metadata = {
  title: "TechCart | Online Store",
  description:
    "A modern e-commerce frontend built with Next.js and TailwindCSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <Navbar />

                  <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                  </main>

                  <Footer />
                  <NotificationPopup />
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
