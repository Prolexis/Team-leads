# CRM Parrilladas El Establo - Perfil de Negociación y Cierre (LEADS → PAYERS)

**Proyecto de Inteligencia de Negocios — Universidad Nacional de Trujillo (UNT)**  
Módulo web interactivo desarrollado en **React.js + Tailwind CSS + Lucide Icons** para la gestión del Perfil de Negociación y Cierre de Venta (Fase 2: Conversión de LEADS a PAYERS).

---

## 🥩 Características Principales

1. **Control Híbrido del Agente (Modo IA vs. Control Manual)**:
   - **Agente IA Activado**: Atención automática por IA con procesamiento de lenguaje natural (PLN), cotización inmediata y bloqueo de cupos.
   - **Control Manual por Vendedor**: Intervención humana exclusiva para negociaciones comerciales personalizadas.

2. **5 Actividades Clave de la Negociación Operativa**:
   - **Actividad 1: Cotización Inmediata** (Meta KPI L2: Respuesta útil $< 5\text{ min} \ge 90\%$).
   - **Actividad 2: Confirmación de Pedido y Bloqueo de Cupo** con temporizador regresivo de 20 minutos (Meta KPI L1: Conversión en 24h $\ge 50\%$).
   - **Actividad 3: Envío Automatizado de Datos de Pago** (Yape, Plin, POS, Transferencia).
   - **Actividad 4: Conciliación Estricta y Conversión a PAYER** contra fuente real (Registro App Yape/Plin Negocio o Caja POS, prohibido validar con capturas de chat) (Meta KPI L1 + KPI L3: Integridad $\ge 95\%$).
   - **Actividad 5: Seguimiento Inteligente Anti-Saturación** en la ventana horaria oficial de almuerzo.

3. **Arquitectura Modular por Secciones (Cero Saturación Visual)**:
   - 🎯 **Negociación y Cierre**: Cockpit ejecutivo enfocado en la conversión rápida.
   - 👤 **Perfil y Gustos PLN**: Bloque 1 (Personales y Cobertura Trujillo) + Bloque 2 (Gustos, término de carne con medidor visual y etiquetas PLN).
   - 🏢 **Horarios y Factura RUC**: Bloque 3 (Académico UNT o "No Aplica") + Bloque 4 (Empresa, receso de almuerzo y RUC).
   - 💬 **WhatsApp en Vivo**: Chat interactivo con plantillas de cotización y datos de pago.
   - 📊 **Métricas y KPIs**: Tablero gerencial con indicadores L1, L2 y L3 de auditoría UNT.
   - Botón opcional **"Ver Todo Junto"** para supervisión completa.

4. **Modo Claro (Light Mode) & Modo Oscuro (Dark Mode)**:
   - Interruptor dinámico de **Sol / Luna** en la barra superior.
   - Paleta sobria basada en tonos pizarra (Slate) con acento cálido ámbar/fuego suave y verde esmeralda para transacciones confirmadas.

---

## 🚀 Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5173/`.

### Compilación de Producción
```bash
npm run build
```

---

## 🛠️ Stack Tecnológico
- **Framework**: React.js 18
- **Bundler**: Vite
- **Estilos**: Tailwind CSS (Dark/Light mode via clases)
- **Iconografía**: Lucide React
- **Efectos**: Canvas Confetti
