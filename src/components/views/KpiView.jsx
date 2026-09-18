import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react';
import { KPI_DATA } from '../../types/crmData';

export const KpiView = () => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="bg-slate-50 dark:bg-crm-card/60 border border-slate-200 dark:border-crm-border/70 rounded-xl p-3.5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Tablero de Indicadores y Metas Operativas (Fase 2)</h2>
          <p className="text-xs text-slate-500 dark:text-crm-secondary">Métricas exigidas para el proyecto de Inteligencia de Negocios UNT.</p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          Auditoría UNT
        </span>
      </div>

      {/* 3 Main KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* KPI L1 */}
        <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs">
              L1
            </span>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
              Meta {KPI_DATA.l1.target}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{KPI_DATA.l1.title}</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{KPI_DATA.l1.current}%</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">+8.4% vs meta</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '58.4%' }}></div>
          </div>
          <p className="text-xs text-slate-500 dark:text-crm-secondary mt-2.5">
            Sostenida por la confirmación y el bloqueo de cupo por 20 minutos (Paso 2).
          </p>
        </div>

        {/* KPI L2 */}
        <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs">
              L2
            </span>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
              Meta {KPI_DATA.l2.target}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{KPI_DATA.l2.title}</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{KPI_DATA.l2.current}%</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">T. Promedio: {KPI_DATA.l2.avgTime}</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-slate-700 dark:bg-slate-400 h-full rounded-full" style={{ width: '94.6%' }}></div>
          </div>
          <p className="text-xs text-slate-500 dark:text-crm-secondary mt-2.5">
            Sostenida por la cotización instantánea basada en el Bloque 2 de gustos y PLN (Paso 1).
          </p>
        </div>

        {/* KPI L3 */}
        <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs">
              L3
            </span>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
              Meta {KPI_DATA.l3.target}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{KPI_DATA.l3.title}</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{KPI_DATA.l3.current}%</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">Perfil Completo</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-600 h-full rounded-full" style={{ width: '98.2%' }}></div>
          </div>
          <p className="text-xs text-slate-500 dark:text-crm-secondary mt-2.5">
            Sostenida por la conciliación contra fuente real (Yape Negocio / POS) y captura integral (Paso 4).
          </p>
        </div>

      </div>

      {/* Audit Rules Table */}
      <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm transition-colors">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-slate-500" /> Reglas Operativas Validadas por el Sistema
        </h3>
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3 bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/60 rounded-xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Prohibición de Validar con Capturas de WhatsApp:</strong> Los pagos solo pueden marcarse como conciliados si coinciden con el reporte real de Yape/Plin Negocio o Caja POS, previniendo fraudes o comprobantes falsos.
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/60 rounded-xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Tiempo de Bloqueo de Cupo (20 min):</strong> Permite proteger la disponibilidad en cocina para los clientes que están en proceso de pago sin perjudicar la rotación de pedidos.
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/60 rounded-xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Seguimiento Horario Anti-Saturación:</strong> Prohíbe insistir al cliente fuera de su ventana de almuerzo laboral (1:00 PM - 2:00 PM o 1:30 PM - 2:30 PM).
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
