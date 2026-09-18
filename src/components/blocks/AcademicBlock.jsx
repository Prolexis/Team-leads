import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  XCircle, 
  School,
  Clock
} from 'lucide-react';

export const AcademicBlock = ({ currentLead, onOpenFollowUpModal }) => {
  const { academic } = currentLead;

  return (
    <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-colors">
      <div>
        {/* Header Block 3 */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-crm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Perfil Académico / Universidad</h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-semibold">Paso 5</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-crm-secondary">Convenios y Horarios de Clases</p>
            </div>
          </div>

          {/* Badge: Aplica vs No Aplica */}
          {academic.applies ? (
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Aplica UNT
            </span>
          ) : (
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <XCircle className="w-3 h-3 text-slate-400" /> No Aplica
            </span>
          )}
        </div>

        {/* Content depending on 'applies' */}
        {academic.applies ? (
          <div className="space-y-2.5">
            {/* Institution */}
            <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-crm-secondary">Casa Superior de Estudios</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{academic.institution}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                Convenio UNT
              </span>
            </div>

            {/* Career & Cycle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-crm-secondary mb-0.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Carrera</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{academic.career}</p>
              </div>

              <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-crm-secondary mb-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ciclo</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{academic.cycle}</p>
              </div>
            </div>

            {/* Student Discount Eligible Banner */}
            <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="text-[11px] font-bold text-slate-900 dark:text-white">Tarifa Promo Estudiante UNT</p>
                  <p className="text-[10px] text-slate-500 dark:text-crm-secondary">Código: {academic.studentCode}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded">
                Elegible
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-[#121520] border border-dashed border-slate-200 dark:border-crm-border rounded-xl p-6 text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Perfil Profesional / Corporativo</p>
              <p className="text-[11px] text-slate-500 dark:text-crm-secondary mt-0.5 max-w-xs mx-auto">
                Este lead no aplica a la categoría de convenios universitarios UNT. Gestionar tarifa de carta regular o corporativa.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Block Action */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-crm-border flex items-center justify-between">
        <span className="text-[10px] text-slate-500 dark:text-crm-secondary">Horarios Académicos</span>
        <button
          onClick={onOpenFollowUpModal}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:underline transition"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Consultar disponibilidad</span>
        </button>
      </div>

    </div>
  );
};
