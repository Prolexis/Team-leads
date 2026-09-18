import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SectionTabs } from './components/SectionTabs';
import { ClosureView } from './components/views/ClosureView';
import { ProfileView } from './components/views/ProfileView';
import { WorkView } from './components/views/WorkView';
import { ChatView } from './components/views/ChatView';
import { KpiView } from './components/views/KpiView';
import { LeadProfileGrid } from './components/LeadProfileGrid';
import { KpiPanel } from './components/KpiPanel';
import { WorkflowStepper } from './components/WorkflowStepper';
import { QuoteModal } from './components/modals/QuoteModal';
import { ReconciliationModal } from './components/modals/ReconciliationModal';
import { WhatsAppModal } from './components/modals/WhatsAppModal';
import { FollowUpModal } from './components/modals/FollowUpModal';
import { INITIAL_LEADS } from './types/crmData';
import { 
  CheckCircle2, 
  Clock, 
  Flame, 
  Sparkles 
} from 'lucide-react';

export default function App() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [currentLeadId, setCurrentLeadId] = useState('lead-1');
  const [isAiActive, setIsAiActive] = useState(true);
  const [activeTab, setActiveTab] = useState('closure');
  const [isFullView, setIsFullView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Modo Claro por defecto según pedido, con toggle instantáneo

  // Modals state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, subtitle, type = 'success') => {
    setToastMessage({ title, subtitle, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const currentLead = leads.find((l) => l.id === currentLeadId) || leads[0];

  // Sync Dark/Light class with <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 20-Minute Countdown Timer for PEDIDO_BLOQUEADO
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setLeads((prevLeads) =>
        prevLeads.map((lead) => {
          if (lead.status === 'PEDIDO_BLOQUEADO' && lead.lockTimerSeconds > 0) {
            return {
              ...lead,
              lockTimerSeconds: lead.lockTimerSeconds - 1
            };
          }
          if (lead.status === 'PEDIDO_BLOQUEADO' && lead.lockTimerSeconds === 0) {
            return {
              ...lead,
              status: 'LEAD_ACTIVO'
            };
          }
          return lead;
        })
      );
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const countdownMinutes = Math.floor(currentLead.lockTimerSeconds / 60);
  const countdownSeconds = currentLead.lockTimerSeconds % 60;

  // Toggle AI Agent vs Manual Seller
  const handleToggleAi = () => {
    setIsAiActive(!isAiActive);
    if (!isAiActive) {
      showToast(
        'Agente IA Activado',
        'Atención Automática por IA: Respuestas automáticas con PLN y cotización inmediata.',
        'ai'
      );
    } else {
      showToast(
        'Control Manual por Vendedor',
        'El trabajador toma el control exclusivo del chat para negociar manualmente.',
        'manual'
      );
    }
  };

  // Quotation & 20 min reservation lock
  const handleSaveQuoteAndLock = (orderData) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === currentLead.id
          ? {
              ...lead,
              status: 'PEDIDO_BLOQUEADO',
              lockTimerSeconds: 1200, // 20 min
              activeOrder: {
                ...lead.activeOrder,
                ...orderData,
                lockedAt: new Date().toLocaleTimeString()
              }
            }
          : lead
      )
    );
    showToast(
      '¡Cupo Bloqueado en Cocina (20 min)!',
      `Se reservó el corte para ${currentLead.name}. Estado: PEDIDO_BLOQUEADO.`,
      'success'
    );
  };

  // Confirm Real Source Reconciliation & Convert to PAYER
  const handleConfirmPayerConversion = (reconciliationDetails) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === currentLead.id
          ? {
              ...lead,
              status: 'PAYER',
              lockTimerSeconds: 0,
              activeOrder: {
                ...lead.activeOrder,
                reconciliationDetails
              }
            }
          : lead
      )
    );
    showToast(
      '¡LEAD Convertido a PAYER Exitosamente! 🎉',
      `Validado contra ${reconciliationDetails.realSource}. Ref: ${reconciliationDetails.operationCode}`,
      'payer'
    );
  };

  // Reset Lead Status (Helper for demo flow testing)
  const handleResetLeadStatus = () => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === currentLead.id
          ? {
              ...lead,
              status: 'LEAD_ACTIVO',
              lockTimerSeconds: 0,
              activeOrder: {
                ...lead.activeOrder,
                reconciliationDetails: null
              }
            }
          : lead
      )
    );
    showToast(
      'Estado Reiniciado',
      `El lead ${currentLead.name} vuelve a estar en LEAD_ACTIVO.`,
      'info'
    );
  };

  // Apply AI Suggestion directly
  const handleApplyAiSuggestion = (suggestion) => {
    setIsQuoteOpen(true);
    showToast(
      'Sugerencia IA Aplicada al Cotizador',
      `Recomendando corte ${suggestion.recommendedDishName} adaptado al horario.`,
      'ai'
    );
  };

  // Schedule follow-up reminder
  const handleScheduleReminder = ({ time }) => {
    showToast(
      'Recordatorio Programado (Paso 5)',
      `Mensaje agendado para las ${time} respetando el horario de descanso.`,
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f111a] text-slate-900 dark:text-crm-text flex flex-col transition-colors duration-200">
      
      {/* Header */}
      <Header 
        currentLead={currentLead}
        leads={leads}
        onSelectLead={setCurrentLeadId}
        isAiActive={isAiActive}
        onToggleAi={handleToggleAi}
        onOpenQuoteModal={() => setIsQuoteOpen(true)}
        onOpenPaymentModal={() => setIsPaymentOpen(true)}
        onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
        onResetLeadStatus={handleResetLeadStatus}
        countdownMinutes={countdownMinutes}
        countdownSeconds={countdownSeconds}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Navigation Tabs Bar (Sectioned Navigation) */}
      <SectionTabs 
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentLead={currentLead}
        isFullView={isFullView}
        onToggleFullView={() => setIsFullView(!isFullView)}
        countdownMinutes={countdownMinutes}
        countdownSeconds={countdownSeconds}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-5">
        
        {isFullView ? (
          /* Full View */
          <div className="space-y-6">
            <KpiPanel 
              currentLead={currentLead}
              onApplyAiSuggestion={handleApplyAiSuggestion}
              onOpenQuoteModal={() => setIsQuoteOpen(true)}
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
            />
            <WorkflowStepper 
              currentLead={currentLead}
              activeStep={1}
              onSelectStep={() => {}}
              onOpenQuoteModal={() => setIsQuoteOpen(true)}
              onOpenPaymentModal={() => setIsPaymentOpen(true)}
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
              onOpenFollowUpModal={() => setIsFollowUpOpen(true)}
            />
            <LeadProfileGrid 
              currentLead={currentLead}
              onOpenQuoteModal={() => setIsQuoteOpen(true)}
              onOpenPaymentModal={() => setIsPaymentOpen(true)}
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
              onOpenFollowUpModal={() => setIsFollowUpOpen(true)}
              countdownMinutes={countdownMinutes}
              countdownSeconds={countdownSeconds}
            />
          </div>
        ) : (
          /* Modular Sectioned Views (Clean & Focused) */
          <div>
            {activeTab === 'closure' && (
              <ClosureView 
                currentLead={currentLead}
                onApplyAiSuggestion={handleApplyAiSuggestion}
                onOpenQuoteModal={() => setIsQuoteOpen(true)}
                onOpenPaymentModal={() => setIsPaymentOpen(true)}
                onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
                onOpenFollowUpModal={() => setIsFollowUpOpen(true)}
                countdownMinutes={countdownMinutes}
                countdownSeconds={countdownSeconds}
                onSelectTab={setActiveTab}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView 
                currentLead={currentLead}
                onOpenQuoteModal={() => setIsQuoteOpen(true)}
              />
            )}

            {activeTab === 'work' && (
              <WorkView 
                currentLead={currentLead}
                onOpenFollowUpModal={() => setIsFollowUpOpen(true)}
              />
            )}

            {activeTab === 'chat' && (
              <ChatView 
                currentLead={currentLead}
                isAiActive={isAiActive}
                onToggleAi={handleToggleAi}
                onOpenQuoteModal={() => setIsQuoteOpen(true)}
                onOpenPaymentModal={() => setIsPaymentOpen(true)}
              />
            )}

            {activeTab === 'kpis' && (
              <KpiView />
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-crm-border bg-white dark:bg-[#141424] py-4 px-4 lg:px-8 text-xs text-slate-500 dark:text-crm-secondary mt-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="font-bold text-slate-900 dark:text-white">Parrilladas El Establo</span>
            <span>•</span>
            <span>Perfil de Negociación y Cierre (UNT BI)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Modo Híbrido IA/Humano</span>
            <span className="text-amber-700 dark:text-amber-400 font-mono">• {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'} Activo</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <QuoteModal 
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        currentLead={currentLead}
        onSaveQuoteAndLock={handleSaveQuoteAndLock}
        countdownMinutes={countdownMinutes}
        countdownSeconds={countdownSeconds}
      />

      <ReconciliationModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        currentLead={currentLead}
        onConfirmPayerConversion={handleConfirmPayerConversion}
      />

      <WhatsAppModal 
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        currentLead={currentLead}
        isAiActive={isAiActive}
        onToggleAi={handleToggleAi}
        onOpenQuoteModal={() => {
          setIsWhatsAppOpen(false);
          setIsQuoteOpen(true);
        }}
        onOpenPaymentModal={() => {
          setIsWhatsAppOpen(false);
          setIsPaymentOpen(true);
        }}
      />

      <FollowUpModal 
        isOpen={isFollowUpOpen}
        onClose={() => setIsFollowUpOpen(false)}
        currentLead={currentLead}
        onScheduleReminder={handleScheduleReminder}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm">
          <div className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 backdrop-blur-md ${
            toastMessage.type === 'payer' 
              ? 'bg-emerald-600 text-white border-emerald-500' 
              : toastMessage.type === 'ai' 
                ? 'bg-amber-600 text-white border-amber-500 font-medium' 
                : toastMessage.type === 'manual' 
                  ? 'bg-slate-800 text-white border-slate-700' 
                  : 'bg-white dark:bg-crm-card text-slate-900 dark:text-white border-slate-200 dark:border-crm-border'
          }`}>
            <div className="p-1 rounded-lg bg-black/10 shrink-0 mt-0.5">
              {toastMessage.type === 'payer' ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : toastMessage.type === 'ai' ? (
                <Sparkles className="w-5 h-5 text-white" />
              ) : (
                <Clock className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold leading-snug">{toastMessage.title}</h4>
              <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">{toastMessage.subtitle}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
