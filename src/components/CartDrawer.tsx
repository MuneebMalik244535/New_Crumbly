import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Check, Sparkles, Bike, MessageSquare, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  customBoxes: Array<{
    id: string;
    title: string;
    itemsCount: number;
    ribbon: string;
    giftNote: string;
    pricePkr: number;
  }>;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onRemoveBox: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  customBoxes,
  onUpdateQuantity,
  onRemoveItem,
  onRemoveBox,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const itemsSubtotal = cart.reduce(
    (sum, item) => sum + item.product.pricePkr * item.quantity,
    0
  );
  const boxesSubtotal = customBoxes.reduce((sum, box) => sum + box.pricePkr, 0);
  const subtotal = itemsSubtotal + boxesSubtotal;

  const freeDeliveryThreshold = 2500;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 250;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `#CRUMB-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('success');

    // Trigger golden celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#b8753c', '#ffdcc3', '#2b1712', '#feb071'],
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleWhatsAppCheckout = () => {
    let orderText = `*New Crumbly Atelier Order*%0A`;
    cart.forEach((item) => {
      orderText += `• ${item.quantity}x ${item.product.name} (Rs. ${item.product.pricePkr * item.quantity})%0A`;
    });
    customBoxes.forEach((box) => {
      orderText += `• 1x ${box.title} [Ribbon: ${box.ribbon}] (Rs. ${box.pricePkr})%0A`;
    });
    orderText += `%0A*Subtotal:* Rs. ${subtotal}%0A*Delivery:* ${deliveryFee === 0 ? 'FREE' : 'Rs. 250'}%0A*Total:* Rs. ${total}`;
    if (customerName) orderText += `%0A%0A*Customer:* ${customerName} (${customerPhone})%0A*Address:* ${customerAddress}`;

    window.open(`https://wa.me/?text=${orderText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg bg-[#fff8f1] text-[#1e1b15] h-full shadow-2xl flex flex-col z-10 border-l border-[#e8d2b5] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#e8d2b5] flex items-center justify-between bg-[#f5ede2]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl text-[#2b1712] font-semibold">
              {step === 'cart' && 'Your Tasting Bag'}
              {step === 'checkout' && 'Warm Dispatch Details'}
              {step === 'success' && 'Order Placed'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#efe7dc] hover:bg-[#e0d9ce] transition-colors flex items-center justify-center text-[#2b1712]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {step !== 'success' && (
          <div className="bg-[#faf3e8] px-6 py-2.5 border-b border-[#e8d2b5] text-xs font-sans">
            {subtotal >= freeDeliveryThreshold ? (
              <span className="text-[#8b501a] font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> You have qualified for Free Insulated Thermal Delivery!
              </span>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-[#504442]">
                  <span>Add Rs. {freeDeliveryThreshold - subtotal} for Free Thermal Delivery</span>
                  <span className="font-mono text-[#8b501a] font-bold">
                    {Math.round((subtotal / freeDeliveryThreshold) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1 bg-[#e0d9ce] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8b501a] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {step === 'cart' && (
            <>
              {cart.length === 0 && customBoxes.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#504442]">
                  <div className="w-16 h-16 rounded-full bg-[#f5ede2] border border-[#e8d2b5] flex items-center justify-center mb-4 text-[#8b501a]">
                    <Bike className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl text-[#2b1712] font-semibold mb-2">
                    Your bag is empty
                  </h4>
                  <p className="font-sans text-xs max-w-xs mb-6">
                    Fresh batches are currently baking in our stone ovens. Explore signatures or craft a bespoke carton.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-[#2b1712] text-[#fff8f1] px-6 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold hover:bg-[#361000] transition-colors"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items */}
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#f5ede2] border border-[#e8d2b5] flex items-center justify-between gap-4 shadow-sm"
                    >
                      <img
                        alt={item.product.name}
                        src={item.product.image}
                        className="w-16 h-16 object-cover rounded-lg border border-[#e8d2b5]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-semibold text-[#2b1712] truncate">
                          {item.product.name}
                        </h4>
                        <span className="font-sans text-[11px] text-[#827471] block">
                          {item.selectedWarmth === 'freshly-warmed' ? '🔥 Freshly Oven Warmed' : 'Ambient (Reheat Later)'}
                        </span>
                        <span className="font-sans text-xs font-bold text-[#8b501a] block mt-1 tabular-nums">
                          Rs. {item.product.pricePkr * item.quantity}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-[#fff8f1] border border-[#e8d2b5] rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#2b1712] hover:bg-[#efe7dc]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#2b1712] hover:bg-[#efe7dc]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[#827471] hover:text-red-700 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Custom Curated Boxes */}
                  {customBoxes.map((box) => (
                    <div
                      key={box.id}
                      className="p-4 rounded-xl bg-[#2b1712] text-[#fff8f1] border border-[#4a2921] flex items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-[10px] bg-[#feb071] text-[#2b1712] font-bold uppercase px-2 py-0.5 rounded">
                            Bespoke Box
                          </span>
                          <span className="font-sans text-xs text-[#ffdcc3]">
                            Ribbon: {box.ribbon}
                          </span>
                        </div>
                        <h4 className="font-serif text-base font-semibold text-white mt-1">
                          {box.title}
                        </h4>
                        {box.giftNote && (
                          <p className="font-sans text-[11px] text-[#efe7dc] italic truncate">
                            Note: "{box.giftNote}"
                          </p>
                        )}
                        <span className="font-sans text-xs font-bold text-[#feb071] block mt-1 tabular-nums">
                          Rs. {box.pricePkr.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveBox(box.id)}
                        className="text-white/60 hover:text-red-400 transition-colors p-1"
                        title="Remove box"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#504442] font-bold mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ayan Qureshi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#fff8f1] border border-[#e8d2b5] rounded-xl px-4 py-2.5 text-xs text-[#2b1712] focus:outline-none focus:border-[#8b501a]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#504442] font-bold mb-1">
                  Contact Phone (WhatsApp for live rider tracking) *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#fff8f1] border border-[#e8d2b5] rounded-xl px-4 py-2.5 text-xs text-[#2b1712] focus:outline-none focus:border-[#8b501a]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#504442] font-bold mb-1">
                  Street Address &amp; Sector *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House / Apartment #, Street name, Sector F-7 / Gulberg / DHA..."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-[#fff8f1] border border-[#e8d2b5] rounded-xl px-4 py-2.5 text-xs text-[#2b1712] focus:outline-none focus:border-[#8b501a]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#504442] font-bold mb-1">
                  Special Bakery Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra napkins, please ring bell twice"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full bg-[#fff8f1] border border-[#e8d2b5] rounded-xl px-4 py-2.5 text-xs text-[#2b1712] focus:outline-none focus:border-[#8b501a]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#504442] font-bold mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left font-sans transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#8b501a] bg-[#f5ede2] text-[#2b1712] font-bold shadow-sm'
                        : 'border-[#e8d2b5] text-[#504442]'
                    }`}
                  >
                    <span className="block font-bold">Cash on Delivery</span>
                    <span className="text-[10px] text-[#827471]">Pay upon warm arrival</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left font-sans transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#8b501a] bg-[#f5ede2] text-[#2b1712] font-bold shadow-sm'
                        : 'border-[#e8d2b5] text-[#504442]'
                    }`}
                  >
                    <span className="block font-bold">Card POS on Delivery</span>
                    <span className="text-[10px] text-[#827471]">Rider brings card terminal</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#2b1712] text-[#feb071] flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-[#8b501a] uppercase tracking-widest block mb-1">
                  {orderNumber}
                </span>
                <h3 className="font-serif text-2xl text-[#2b1712] font-bold">
                  Baking in the Oven Now!
                </h3>
                <p className="font-sans text-xs text-[#504442] mt-2 max-w-xs leading-relaxed">
                  Your confections are entering our 180°C stone ovens. Insulated thermal pouches will keep the molten hazelnut centers steaming until delivery.
                </p>
              </div>

              <div className="bg-[#f5ede2] p-4 rounded-2xl border border-[#e8d2b5] w-full text-left font-sans text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#827471]">Estimated Dispatch:</span>
                  <span className="font-bold text-[#2b1712]">22 — 28 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#827471]">Payment:</span>
                  <span className="font-bold text-[#2b1712]">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card POS on Delivery'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#e8d2b5] pt-2">
                  <span className="text-[#827471]">Total Billed:</span>
                  <span className="font-bold text-[#8b501a]">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="flex-1 bg-[#25d366] text-white py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" /> Track on WhatsApp
                </button>
                <button
                  onClick={() => {
                    onClearCart();
                    setStep('cart');
                    onClose();
                  }}
                  className="flex-1 bg-[#2b1712] text-white py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== 'success' && (subtotal > 0 || step === 'checkout') && (
          <div className="p-5 md:p-6 border-t border-[#e8d2b5] bg-[#f5ede2] space-y-4">
            <div className="space-y-1.5 font-sans text-xs">
              <div className="flex justify-between text-[#504442]">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#504442]">
                <span>Thermal Insulated Delivery</span>
                <span className="font-mono tabular-nums font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-[#8b501a] font-bold">FREE</span>
                  ) : (
                    `Rs. ${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2b1712] pt-2 border-t border-[#e8d2b5]">
                <span>Total Amount</span>
                <span className="font-serif text-xl text-[#8b501a] tabular-nums">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full bg-[#2b1712] text-[#fff8f1] hover:bg-[#361000] font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  PROCEED TO DISPATCH <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full sm:w-auto bg-[#25d366]/10 text-[#128c7e] hover:bg-[#25d366]/20 border border-[#25d366]/30 font-sans text-xs uppercase tracking-wider font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5"
                  title="Order directly via WhatsApp Concierge"
                >
                  <MessageSquare className="w-4 h-4 text-[#25d366]" /> WhatsApp
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 rounded-xl border border-[#e8d2b5] font-sans text-xs uppercase font-bold text-[#504442]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 bg-[#8b501a] text-white hover:bg-[#2b1712] font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  CONFIRM &amp; BAKE ORDER <Check className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
