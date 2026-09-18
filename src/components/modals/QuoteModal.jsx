import React, { useState } from 'react';
import { 
  X, 
  Receipt, 
  Plus, 
  Minus, 
  Trash2, 
  Lock, 
  Clock, 
  Sparkles, 
  Check, 
  Copy, 
  ShoppingBag,
  Flame,
  AlertCircle
} from 'lucide-react';
import { MENU_CATALOG } from '../../types/crmData';

export const QuoteModal = ({ 
  isOpen, 
  onClose, 
  currentLead, 
  onSaveQuoteAndLock, 
  countdownMinutes, 
  countdownSeconds 
}) => {
  if (!isOpen) return null;

  const [orderItems, setOrderItems] = useState(
    currentLead.activeOrder?.items || [
      { id: "item-1", name: "Bife Ancho 350g + Papas Nativas", price: 48.00, qty: 1, note: "Término 3/4" }
    ]
  );
  const [deliveryFee, setDeliveryFee] = useState(currentLead.activeOrder?.deliveryFee || 5.00);
  const [discount, setDiscount] = useState(
    currentLead.academic.studentDiscountEligible ? 5.00 : 0.00
  );
  const [copiedText, setCopiedText] = useState(false);

  // Add item from catalog
  const handleAddItem = (catalogItem) => {
    const existingIndex = orderItems.findIndex(i => i.id === catalogItem.id);
    if (existingIndex >= 0) {
      const updated = [...orderItems];
      updated[existingIndex].qty += 1;
      setOrderItems(updated);
    } else {
      setOrderItems([
        ...orderItems,
        {
          id: catalogItem.id,
          name: catalogItem.name,
          price: catalogItem.price,
          qty: 1,
          note: catalogItem.category.includes('Cortes') ? currentLead.preferences.cookingTerm : ''
        }
      ]);
    }
  };

  const handleUpdateQty = (idx, delta) => {
    const updated = [...orderItems];
    const newQty = updated[idx].qty + delta;
    if (newQty <= 0) {
      updated.splice(idx, 1);
    } else {
      updated[idx].qty = newQty;
    }
    setOrderItems(updated);
  };

  const handleUpdateNote = (idx, note) => {
    const updated = [...orderItems];
    updated[idx].note = note;
    setOrderItems(updated);
  };

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const isBlocked = currentLead.status === 'PEDIDO_BLOQUEADO';

  const handleLockOrder = () => {
    onSaveQuoteAndLock({
      items: orderItems,
      deliveryFee,
      discount,
      total
    });
    onClose();
  };

  const generateWhatsAppQuote = () => {
    let text = `🔥 *COTIZACIÓN PARRILLADAS EL ESTABLO* 🔥\n`;
    text += `Cliente: ${currentLead.name}\n`;
    text += `Zona: ${currentLead.personal.district}\n\n`;
    text += `📋 *Detalle del Pedido:*\n`;
    orderItems.forEach(i => {
      text += `• ${i.qty}x ${i.name} ${i.note ? `(${i.note})` : ''} - S/ ${(i.price * i.qty).toFixed(2)}\n`;
    });
    text += `\nSubtotal: S/ ${subtotal.toFixed(2)}`;
    if (discount > 0) text += `\nDescuento Estudiante UNT: -S/ ${discount.toFixed(2)}`;
    text += `\nEnvío Delivery: S/ ${deliveryFee.toFixed(2)}`;
    text += `\n*TOTAL A PAGAR: S/ ${total.toFixed(2)}*\n\n`;
    text += `💳 *Medio Preferido:* ${currentLead.operational.preferredPaymentMethod}\n`;
    text += `⏱️ *Cupo en cocina reservado por 20 minutos.*`;
    return text;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateWhatsAppQuote());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-crm-card border border-crm-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-crm-border flex items-center justify-between bg-crm-bg/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fire-gold/20 text-fire-gold flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Cotizador y Bloqueo de Cupo</h2>
                <span className="text-[10px] bg-fire-gold/20 text-fire-gold font-bold px-2 py-0.5 rounded">
                  Pasos 1 y 2
                </span>
              </div>
              <p className="text-xs text-crm-secondary">
                Lead: <strong className="text-white">{currentLead.name}</strong> • Preferencia: {currentLead.preferences.favoriteDish}
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-crm-secondary hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Quick Catalog Add (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-crm-secondary flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-fire-gold" /> Carta y Promociones
              </h3>
              <span className="text-[10px] text-crm-muted">Clic para agregar</span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {MENU_CATALOG.map((catItem) => (
                <div 
                  key={catItem.id}
                  onClick={() => handleAddItem(catItem)}
                  className="p-2.5 rounded-xl bg-crm-bg/80 hover:bg-crm-bg border border-crm-border/80 hover:border-fire-gold/50 cursor-pointer transition flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white group-hover:text-fire-gold transition">
                        {catItem.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-crm-secondary mt-0.5">
                      <span className="text-gray-400">{catItem.category}</span>
                      <span>•</span>
                      <span className="text-fire-gold/80">{catItem.tag}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-payer font-mono">S/ {catItem.price.toFixed(2)}</p>
                    <span className="text-[9px] text-crm-secondary flex items-center justify-end gap-0.5 group-hover:text-white">
                      <Plus className="w-3 h-3" /> Agregar
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* PLN Recommendation Callout */}
            <div className="bg-fire-gold/10 border border-fire-gold/30 rounded-xl p-3 text-xs">
              <div className="flex items-center gap-1.5 text-fire-gold font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Preferencia Detectada por PLN:
              </div>
              <p className="text-white text-[11px]">
                {currentLead.preferences.favoriteDish} en {currentLead.preferences.cookingTerm}.
              </p>
            </div>
          </div>

          {/* Right: Active Order List & Summary (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-crm-secondary flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-payer" /> Detalle de la Cotización
                </h3>
                <span className="text-[11px] font-mono text-crm-secondary">
                  {orderItems.length} {orderItems.length === 1 ? 'producto' : 'productos'}
                </span>
              </div>

              {/* Order Items Table/List */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {orderItems.length === 0 ? (
                  <div className="p-8 text-center text-crm-secondary border border-dashed border-crm-border rounded-xl">
                    No hay productos en la cotización. Selecciona platos del menú a la izquierda.
                  </div>
                ) : (
                  orderItems.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-crm-bg/90 border border-crm-border/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-bold text-white">{item.name}</p>
                        <input
                          type="text"
                          value={item.note || ''}
                          onChange={(e) => handleUpdateNote(idx, e.target.value)}
                          placeholder="Nota (ej. Término 3/4, sin azúcar...)"
                          className="mt-1 w-full bg-crm-card border border-crm-border rounded px-2 py-0.5 text-[10px] text-crm-secondary focus:text-white focus:outline-none focus:border-fire-gold"
                        />
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                        {/* Qty controls */}
                        <div className="flex items-center bg-crm-card border border-crm-border rounded-lg p-0.5">
                          <button
                            onClick={() => handleUpdateQty(idx, -1)}
                            className="p-1 hover:bg-white/10 rounded text-crm-secondary hover:text-white transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold px-2 text-white">{item.qty}</span>
                          <button
                            onClick={() => handleUpdateQty(idx, 1)}
                            className="p-1 hover:bg-white/10 rounded text-crm-secondary hover:text-white transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right min-w-[70px]">
                          <span className="text-xs font-bold text-white font-mono">
                            S/ {(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Calculations & Totals */}
            <div className="bg-crm-bg/90 border border-crm-border/80 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between text-crm-secondary">
                <span>Subtotal Carta:</span>
                <span className="font-mono text-white">S/ {subtotal.toFixed(2)}</span>
              </div>
              
              {currentLead.academic.studentDiscountEligible && (
                <div className="flex justify-between text-fire-gold">
                  <span>Descuento Estudiante UNT (6to Ciclo):</span>
                  <span className="font-mono">-S/ {discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-crm-secondary">
                <span>Costo Delivery ({currentLead.personal.district}):</span>
                <span className="font-mono text-white">S/ {deliveryFee.toFixed(2)}</span>
              </div>

              <div className="border-t border-crm-border pt-2 flex justify-between items-baseline text-sm font-extrabold">
                <span className="text-white">TOTAL FINAL:</span>
                <span className="text-payer font-mono text-lg">S/ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Lock Time Notice (Rule KPI L1) */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-gray-300">
                <strong className="text-amber-300">Regla de Bloqueo de Cupo (20 min):</strong> Al confirmar, se reserva el corte en parrilla y se bloquea el cupo para sostener el indicador <strong className="text-white">KPI L1 (Conversión en 24h ≥ 50%)</strong>.
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-crm-border bg-crm-bg/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyQuote}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-crm-card hover:bg-crm-cardHover border border-crm-border text-gray-300 hover:text-white transition"
          >
            {copiedText ? <Check className="w-4 h-4 text-payer" /> : <Copy className="w-4 h-4" />}
            <span>{copiedText ? '¡Cotización Copiada!' : 'Copiar Texto para WhatsApp'}</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-crm-secondary hover:text-white hover:bg-white/5 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleLockOrder}
              disabled={orderItems.length === 0}
              className="w-1/2 sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-fire-bright to-fire-gold hover:from-fire-gold hover:to-fire-bright text-crm-bg shadow-lg shadow-fire-bright/25 hover:scale-105 active:scale-95 transition disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>Confirmar Pedido y Bloquear Cupo (20 min)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
