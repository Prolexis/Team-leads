import React, { useState } from 'react';
import { 
  Phone, 
  CreditCard, 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  Navigation, 
  ShieldCheck,
  Lock
} from 'lucide-react';

export const PersonalBlock = ({ currentLead, onOpenQuoteModal }) => {
  const { personal } = currentLead;
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-crm-card border border-slate-200 dark:border-crm-border rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-colors">
      <div>
        {/* Header Block 1 */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-crm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Datos Personales y Ubicación</h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-semibold">Paso 2</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-crm-secondary">Cobertura Delivery Trujillo</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Validado
          </span>
        </div>

        {/* Details Grid */}
        <div className="space-y-2.5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Phone */}
            <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-crm-secondary">WhatsApp / Teléfono</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">{personal.phone}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(personal.phone, 'phone')}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded transition"
                title="Copiar teléfono"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* DNI */}
            <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-crm-secondary">Documento (DNI)</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">{personal.dni}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(personal.dni, 'dni')}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded transition"
                title="Copiar DNI"
              >
                {copiedField === 'dni' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Mail className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 dark:text-crm-secondary">Correo Electrónico</p>
                <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{personal.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personal.email, 'email')}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded transition"
              title="Copiar Email"
            >
              {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Address & Zone */}
          <div className="bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-crm-border/70 rounded-xl p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-crm-secondary">Dirección de Entrega</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{personal.address}</p>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">{personal.district}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(personal.address, 'address')}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded transition shrink-0"
                title="Copiar Dirección"
              >
                {copiedField === 'address' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Coverage status banner */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-lg p-2 flex items-center justify-between text-[11px]">
              <span className="text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                <Navigation className="w-3 h-3" />
                {personal.coverageZone}
              </span>
              <span className="text-slate-500 dark:text-crm-secondary font-mono text-[10px]">
                {personal.distanceKm}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Block Action */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-crm-border flex items-center justify-between">
        <span className="text-[10px] text-slate-500 dark:text-crm-secondary">Actividad 2: Bloqueo de Cupo</span>
        <button
          onClick={onOpenQuoteModal}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline transition"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Bloquear Cupo (20 min)</span>
        </button>
      </div>

    </div>
  );
};
