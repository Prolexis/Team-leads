import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  Send, 
  CheckCircle,
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
        <div className="bg-crm-card/90 border border-crm-border rounded-2xl p-4 relative overflow-hidden shadow-lg hover:border-fire-gold/40 transition group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-fire-gold/5 rounded-full blur-xl group-hover:bg-fire-gold/10 transition"></div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-fire-bright/15 text-fire-bright flex items-center justify-center font-bold text-xs">
                L1
              </div>
              <div>
                <h2 className="text-xs font-bold text-white leading-tight">Conversión LEAD → PAYER</h2>
                <p className="text-[11px] text-crm-secondary">Ventana 24 horas</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-payer bg-payer/15 border border-payer/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Meta {KPI_DATA.l1.target}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-white tracking-tight">{KPI_DATA.l1.current}%</span>
              <span className="text-xs text-payer font-semibold">+8.4% vs meta</span>
            </div>
            <span className="text-[10px] text-crm-secondary">Cierres rápidos</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-crm-bg h-2 rounded-full mt-3 overflow-hidden p-0.5 border border-crm-border/50">
            <div 
              className="bg-gradient-to-r from-fire-gold to-payer h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(KPI_DATA.l1.current, 100)}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-crm-secondary mt-2">
            Sostenido por el bloqueo de cupos de 20 min y cotizaciones instantáneas.
          </p>
        </div>

        {/* KPI L2 */}
        <div className="bg-crm-card/90 border border-crm-border rounded-2xl p-4 relative overflow-hidden shadow-lg hover:border-fire-gold/40 transition group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-fire-bright/5 rounded-full blur-xl group-hover:bg-fire-bright/10 transition"></div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-fire-gold/15 text-fire-gold flex items-center justify-center font-bold text-xs">
                L2
              </div>
              <div>
                <h2 className="text-xs font-bold text-white leading-tight">Respuesta Útil Inmediata</h2>
                <p className="text-[11px] text-crm-secondary">Tiempo límite &lt; 5 min</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-payer bg-payer/15 border border-payer/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> Meta {KPI_DATA.l2.target}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-white tracking-tight">{KPI_DATA.l2.current}%</span>
              <span className="text-xs text-payer font-semibold">T. Promedio: {KPI_DATA.l2.avgTime}</span>
            </div>
            <span className="text-[10px] text-crm-secondary">WhatsApp PLN</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-crm-bg h-2 rounded-full mt-3 overflow-hidden p-0.5 border border-crm-border/50">
            <div 
              className="bg-gradient-to-r from-blue-500 to-fire-gold h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(KPI_DATA.l2.current, 100)}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-crm-secondary mt-2">
            Agente IA clasifica y cotiza automáticamente según los gustos del lead.
          </p>
        </div>

        {/* KPI L3 */}
        <div className="bg-crm-card/90 border border-crm-border rounded-2xl p-4 relative overflow-hidden shadow-lg hover:border-fire-gold/40 transition group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-payer/5 rounded-full blur-xl group-hover:bg-payer/10 transition"></div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-payer/15 text-payer flex items-center justify-center font-bold text-xs">
                L3
              </div>
              <div>
                <h2 className="text-xs font-bold text-white leading-tight">Integridad del Perfil</h2>
                <p className="text-[11px] text-crm-secondary">Completitud de los 5 bloques</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-payer bg-payer/15 border border-payer/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Meta {KPI_DATA.l3.target}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-white tracking-tight">{KPI_DATA.l3.current}%</span>
              <span className="text-xs text-payer font-semibold">Perfil Válido</span>
            </div>
            <span className="text-[10px] text-crm-secondary">DNI + RUC + Pago</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-crm-bg h-2 rounded-full mt-3 overflow-hidden p-0.5 border border-crm-border/50">
            <div 
              className="bg-gradient-to-r from-fire-bright to-payer h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(KPI_DATA.l3.current, 100)}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-crm-secondary mt-2">
            Garantiza que la conciliación sea verificable contra fuentes bancarias o POS.
          </p>
        </div>

      </div>

      {/* AI Dynamic Closing Suggestion Banner */}
      <div className="bg-gradient-to-r from-[#2a1b3d]/90 via-[#2d2d44] to-[#1f2839] border border-fire-gold/40 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-fire-gold/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-start gap-3.5 flex-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fire-gold to-fire-bright flex items-center justify-center shrink-0 shadow-md shadow-fire-bright/20 mt-0.5">
              <Sparkles className="w-5 h-5 text-crm-bg animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold text-fire-gold uppercase tracking-wider font-mono flex items-center gap-1">
                  Sugerencia IA de Cierre Comercial (PLN + Horarios)
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.2 rounded-full border border-emerald-500/30">
                  Alta Probabilidad
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                "{aiSuggestion.action}"
              </p>
              <p className="text-xs text-crm-secondary mt-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-fire-gold shrink-0" />
                <span><strong className="text-gray-300">Justificación Algorítmica:</strong> {aiSuggestion.reason}</span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 w-full lg:w-auto justify-end">
            <button
              onClick={() => onApplyAiSuggestion(aiSuggestion)}
              className="flex-1 lg:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-fire-bright to-fire-gold hover:from-fire-gold hover:to-fire-bright text-crm-bg shadow-lg shadow-fire-bright/25 hover:scale-105 active:scale-95 transition"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Aplicar y Cotizar</span>
            </button>
            <button
              onClick={onOpenWhatsAppModal}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-wsp/20 hover:bg-wsp/30 text-wsp-light border border-wsp/40 transition"
              title="Ver mensaje en WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
