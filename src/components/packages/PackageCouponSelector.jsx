import React, { useState } from 'react';
import { Tag, Sparkles, Check, X } from 'lucide-react';
import { formatCurrency } from '../../utils/priceFormatter';

export const PackageCouponSelector = ({
  coupons = [],
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  bookingTotal = 0,
}) => {
  const [customCode, setCustomCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCustomApply = (e) => {
    e.preventDefault();
    if (!customCode.trim()) return;
    try {
      setErrorMsg('');
      onApplyCoupon(customCode.trim(), bookingTotal);
      setCustomCode('');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid coupon');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-4 shadow-xs ring-1 ring-red-950/5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-black text-red-950 flex items-center gap-1.5 font-brand">
          <Tag className="w-4 h-4 text-red-600" /> Offers & Promo Codes
        </h4>
        {appliedCoupon && (
          <button
            onClick={onRemoveCoupon}
            className="text-xs text-red-600 font-bold hover:underline flex items-center gap-0.5"
          >
            <X className="w-3.5 h-3.5" /> Remove
          </button>
        )}
      </div>

      {appliedCoupon ? (
        <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ✓
            </div>
            <div>
              <span className="text-xs font-black text-red-950 block font-mono">
                {appliedCoupon.code}
              </span>
              <span className="text-[11px] text-red-700 font-semibold">
                You saved {formatCurrency(appliedCoupon.discountAmount)} on this booking!
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Custom promo input */}
          <form onSubmit={handleCustomApply} className="flex gap-2">
            <input
              type="text"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code (e.g. JUSTAYPKG)"
              className="flex-1 px-3.5 py-2.5 text-xs border border-red-900/15 rounded-2xl uppercase font-mono tracking-wider focus:outline-none focus:border-red-600 bg-red-50/20 text-red-950 placeholder:text-red-900/40"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-black rounded-2xl transition shadow-xs cursor-pointer font-brand"
            >
              Apply
            </button>
          </form>
          {errorMsg && <p className="text-[11px] text-red-700 font-semibold">{errorMsg}</p>}

          {/* Quick Coupons List */}
          {coupons.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-red-900/10">
              <span className="text-[11px] font-bold text-red-900/70 block">
                Available Holiday Deals:
              </span>
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="p-3 bg-red-50/30 border border-red-900/10 rounded-2xl flex items-center justify-between text-xs hover:border-red-600/40 transition shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-red-950 text-xs">
                        {coupon.code}
                      </span>
                      <span className="text-[10px] text-red-700 bg-red-50 px-2 py-0.5 rounded-full font-bold border border-red-200">
                        Save {formatCurrency(coupon.discountAmount)}
                      </span>
                    </div>
                    <p className="text-[11px] text-red-900/70 mt-0.5 font-medium">{coupon.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onApplyCoupon(coupon.code, bookingTotal)}
                    className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-black rounded-xl transition border border-red-200 cursor-pointer font-brand"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PackageCouponSelector;
