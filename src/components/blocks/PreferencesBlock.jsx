import React from 'react';
import { 
  Flame, 
  UtensilsCrossed, 
  Wine, 
  Calendar, 
  Tag, 
  Receipt,
  CheckCircle2
} from 'lucide-react';

export const PreferencesBlock = ({ currentLead, onOpenQuoteModal }) => {
  const { preferences } = currentLead;

  const getDonenessColor = (level) => {
    if (level <= 35) return 'from-rose-500 to-red-600';
    if (level <= 60) return 'from-amber-500 to-amber-600';
    if (level <= 80) return 'from-amber-600 to-amber-700';
    return 'from-amber-700 to-stone-700';
  };

  return (
    <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-colors">
      <div>
        {/* Header Block 2 */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-crm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Gustos y Preferencias (PLN)</h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-semibold">Paso 1</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-crm-secondary">Capturado automáticamente vía WhatsApp</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
            PLN Activo
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          
          {/* Meat Doneness Meter */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-crm-secondary">
                <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Término de Cocción:</span>
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded">
                {preferences.cookingTerm}
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${getDonenessColor(preferences.cookingTermLevel)} h-full rounded-full transition-all duration-700`}
                style={{ width: `${preferences.cookingTermLevel}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 dark:text-crm-muted mt-1 font-mono">
              <span>Sellado (25%)</span>
              <span>Medio (50%)</span>
              <span>3/4 (75%)</span>
              <span>Bien Cocido (100%)</span>
            </div>
          </div>

          {/* Dish & Drink Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-crm-secondary mb-0.5">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Plato Preferido</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {preferences.favoriteDish}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-crm-secondary mb-0.5">
                <Wine className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Bebida Acompañante</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {preferences.favoriteDrink}
              </p>
            </div>
          </div>

          {/* Occasion & AI Notes */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-500 dark:text-crm-secondary flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Ocasión:
              </span>
              <span className="font-semibold text-slate-800 dark:text-white bg-slate-200/50 dark:bg-white/5 px-2 py-0.2 rounded text-[11px]">
                {preferences.occasion}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-crm-secondary mt-1 italic border-t border-slate-200 dark:border-crm-border/50 pt-1">
              "{preferences.aiNotes}"
            </p>
          </div>

          {/* PLN Confidence Tags */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-crm-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Entidades Extraídas por PLN
            </p>
            <div className="flex flex-wrap gap-1">
              {preferences.nlpTags.map((tagItem, idx) => (
                <span 
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                  <span>{tagItem.tag}</span>
                  <span className="text-[9px] text-slate-400">({tagItem.confidence})</span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Block Action */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-crm-border flex items-center justify-between">
        <span className="text-[10px] text-slate-500 dark:text-crm-secondary">Actividad 1: Cotización</span>
        <button
          onClick={onOpenQuoteModal}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline transition"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Cotizar según preferencias</span>
        </button>
      </div>

    </div>
  );
};
