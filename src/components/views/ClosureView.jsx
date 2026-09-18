import React from 'react';
import { WorkflowStepper } from '../WorkflowStepper';
import { OperationalBlock } from '../blocks/OperationalBlock';
import { 
  Sparkles, 
  ArrowUpRight, 
  Send, 
  AlertCircle 
} from 'lucide-react';

export const ClosureView = ({ 
  currentLead, 
  onApplyAiSuggestion, 
  onOpenQuoteModal, 
  onOpenPaymentModal, 
  onOpenWhatsAppModal,
  onOpenFollowUpModal,
  countdownMinutes,
  countdownSeconds,
  onSelectTab
}) => {
  const { aiSuggestion } = currentLead;

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      
      {/* AI Suggestion Banner: Sober & Elegant */}
      <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden transition-colors">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-start gap-3.5 flex-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-mono">
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

          <div className="flex items-center gap-2.5 shrink-0 w-full lg:w-auto justify-end">
            <button
              onClick={() => onApplyAiSuggestion(aiSuggestion)}
              className="flex-1 lg:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Aplicar y Cotizar</span>
            </button>
            <button
              onClick={onOpenWhatsAppModal}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition"
              title="Abrir WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>

        </div>
      </div>

      {/* Quick Summary Bar */}
      <div className="bg-slate-50 dark:bg-crm-card/60 border border-slate-200 dark:border-crm-border rounded-xl px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-crm-secondary">Gusto PLN:</span>
          <span className="font-semibold text-slate-900 dark:text-white">{currentLead.preferences.favoriteDish} ({currentLead.preferences.cookingTerm})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-crm-secondary">Almuerzo:</span>
          <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">{currentLead.work.lunchWindow}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-crm-secondary">Pago Preferente:</span>
          <span className="font-mono text-slate-900 dark:text-white font-bold">{currentLead.operational.preferredPaymentMethod}</span>
        </div>
        <button
          onClick={() => onSelectTab('profile')}
          className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold"
        >
          Ver Perfil Completo →
        </button>
      </div>

      {/* 5 Activities Stepper */}
      <WorkflowStepper 
        currentLead={currentLead}
        activeStep={1}
        onSelectStep={() => {}}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenPaymentModal={onOpenPaymentModal}
        onOpenWhatsAppModal={onOpenWhatsAppModal}
        onOpenFollowUpModal={onOpenFollowUpModal}
      />

      {/* Operational Block (Block 5) */}
      <div className="grid grid-cols-1 gap-4">
        <OperationalBlock 
          currentLead={currentLead} 
          onOpenPaymentModal={onOpenPaymentModal} 
          onOpenWhatsAppModal={onOpenWhatsAppModal}
          countdownMinutes={countdownMinutes}
          countdownSeconds={countdownSeconds}
        />
      </div>

    </div>
  );
};
