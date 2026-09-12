import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Tag, 
  Plus, 
  Minus,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (discountPercent: number, couponCode: string) => void;
  onExploreServices?: () => void;
}

const VALID_COUPONS: Record<string, { discount: number; label: string; minSubtotal?: number }> = {
  'BUYUSA15': { discount: 0.15, label: '15% OFF Instant Discount' },
  'PVA10': { discount: 0.10, label: '10% OFF PVA Special' },
  'WELCOME': { discount: 0.10, label: '10% OFF Welcome Bonus' },
  'SAVE20': { discount: 0.20, label: '20% OFF Bulk Discount', minSubtotal: 100 },
  'VIP25': { discount: 0.25, label: '25% OFF VIP Agency Discount', minSubtotal: 200 }
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onExploreServices
}) => {
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Safe subtotal calculation
  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = typeof item.totalPrice === 'number' && !isNaN(item.totalPrice)
      ? item.totalPrice
      : (Number(item.product?.unitPrice) || 3.0) * (Number(item.quantity) || 2);
    return sum + itemPrice;
  }, 0);

  const totalAccountsCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  // Applied discount
  const activeCouponConfig = appliedCoupon ? VALID_COUPONS[appliedCoupon] : null;
  const discountPercent = activeCouponConfig ? activeCouponConfig.discount : 0;
  const discountAmount = subtotal * discountPercent;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (codeToApply?: string) => {
    const targetCode = (codeToApply || coupon).trim().toUpperCase();
    setCouponError(null);
    setCouponSuccess(null);

    if (!targetCode) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const found = VALID_COUPONS[targetCode];
    if (!found) {
      setCouponError(`Invalid coupon "${targetCode}". Try code "BUYUSA15" for 15% OFF!`);
      return;
    }

    if (found.minSubtotal && subtotal < found.minSubtotal) {
      setCouponError(`Coupon ${targetCode} requires a minimum order of $${found.minSubtotal}. (Current: $${subtotal.toFixed(2)})`);
      return;
    }

    setAppliedCoupon(targetCode);
    setCoupon(targetCode);
    setCouponSuccess(`${found.label} applied successfully!`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCoupon('');
    setCouponError(null);
    setCouponSuccess(null);
  };

  const handleManualQtyChange = (productId: string, valStr: string) => {
    const val = parseInt(valStr, 10);
    if (!isNaN(val) && val >= 1) {
      onUpdateQuantity(productId, Math.min(val, 5000));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          
          {/* Top Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">Your Account Cart</h3>
                  {cart.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {cart.length === 0 
                    ? 'No accounts added yet' 
                    : `${totalAccountsCount} total accounts ready for instant dispatch`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your entire cart?')) {
                      onClearCart();
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                  title="Clear entire cart"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content / Scroll Area */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-200/80 text-slate-300 flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Your Cart is Empty</h4>
                <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
                  Browse our USA aged, phone-verified PVA, and vintage Gmail accounts to stock your outreach operations.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onExploreServices) {
                      onExploreServices();
                    } else {
                      const el = document.getElementById('services');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Explore Accounts Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => {
                  const itemPrice = typeof item.totalPrice === 'number' && !isNaN(item.totalPrice)
                    ? item.totalPrice
                    : (Number(item.product?.unitPrice) || 3.0) * (Number(item.quantity) || 2);

                  const unitRate = item.quantity > 0 ? (itemPrice / item.quantity) : (item.product?.unitPrice || 3.0);
                  const baseUnit = item.product?.unitPrice || 3.0;
                  const hasVolumeDiscount = unitRate < baseUnit;

                  return (
                    <div
                      key={item.product.id}
                      className="bg-slate-50/80 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/90 transition-all flex flex-col gap-3 group"
                    >
                      {/* Item Top Row */}
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-black text-slate-900 leading-snug">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                              {item.product.age || 'PVA Verified'}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              ${unitRate.toFixed(2)} / ea
                            </span>
                            {hasVolumeDiscount && (
                              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                Bulk Tier Saved
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Remove item"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Selector & Item Subtotal */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (item.quantity <= 1) {
                                onRemoveItem(item.product.id);
                              } else {
                                onUpdateQuantity(item.product.id, item.quantity - 1);
                              }
                            }}
                            className="w-7 h-7 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer active:scale-95 shadow-2xs"
                            title={item.quantity <= 1 ? "Remove item" : "Decrease quantity"}
                          >
                            {item.quantity <= 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-500" /> : <Minus className="w-3.5 h-3.5" />}
                          </button>

                          <div className="flex items-center">
                            <input
                              type="number"
                              min="1"
                              max="5000"
                              value={item.quantity}
                              onChange={(e) => handleManualQtyChange(item.product.id, e.target.value)}
                              className="w-14 text-center text-xs font-black text-slate-900 py-1 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                            />
                            <span className="text-[10px] font-bold text-slate-400 ml-1">pcs</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer active:scale-95 shadow-2xs"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Add Pills */}
                          <div className="hidden sm:flex items-center gap-1 ml-1.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 5)}
                              className="px-1.5 py-0.5 bg-slate-200/70 hover:bg-blue-100 hover:text-blue-700 rounded text-[10px] font-bold text-slate-600 transition-colors cursor-pointer"
                              title="Add 5 accounts"
                            >
                              +5
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 10)}
                              className="px-1.5 py-0.5 bg-slate-200/70 hover:bg-blue-100 hover:text-blue-700 rounded text-[10px] font-bold text-slate-600 transition-colors cursor-pointer"
                              title="Add 10 accounts"
                            >
                              +10
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-base font-black text-slate-900">
                            ${itemPrice.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 block">USD</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Promo Code Box */}
                <div className="pt-3 border-t border-slate-200/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                      Promo / Discount Code
                    </span>
                    {!appliedCoupon && (
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon('BUYUSA15')}
                        className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        Try "BUYUSA15" (15% OFF)
                      </button>
                    )}
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleApplyCoupon();
                    }} 
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="e.g. BUYUSA15 or PVA10"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                        if (couponError) setCouponError(null);
                      }}
                      disabled={Boolean(appliedCoupon)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden disabled:opacity-75 disabled:bg-slate-100"
                    />
                    {appliedCoupon ? (
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3.5 py-2 rounded-xl text-xs border border-rose-200 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-slate-900 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                      >
                        Apply
                      </button>
                    )}
                  </form>

                  {couponSuccess && (
                    <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{couponSuccess}</span>
                    </div>
                  )}

                  {couponError && (
                    <div className="mt-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-xl flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{couponError}</span>
                    </div>
                  )}
                </div>

                {/* Instant Delivery Notice */}
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3 flex items-center gap-2.5 text-blue-900 text-xs">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-medium text-[11px] leading-tight">
                    Instant automated delivery via TXT/CSV spreadsheet immediately upon payment confirmation.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-4 shrink-0">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subtotal ({totalAccountsCount} accounts):</span>
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Discount ({appliedCoupon} - {(discountPercent * 100).toFixed(0)}% OFF):
                    </span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-xl text-blue-700">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  onProceedToCheckout(discountPercent, appliedCoupon || '');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>Proceed to Instant Checkout (${total.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 font-semibold">
                <div className="flex items-center gap-1 text-emerald-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>7-Day Replacement Warranty</span>
                </div>
                <span>•</span>
                <span>Crypto &amp; Bank Transfer</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
