/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveTab, CartItem, Currency, Product, QuoteRequest, WholesaleOrder } from './types';
import { PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { DealsScreen } from './components/DealsScreen';
import { SavedScreen } from './components/SavedScreen';
import { AccountScreen } from './components/AccountScreen';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { QuoteModal } from './components/QuoteModal';
import { LogisticsModal } from './components/LogisticsModal';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial cart with a wholesale item
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Wireless Headphone
      quantity: 20,
      selectedTierPrice: 12.50,
    },
  ]);

  // Initial saved wishlist
  const [savedProducts, setSavedProducts] = useState<Product[]>([
    PRODUCTS[1], // Smart Watch
    PRODUCTS[3], // Vacuum Bottle
  ]);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [isLogisticsOpen, setIsLogisticsOpen] = useState(false);

  // Orders and Quotes submitted
  const [orders, setOrders] = useState<WholesaleOrder[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Tier pricing helper
  const getProductTierPrice = (product: Product, quantity: number) => {
    let price = product.price;
    for (const tier of product.tiers) {
      if (quantity >= tier.minQty) {
        price = tier.price;
      }
    }
    return price;
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIdx >= 0) {
        const newQty = prevCart[existingIdx].quantity + quantity;
        const newTierPrice = getProductTierPrice(product, newQty);
        const updated = [...prevCart];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          selectedTierPrice: newTierPrice,
        };
        return updated;
      } else {
        const newTierPrice = getProductTierPrice(product, quantity);
        return [
          ...prevCart,
          {
            product,
            quantity,
            selectedTierPrice: newTierPrice,
          },
        ];
      }
    });

    showToast(`Added ${quantity} units of ${product.name} to wholesale cart`);
  };

  // Update item quantity in cart
  const handleUpdateCartQty = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const newPrice = getProductTierPrice(item.product, quantity);
          return {
            ...item,
            quantity,
            selectedTierPrice: newPrice,
          };
        }
        return item;
      })
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle save / bookmark
  const handleToggleSave = (product: Product) => {
    const isSaved = savedProducts.some((p) => p.id === product.id);
    if (isSaved) {
      setSavedProducts((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed ${product.name} from saved wishlist`);
    } else {
      setSavedProducts((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to procurement list`);
    }
  };

  const handleRemoveSaved = (productId: string) => {
    setSavedProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Item removed from saved list');
  };

  const handleAddAllSavedToCart = () => {
    savedProducts.forEach((prod) => {
      handleAddToCart(prod, prod.moq);
    });
    showToast(`Added ${savedProducts.length} saved products to cart at standard MOQs`);
  };

  // Request Quote handler
  const handleOpenQuoteModal = (product?: Product) => {
    setQuoteProduct(product || null);
    setIsQuoteModalOpen(true);
  };

  const handleSubmitQuote = (quote: QuoteRequest) => {
    setQuotes((prev) => [quote, ...prev]);
    showToast(`RFQ #${quote.id} created! Our B2B trade desk is reviewing.`);
  };

  const handleCheckoutSuccess = (order: WholesaleOrder) => {
    setOrders((prev) => [order, ...prev]);
    showToast(`Wholesale order ${order.poNumber} placed successfully!`);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-800 flex justify-center selection:bg-orange-500 selection:text-white">
      {/* App Shell Container (max-w-md centered for the exact mobile experience) */}
      <div className="w-full max-w-md min-h-screen bg-gray-50 flex flex-col relative shadow-2xl">
        {/* Toast Feedback */}
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

        {/* Global Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={cartTotalItems}
          savedCount={savedProducts.length}
          onOpenCart={() => setIsCartOpen(true)}
          currency={currency}
          setCurrency={setCurrency}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectProduct={(p) => setSelectedProduct(p)}
          allProducts={PRODUCTS}
        />

        {/* Dynamic Screen View according to ActiveTab */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <HomeScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onOpenQuoteModal={handleOpenQuoteModal}
              setActiveTab={setActiveTab}
              currency={currency}
              onOpenLogisticsModal={() => setIsLogisticsOpen(true)}
            />
          )}

          {activeTab === 'category' && (
            <CategoryScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              currency={currency}
            />
          )}

          {activeTab === 'deals' && (
            <DealsScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              currency={currency}
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          )}

          {activeTab === 'saved' && (
            <SavedScreen
              savedProducts={savedProducts}
              onRemoveSaved={handleRemoveSaved}
              onAddToCart={handleAddToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
              currency={currency}
              onAddAllToCart={handleAddAllSavedToCart}
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          )}

          {activeTab === 'account' && (
            <AccountScreen
              orders={orders}
              quotes={quotes}
              currency={currency}
              onOpenLogisticsModal={() => setIsLogisticsOpen(true)}
            />
          )}
        </main>

        {/* Global Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedProducts.length}
        />

        {/* Product Details Modal */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isSaved={
            selectedProduct
              ? savedProducts.some((p) => p.id === selectedProduct.id)
              : false
          }
          onToggleSave={handleToggleSave}
          currency={currency}
          onRequestQuote={(p) => {
            setSelectedProduct(null);
            handleOpenQuoteModal(p);
          }}
        />

        {/* Wholesale Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQty={handleUpdateCartQty}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          currency={currency}
          onCheckoutSuccess={handleCheckoutSuccess}
        />

        {/* Request for Quote (RFQ) Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          product={quoteProduct}
          onSubmitQuote={handleSubmitQuote}
          allProducts={PRODUCTS}
        />

        {/* Logistics & Nationwide Supply Modal */}
        <LogisticsModal
          isOpen={isLogisticsOpen}
          onClose={() => setIsLogisticsOpen(false)}
          onOpenQuoteModal={() => {
            setIsLogisticsOpen(false);
            handleOpenQuoteModal();
          }}
        />
      </div>
    </div>
  );
}
