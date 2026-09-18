import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  Send, 
  AlertCircle
} from 'lucide-react';
import { KPI_DATA } from '../types/crmData';

export const KpiPanel = ({ currentLead, onApplyAiSuggestion, onOpenQuoteModal, onOpenWhatsAppModal }) => {
  const { aiSuggestion } = currentLead;

  return (
    <div className="space-y-4">
      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* KPI L1 */}
        <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-4 shadow-soft transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                L1
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Conversión LEAD → PAYER</h2>
                <p className="text-[11px] text-slate-500 dark:text-crm-secondary">Ventana 24 horas</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Meta {KPI_DATA.l1.target}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{KPI_DATA.l1.current}%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+8.4% vs meta</span>
            </div>
            <span className="text-[10px] text-slate-400">Cierres rápidos</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(KPI_DATA.l1.current, 100)}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-crm-secondary mt-2">
            Sostenido por el bloqueo de cupos de 20 min y cotizaciones instantáneas.
          </p>
        </div>

        {/* KPI L2 */}
        <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-4 shadow-soft transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                L2
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Respuesta Útil Inmediata</h2>
                <p className="text-[11px] text-slate-500 dark:text-crm-secondary">Tiempo límite &lt; 5 min</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> Meta {KPI_DATA.l2.target}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{KPI_DATA.l2.current}%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">T. Promedio: {KPI_DATA.l2.avgTime}</span>
            </div>
            <span className="text-[10px] text-slate-400">WhatsApp PLN</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-slate-700 dark:bg-slate-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(KPI_DATA.l2.current, 100)}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-crm-secondary mt-2">
            Agente IA clasifica y cotiza automáticamente según los gustos del lead.
          </p>
        </div>

        {/* KPI L3 */}
        <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-4 shadow-soft transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                L3
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Integridad del Perfil</h2>
                <p className="text-[11px] text-slate-500 dark:text-crm-secondary">Completitud de los 5 bloques</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Meta {KPI_DATA.l3.target}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{KPI_DATA.l3.current}%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Perfil Válido</span>
            </div>
            <span className="text-[10px] text-slate-400">DNI + RUC + Pago</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-amber-600 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(KPI_DATA.l3.current, 100)}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-crm-secondary mt-2">
            Garantiza que la conciliación sea verificable contra fuentes bancarias o POS.
          </p>
        </div>

      </div>

      {/* AI Dynamic Closing Suggestion Banner */}
      <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-4 sm:p-5 shadow-soft relative overflow-hidden transition-colors">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-start gap-3.5 flex-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-mono">
                  Sugerencia IA de Cierre Comercial
                </span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2 py-0.2 rounded-full">
                  Alta Probabilidad
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                "{aiSuggestion.action}"
              </p>
              <p className="text-xs text-slate-600 dark:text-crm-secondary mt-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span><strong className="text-slate-700 dark:text-slate-300">Justificación Algorítmica:</strong> {aiSuggestion.reason}</span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 w-full lg:w-auto justify-end">
            <button
              onClick={() => onApplyAiSuggestion(aiSuggestion)}
              className="flex-1 lg:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Aplicar y Cotizar</span>
            </button>
            <button
              onClick={onOpenWhatsAppModal}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition"
              title="Ver mensaje en WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
