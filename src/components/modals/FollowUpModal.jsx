import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  BellRing, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  GraduationCap, 
  Sparkles,
  ShieldCheck,
  Send
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
    `Hola ${currentLead.name.split(' ')[0]} 🔥, te escribimos de Parrilladas El Establo. Tenemos listo tu pedido preferido (${currentLead.preferences.favoriteDish.split('+')[0]}) para que llegue al inicio de tu hora de almuerzo (${currentLead.work.lunchWindow.split('-')[0].trim()}). ¿Confirmamos el envío?`
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
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-crm-card border border-crm-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-crm-border flex items-center justify-between bg-crm-bg/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Seguimiento Horario Inteligente</h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">
                  Paso 5
                </span>
              </div>
              <p className="text-xs text-crm-secondary">
                Lead: <strong className="text-white">{currentLead.name}</strong> • Cero Saturación
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

        {/* Content */}
        <div className="p-5 space-y-4">
          
          {/* Work / Academic Window Summary */}
          <div className="bg-crm-bg/90 border border-crm-border rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-crm-secondary flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Empresa:</span>
              </span>
              <span className="text-xs font-bold text-white">{currentLead.work.company} ({currentLead.work.position})</span>
            </div>

            <div className="flex items-center justify-between border-t border-crm-border/50 pt-2">
              <span className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Ventana de Almuerzo:</span>
              </span>
              <span className="text-xs font-mono font-extrabold text-white bg-amber-500/20 px-2 py-0.5 rounded">
                {currentLead.work.lunchWindow}
              </span>
            </div>

            {currentLead.academic.applies && (
              <div className="flex items-center justify-between border-t border-crm-border/50 pt-2 text-[11px]">
                <span className="text-purple-300 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> UNT:
                </span>
                <span className="text-gray-300">{currentLead.academic.career} ({currentLead.academic.cycle})</span>
              </div>
            )}
          </div>

          {/* Business Rule Reminder */}
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-gray-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-purple-300">Regla Anti-Spam (Seguimiento Inteligente):</strong> Programar los recordatorios estrictamente 10 a 15 minutos antes de la hora de almuerzo del cliente. No interrumpir durante reuniones ni en horario laboral no habilitado.
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className="text-xs font-bold text-crm-secondary uppercase tracking-wider block mb-1.5">
              Hora Programada para Recordatorio Automático
            </label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full bg-crm-bg border border-crm-border rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
            />
            <p className="text-[10px] text-crm-secondary mt-1">
              Recomendado por IA: <strong className="text-amber-300">{currentLead.work.bestFollowUpWindow}</strong>
            </p>
          </div>

          {/* Reminder Message */}
          <div>
            <label className="text-xs font-bold text-crm-secondary uppercase tracking-wider block mb-1.5">
              Mensaje WhatsApp que se enviará
            </label>
            <textarea
              rows={3}
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              className="w-full bg-crm-bg border border-crm-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
            />
          </div>

          {isScheduled && (
            <div className="p-3 rounded-xl bg-payer/20 border border-payer/40 text-payer text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>¡Recordatorio programado con éxito para las {scheduledTime}!</span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-crm-border bg-crm-bg/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-crm-secondary hover:text-white hover:bg-white/5 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleConfirmSchedule}
            disabled={isScheduled}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-fire-gold hover:from-amber-400 hover:to-fire-bright text-crm-bg shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition disabled:opacity-50"
          >
            <BellRing className="w-4 h-4" />
            <span>Confirmar Programación (Paso 5)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
