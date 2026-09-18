import React from 'react';
import { 
  History, 
  Wallet, 
  CheckCircle2, 
  DollarSign, 
  ArrowRight,
  ShieldAlert,
  Send,
  Lock
} from 'lucide-react';

export const OperationalBlock = ({ 
  currentLead, 
  onOpenPaymentModal, 
  onOpenWhatsAppModal,
  countdownMinutes,
  countdownSeconds 
}) => {
  const { operational, status } = currentLead;
  const isPayer = status === 'PAYER';
  const isBlocked = status === 'PEDIDO_BLOQUEADO';

  return (
    <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-colors">
      <div>
        {/* Header Block 5 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-crm-border gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
              5
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Historial Operativo, Pagos y Estado</h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-semibold">Pasos 3 y 4</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-crm-secondary">Medio de pago preferente y conciliación con fuente real</p>
            </div>
          </div>

          {/* Current Status Badge */}
          <div>
            {isPayer ? (
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> CLIENTE PAYER (Venta Cerrada)
              </span>
            ) : isBlocked ? (
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                <Lock className="w-3.5 h-3.5" /> CUPO BLOQUEADO ({String(countdownMinutes).padStart(2, '0')}:{String(countdownSeconds).padStart(2, '0')})
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span> LEAD ACTIVO EN NEGOCIACIÓN
              </span>
            )}
          </div>
        </div>

        {/* Grid of details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Frecuencia & Ticket */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-crm-secondary flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-slate-400" /> Frecuencia de Compra:
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{operational.frequency}</span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 dark:border-crm-border/50 pt-2">
              <span className="text-[10px] text-slate-500 dark:text-crm-secondary flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Ticket Promedio:
              </span>
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                S/ {operational.averageTicket.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 dark:border-crm-border/50 pt-2">
              <span className="text-[10px] text-slate-500 dark:text-crm-secondary">Entregas Históricas:</span>
              <span className="text-xs font-medium text-slate-800 dark:text-white font-mono">{operational.totalOrdersPast}</span>
            </div>
          </div>

          {/* Canal de Pago Preferente */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-crm-secondary flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-slate-400" /> Método Preferente:
              </span>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white px-2 py-0.2 rounded bg-slate-200 dark:bg-slate-800 font-mono">
                {operational.preferredPaymentMethod}
              </span>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-crm-secondary pt-0.5">
              <span>Asociado a:</span> <span className="font-mono text-slate-900 dark:text-white font-semibold">{operational.paymentPhone}</span>
            </div>

            <button
              onClick={onOpenWhatsAppModal}
              className="w-full mt-1 py-1.5 px-2 rounded-lg text-[10px] font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 transition"
            >
              <Send className="w-3 h-3" />
              <span>Enviar Datos {operational.preferredPaymentMethod} (Paso 3)</span>
            </button>
          </div>

          {/* Observaciones y Opt-In */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-3 space-y-2">
            <div>
              <p className="text-[10px] text-slate-500 dark:text-crm-secondary font-semibold">Observaciones de Entrega:</p>
              <p className="text-xs text-slate-900 dark:text-white mt-0.5 font-medium leading-snug">
                "{operational.specialInstructions}"
              </p>
            </div>

            <div className="border-t border-slate-200 dark:border-crm-border/50 pt-2 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-crm-secondary">Consentimiento Opt-In:</span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Activo ({operational.optInDate})
              </span>
            </div>
          </div>

        </div>

        {/* Business Rule Warning Note */}
        <div className="mt-3 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-700 dark:text-slate-300">
            <strong className="text-amber-800 dark:text-amber-300 font-bold">Regla Operativa de Conciliación (Paso 4):</strong> La conversión a <span className="font-mono font-bold text-slate-900 dark:text-white">PAYER</span> exige contrastar contra fuente real (<span className="font-semibold text-slate-900 dark:text-white">Registro Yape/Plin Negocio o Caja POS</span>). <em>Prohibido validar únicamente con capturas enviadas por el chat.</em>
          </div>
        </div>

      </div>

      {/* Block Action */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-crm-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500 dark:text-crm-secondary">
          Actividad 4: Conciliación en Tiempo Real
        </span>
        <button
          onClick={onOpenPaymentModal}
          className={`flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition ${
            isPayer 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white shadow-sm'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isPayer ? 'Ver Certificado PAYER' : 'Conciliar Pago y Cambiar a PAYER'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
