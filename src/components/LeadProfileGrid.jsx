import React from 'react';
import { PersonalBlock } from './blocks/PersonalBlock';
import { PreferencesBlock } from './blocks/PreferencesBlock';
import { AcademicBlock } from './blocks/AcademicBlock';
import { WorkBlock } from './blocks/WorkBlock';
import { OperationalBlock } from './blocks/OperationalBlock';

export const LeadProfileGrid = ({ 
  currentLead, 
  onOpenQuoteModal, 
  onOpenPaymentModal, 
  onOpenWhatsAppModal,
  onOpenFollowUpModal,
  countdownMinutes,
  countdownSeconds
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
      {/* Bloque 1: Datos Personales y Cobertura */}
      <PersonalBlock 
        currentLead={currentLead} 
        onOpenQuoteModal={onOpenQuoteModal} 
      />

      {/* Bloque 2: Gustos y Preferencias PLN */}
      <PreferencesBlock 
        currentLead={currentLead} 
        onOpenQuoteModal={onOpenQuoteModal} 
      />

      {/* Bloque 3: Datos de Estudiante */}
      <AcademicBlock 
        currentLead={currentLead} 
        onOpenFollowUpModal={onOpenFollowUpModal} 
      />

      {/* Bloque 4: Datos Laborales y Horarios */}
      <WorkBlock 
        currentLead={currentLead} 
        onOpenFollowUpModal={onOpenFollowUpModal} 
      />

      {/* Bloque 5: Historial Operativo, Canal Preferente y Regla de Conciliación (Spans 2 columns) */}
      <OperationalBlock 
        currentLead={currentLead} 
        onOpenPaymentModal={onOpenPaymentModal} 
        onOpenWhatsAppModal={onOpenWhatsAppModal}
        countdownMinutes={countdownMinutes}
        countdownSeconds={countdownSeconds}
      />
    </div>
  );
};
