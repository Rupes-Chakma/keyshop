import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import CheckoutModal from "../components/cart/CheckoutModal";

import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
} from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } =
    useContext(CartContext);

  const { t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // --------------------------------------------------
  // Remove item
  // --------------------------------------------------
  const handleRemove = (id, selectedEdition) => {
    removeFromCart(id, selectedEdition);
  };

  // --------------------------------------------------
  // Confirm Order
  // CheckoutModal থেকে paymentData আসবে
  // --------------------------------------------------
  const handleConfirmOrder = (paymentData) => {
    if (!cart || cart.length === 0) return;

    const myWhatsAppNumber = "8801648582639";

    const now = new Date();

    const orderDate = now.toLocaleDateString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const orderTime = now.toLocaleTimeString("en-BD", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // --------------------------------------------------
    // Product list
    // --------------------------------------------------
    const itemsList = cart
      .map((item, index) => {
        const edition =
          item.selectedEdition || item.versionName || "Standard Windows Key";

        const quantity = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;
        const itemTotal = price * quantity;

        return (
          `🔹 *Product [${index + 1}]:* ${item.name || "Windows License"}%0A` +
          `    ▫️ *Edition/Key Type:* ${edition}%0A` +
          `    ▫️ *Quantity:* ${quantity}%0A` +
          `    ▫️ *Unit Price:* BDT ${price}%0A` +
          `    ▫️ *Item Total:* BDT ${itemTotal}`
        );
      })
      .join("%0A%0A");

    // --------------------------------------------------
    // Payment information
    // --------------------------------------------------
    const paymentMethod = paymentData?.method || "Not provided";

    const paymentNumber = paymentData?.sender || "Not provided";

    const transactionId = paymentData?.trx || "N/A";

    const paidAmount = paymentData?.amount || totalPrice;

    // --------------------------------------------------
    // Final WhatsApp message
    // --------------------------------------------------
    const message =
      `🛒 *NEW ORDER - KEYSHOPBD*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A%0A` +
      `📅 *Order Date:* ${orderDate}%0A` +
      `⏰ *Order Time:* ${orderTime}%0A%0A` +
      `📦 *ORDER DETAILS*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `${itemsList}%0A%0A` +
      `💰 *ORDER SUMMARY*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `• Total Amount: *BDT ${totalPrice}*%0A` +
      `• Paid Amount: *BDT ${paidAmount}*%0A%0A` +
      `💳 *PAYMENT DETAILS*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `• Method: *${paymentMethod}*%0A` +
      `• Payment Number: *${paymentNumber}*%0A` +
      `• Transaction ID: *${transactionId}*%0A%0A` +
      `🔐 *SECURE ORDER*%0A` +
      `Please verify my payment and confirm my order.%0A%0A` +
      `Thank you. ❤️`;

    const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${message}`;

    // --------------------------------------------------
    // Open WhatsApp ONLY HERE
    // CheckoutModal নিজে Confirm Order-এ WhatsApp খুলবে না
    // --------------------------------------------------
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // --------------------------------------------------
    // Close modal
    // --------------------------------------------------
    setIsModalOpen(false);

    // --------------------------------------------------
    // Clear cart
    // --------------------------------------------------
    clearCart();

    // --------------------------------------------------
    // Show confirmation
    // --------------------------------------------------
    setOrderConfirmed(true);
  };

  // --------------------------------------------------
  // Empty cart
  // --------------------------------------------------
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 border border-slate-800">
            <ShoppingBag size={38} className="text-blue-500" />
          </div>

          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>

          <p className="mt-2 text-sm text-slate-400">
            Add some products to your cart before checkout.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Cart total
  // --------------------------------------------------
  const totalItems = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0,
  );

  return (
    <div className="min-h-screen bg-slate-950 px-3 py-6 text-slate-100 sm:px-5 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* =================================================
            PAGE HEADER
        ================================================= */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <ShoppingBag size={28} className="text-blue-500" />
              Shopping Cart
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              {totalItems} item
              {totalItems !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-medium text-red-400 transition hover:text-red-300 sm:text-sm"
          >
            Clear Cart
          </button>
        </div>

        {/* =================================================
            CART + SUMMARY
        ================================================= */}
        <div className="grid gap-5 lg:grid-cols-[1fr_350px]">
          {/* =================================================
              CART ITEMS
          ================================================= */}
          <div className="space-y-3">
            {cart.map((item, index) => {
              const edition =
                item.selectedEdition || item.versionName || "Standard";

              const quantity = Number(item.quantity) || 1;

              const price = Number(item.price) || 0;

              const itemTotal = price * quantity;

              return (
                <div
                  key={`${item.id}-${edition}-${index}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-3.5 shadow-lg sm:p-4"
                >
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 sm:h-24 sm:w-24">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name || "Product"}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag size={28} className="text-slate-600" />
                        </div>
                      )}
                    </div>

                    {/* Product Information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="truncate text-sm font-semibold text-white sm:text-base">
                            {item.name || "Windows License"}
                          </h2>

                          <p className="mt-1 text-xs text-blue-400 sm:text-sm">
                            {edition}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(item.id, item.selectedEdition)
                          }
                          className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                          aria-label="Remove item"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      {/* Price / Quantity */}
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div className="text-xs text-slate-400">
                          <p>
                            Qty:{" "}
                            <span className="font-medium text-slate-200">
                              {quantity}
                            </span>
                          </p>

                          <p className="mt-1">
                            BDT {price} × {quantity}
                          </p>
                        </div>

                        <p className="text-base font-bold text-white sm:text-lg">
                          BDT {itemTotal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}
          <div className="h-fit lg:sticky lg:top-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-5">
              <h2 className="text-lg font-bold">Order Summary</h2>

              {/* Total Items */}
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-slate-400">Total Items</span>

                <span className="font-medium text-slate-200">{totalItems}</span>
              </div>

              {/* Subtotal */}
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-400">Subtotal</span>

                <span className="font-medium text-slate-200">
                  BDT {totalPrice}
                </span>
              </div>

              <div className="my-4 border-t border-slate-800" />

              {/* Grand Total */}
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>

                <span className="text-xl font-bold text-blue-400">
                  BDT {totalPrice}
                </span>
              </div>

              {/* =================================================
                  CHECKOUT BUTTON
              ================================================= */}
              <button
                type="button"
                onClick={() => {
                  setOrderConfirmed(false);
                  setIsModalOpen(true);
                }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 active:scale-[0.98]"
              >
                <Lock size={17} />
                Secure Checkout
              </button>

              {/* Trust Info */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Secure payment process
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Zap size={16} className="text-yellow-400" />
                  Instant order processing
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 size={16} className="text-blue-400" />
                  Genuine license delivery
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* =================================================
            ORDER CONFIRMED MESSAGE
        ================================================= */}
        {orderConfirmed && (
          <div className="fixed inset-x-3 bottom-4 z-[10000] mx-auto max-w-md rounded-2xl border border-emerald-500/30 bg-slate-900 p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={24}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <div>
                <h3 className="font-semibold text-white">Order Submitted</h3>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Your order details have been sent to WhatsApp. Please wait for
                  payment verification and confirmation.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOrderConfirmed(false)}
                className="ml-auto text-slate-500 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =================================================
          CHECKOUT MODAL
      ================================================= */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cart={cart}
        totalAmount={totalPrice}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
