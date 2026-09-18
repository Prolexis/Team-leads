import React from 'react';
import { AcademicBlock } from '../blocks/AcademicBlock';
import { WorkBlock } from '../blocks/WorkBlock';

export const WorkView = ({ currentLead, onOpenFollowUpModal }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="bg-slate-50 dark:bg-crm-card/60 border border-slate-200 dark:border-crm-border/70 rounded-xl p-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Entorno Laboral, Académico y Ventana de Descanso</h2>
          <p className="text-xs text-slate-500 dark:text-crm-secondary">Parámetros para programar el seguimiento (Paso 5) sin saturación.</p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          Bloques 3 y 4
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AcademicBlock 
          currentLead={currentLead} 
          onOpenFollowUpModal={onOpenFollowUpModal} 
        />
        <WorkBlock 
          currentLead={currentLead} 
          onOpenFollowUpModal={onOpenFollowUpModal} 
        />
      </div>
    </div>
  );
};
