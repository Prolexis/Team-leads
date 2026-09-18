import React from 'react';
import { 
  Flame, 
  User, 
  Briefcase, 
  MessageSquare, 
  BarChart3, 
  LayoutGrid, 
  Columns3, 
  Target
} from 'lucide-react';

export const SectionTabs = ({ 
  activeTab, 
  onSelectTab, 
  currentLead, 
  isFullView, 
  onToggleFullView,
  countdownMinutes,
  countdownSeconds 
}) => {
  const isPayer = currentLead.status === 'PAYER';
  const isBlocked = currentLead.status === 'PEDIDO_BLOQUEADO';

  const tabs = [
    {
      id: 'closure',
      label: 'Negociación y Cierre',
      icon: Target,
      badge: isPayer 
        ? 'PAYER' 
        : isBlocked 
          ? `${String(countdownMinutes).padStart(2, '0')}:${String(countdownSeconds).padStart(2, '0')}` 
          : 'Paso 1-4',
      badgeColor: isPayer 
        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' 
        : isBlocked 
          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 animate-pulse' 
          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    },
    {
      id: 'profile',
      label: 'Perfil y Gustos PLN',
      icon: User,
      badge: 'Bloques 1 y 2',
      badgeColor: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    },
    {
      id: 'work',
      label: 'Horarios y Factura RUC',
      icon: Briefcase,
      badge: currentLead.work.lunchWindow.split('-')[0].trim(),
      badgeColor: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    },
    {
      id: 'chat',
      label: 'WhatsApp en Vivo',
      icon: MessageSquare,
      badge: 'PLN',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
    },
    {
      id: 'kpis',
      label: 'Métricas y KPIs',
      icon: BarChart3,
      badge: 'L1 • L2 • L3',
      badgeColor: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    }
  ];

  return (
    <div className="bg-slate-100/90 dark:bg-[#131622]/90 border-b border-slate-200 dark:border-crm-border px-4 lg:px-8 py-2 sticky top-[65px] z-30 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id && !isFullView;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-crm-card text-slate-900 dark:text-white border border-slate-300 dark:border-amber-500/50 shadow-sm'
                    : 'text-slate-600 dark:text-crm-secondary hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-crm-secondary'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            onClick={onToggleFullView}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
              isFullView 
                ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-bold' 
                : 'bg-white dark:bg-crm-card text-slate-600 dark:text-crm-secondary hover:text-slate-900 dark:hover:text-white border-slate-300 dark:border-crm-border'
            }`}
          >
            {isFullView ? <Columns3 className="w-3 h-3" /> : <LayoutGrid className="w-3 h-3" />}
            <span>{isFullView ? 'Vista Secciones' : 'Ver Todo Junto'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
