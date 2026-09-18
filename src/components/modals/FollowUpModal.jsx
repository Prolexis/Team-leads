import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  BellRing, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  ShieldCheck
} from 'lucide-react';

export const FollowUpModal = ({ 
  isOpen, 
  onClose, 
  currentLead, 
  onScheduleReminder 
}) => {
  if (!isOpen) return null;

  const [scheduledTime, setScheduledTime] = useState(
    currentLead.id === 'lead-1' ? '12:45' : '13:15'
  );
  const [reminderNote, setReminderNote] = useState(
    `Hola ${currentLead.name.split(' ')[0]} 🥩, te escribimos de Parrilladas El Establo. Tenemos listo tu pedido preferido (${currentLead.preferences.favoriteDish.split('+')[0]}) para que llegue al inicio de tu receso de almuerzo (${currentLead.work.lunchWindow.split('-')[0].trim()}). ¿Confirmamos el envío?`
  );
  const [isScheduled, setIsScheduled] = useState(false);

  const handleConfirmSchedule = () => {
    setIsScheduled(true);
    setTimeout(() => {
      onScheduleReminder({
        time: scheduledTime,
        note: reminderNote
      });
      setIsScheduled(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-crm-border flex items-center justify-between bg-slate-50 dark:bg-[#121520]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Seguimiento Horario Inteligente</h2>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-2 py-0.5 rounded">
                  Paso 5
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-crm-secondary">
                Lead: <strong className="text-slate-900 dark:text-white">{currentLead.name}</strong> • Cero Saturación
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

        {/* Content */}
        <div className="p-5 space-y-3.5">
          
          {/* Work / Academic Window Summary */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-crm-secondary flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Empresa:</span>
              </span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">{currentLead.work.company}</span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 dark:border-crm-border/50 pt-2">
              <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Ventana de Almuerzo:</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {currentLead.work.lunchWindow}
              </span>
            </div>

            {currentLead.academic.applies && (
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-crm-border/50 pt-2 text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> UNT:
                </span>
                <span className="text-slate-700 dark:text-slate-300">{currentLead.academic.career} ({currentLead.academic.cycle})</span>
              </div>
            )}
          </div>

          {/* Business Rule Reminder */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Política Anti-Saturación:</strong> Contactar 10 a 15 minutos antes de la hora de almuerzo. No interrumpir al cliente durante horas laborales activas.
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-crm-secondary uppercase tracking-wider block mb-1">
              Hora Programada para el Recordatorio
            </label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#121520] border border-slate-300 dark:border-crm-border rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
            />
            <p className="text-[10px] text-slate-500 dark:text-crm-secondary mt-1">
              Recomendado por IA: <strong className="text-amber-700 dark:text-amber-400">{currentLead.work.bestFollowUpWindow}</strong>
            </p>
          </div>

          {/* Reminder Message */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-crm-secondary uppercase tracking-wider block mb-1">
              Mensaje WhatsApp Automatizado
            </label>
            <textarea
              rows={3}
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#121520] border border-slate-300 dark:border-crm-border rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
            />
          </div>

          {isScheduled && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>¡Recordatorio agendado para las {scheduledTime}!</span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-crm-border bg-slate-50 dark:bg-[#121520] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-crm-secondary hover:text-slate-900 dark:hover:text-white transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleConfirmSchedule}
            disabled={isScheduled}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition disabled:opacity-50"
          >
            <BellRing className="w-4 h-4" />
            <span>Confirmar Programación (Paso 5)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
