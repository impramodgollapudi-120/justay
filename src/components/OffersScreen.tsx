import React, { useState } from 'react';
import { Copy, Check, Tag } from 'lucide-react';

interface Offer {
  id: string; code: string; discountText: string; title: string;
  description: string; validTill: string; category: string;
}
interface OffersScreenProps { offers: Offer[]; onApplyOffer: (code: string) => void; }
export const OffersScreen: React.FC<OffersScreenProps> = ({ offers, onApplyOffer }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const handleCopy = async (code: string) => {
    try { await navigator.clipboard.writeText(code); } catch { /* Clipboard access may be blocked; code remains visible for manual copy. */ }
    setCopiedCode(code); onApplyOffer(code); setTimeout(() => setCopiedCode(null), 1800);
  };
  return <div className="pb-24 text-stone-900">
    <header className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
      <h1 className="text-xl font-black">Offers & promo codes</h1>
      <p className="mt-1 text-sm text-stone-600">Current offers loaded from Firebase.</p>
      <span className="mt-3 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900">{offers.length} active offer records</span>
    </header>
    {offers.length === 0 ? <div className="rounded-2xl border border-dashed bg-white p-8 text-center text-stone-600">No offers have been published yet.</div> :
      <div className="grid gap-4 sm:grid-cols-2">{offers.map(offer => <article key={offer.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-amber-700">{offer.category}</p><h2 className="mt-1 text-lg font-extrabold">{offer.title}</h2></div><Tag className="shrink-0 text-amber-700" /></div>
        <p className="mt-2 font-bold text-red-950">{offer.discountText}</p><p className="mt-2 text-sm text-stone-600">{offer.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-stone-50 p-3"><code className="font-bold tracking-wide">{offer.code}</code><button onClick={() => handleCopy(offer.code)} className="inline-flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm font-semibold">{copiedCode === offer.code ? <Check size={15}/> : <Copy size={15}/>} {copiedCode === offer.code ? 'Copied' : 'Copy'}</button></div>
        {offer.validTill && <p className="mt-3 text-xs text-stone-500">Valid until {offer.validTill}</p>}
      </article>)}</div>}
  </div>;
};
