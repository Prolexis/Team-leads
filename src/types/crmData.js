export const INITIAL_LEADS = [
  {
    id: "lead-1",
    name: "Diego Alonso Salinas Vargas",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "LEAD_ACTIVO", // LEAD_ACTIVO | PEDIDO_BLOQUEADO | PAYER
    assignedSeller: "Carlos Mendoza (Vendedor #3)",
    lastInteraction: "Hace 4 minutos (WhatsApp)",
    lockTimerSeconds: 0, // When PEDIDO_BLOQUEADO, 1200 seconds (20 mins)
    
    // Bloque 1: Datos Personales y Cobertura
    personal: {
      phone: "+51 945 821 304",
      dni: "72849103",
      email: "dsalinas_v@gmail.com",
      address: "Av. Larco 1245, Int. 302, Trujillo",
      district: "Víctor Larco Herrera",
      coverageZone: "Zona A - Cobertura Confirmada (Tiempo est. 25-35 min)",
      distanceKm: "3.2 km desde sede Central",
    },

    // Bloque 2: Gustos y Preferencias (Capturados vía PLN de WhatsApp)
    preferences: {
      cookingTerm: "3/4 (Tres Cuartos)",
      cookingTermLevel: 75,
      favoriteDish: "Bife Ancho 350g + Papas Nativas",
      favoriteDrink: "Chicha Morada Sin Azúcar",
      occasion: "Almuerzo Ejecutivo",
      nlpTags: [
        { tag: "PLN: TÉRMINO 3/4", confidence: "98%" },
        { tag: "PLN: BIFE ANCHO", confidence: "99%" },
        { tag: "PLN: SIN AZÚCAR", confidence: "96%" },
        { tag: "PLN: OCASIÓN LABORAL", confidence: "94%" }
      ],
      aiNotes: "Cliente enfocado en rapidez para su descanso laboral. Prefiere carne jugosa pero bien sellada."
    },

    // Bloque 3: Datos de Estudiante
    academic: {
      applies: true,
      institution: "Universidad Nacional de Trujillo (UNT)",
      career: "Ingeniería de Sistemas",
      cycle: "6to Ciclo",
      studentDiscountEligible: true,
      studentCode: "1052300421"
    },

    // Bloque 4: Datos Laborales y Horarios Disponibles
    work: {
      applies: true,
      company: "Tech Solutions Perú",
      position: "Analista Jr.",
      lunchWindow: "1:00 PM - 2:00 PM",
      requiresInvoice: true,
      ruc: "20609182731",
      businessName: "TECH SOLUTIONS PERU S.A.C.",
      bestFollowUpWindow: "12:40 PM - 12:55 PM (Previo al almuerzo)"
    },

    // Bloque 5: Historial Operativo y Medio de Pago
    operational: {
      frequency: "2x por semana",
      averageTicket: 45.00,
      preferredPaymentMethod: "YAPE",
      paymentPhone: "+51 945 821 304",
      specialInstructions: "Cubiertos biodegradables. Tocar timbre Dpto 302.",
      optInConsent: true,
      optInDate: "2026-09-15 11:22",
      totalOrdersPast: 5,
    },

    // Sugerencia IA Dinámica
    aiSuggestion: {
      action: "Cotizar Bife Ancho 350g con envío preferencial para entrega 1:05 PM",
      reason: "Horario de almuerzo inicia a la 1:00 PM. Paga con YAPE. Alta probabilidad de cierre antes de 12:45 PM.",
      recommendedDishId: "item-1",
      recommendedDishName: "Bife Ancho 350g + Papas Nativas",
      recommendedPrice: 48.00
    },

    // Pedido actual / Cotización
    activeOrder: {
      items: [
        { id: "item-1", name: "Bife Ancho 350g + Papas Nativas", price: 48.00, qty: 1, note: "Término 3/4" },
        { id: "item-6", name: "Chicha Morada Especial (Vaso 500ml)", price: 7.00, qty: 1, note: "Sin azúcar" }
      ],
      deliveryFee: 5.00,
      discount: 0.00,
      lockedAt: null,
      reconciliationDetails: null
    }
  },
  {
    id: "lead-2",
    name: "Rocío Fernández",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    status: "LEAD_ACTIVO",
    assignedSeller: "Valeria Ríos (Vendedora #1)",
    lastInteraction: "Hace 12 minutos (WhatsApp)",
    lockTimerSeconds: 0,
    
    // Bloque 1: Datos Personales y Cobertura
    personal: {
      phone: "+51 987 654 321",
      dni: "45678912",
      email: "r.fernandez@empresa.pe",
      address: "Calle Los Cedros 450, Trujillo",
      district: "California / Trujillo",
      coverageZone: "Zona B - Cobertura Confirmada (Tiempo est. 30-40 min)",
      distanceKm: "4.1 km desde sede Central",
    },

    // Bloque 2: Gustos y Preferencias (Capturados vía PLN de WhatsApp)
    preferences: {
      cookingTerm: "Término Medio (Jugoso)",
      cookingTermLevel: 50,
      favoriteDish: "Parrilla Familiar \"El Establo\"",
      favoriteDrink: "Sangría Artesanal",
      occasion: "Evento Familiar / Fin de Semana",
      nlpTags: [
        { tag: "PLN: TÉRMINO MEDIO", confidence: "97%" },
        { tag: "PLN: PARRILLA FAMILIAR", confidence: "99%" },
        { tag: "PLN: SANGRÍA", confidence: "95%" },
        { tag: "PLN: CELEBRACIÓN / REUNIÓN", confidence: "92%" }
      ],
      aiNotes: "Busca porciones abundantes y buena presentación. Sensible a la puntualidad para compartir en familia."
    },

    // Bloque 3: Datos de Estudiante
    academic: {
      applies: false,
      institution: null,
      career: null,
      cycle: null,
      studentDiscountEligible: false,
      studentCode: null
    },

    // Bloque 4: Datos Laborales y Horarios Disponibles
    work: {
      applies: true,
      company: "Constructora del Norte",
      position: "Jefa de Recursos Humanos",
      lunchWindow: "1:30 PM - 2:30 PM",
      requiresInvoice: true,
      ruc: "20123456789",
      businessName: "CONSTRUCTORA DEL NORTE S.A.C.",
      bestFollowUpWindow: "1:15 PM - 1:30 PM (Inicio de receso)"
    },

    // Bloque 5: Historial Operativo y Medio de Pago
    operational: {
      frequency: "1x al mes (Familiar)",
      averageTicket: 280.00,
      preferredPaymentMethod: "PLIN",
      paymentPhone: "+51 987 654 321",
      specialInstructions: "Confirmar pedido 30 min antes. Enviar cubiertos y ají parrillero extra.",
      optInConsent: true,
      optInDate: "2026-09-12 18:40",
      totalOrdersPast: 3,
    },

    // Sugerencia IA Dinámica
    aiSuggestion: {
      action: "Ofrecer Parrilla Familiar 'El Establo' con jarra de sangría de cortesía por reserva anticipada",
      reason: "Ticket promedio alto (S/ 280). Horario de almuerzo 1:30 PM. Canal preferido: PLIN.",
      recommendedDishId: "item-2",
      recommendedDishName: "Parrilla Familiar 'El Establo'",
      recommendedPrice: 145.00
    },

    // Pedido actual / Cotización
    activeOrder: {
      items: [
        { id: "item-2", name: "Parrilla Familiar 'El Establo' (1.2 kg)", price: 145.00, qty: 1, note: "Término medio" },
        { id: "item-7", name: "Sangría Artesanal El Establo (Jarra 1L)", price: 32.00, qty: 1, note: "Bien fría con fruta picada" }
      ],
      deliveryFee: 6.00,
      discount: 0.00,
      lockedAt: null,
      reconciliationDetails: null
    }
  }
];

export const MENU_CATALOG = [
  { id: "item-1", name: "Bife Ancho 350g + Papas Nativas", price: 48.00, category: "Cortes Personales", tag: "Más pedido" },
  { id: "item-2", name: "Parrilla Familiar 'El Establo' (1.2 kg)", price: 145.00, category: "Parrillas Compartir", tag: "Para 4 personas" },
  { id: "item-3", name: "Baby Beef Angus 300g", price: 52.00, category: "Cortes Personales", tag: "Premium" },
  { id: "item-4", name: "Costillar BBQ Criollo 500g", price: 46.00, category: "Cortes Personales", tag: "Salsa de la casa" },
  { id: "item-5", name: "Cuadril de Lomo Fino 350g", price: 55.00, category: "Cortes Personales", tag: "Corte magro" },
  { id: "item-6", name: "Chicha Morada Especial (Jarra 1L)", price: 16.00, category: "Bebidas", tag: "Tradición UNT" },
  { id: "item-7", name: "Sangría Artesanal El Establo (Jarra 1L)", price: 32.00, category: "Bebidas", tag: "Macerada" },
  { id: "item-8", name: "Porción de Papas Nativas Rústicas", price: 14.00, category: "Guarniciones", tag: "Crujientes" },
  { id: "item-9", name: "Ensalada Parrillera de la Casa", price: 12.00, category: "Guarniciones", tag: "Palta y vinagreta" },
];

export const KPI_DATA = {
  l1: {
    title: "KPI L1: Conversión LEAD → PAYER (24h)",
    target: "≥ 50.0%",
    current: 58.4,
    unit: "%",
    status: "success",
    description: "Cumple la meta de conversión rápida en menos de 24 horas."
  },
  l2: {
    title: "KPI L2: Respuesta Útil (< 5 min)",
    target: "≥ 90.0%",
    current: 94.6,
    unit: "%",
    avgTime: "2 min 42 seg",
    status: "success",
    description: "Atención ágil del Agente IA y del Vendedor para cotizaciones inmediatas."
  },
  l3: {
    title: "KPI L3: Integridad del Perfil",
    target: "≥ 95.0%",
    current: 98.2,
    unit: "%",
    status: "success",
    description: "Datos requeridos capturados por PLN: Gustos, Cobertura, Pago y RUC."
  }
};

export const CHAT_HISTORY = {
  "lead-1": [
    { sender: "client", time: "11:20 AM", text: "Hola buenas tardes, quisiera saber la carta de hoy para delivery a Larco." },
    { sender: "ai", time: "11:21 AM", text: "¡Hola Diego! Qué gusto saludarte de Parrilladas El Establo 🔥. Sí, tenemos cobertura total en Av. Larco 1245. Hoy te recomendamos nuestro *Bife Ancho 350g con papas nativas rústicas*. ¿En qué término te gustaría tu corte?", plnTag: "PLN: UBICACIÓN_CONFIRMADA" },
    { sender: "client", time: "11:22 AM", text: "Excelente, me gusta en término 3/4. Y si tienen chicha morada pero sin azúcar mejor, es para mi almuerzo en la oficina." },
    { sender: "ai", time: "11:23 AM", text: "Perfecto anotado 📝: Término 3/4 y Chicha Morada natural sin azúcar. Como estás en Tech Solutions, ¿te lo preparamos para que llegue a la 1:00 PM?", plnTag: "PLN: GUSTOS_CAPTURADOS (Bife 350g, 3/4, Sin Azúcar)" },
    { sender: "client", time: "11:24 AM", text: "Sí por favor, a esa hora salgo a almorzar. Pasen el precio final y su Yape para pagarlo de una vez." }
  ],
  "lead-2": [
    { sender: "client", time: "10:15 AM", text: "Buenos días, quiero consultar por una parrilla para 4 personas este fin de semana en California." },
    { sender: "ai", time: "10:16 AM", text: "¡Buenos días Rocío! Bienvenida a Parrilladas El Establo 🥩. Nuestra *Parrilla Familiar El Establo de 1.2 kg* incluye cortes premium, chorizo artesanal y papas nativas. ¿Te gustaría en término medio?", plnTag: "PLN: OCASIÓN_FAMILIAR" },
    { sender: "client", time: "10:18 AM", text: "Sí, a todos nos gusta término medio. Acompáñalo con una jarra de sangría de la casa. Requeriré factura a nombre de Constructora del Norte." },
    { sender: "ai", time: "10:19 AM", text: "Anotado Rocío. Te cotizamos la Parrilla Familiar + Sangría de 1L con Factura RUC 20123456789. Podemos bloquear tu reserva ya mismo.", plnTag: "PLN: FACTURA_RUC_DETECTADA" }
  ]
};
