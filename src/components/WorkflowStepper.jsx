import React from 'react';
import { 
  Receipt, 
  Lock, 
  Send, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Info
} from 'lucide-react';

export const WorkflowStepper = ({ 
  currentLead, 
  activeStep, 
  onSelectStep, 
  onOpenQuoteModal, 
  onOpenPaymentModal,
  onOpenWhatsAppModal,
  onOpenFollowUpModal
}) => {
  const isPayer = currentLead.status === 'PAYER';
  const isBlocked = currentLead.status === 'PEDIDO_BLOQUEADO';

  const steps = [
    {
      id: 1,
      name: "1. Cotización Vigente",
      short: "Cotización",
      block: "Bloque 2: Gustos",
      desc: "Respuesta < 5 min según corte preferido",
      kpi: "KPI L2",
      icon: Receipt,
      action: () => onOpenQuoteModal(),
      status: isPayer || isBlocked ? "completed" : "active"
    },
    {
      id: 2,
      name: "2. Bloquear Cupo (20m)",
      short: "Bloquear Cupo",
      block: "Bloque 1: Cobertura",
      desc: "Reserva de 20 min en cocina",
      kpi: "KPI L1",
      icon: Lock,
      action: () => onOpenQuoteModal(),
      status: isPayer ? "completed" : isBlocked ? "in-progress" : "pending"
    },
    {
      id: 3,
      name: "3. Enviar Datos de Pago",
      short: "Datos de Pago",
      block: "Bloque 5: Pago",
      desc: `Instrucciones (${currentLead.operational.preferredPaymentMethod})`,
      kpi: "Auto",
      icon: Send,
      action: () => onOpenWhatsAppModal(),
      status: isPayer ? "completed" : isBlocked ? "active" : "pending"
    },
    {
      id: 4,
      name: "4. Conciliación PAYER",
      short: "Pase a PAYER",
      block: "Bloque 5: Fuente Real",
      desc: "Validación estricta Yape/POS",
      kpi: "KPI L3",
      icon: CheckCircle2,
      action: () => onOpenPaymentModal(),
      status: isPayer ? "completed" : "pending"
    },
    {
      id: 5,
      name: "5. Seguimiento Horario",
      short: "Seguimiento",
      block: "Bloque 4: Almuerzo",
      desc: `Ventana: ${currentLead.work.lunchWindow}`,
      kpi: "Anti-Spam",
      icon: Clock,
      action: () => onOpenFollowUpModal(),
      status: isPayer ? "completed" : "optional"
    }
  ];

  return (
    <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-4 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-crm-border/70">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Flujo de Negociación (5 Actividades Operativas)
          </span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-crm-secondary flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          Haz clic en cada paso para abrir su acción
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCurrentActive = activeStep === step.id;

          let badgeStyle = "bg-slate-50 dark:bg-[#121520] border-slate-200 dark:border-crm-border text-slate-700 dark:text-slate-300";
          let iconStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";

          if (step.status === "completed") {
            badgeStyle = "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300";
            iconStyle = "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400";
          } else if (step.status === "in-progress") {
            badgeStyle = "bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 animate-pulse";
            iconStyle = "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400";
          } else if (step.status === "active") {
            badgeStyle = "bg-white dark:bg-crm-card border-amber-500 dark:border-amber-500 text-slate-900 dark:text-white shadow-sm";
            iconStyle = "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400";
          }

          return (
            <button
              key={step.id}
              onClick={() => {
                onSelectStep(step.id);
                step.action();
              }}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between group hover:border-slate-400 dark:hover:border-slate-600 ${badgeStyle} ${
                isCurrentActive ? 'ring-1 ring-amber-500 shadow-sm' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-1.5 mb-1.5">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${iconStyle}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-slate-800 font-bold">
                  {step.kpi}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  {step.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-crm-secondary mt-0.5 line-clamp-1">
                  {step.desc}
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-200 dark:border-crm-border flex items-center justify-between text-[9px] font-semibold text-slate-500 dark:text-crm-secondary">
                <span>{step.status === 'completed' ? 'Listo ✓' : step.status === 'in-progress' ? '20m Activo' : 'Accionar'}</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
