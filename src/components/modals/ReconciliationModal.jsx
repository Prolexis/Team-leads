import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck, 
  Wallet, 
  CreditCard, 
  Banknote, 
  Building, 
  FileCheck, 
  Sparkles,
  Printer,
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReconciliationModal = ({ 
  isOpen, 
  onClose, 
  currentLead, 
  onConfirmPayerConversion 
}) => {
  if (!isOpen) return null;

  const isAlreadyPayer = currentLead.status === 'PAYER';

  // State for form
  const [paymentMethod, setPaymentMethod] = useState(
    currentLead.operational.preferredPaymentMethod || 'YAPE'
  );
  const [realSource, setRealSource] = useState(
    paymentMethod === 'YAPE' 
      ? 'Registro App Yape Negocios' 
      : paymentMethod === 'PLIN' 
        ? 'Registro App Plin Negocios' 
        : 'Terminal POS IziPay / Niubiz'
  );
  const [operationCode, setOperationCode] = useState(
    currentLead.activeOrder?.reconciliationDetails?.operationCode || '83921045'
  );
  const [amountPaid, setAmountPaid] = useState(
    currentLead.activeOrder?.total?.toFixed(2) || '53.00'
  );
  const [verifiedBySeller, setVerifiedBySeller] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === 'YAPE') setRealSource('Registro App Yape Negocios');
    else if (method === 'PLIN') setRealSource('Registro App Plin Negocios');
    else if (method === 'POS') setRealSource('Terminal POS IziPay / Niubiz');
    else setRealSource('Caja Central / Efectivo Físico');
  };

  const handleConfirm = () => {
    if (!verifiedBySeller && !isAlreadyPayer) {
      setValidationError('Debes certificar la validación contra la fuente real según la regla del KPI L3.');
      return;
    }
    if (!operationCode.trim()) {
      setValidationError('Ingresa el Nº de Operación o Referencia.');
      return;
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered');
    }

    const reconciliationDetails = {
      method: paymentMethod,
      realSource,
      operationCode,
      amountPaid: parseFloat(amountPaid),
      reconciledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Hoy',
      responsibleSeller: currentLead.assignedSeller,
      invoiceGenerated: currentLead.work.requiresInvoice ? currentLead.work.ruc : 'Boleta de Venta'
    };

    onConfirmPayerConversion(reconciliationDetails);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-crm-card border border-crm-border rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-crm-border flex items-center justify-between bg-crm-bg/80">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isAlreadyPayer ? 'bg-payer/20 text-payer' : 'bg-emerald-600/20 text-emerald-400'
            }`}>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {isAlreadyPayer ? 'Certificado de Conciliación Real (PAYER)' : 'Conciliación de Pago y Cambio a PAYER'}
                </h2>
                <span className="text-[10px] bg-payer/20 text-payer font-bold px-2 py-0.5 rounded">
                  Paso 4 (KPI L1 + L3)
                </span>
              </div>
              <p className="text-xs text-crm-secondary">
                Lead: <strong className="text-white">{currentLead.name}</strong> • Canal Preferido: {currentLead.operational.preferredPaymentMethod}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* MANDATORY BUSINESS RULE BANNER (Regla estricta) */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-amber-950/30 to-crm-bg border-2 border-amber-500/50 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Regla de Negocio Obligatoria (Auditoría UNT)
                </h3>
                <p className="text-xs text-gray-200 mt-1 font-medium leading-relaxed">
                  "Conciliación requerida contra <strong>fuente real</strong> (Registro Yape/Plin del negocio o Caja POS). 
                  <span className="text-red-400 font-bold underline ml-1">Prohibido validar únicamente con capturas de pantalla de chat.</span>"
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Meta KPI L3: Integridad del perfil ≥ 95% • Meta KPI L1: Conversión en 24h ≥ 50%.
                </p>
              </div>
            </div>
          </div>

          {isAlreadyPayer ? (
            /* Already PAYER View */
            <div className="space-y-4">
              <div className="bg-payer/10 border border-payer/40 rounded-xl p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-payer/20 text-payer flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Transacción Conciliada con Éxito</h4>
                <p className="text-xs text-payer font-semibold mt-0.5">
                  El LEAD ha sido transformado en PAYER oficial.
                </p>
              </div>

              <div className="bg-crm-bg/90 border border-crm-border/80 rounded-xl p-4 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-crm-secondary">Medio de Pago:</span>
                  <span className="font-bold text-white font-mono">{currentLead.activeOrder?.reconciliationDetails?.method || currentLead.operational.preferredPaymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crm-secondary">Fuente Real Validada:</span>
                  <span className="font-bold text-payer">{currentLead.activeOrder?.reconciliationDetails?.realSource || 'Registro App Yape Negocios'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crm-secondary">Nº de Operación:</span>
                  <span className="font-bold text-white font-mono">{currentLead.activeOrder?.reconciliationDetails?.operationCode || '83921045'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crm-secondary">Monto Conciliado:</span>
                  <span className="font-bold text-payer font-mono text-sm">S/ {currentLead.activeOrder?.reconciliationDetails?.amountPaid?.toFixed(2) || '53.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crm-secondary">Comprobante Emitido:</span>
                  <span className="text-white font-medium">
                    {currentLead.work.requiresInvoice ? `Factura RUC: ${currentLead.work.ruc}` : 'Boleta Electrónica'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-crm-border pt-2 text-[11px]">
                  <span className="text-crm-secondary">Responsable de Caja:</span>
                  <span className="text-gray-300">{currentLead.assignedSeller}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Reconciliation Form */
            <div className="space-y-4">
              
              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-bold text-crm-secondary uppercase tracking-wider block mb-2">
                  1. Método de Pago Utilizado por el Cliente
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'YAPE', name: 'Yape', icon: Wallet },
                    { id: 'PLIN', name: 'Plin', icon: Wallet },
                    { id: 'POS', name: 'POS Tarjeta', icon: CreditCard },
                    { id: 'EFECTIVO', name: 'Efectivo', icon: Banknote },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleMethodChange(m.id)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                          isSelected 
                            ? 'bg-fire-gold/20 border-fire-gold text-white font-bold shadow-md shadow-fire-gold/20' 
                            : 'bg-crm-bg/80 border-crm-border text-crm-secondary hover:text-white hover:bg-crm-bg'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-fire-gold" />
                        <span className="text-xs">{m.name}</span>
                        {currentLead.operational.preferredPaymentMethod === m.id && (
                          <span className="text-[8px] bg-fire-gold/30 text-fire-gold px-1 rounded font-bold">
                            Preferente
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Real Source Selector */}
              <div>
                <label className="text-xs font-bold text-crm-secondary uppercase tracking-wider block mb-1.5">
                  2. Fuente Real de Comprobación Directa
                </label>
                <select
                  value={realSource}
                  onChange={(e) => setRealSource(e.target.value)}
                  className="w-full bg-crm-bg border border-crm-border rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-fire-gold transition"
                >
                  <option value="Registro App Yape Negocios">📱 Reporte Oficial App Yape Negocios (Sede Central)</option>
                  <option value="Registro App Plin Negocios">📱 Reporte Oficial App Plin Negocios (Sede Central)</option>
                  <option value="Terminal POS IziPay / Niubiz">💳 Voucher Impreso Terminal POS Físico</option>
                  <option value="Caja Central El Establo">💵 Arqueo de Caja Central / Dinero Físico Recibido</option>
                  <option value="Banca por Internet BCP / BBVA">🏦 Movimientos Bancarios en Vivo BCP/BBVA</option>
                </select>
              </div>

              {/* Operation Code & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-crm-secondary uppercase tracking-wider block mb-1.5">
                    3. Número de Operación / Ref.
                  </label>
                  <input
                    type="text"
                    value={operationCode}
                    onChange={(e) => {
                      setOperationCode(e.target.value);
                      setValidationError('');
                    }}
                    placeholder="Ej. 84920194"
                    className="w-full bg-crm-bg border border-crm-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-fire-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-crm-secondary uppercase tracking-wider block mb-1.5">
                    4. Monto Total Conciliado (S/)
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    className="w-full bg-crm-bg border border-crm-border rounded-xl px-3 py-2 text-xs text-payer font-mono font-bold focus:outline-none focus:border-payer"
                  />
                </div>
              </div>

              {/* Invoice Notice */}
              {currentLead.work.requiresInvoice && (
                <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-blue-400" />
                    <div>
                      <span className="font-semibold text-white">Requiere Factura Electrónica:</span>
                      <p className="text-[11px] text-blue-300 font-mono">RUC {currentLead.work.ruc} - {currentLead.work.businessName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded">
                    Auto-Emitir
                  </span>
                </div>
              )}

              {/* Checkbox Acknowledgment (Compliance) */}
              <div className="pt-2">
                <label className="flex items-start gap-3 p-3 bg-crm-bg/90 border border-crm-border rounded-xl cursor-pointer hover:border-fire-gold/40 transition">
                  <input
                    type="checkbox"
                    checked={verifiedBySeller}
                    onChange={(e) => {
                      setVerifiedBySeller(e.target.checked);
                      setValidationError('');
                    }}
                    className="mt-0.5 rounded border-crm-border text-payer focus:ring-payer h-4 w-4"
                  />
                  <span className="text-xs text-gray-300 leading-snug">
                    <strong>Certifico la validación en fuente real:</strong> He contrastado el ingreso en la cuenta/POS oficial de "Parrilladas El Establo" y confirmo que no es una captura simulada ni comprobante falso.
                  </span>
                </label>
              </div>

              {validationError && (
                <p className="text-xs text-red-400 font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {validationError}
                </p>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-crm-border bg-crm-bg/80 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-crm-secondary hover:text-white hover:bg-white/5 transition"
          >
            {isAlreadyPayer ? 'Cerrar' : 'Cancelar'}
          </button>

          {!isAlreadyPayer && (
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-payer hover:from-emerald-500 hover:to-payer-light text-white shadow-lg shadow-emerald-700/30 hover:scale-105 active:scale-95 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Conciliación y Cambiar a PAYER</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
