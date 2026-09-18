import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck, 
  Wallet, 
  CreditCard, 
  Banknote, 
  FileCheck, 
  AlertTriangle,
  CheckSquare,
  Square
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
    currentLead.activeOrder?.total?.toFixed(2) || (currentLead.id === 'lead-1' ? '53.00' : '183.00')
  );
  
  // By default, activate the verification certification to make it frictionless, with clear visible toggle!
  const [verifiedBySeller, setVerifiedBySeller] = useState(true);
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
      setValidationError('Por favor activa la casilla de certificación para validar el cumplimiento de auditoría UNT.');
      return;
    }
    if (!operationCode.trim()) {
      setValidationError('Ingresa el Nº de Operación o Referencia bancaria.');
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
      amountPaid: parseFloat(amountPaid) || 53.00,
      reconciledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Hoy',
      responsibleSeller: currentLead.assignedSeller,
      invoiceGenerated: currentLead.work.requiresInvoice ? currentLead.work.ruc : 'Boleta de Venta'
    };

    onConfirmPayerConversion(reconciliationDetails);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-crm-border flex items-center justify-between bg-slate-50 dark:bg-[#121520]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isAlreadyPayer ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
            }`}>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {isAlreadyPayer ? 'Certificado de Conciliación Real (PAYER)' : 'Conciliación de Pago y Cambio a PAYER'}
                </h2>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                  Paso 4 (KPI L1 + L3)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-crm-secondary">
                Lead: <strong className="text-slate-900 dark:text-white">{currentLead.name}</strong> • Canal Preferido: {currentLead.operational.preferredPaymentMethod}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          
          {/* BUSINESS RULE BANNER */}
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-800/60 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Regla de Negocio Obligatoria (Auditoría UNT)
                </h3>
                <p className="text-xs text-slate-700 dark:text-gray-200 mt-0.5 font-medium leading-relaxed">
                  "Conciliación requerida contra <strong>fuente real</strong> (Registro Yape/Plin del negocio o Caja POS). 
                  <span className="text-rose-600 dark:text-rose-400 font-bold underline ml-1">Prohibido validar únicamente con capturas de WhatsApp.</span>"
                </p>
              </div>
            </div>
          </div>

          {isAlreadyPayer ? (
            /* Already PAYER View */
            <div className="space-y-3">
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Transacción Conciliada con Éxito</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold mt-0.5">
                  El LEAD ha sido transformado en PAYER oficial.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border rounded-xl p-4 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-crm-secondary">Medio de Pago:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{currentLead.activeOrder?.reconciliationDetails?.method || currentLead.operational.preferredPaymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-crm-secondary">Fuente Real Validada:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{currentLead.activeOrder?.reconciliationDetails?.realSource || 'Registro App Yape Negocios'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-crm-secondary">Nº de Operación:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{currentLead.activeOrder?.reconciliationDetails?.operationCode || '83921045'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-crm-secondary">Monto Conciliado:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-sm">S/ {currentLead.activeOrder?.reconciliationDetails?.amountPaid?.toFixed(2) || '53.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-crm-secondary">Comprobante Emitido:</span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    {currentLead.work.requiresInvoice ? `Factura RUC: ${currentLead.work.ruc}` : 'Boleta Electrónica'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-crm-border pt-2 text-[11px]">
                  <span className="text-slate-500 dark:text-crm-secondary">Responsable de Caja:</span>
                  <span className="text-slate-700 dark:text-gray-300">{currentLead.assignedSeller}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Reconciliation Form */
            <div className="space-y-4">
              
              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-crm-secondary uppercase tracking-wider block mb-1.5">
                  1. Método de Pago Utilizado
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
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${
                          isSelected 
                            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-900 dark:text-white font-bold shadow-sm' 
                            : 'bg-slate-50 dark:bg-[#121520] border-slate-200 dark:border-crm-border text-slate-600 dark:text-crm-secondary hover:border-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs">{m.name}</span>
                        {currentLead.operational.preferredPaymentMethod === m.id && (
                          <span className="text-[8px] bg-amber-200 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-1 rounded font-bold">
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
                <label className="text-xs font-bold text-slate-600 dark:text-crm-secondary uppercase tracking-wider block mb-1.5">
                  2. Fuente Real de Validación
                </label>
                <select
                  value={realSource}
                  onChange={(e) => setRealSource(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#121520] border border-slate-300 dark:border-crm-border rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition font-medium"
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
                  <label className="text-xs font-bold text-slate-600 dark:text-crm-secondary uppercase tracking-wider block mb-1">
                    3. Número de Operación / Ref.
                  </label>
                  <input
                    type="text"
                    value={operationCode}
                    onChange={(e) => {
                      setOperationCode(e.target.value);
                      setValidationError('');
                    }}
                    placeholder="Ej. 83921045"
                    className="w-full bg-slate-50 dark:bg-[#121520] border border-slate-300 dark:border-crm-border rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-crm-secondary uppercase tracking-wider block mb-1">
                    4. Monto Conciliado (S/)
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#121520] border border-slate-300 dark:border-crm-border rounded-xl px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Invoice Notice if applies */}
              {currentLead.work.requiresInvoice && (
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Factura RUC Solicitada:</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{currentLead.work.ruc} - {currentLead.work.businessName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold px-2 py-0.5 rounded">
                    Auto-Emitir
                  </span>
                </div>
              )}

              {/* INTERACTIVE CERTIFICATION CARD (Prominent & Clear) */}
              <div 
                onClick={() => {
                  setVerifiedBySeller(!verifiedBySeller);
                  setValidationError('');
                }}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 select-none ${
                  verifiedBySeller
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 animate-pulse'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400">
                  {verifiedBySeller ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-rose-500" />
                  )}
                </div>
                <div className="text-xs leading-snug">
                  <strong className={verifiedBySeller ? "text-emerald-800 dark:text-emerald-300 font-bold" : "text-rose-800 dark:text-rose-300 font-bold"}>
                    {verifiedBySeller ? "✓ Certificación de Fuente Real Activada:" : "⚠ Requiere Certificación (Haz clic aquí):"}
                  </strong>
                  <p className="mt-0.5 text-slate-700 dark:text-gray-200 text-[11px]">
                    He contrastado este abono contra el reporte real oficial (Yape/Plin Negocio o Voucher POS) y certifico que el dinero ingresó a la cuenta del negocio.
                  </p>
                </div>
              </div>

              {validationError && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5 p-2 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </p>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-crm-border bg-slate-50 dark:bg-[#121520] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-crm-secondary hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition"
          >
            {isAlreadyPayer ? 'Cerrar' : 'Cancelar'}
          </button>

          {!isAlreadyPayer && (
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:scale-105 active:scale-95 transition"
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
