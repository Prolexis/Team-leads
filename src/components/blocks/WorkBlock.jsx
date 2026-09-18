import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  FileText, 
  Building2, 
  Copy, 
  Check, 
  BellRing
} from 'lucide-react';

export const WorkBlock = ({ currentLead, onOpenFollowUpModal }) => {
  const { work } = currentLead;
  const [copiedRuc, setCopiedRuc] = useState(false);

  const handleCopyRuc = () => {
    if (!work.ruc) return;
    navigator.clipboard.writeText(work.ruc);
    setCopiedRuc(true);
    setTimeout(() => setCopiedRuc(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-colors">
      <div>
        {/* Header Block 4 */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-crm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Datos Laborales y Horarios</h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-semibold">Paso 5</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-crm-secondary">Ventana de descanso y datos de facturación</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-slate-500" /> Corporativo
          </span>
        </div>

        {/* Content */}
        <div className="space-y-2.5">
          
          {/* Company & Position */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-crm-secondary">Empresa</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{work.company}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Cargo: {work.position}</p>
                </div>
              </div>
              <span className="text-[9px] font-semibold bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                Activo
              </span>
            </div>
          </div>

          {/* Lunch Window */}
          <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Ventana de Almuerzo Oficial
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono bg-white dark:bg-crm-card px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                {work.lunchWindow}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-crm-secondary mt-1">
              <span>Momento óptimo de contacto:</span> <strong className="text-slate-800 dark:text-white">{work.bestFollowUpWindow}</strong>
            </p>
          </div>

          {/* Invoice / RUC */}
          {work.requiresInvoice && (
            <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 dark:text-crm-secondary">Factura RUC Electrónica</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">{work.ruc}</p>
                  <p className="text-[9px] text-slate-500 dark:text-crm-muted truncate max-w-[210px]">{work.businessName}</p>
                </div>
              </div>
              <button
                onClick={handleCopyRuc}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded transition shrink-0"
                title="Copiar RUC"
              >
                {copiedRuc ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Block Action */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-crm-border flex items-center justify-between">
        <span className="text-[10px] text-slate-500 dark:text-crm-secondary">Actividad 5: Anti-Saturación</span>
        <button
          onClick={onOpenFollowUpModal}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline transition"
        >
          <BellRing className="w-3.5 h-3.5" />
          <span>Programar Recordatorio</span>
        </button>
      </div>

    </div>
  );
};
