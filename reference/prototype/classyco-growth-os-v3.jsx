import { useState, useCallback } from "react";

// ─── DESIGN TOKENS ───
const T = {
  bg: "#0a0e1a", bgCard: "#111827", bgCardHover: "#1a2236", bgSurface: "#0f1525",
  accent: "#c8a96e", accentDim: "rgba(200,169,110,0.15)",
  blue: "#3b82f6", blueDim: "rgba(59,130,246,0.12)",
  green: "#22c55e", greenDim: "rgba(34,197,94,0.12)",
  yellow: "#eab308", yellowDim: "rgba(234,179,8,0.12)",
  red: "#ef4444", redDim: "rgba(239,68,68,0.12)",
  purple: "#7c6fcd", purpleDim: "rgba(124,111,205,0.12)",
  teal: "#0d8a6a", tealDim: "rgba(13,138,106,0.12)",
  text: "#f1f5f9", textMuted: "#94a3b8", textDim: "#64748b",
  border: "#1e293b", borderLight: "#334155",
};

// ─── SVG FLAGS ───
function FlagBR({ size = 18 }) {
  return (
    <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 20 14" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="20" height="14" fill="#009c3b" />
      <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3" fill="#002776" />
    </svg>
  );
}
function FlagPT({ size = 18 }) {
  return (
    <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 20 14" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="8" height="14" fill="#006600" />
      <rect x="8" width="12" height="14" fill="#ff0000" />
      <circle cx="8" cy="7" r="2.8" fill="#ffdf00" />
    </svg>
  );
}
function FlagUS({ size = 18 }) {
  return (
    <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 20 14" style={{ borderRadius: 2, flexShrink: 0 }}>
      {[0,2,4,6,8,10,12].map(i => <rect key={i} y={i * (14/13)} width="20" height={14/13} fill="#b22234" />)}
      {[1,3,5,7,9,11].map(i => <rect key={i} y={i * (14/13)} width="20" height={14/13} fill="#fff" />)}
      <rect width="8" height="7.5" fill="#3c3b6e" />
    </svg>
  );
}
function FlagES({ size = 18 }) {
  return (
    <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 20 14" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="20" height="3.5" fill="#c60b1e" />
      <rect y="3.5" width="20" height="7" fill="#ffc400" />
      <rect y="10.5" width="20" height="3.5" fill="#c60b1e" />
    </svg>
  );
}
const FLAG_COMPONENTS = { "pt-BR": FlagBR, "pt-PT": FlagPT, "en": FlagUS, "es": FlagES };

// ─── i18n ───
const LANGS = [
  { code: "pt-BR", label: "Português BR" },
  { code: "pt-PT", label: "Português PT" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const i18n = {
  "pt-BR": {
    admin: "Admin", client: "Cliente", overview: "Visão Geral", campaigns: "Campanhas",
    channels: "Canais", diagnosis: "Diagnóstico", generate: "Gerar Feedback / Relatório",
    period: "Período: Março 2026", generalMetrics: "Métricas Gerais", funnelTitle: "Os 8 Elos da Fábrica de Receita",
    funnelLabel: "Funil de Receita", bars: "Barras", funnel: "Funil", journeyTitle: "De anúncio até a venda",
    journeyLabel: "Jornada do Cliente", journeySub: "Cada barra representa uma etapa da jornada. O funil afunila naturalmente — nem todos que veem o anúncio vão comprar, mas cada etapa aproxima o potencial cliente da decisão.",
    working: "O que está funcionando", investLabel: "Investimento este mês", budgetLabel: "Orçamento diário",
    nextFeedback: "Próximo feedback", reached: "Pessoas alcançadas", contacts: "Contactos gerados",
    visits: "Visitas agendadas", costPerContact: "Custo por contacto", contactsSub: "Pessoas que enviaram mensagem",
    reachedTip: "Total de pessoas únicas que viram os seus anúncios este mês.",
    contactsTip: "Potenciais clientes que demonstraram interesse e iniciaram conversa consigo.",
    visitsTip: "Pessoas que se comprometeram a visitar o imóvel presencialmente.",
    costTip: "Quanto custou, em média, cada pessoa que entrou em contacto.",
    invest: "Investimento", cplMedio: "CPL Médio", leadsGerados: "Leads Gerados", cac: "CAC",
    investTip: "Total investido em mídia paga no período selecionado.",
    cplTip: "Custo por Lead. Quanto custa cada contato gerado.",
    leadsTip: "Total de contatos que iniciaram conversa via anúncios.",
    cacTip: "Custo de Aquisição de Cliente. Total investido ÷ vendas.",
    stepTitle: "Nível de Maturidade", stepLabel: "Framework STEP",
    creativePerf: "Performance de Criativos", metaAds: "Meta Ads",
    multichannel: "Multicanal", acqChannels: "Canais de Aquisição",
    totalInvest: "Invest. Total", totalLeads: "Leads Total", totalSales: "Vendas Total",
    offlineNote: "Os dados de canais offline (Idealista, Indicação, Prospecção) são preenchidos manualmente no Notion. O sistema sincroniza automaticamente via MCP.",
    diagTitle: "Trava Atual do Sistema", diagLabel: "Diagnóstico Destrava Receita",
    travaId: "TRAVA IDENTIFICADA", hypTitle: "Hipóteses em Teste", hypLabel: "Formato Padrão",
    hypSub: "Toda hipótese segue o formato: Se fizermos X → então Y acontece → medido por Z. Os KPIs são definidos antes de executar — nunca depois.",
    genLabel: "Gerador", genTitle: "Feedback & Relatórios",
    semanal: "Semanal", quinzenal: "Quinzenal", mensal: "Mensal", personalizado: "Personalizado",
    genFeedback: "Feedback Cliente", genReportClient: "Relatório Cliente", genReportAdmin: "Relatório Admin",
    copyWpp: "Copiar", saveNotion: "Salvar no Notion", wppFuture: "WhatsApp (futuro)",
    wppFormat: "WhatsApp (mensagens separadas)", notionFormat: "Notion (página formatada)",
    organic: "Orgânico", zeroCost: "Custo Zero", sales: "vendas", leads: "leads",
    suggestedAction: "Ação sugerida", aiAnalysis: "Análise IA",
  },
  "pt-PT": {
    admin: "Admin", client: "Cliente", overview: "Visão Geral", campaigns: "Campanhas",
    channels: "Canais", diagnosis: "Diagnóstico", generate: "Gerar Feedback / Relatório",
    period: "Período: Março 2026", generalMetrics: "Métricas Gerais", funnelTitle: "Os 8 Elos da Fábrica de Receita",
    funnelLabel: "Funil de Receita", bars: "Barras", funnel: "Funil", journeyTitle: "Do anúncio até à venda",
    journeyLabel: "Jornada do Cliente", journeySub: "Cada barra representa uma etapa da jornada. O funil afunila naturalmente — nem todos os que veem o anúncio vão comprar, mas cada etapa aproxima o potencial cliente da decisão.",
    working: "O que está a funcionar", investLabel: "Investimento este mês", budgetLabel: "Orçamento diário",
    nextFeedback: "Próximo feedback", reached: "Pessoas alcançadas", contacts: "Contactos gerados",
    visits: "Visitas agendadas", costPerContact: "Custo por contacto", contactsSub: "Pessoas que enviaram mensagem",
    reachedTip: "Total de pessoas únicas que viram os seus anúncios este mês.",
    contactsTip: "Potenciais clientes que demonstraram interesse e iniciaram conversa consigo.",
    visitsTip: "Pessoas que se comprometeram a visitar o imóvel presencialmente.",
    costTip: "Quanto custou, em média, cada pessoa que entrou em contacto.",
    invest: "Investimento", cplMedio: "CPL Médio", leadsGerados: "Leads Gerados", cac: "CAC",
    investTip: "Total investido em mídia paga no período selecionado.",
    cplTip: "Custo por Lead. Quanto custa cada contacto gerado.",
    leadsTip: "Total de contactos que iniciaram conversa via anúncios.",
    cacTip: "Custo de Aquisição de Cliente. Total investido ÷ vendas.",
    stepTitle: "Nível de Maturidade", stepLabel: "Framework STEP",
    creativePerf: "Performance de Criativos", metaAds: "Meta Ads",
    multichannel: "Multicanal", acqChannels: "Canais de Aquisição",
    totalInvest: "Invest. Total", totalLeads: "Leads Total", totalSales: "Vendas Total",
    offlineNote: "Os dados de canais offline (Idealista, Indicação, Prospecção) são preenchidos manualmente no Notion. O sistema sincroniza automaticamente via MCP.",
    diagTitle: "Trava Actual do Sistema", diagLabel: "Diagnóstico Destrava Receita",
    travaId: "TRAVA IDENTIFICADA", hypTitle: "Hipóteses em Teste", hypLabel: "Formato Padrão",
    hypSub: "Toda hipótese segue o formato: Se fizermos X → então Y acontece → medido por Z. Os KPIs são definidos antes de executar — nunca depois.",
    genLabel: "Gerador", genTitle: "Feedback & Relatórios",
    semanal: "Semanal", quinzenal: "Quinzenal", mensal: "Mensal", personalizado: "Personalizado",
    genFeedback: "Feedback Cliente", genReportClient: "Relatório Cliente", genReportAdmin: "Relatório Admin",
    copyWpp: "Copiar", saveNotion: "Guardar no Notion", wppFuture: "WhatsApp (futuro)",
    wppFormat: "WhatsApp (mensagens separadas)", notionFormat: "Notion (página formatada)",
    organic: "Orgânico", zeroCost: "Custo Zero", sales: "vendas", leads: "leads",
    suggestedAction: "Acção sugerida", aiAnalysis: "Análise IA",
  },
  "en": {
    admin: "Admin", client: "Client", overview: "Overview", campaigns: "Campaigns",
    channels: "Channels", diagnosis: "Diagnosis", generate: "Generate Feedback / Report",
    period: "Period: March 2026", generalMetrics: "General Metrics", funnelTitle: "The 8 Links of the Revenue Factory",
    funnelLabel: "Revenue Funnel", bars: "Bars", funnel: "Funnel", journeyTitle: "From ad to sale",
    journeyLabel: "Customer Journey", journeySub: "Each bar represents a journey stage. The funnel narrows naturally — not everyone who sees the ad will buy, but each step brings the potential client closer to a decision.",
    working: "What's working", investLabel: "Investment this month", budgetLabel: "Daily budget",
    nextFeedback: "Next feedback", reached: "People reached", contacts: "Contacts generated",
    visits: "Visits scheduled", costPerContact: "Cost per contact", contactsSub: "People who sent a message",
    reachedTip: "Total unique people who saw your ads this month.",
    contactsTip: "Potential clients who showed interest and started a conversation.",
    visitsTip: "People who committed to visiting the property in person.",
    costTip: "Average cost for each person who got in touch.",
    invest: "Investment", cplMedio: "Avg CPL", leadsGerados: "Leads Generated", cac: "CAC",
    investTip: "Total invested in paid media for the selected period.",
    cplTip: "Cost per Lead. How much each generated contact costs.",
    leadsTip: "Total contacts who started a conversation via ads.",
    cacTip: "Customer Acquisition Cost. Total invested ÷ sales.",
    stepTitle: "Maturity Level", stepLabel: "STEP Framework",
    creativePerf: "Creative Performance", metaAds: "Meta Ads",
    multichannel: "Multichannel", acqChannels: "Acquisition Channels",
    totalInvest: "Total Invest.", totalLeads: "Total Leads", totalSales: "Total Sales",
    offlineNote: "Offline channel data (Idealista, Referral, Outbound) is manually entered in Notion. The system syncs automatically via MCP.",
    diagTitle: "Current System Constraint", diagLabel: "Unlock Revenue Diagnosis",
    travaId: "CONSTRAINT IDENTIFIED", hypTitle: "Hypotheses Under Test", hypLabel: "Standard Format",
    hypSub: "Every hypothesis follows: If we do X → then Y happens → measured by Z. KPIs are defined before execution — never after.",
    genLabel: "Generator", genTitle: "Feedback & Reports",
    semanal: "Weekly", quinzenal: "Biweekly", mensal: "Monthly", personalizado: "Custom",
    genFeedback: "Client Feedback", genReportClient: "Client Report", genReportAdmin: "Admin Report",
    copyWpp: "Copy", saveNotion: "Save to Notion", wppFuture: "WhatsApp (future)",
    wppFormat: "WhatsApp (split messages)", notionFormat: "Notion (formatted page)",
    organic: "Organic", zeroCost: "Zero Cost", sales: "sales", leads: "leads",
    suggestedAction: "Suggested action", aiAnalysis: "AI Analysis",
  },
  "es": {
    admin: "Admin", client: "Cliente", overview: "Visión General", campaigns: "Campañas",
    channels: "Canales", diagnosis: "Diagnóstico", generate: "Generar Feedback / Informe",
    period: "Período: Marzo 2026", generalMetrics: "Métricas Generales", funnelTitle: "Los 8 Eslabones de la Fábrica de Ingresos",
    funnelLabel: "Embudo de Ingresos", bars: "Barras", funnel: "Embudo", journeyTitle: "Del anuncio a la venta",
    journeyLabel: "Viaje del Cliente", journeySub: "Cada barra representa una etapa del recorrido. El embudo se estrecha naturalmente — no todos los que ven el anuncio comprarán, pero cada etapa acerca al potencial cliente a la decisión.",
    working: "Qué está funcionando", investLabel: "Inversión este mes", budgetLabel: "Presupuesto diario",
    nextFeedback: "Próximo feedback", reached: "Personas alcanzadas", contacts: "Contactos generados",
    visits: "Visitas agendadas", costPerContact: "Costo por contacto", contactsSub: "Personas que enviaron mensaje",
    reachedTip: "Total de personas únicas que vieron sus anuncios este mes.",
    contactsTip: "Clientes potenciales que mostraron interés e iniciaron conversación.",
    visitsTip: "Personas que se comprometieron a visitar la propiedad.",
    costTip: "Cuánto costó en promedio cada persona que se puso en contacto.",
    invest: "Inversión", cplMedio: "CPL Medio", leadsGerados: "Leads Generados", cac: "CAC",
    investTip: "Total invertido en medios pagos en el período seleccionado.",
    cplTip: "Costo por Lead. Cuánto cuesta cada contacto generado.",
    leadsTip: "Total de contactos que iniciaron conversación vía anuncios.",
    cacTip: "Costo de Adquisición de Cliente. Total invertido ÷ ventas.",
    stepTitle: "Nivel de Madurez", stepLabel: "Framework STEP",
    creativePerf: "Rendimiento de Creativos", metaAds: "Meta Ads",
    multichannel: "Multicanal", acqChannels: "Canales de Adquisición",
    totalInvest: "Inversión Total", totalLeads: "Leads Total", totalSales: "Ventas Total",
    offlineNote: "Los datos de canales offline (Idealista, Referidos, Prospección) se ingresan manualmente en Notion. El sistema sincroniza automáticamente vía MCP.",
    diagTitle: "Restricción Actual del Sistema", diagLabel: "Diagnóstico Destrava Receita",
    travaId: "RESTRICCIÓN IDENTIFICADA", hypTitle: "Hipótesis en Prueba", hypLabel: "Formato Estándar",
    hypSub: "Toda hipótesis sigue: Si hacemos X → entonces Y sucede → medido por Z. Los KPIs se definen antes de ejecutar — nunca después.",
    genLabel: "Generador", genTitle: "Feedback e Informes",
    semanal: "Semanal", quinzenal: "Quincenal", mensal: "Mensual", personalizado: "Personalizado",
    genFeedback: "Feedback Cliente", genReportClient: "Informe Cliente", genReportAdmin: "Informe Admin",
    copyWpp: "Copiar", saveNotion: "Guardar en Notion", wppFuture: "WhatsApp (futuro)",
    wppFormat: "WhatsApp (mensajes separados)", notionFormat: "Notion (página formateada)",
    organic: "Orgánico", zeroCost: "Costo Cero", sales: "ventas", leads: "leads",
    suggestedAction: "Acción sugerida", aiAnalysis: "Análisis IA",
  },
};

// ─── MOCK DATA ───
const FUNNEL_ELOS = [
  { id: 1, name: "Exposição", value: 45200, label: "Impressões", trava: false, color: "#3b82f6", tooltip: "Quantas pessoas viram seus anúncios. Objetivo: Alcançar o máximo de público qualificado." },
  { id: 2, name: "Atenção", value: 1808, label: "Cliques", trava: false, color: "#6366f1", tooltip: "Quem parou e clicou. Objetivo: Captar interesse real no imóvel." },
  { id: 3, name: "Interesse", value: 542, label: "Visualizações LP", trava: false, color: "#8b5cf6", tooltip: "Quem explorou o conteúdo. Objetivo: Gerar desejo de saber mais." },
  { id: 4, name: "Qualificação", value: 156, label: "Mensagens", trava: true, color: "#a855f7", tooltip: "Quem iniciou contato. Objetivo: Filtrar leads com real intenção de compra." },
  { id: 5, name: "Compromisso", value: 23, label: "Visitas agendadas", trava: false, color: "#c084fc", tooltip: "Quem se comprometeu a visitar. Objetivo: Converter interesse em ação concreta." },
  { id: 6, name: "Decisão", value: 8, label: "Propostas", trava: false, color: "#d946ef", tooltip: "Quem avançou para negociação. Objetivo: Fechar a venda." },
  { id: 7, name: "Retenção", value: 5, label: "Clientes ativos", trava: false, color: "#ec4899", tooltip: "Quem comprou e está satisfeito. Objetivo: Manter relacionamento." },
  { id: 8, name: "Indicação", value: 1, label: "Indicações", trava: false, color: "#f43f5e", tooltip: "Quem recomenda você. Objetivo: Gerar novos leads com custo zero." },
];

const CHANNELS = [
  { name: "Meta Ads", spend: 660, leads: 156, sales: 3, cac: 220, status: "active", color: "#3b82f6" },
  { name: "Idealista", spend: 89, leads: 12, sales: 1, cac: 89, status: "active", color: "#22c55e" },
  { name: "Indicação", spend: 0, leads: 8, sales: 2, cac: 0, status: "active", color: "#c8a96e" },
  { name: "Google Meu Negócio", spend: 0, leads: 5, sales: 0, cac: null, status: "passive", color: "#eab308" },
  { name: "Prospecção Direta", spend: 0, leads: 3, sales: 1, cac: 0, status: "active", color: "#7c6fcd" },
];

const CAMPAIGNS = [
  { name: "Apt T2 Almada - Mensagens", spend: 245.30, leads: 68, cpl: 3.61, ctr: 3.2, status: "escalando", mm3d: 1.71, mm7d: 2.04 },
  { name: "Apt T2 Almada - Captação", spend: 189.50, leads: 42, cpl: 4.51, ctr: 1.8, status: "estável", mm3d: 1.37, mm7d: 1.37 },
  { name: "Pós-Evento - Vídeo 75%", spend: 136.55, leads: 28, cpl: 4.88, ctr: 2.9, status: "deteriorando", mm3d: 0.60, mm7d: 1.51 },
  { name: "Remarketing - Base Quente", spend: 88.65, leads: 18, cpl: 4.93, ctr: 4.1, status: "estável", mm3d: 3.10, mm7d: 3.10 },
];

const HYPOTHESES = [
  { elo: "Qualificação", text: "Se implementarmos triagem automática no WhatsApp", then: "então o Rui focará apenas em leads quentes", kpi: "CPV (Custo por Visita)", status: "pendente" },
  { elo: "Exposição", text: "Se testarmos novos criativos com vídeo do imóvel", then: "então o CTR subirá acima de 3%", kpi: "CTR médio", status: "pendente" },
  { elo: "Atenção", text: "Se criarmos anúncios com prova social pós-evento", then: "então o custo por mensagem cairá", kpi: "CPL", status: "validada" },
];

const STEP_DATA = [
  { letter: "S", title: "Saber", subtitle: "Consciência e dados", level: 2, color: "#22c55e", desc: "Tem dados básicos de Meta Ads. Falta clareza sobre CAC real e funil completo." },
  { letter: "T", title: "Ter", subtitle: "Infraestrutura", level: 1, color: "#eab308", desc: "Sem CRM ativo. Atendimento 100% manual. Sem automações de qualificação." },
  { letter: "E", title: "Executar", subtitle: "Capacidade operacional", level: 2, color: "#3b82f6", desc: "Rui atua sozinho. Capacidade limitada. Execução depende totalmente dele." },
  { letter: "P", title: "Potencializar", subtitle: "Escala", level: 1, color: "#7c6fcd", desc: "Sem sistema de indicação. Sem estratégia de retenção. Crescimento linear." },
];

// ─── FUNNEL MATH ───
// Logarithmic scale: preserves proportional feel while keeping small values visible
function funnelWidth(value, maxValue) {
  if (value <= 0) return 15;
  const logVal = Math.log10(Math.max(1, value));
  const logMax = Math.log10(maxValue);
  return 15 + 85 * (logVal / logMax);
}

// ─── SHARED COMPONENTS ───
function StatusBadge({ status }) {
  const map = {
    escalando: { bg: T.greenDim, color: T.green, icon: "↑" },
    estável: { bg: T.blueDim, color: T.blue, icon: "→" },
    deteriorando: { bg: T.redDim, color: T.red, icon: "↓" },
    atenção: { bg: T.yellowDim, color: T.yellow, icon: "!" },
    validada: { bg: T.greenDim, color: T.green, icon: "✓" },
    "não validada": { bg: T.redDim, color: T.red, icon: "✗" },
    pendente: { bg: T.yellowDim, color: T.yellow, icon: "…" },
    active: { bg: T.greenDim, color: T.green, icon: "●" },
    passive: { bg: T.yellowDim, color: T.yellow, icon: "○" },
  };
  const s = map[status] || map.atenção;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: s.bg, color: s.color }}>
      <span>{s.icon}</span> {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 4 }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <span style={{ width: 15, height: 15, borderRadius: "50%", background: T.border, color: T.textMuted, fontSize: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "help", flexShrink: 0 }}>i</span>
      {show && <span style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#1e293b", color: T.text, padding: "10px 14px", borderRadius: 8, fontSize: 12, lineHeight: 1.5, width: 260, zIndex: 99, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", border: `1px solid ${T.borderLight}`, pointerEvents: "none" }}>{text}</span>}
    </span>
  );
}

function MetricCard({ label, value, sub, color, tooltip: tip }) {
  return (
    <div style={{ background: T.bgCard, borderRadius: 12, padding: "18px 20px", border: `1px solid ${T.border}`, flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
        {tip ? <Tooltip text={tip}>{label}</Tooltip> : label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: color || T.text, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: T.textDim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function SectionHeader({ label, title, accent, right }) {
  return (
    <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
      <div>
        {label && <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: accent || T.accent, fontWeight: 500, marginBottom: 6 }}>{label}</div>}
        <div style={{ fontSize: 20, fontWeight: 700, color: T.text, fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</div>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }).catch(() => {}); }}
      style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${T.border}`, background: copied ? T.greenDim : "transparent", color: copied ? T.green : T.textMuted, fontSize: 11, cursor: "pointer", fontWeight: 500, transition: "all 0.15s", whiteSpace: "nowrap" }}>
      {copied ? "✓ Copiado" : (label || "Copiar")}
    </button>
  );
}

// ─── FUNNEL VIEWS ───
function FunnelBars({ isAdmin }) {
  const maxVal = FUNNEL_ELOS[0].value;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {FUNNEL_ELOS.map((elo, i) => {
        const width = Math.max(18, (elo.value / maxVal) * 100);
        return (
          <div key={elo.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 16, fontSize: 11, color: T.textDim, textAlign: "right", flexShrink: 0 }}>{elo.id}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                width: `${width}%`, minWidth: 200, padding: "10px 14px", borderRadius: 8,
                background: elo.trava ? `linear-gradient(135deg, ${T.redDim}, rgba(239,68,68,0.25))` : `linear-gradient(135deg, ${elo.color}22, ${elo.color}33)`,
                border: elo.trava ? `1px solid ${T.red}44` : `1px solid ${elo.color}22`,
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                  <Tooltip text={elo.tooltip}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: elo.trava ? T.red : T.text, whiteSpace: "nowrap" }}>{elo.name}</span>
                  </Tooltip>
                  {elo.trava && <span style={{ fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: T.red, color: "#fff", whiteSpace: "nowrap" }}>TRAVA</span>}
                </div>
                <span style={{ fontSize: 11, color: T.textMuted, whiteSpace: "nowrap", flexShrink: 0 }}>
                  {elo.value.toLocaleString("pt-BR")}{isAdmin ? ` ${elo.label}` : ""}
                </span>
              </div>
            </div>
            {i < FUNNEL_ELOS.length - 1 ? (
              <div style={{ fontSize: 10, color: T.textDim, width: 44, textAlign: "center", flexShrink: 0 }}>
                {((FUNNEL_ELOS[i + 1].value / elo.value) * 100).toFixed(1)}%
              </div>
            ) : <div style={{ width: 44 }} />}
          </div>
        );
      })}
    </div>
  );
}

function FunnelTraditional({ isAdmin }) {
  const maxVal = FUNNEL_ELOS[0].value;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 0" }}>
      {FUNNEL_ELOS.map((elo, i) => {
        const widthPct = funnelWidth(elo.value, maxVal);
        return (
          <div key={elo.id} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: `${widthPct}%`, minWidth: 160, transition: "width 0.4s ease" }}>
              <Tooltip text={elo.tooltip}>
                <div style={{
                  padding: "11px 16px", position: "relative", width: "100%",
                  background: elo.trava
                    ? `linear-gradient(135deg, ${T.redDim}, rgba(239,68,68,0.22))`
                    : `linear-gradient(135deg, ${elo.color}18, ${elo.color}2a)`,
                  border: elo.trava ? `1px solid ${T.red}44` : `1px solid ${elo.color}22`,
                  borderRadius: i === 0 ? "14px 14px 4px 4px" : i === FUNNEL_ELOS.length - 1 ? "4px 4px 14px 14px" : 4,
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                  boxSizing: "border-box",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                    <span style={{ fontSize: 10, color: T.textDim, flexShrink: 0 }}>{elo.id}</span>
                    <span style={{ fontWeight: 600, fontSize: 13, color: elo.trava ? T.red : T.text, whiteSpace: "nowrap" }}>{elo.name}</span>
                    {elo.trava && <span style={{ fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: T.red, color: "#fff", whiteSpace: "nowrap" }}>TRAVA</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: T.textMuted, whiteSpace: "nowrap" }}>
                      {elo.value.toLocaleString("pt-BR")}{isAdmin ? ` ${elo.label}` : ""}
                    </span>
                    {i < FUNNEL_ELOS.length - 1 && (
                      <span style={{ fontSize: 10, color: T.textDim, whiteSpace: "nowrap" }}>
                        ({((FUNNEL_ELOS[i + 1].value / elo.value) * 100).toFixed(1)}%)
                      </span>
                    )}
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FunnelSection({ isAdmin, t }) {
  const [mode, setMode] = useState("funnel");
  return (
    <div>
      <SectionHeader label={t.funnelLabel} title={t.funnelTitle}
        right={
          <div style={{ display: "flex", background: T.bgCard, borderRadius: 6, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            {["funnel", "bars"].map(m => (
              <button key={m} onClick={() => setMode(m)}
                style={{ padding: "5px 14px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500,
                  background: mode === m ? T.accentDim : "transparent", color: mode === m ? T.accent : T.textDim }}>
                {m === "funnel" ? t.funnel : t.bars}
              </button>
            ))}
          </div>
        }
      />
      {mode === "funnel" ? <FunnelTraditional isAdmin={isAdmin} /> : <FunnelBars isAdmin={isAdmin} />}
    </div>
  );
}

// ─── FEEDBACK / REPORTS DATA ───
const WPP_MSGS = [
  `💎 *Feedback Tráfego Pago*\n\nSegue abaixo, análise e otimizações referentes ao tráfego pago, nesta semana.\n\nQualquer dúvida, estamos sempre à disposição.`,
  `🔎 *1. Análise (Cenário Encontrado):*\n\nAo analisar o cenário atual dos anúncios esta semana, verificámos um desempenho positivo nas campanhas de mensagens para o Apt T2 Almada, com um CPL médio de € 3,61 e uma taxa de cliques de 3,2%.\n\nA campanha pós-evento com público de 75% de visualização apresenta sinais de fadiga, com o custo a subir progressivamente nos últimos 3 dias.\n\nO volume de leads mantém-se acima da meta semanal (39 leads/semana vs meta de 35), o que é um indicador saudável de que a exposição está a funcionar.`,
  `✅ *2. Otimizações Realizadas:*\n\n• Redução de orçamento na campanha pós-evento (-15%) para conter o aumento do CPL\n• Criação de novo conjunto de anúncios com público lookalike 1% baseado nos compradores\n• Teste A/B iniciado com novo criativo em formato carrossel do apartamento`,
  `🏦 *Orçamento atual:* 22€ por dia`,
  `💰 *Investimento esta semana:* € 154,00`,
  `📆 *Próximo Feedback de Tráfego:* 02/04/2026`,
];

const NOTION_FEEDBACK = `# Feedback 16 | Tráfego | Rui da Cruz\n\n📍 **Local de Envio:** WhatsApp — Grupo Classyco × Rui da Cruz\n📆 **Data de Envio:** 29/03/2026\n\n---\n\n## 💎 Feedback Tráfego Pago\n\nSegue abaixo, análise e otimizações referentes ao tráfego pago, nesta semana.\nQualquer dúvida, estamos sempre à disposição.\n\n---\n\n## 🔎 1. Análise (Cenário Encontrado)\n\nAo analisar o cenário atual dos anúncios esta semana, verificámos um desempenho positivo nas campanhas de mensagens para o Apt T2 Almada, com um CPL médio de € 3,61 e uma taxa de cliques de 3,2%.\n\nA campanha pós-evento com público de 75% de visualização apresenta sinais de fadiga, com o custo a subir progressivamente nos últimos 3 dias.\n\nO volume de leads mantém-se acima da meta semanal (39 leads/semana vs meta de 35), o que é um indicador saudável de que a exposição está a funcionar.\n\n---\n\n## ✅ 2. Otimizações Realizadas\n\n- Redução de orçamento na campanha pós-evento (-15%) para conter o aumento do CPL\n- Criação de novo conjunto de anúncios com público lookalike 1% baseado nos compradores\n- Teste A/B iniciado com novo criativo em formato carrossel do apartamento\n\n---\n\n**🏦 Orçamento atual:** 22€ por dia\n**💰 Investimento esta semana:** € 154,00\n**📆 Próximo Feedback de Tráfego:** 02/04/2026`;

const CLIENT_REPORT = `# Relatório Semanal de Performance\n## Rui da Cruz — 24/03 a 29/03/2026\n\n---\n\n### 📊 Resumo Executivo\n\nEsta semana consolidámos a transição para o novo apartamento T2 em Almada nas campanhas de Meta Ads. O investimento total foi de **€ 154,00** e gerámos **39 novos contactos**, resultando num custo médio por contacto de **€ 3,95** — abaixo da meta de € 4,00.\n\n---\n\n### 🎯 Performance por Etapa do Funil\n\n| Etapa | Resultado | Variação vs Semana Anterior |\n|---|---|---|\n| Pessoas Alcançadas | 11.300 | +8% |\n| Cliques nos Anúncios | 452 | +12% |\n| Mensagens Iniciadas | 39 | +22% |\n| Visitas Agendadas | 6 | +1 |\n| Propostas Enviadas | 2 | = |\n\n**Onde estamos a ter melhor resultado:** A fase de Exposição e Atenção está saudável. Os vídeos pós-evento continuam a atrair forte interesse com CTR de 3%.\n\n**Onde podemos melhorar:** A conversão de mensagem para visita agendada (15,4%) indica oportunidade de melhorar a qualificação dos contactos recebidos.\n\n---\n\n### 📈 Campanhas Activas\n\n**Apt T2 Almada — Mensagens:** A campanha com melhor desempenho. CPL de € 3,61 e CTR de 3,2%. Recomendação: manter e considerar aumento de 15% no orçamento.\n\n**Pós-Evento — Vídeo 75%:** Mostra sinais de fadiga. Reduzimos o orçamento em 15% e iniciámos teste com novo público lookalike.\n\n**Remarketing — Base Quente:** CTR mais alto de todas (4,1%), indicando que o público já aquecido responde bem. Manter.\n\n---\n\n### 🔮 Próximos Passos\n\n1. Testar novo criativo em formato carrossel com fotos profissionais do apartamento\n2. Activar campanha para público lookalike 1% baseado nos compradores anteriores\n3. Avaliar implementação de script de qualificação inicial para mensagens recebidas\n\n---\n\n**🏦 Orçamento actual:** 22€/dia\n**📆 Próximo relatório:** 05/04/2026`;

const ADMIN_REPORT = `# Relatório Técnico — Análise Profunda\n## Rui da Cruz | 24/03 a 29/03/2026 | Gestor: Paulo Teodoro\n\n---\n\n### 1. CONTEXTO OPERACIONAL\n\n**Perfil do cliente:** Corretor autónomo (eugência), mercado imobiliário em Portugal (Almada/Lisboa).\n**Canais activos:** Meta Ads (primário), Idealista (portal), Indicação (orgânico).\n**Capacidade operacional:** Atendimento 100% manual via WhatsApp. Sem CRM. Sem automações. Limite estimado: ~40 leads/semana antes de degradação na qualidade de resposta.\n\n---\n\n### 2. DIAGNÓSTICO — FRAMEWORK DESTRAVA RECEITA\n\n**Nível STEP actual:**\n- **S (Saber):** 2/4 — Dados básicos de Meta Ads disponíveis, mas sem visibilidade cross-channel. Não mede CAC real com dados de venda.\n- **T (Ter):** 1/4 — Sem CRM, sem landing page própria, sem sistema de qualificação.\n- **E (Executar):** 2/4 — Execução funcional mas dependente 100% do Rui. Qualquer sobrecarga degrada performance.\n- **P (Potencializar):** 1/4 — Sem estratégia de retenção ou indicação sistematizada.\n\n**Trava actual identificada:** Elo 4 — Qualificação.\n- 156 mensagens/mês → 23 visitas agendadas = Taxa de conversão de 14,7%\n- Benchmark mercado imobiliário PT: 18-25%\n- O Rui gasta tempo igual em leads frios e quentes. Não há triagem.\n\n---\n\n### 3. PERFORMANCE DETALHADA — META ADS\n\n**Investimento total semana:** € 154,00 (de 660,00 acumulado mês)\n**Budget diário efectivo:** € 22,00/dia\n\n| Campanha | Gasto | Leads | CPL | CTR | MM3d | MM7d | Tendência | Acção |\n|---|---|---|---|---|---|---|---|---|\n| Apt T2 Almada - Mensagens | € 61,33 | 17 | € 3,61 | 3,2% | 1,71x | 2,04x | ↑ Escalando | Aumentar 15% |\n| Apt T2 Almada - Captação | € 47,38 | 10 | € 4,74 | 1,8% | 1,37x | 1,37x | → Estável | Manter |\n| Pós-Evento - Vídeo 75% | € 27,31 | 7 | € 3,90 | 2,9% | 0,60x | 1,51x | ↓ Fadiga | Reduzi -15% |\n| Remarketing - Base Quente | € 17,98 | 5 | € 3,60 | 4,1% | 3,10x | 3,10x | → Estável | Manter |\n\n**CPL histórico (últimos 90 dias):** € 4,23 (média), € 3,10 (mínimo), € 6,80 (máximo)\n**Meta CPL sugerida pelo sistema:** € 4,00 (percentil 40 do histórico)\n**CPL semana actual:** € 3,95 ✅ Abaixo da meta\n\n**Análise de criativos:**\n- Criativos em vídeo performam 2,1x melhor em CTR que imagens estáticas\n- Tempo médio de fadiga de criativo: 12-15 dias\n- O criativo "Pós-Evento" está no dia 18 → confirma fadiga observada nos dados\n\n---\n\n### 4. ANÁLISE CROSS-CHANNEL\n\n| Canal | Invest. | Leads | Vendas | CAC | Observação |\n|---|---|---|---|---|---|\n| Meta Ads | € 660 | 156 | 3 | € 220 | Canal primário. CAC aceitável para imobiliário PT. |\n| Idealista | € 89 | 12 | 1 | € 89 | Melhor CAC. Avaliar possibilidade de aumentar presença. |\n| Indicação | € 0 | 8 | 2 | € 0 | CAC zero. Não sistematizado. Oportunidade enorme. |\n| Google Meu Negócio | € 0 | 5 | 0 | — | Passivo. Sem investimento, gera awareness local. |\n| Prospecção Directa | € 0 | 3 | 1 | € 0 | O Rui prospecta manualmente. Escala limitada pelo tempo. |\n\n**CAC ponderado geral:** € 107 (todos os canais)\n**CAC só mídia paga:** € 220\n\n---\n\n### 5. HIPÓTESES ACTIVAS\n\n| # | Elo | Hipótese | KPI | Status |\n|---|---|---|---|---|\n| H1 | Qualificação | Se implementarmos triagem no WhatsApp → taxa de conversão msg→visita sobe | CPV actual € 28,70 → Meta € 22,00 | Pendente |\n| H2 | Exposição | Se testarmos novos criativos com vídeo do imóvel → CTR sobe acima de 3% | CTR médio actual 2,9% | Pendente |\n| H3 | Atenção | Se usarmos prova social pós-evento → CPL cai | CPL caiu de € 5,20 para € 3,95 | ✅ Validada |\n\n---\n\n### 6. RECOMENDAÇÕES E PRÓXIMOS PASSOS\n\n**Prioridade 1 (Esta semana):**\n- Novo criativo carrossel — fotos profissionais do T2 Almada\n- Activar lookalike 1% baseado na lista de compradores\n- Reduzir orçamento do criativo fadigado em mais 10% se não melhorar em 48h\n\n**Prioridade 2 (Próximas 2 semanas):**\n- Formular com o Rui: script básico de qualificação para WhatsApp (3 perguntas filtro)\n- Sistematizar canal de indicação — testar cashback/incentivo para base de clientes anteriores\n\n**Prioridade 3 (Ciclo 90 dias):**\n- Avaliar implementação de ferramenta de triagem IA no WhatsApp\n- Preparar Data Hub no Notion para o Rui registar dados de visitas e vendas\n- Objectivo: destravar elo de Qualificação e mover a trava para Compromisso\n\n---\n\n📊 *Relatório gerado pelo Classyco Growth OS — v0.1*\n📆 *Data de geração:* 29/03/2026`;

// ─── FEEDBACK GENERATOR ───
function FeedbackGenerator({ t }) {
  const [period, setPeriod] = useState("semanal");
  const [outputType, setOutputType] = useState(null);
  const [format, setFormat] = useState("whatsapp");
  const periods = ["semanal", "quinzenal", "mensal", "personalizado"];

  return (
    <div>
      <SectionHeader label={t.genLabel} title={t.genTitle} />
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {periods.map(p => (
          <button key={p} onClick={() => { setPeriod(p); setOutputType(null); }}
            style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${period === p ? T.accent : T.border}`, background: period === p ? T.accentDim : "transparent", color: period === p ? T.accent : T.textMuted, fontSize: 13, cursor: "pointer", textTransform: "capitalize", fontWeight: 500 }}>
            {t[p]}
          </button>
        ))}
      </div>
      {period === "personalizado" && (
        <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
          <input type="date" style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.bgCard, color: T.text, fontSize: 13 }} />
          <span style={{ color: T.textDim }}>até</span>
          <input type="date" style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.bgCard, color: T.text, fontSize: 13 }} />
        </div>
      )}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <button onClick={() => { setOutputType("feedback"); setFormat("whatsapp"); }}
          style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: outputType === "feedback" ? T.accent : T.accentDim, color: outputType === "feedback" ? T.bg : T.accent, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          💬 {t.genFeedback}
        </button>
        <button onClick={() => { setOutputType("reportClient"); setFormat("notion"); }}
          style={{ padding: "10px 20px", borderRadius: 8, border: `1px solid ${T.border}`, background: outputType === "reportClient" ? T.blueDim : "transparent", color: outputType === "reportClient" ? T.blue : T.textMuted, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          📊 {t.genReportClient}
        </button>
        <button onClick={() => { setOutputType("reportAdmin"); setFormat("notion"); }}
          style={{ padding: "10px 20px", borderRadius: 8, border: `1px solid ${T.border}`, background: outputType === "reportAdmin" ? T.purpleDim : "transparent", color: outputType === "reportAdmin" ? T.purple : T.textMuted, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          🔬 {t.genReportAdmin}
        </button>
      </div>

      {outputType === "feedback" && (
        <div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {[{ id: "whatsapp", label: t.wppFormat }, { id: "notion", label: t.notionFormat }].map(f => (
              <button key={f.id} onClick={() => setFormat(f.id)}
                style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${format === f.id ? T.accent : T.border}`, background: format === f.id ? T.accentDim : "transparent", color: format === f.id ? T.accent : T.textDim, fontSize: 12, cursor: "pointer" }}>
                {f.label}
              </button>
            ))}
          </div>
          {format === "whatsapp" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {WPP_MSGS.map((msg, i) => (
                <div key={i} style={{ background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", background: T.bgSurface, borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: 11, color: T.textDim }}>Mensagem {i + 1} de {WPP_MSGS.length}</span>
                    <CopyButton text={msg} />
                  </div>
                  <pre style={{ padding: "12px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.textMuted, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>{msg}</pre>
                </div>
              ))}
              <button style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textDim, fontSize: 12, cursor: "pointer", opacity: 0.5, alignSelf: "flex-start", marginTop: 4 }}>
                📱 {t.wppFuture}
              </button>
            </div>
          )}
          {format === "notion" && (
            <div>
              <div style={{ background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", background: T.bgSurface, borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 11, color: T.textDim }}>Formato Notion — Markdown compatível</span>
                  <CopyButton text={NOTION_FEEDBACK} />
                </div>
                <pre style={{ padding: "14px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.textMuted, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0, maxHeight: 400, overflowY: "auto" }}>{NOTION_FEEDBACK}</pre>
              </div>
              <button style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: T.purpleDim, color: T.purple, fontSize: 12, fontWeight: 500, cursor: "pointer", marginTop: 12 }}>
                📝 {t.saveNotion}
              </button>
            </div>
          )}
        </div>
      )}

      {outputType === "reportClient" && (
        <div>
          <div style={{ background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", background: T.bgSurface, borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 11, color: T.blue, fontWeight: 500 }}>📊 Relatório do Cliente — Formato completo</span>
              <CopyButton text={CLIENT_REPORT} />
            </div>
            <pre style={{ padding: "14px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.textMuted, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0, maxHeight: 500, overflowY: "auto" }}>{CLIENT_REPORT}</pre>
          </div>
          <button style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: T.purpleDim, color: T.purple, fontSize: 12, fontWeight: 500, cursor: "pointer", marginTop: 12 }}>
            📝 {t.saveNotion}
          </button>
        </div>
      )}

      {outputType === "reportAdmin" && (
        <div>
          <div style={{ background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", background: T.bgSurface, borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 11, color: T.purple, fontWeight: 500 }}>🔬 Relatório Admin — Análise Profunda</span>
              <CopyButton text={ADMIN_REPORT} />
            </div>
            <pre style={{ padding: "14px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.textMuted, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0, maxHeight: 500, overflowY: "auto" }}>{ADMIN_REPORT}</pre>
          </div>
          <button style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: T.purpleDim, color: T.purple, fontSize: 12, fontWeight: 500, cursor: "pointer", marginTop: 12 }}>
            📝 {t.saveNotion}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN VIEWS ───
function AdminOverview({ t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <SectionHeader label={t.period} title={t.generalMetrics} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <MetricCard label={t.invest} value="€ 660" sub="Meta Ads este mês" tooltip={t.investTip} />
          <MetricCard label={t.cplMedio} value="€ 4,23" sub="Meta ideal: € 4,00" color={T.yellow} tooltip={t.cplTip} />
          <MetricCard label={t.leadsGerados} value="156" sub="+22% vs mês anterior" color={T.green} tooltip={t.leadsTip} />
          <MetricCard label={t.cac} value="€ 220" sub="3 vendas no período" color={T.blue} tooltip={t.cacTip} />
        </div>
      </div>
      <FunnelSection isAdmin={true} t={t} />
      <div>
        <SectionHeader label={t.stepLabel} title={`${t.stepTitle} — Rui da Cruz`} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {STEP_DATA.map(s => (
            <div key={s.letter} style={{ background: T.bgCard, borderRadius: 12, padding: 20, border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: s.color, fontWeight: 600, marginBottom: 8 }}>{s.letter} — {s.title}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 4 }}>{s.subtitle}</div>
              <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                {[1, 2, 3, 4].map(n => <div key={n} style={{ height: 4, flex: 1, borderRadius: 2, background: n <= s.level ? s.color : T.border }} />)}
              </div>
              <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminCampaigns({ t }) {
  return (
    <div>
      <SectionHeader label={t.metaAds} title={t.creativePerf} />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 13 }}>
          <thead>
            <tr>
              {["Criativo", "Gasto", "Leads", "CPL", "CTR", "MM3d", "MM7d", "Tendência"].map(h => (
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: T.textDim, fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAMPAIGNS.map((c, i) => (
              <tr key={i} style={{ transition: "background 0.1s" }} onMouseEnter={e => e.currentTarget.style.background = T.bgCardHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "12px", color: T.text, fontWeight: 500, borderBottom: `1px solid ${T.border}`, maxWidth: 220 }}>{c.name}</td>
                <td style={{ padding: "12px", color: T.textMuted, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>€ {c.spend.toFixed(2)}</td>
                <td style={{ padding: "12px", color: T.text, borderBottom: `1px solid ${T.border}` }}>{c.leads}</td>
                <td style={{ padding: "12px", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: c.cpl <= 4.0 ? T.greenDim : c.cpl <= 4.8 ? T.yellowDim : T.redDim, color: c.cpl <= 4.0 ? T.green : c.cpl <= 4.8 ? T.yellow : T.red }}>€ {c.cpl.toFixed(2)}</span>
                </td>
                <td style={{ padding: "12px", color: c.ctr >= 2.5 ? T.green : T.textMuted, borderBottom: `1px solid ${T.border}` }}>{c.ctr}%</td>
                <td style={{ padding: "12px", color: T.textMuted, borderBottom: `1px solid ${T.border}` }}>{c.mm3d}x</td>
                <td style={{ padding: "12px", color: T.textMuted, borderBottom: `1px solid ${T.border}` }}>{c.mm7d}x</td>
                <td style={{ padding: "12px", borderBottom: `1px solid ${T.border}` }}><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, padding: 16, background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 12, color: T.accent, fontWeight: 500, marginBottom: 6 }}>💡 {t.aiAnalysis}</div>
        <div style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.7 }}>
          CPL histórico médio: <strong style={{ color: T.text }}>€ 4,23</strong>. Meta sugerida: <strong style={{ color: T.green }}>€ 4,00</strong>.
          O criativo "Pós-Evento — Vídeo 75%" mostra sinais de fadiga (MM3d caindo). Recomendação: pausar se não melhorar em 48h e realocar verba para "Remarketing — Base Quente" que tem CTR superior.
        </div>
      </div>
    </div>
  );
}

function AdminChannels({ t }) {
  const totalSpend = CHANNELS.reduce((s, c) => s + c.spend, 0);
  const totalLeads = CHANNELS.reduce((s, c) => s + c.leads, 0);
  const totalSales = CHANNELS.reduce((s, c) => s + c.sales, 0);
  return (
    <div>
      <SectionHeader label={t.multichannel} title={t.acqChannels} />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <MetricCard label={t.totalInvest} value={`€ ${totalSpend}`} />
        <MetricCard label={t.totalLeads} value={totalLeads} color={T.blue} />
        <MetricCard label={t.totalSales} value={totalSales} color={T.green} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CHANNELS.map((ch, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}`, flexWrap: "wrap" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: ch.color, flexShrink: 0 }} />
            <div style={{ flex: 1, fontWeight: 500, fontSize: 14, color: T.text, minWidth: 120 }}>{ch.name}</div>
            <div style={{ fontSize: 12, color: T.textMuted, width: 72, textAlign: "right" }}>{ch.spend > 0 ? `€ ${ch.spend}` : t.organic}</div>
            <div style={{ fontSize: 12, color: T.blue, width: 65, textAlign: "right" }}>{ch.leads} {t.leads}</div>
            <div style={{ fontSize: 12, color: T.green, width: 65, textAlign: "right" }}>{ch.sales} {t.sales}</div>
            <div style={{ width: 85, textAlign: "right" }}>
              {ch.cac !== null && ch.cac > 0 ? <span style={{ fontSize: 12, color: T.textMuted }}>CAC € {ch.cac}</span> : ch.cac === 0 ? <span style={{ fontSize: 11, color: T.green }}>{t.zeroCost}</span> : <span style={{ fontSize: 11, color: T.textDim }}>—</span>}
            </div>
            <StatusBadge status={ch.status} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: 14, background: T.accentDim, borderRadius: 10, border: `1px solid ${T.accent}33` }}>
        <div style={{ fontSize: 12, color: T.accent, lineHeight: 1.6 }}>ⓘ {t.offlineNote}</div>
      </div>
    </div>
  );
}

function AdminDiagnosis({ t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <SectionHeader label={t.diagLabel} title={t.diagTitle} />
        <div style={{ background: `linear-gradient(135deg, ${T.redDim}, rgba(239,68,68,0.08))`, borderRadius: 14, padding: 24, border: `1px solid ${T.red}33` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 10px", borderRadius: 4, background: T.red, color: "#fff", letterSpacing: "0.1em" }}>{t.travaId}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>Elo 4 — Qualificação</span>
          </div>
          <div style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.8, maxWidth: 700 }}>
            O Rui atua sozinho (eugência). Estamos gerando <strong style={{ color: T.text }}>156 mensagens/mês</strong> via Meta Ads, mas apenas <strong style={{ color: T.text }}>23 se convertem em visitas</strong> — uma taxa de 14,7%.
            O gargalo está na capacidade de qualificar e responder leads a tempo.
            <br /><br />
            <strong style={{ color: T.accent }}>{t.suggestedAction}:</strong> Implementar triagem de mensagens para que o Rui invista tempo apenas nos leads com intenção real. Antes de escalar mídia.
          </div>
        </div>
      </div>
      <div>
        <SectionHeader label={t.hypLabel} title={t.hypTitle} />
        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 16, lineHeight: 1.6 }}>{t.hypSub}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {HYPOTHESES.map((h, i) => (
            <div key={i} style={{ padding: "16px 20px", background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}`, borderLeft: `3px solid ${h.status === "validada" ? T.green : h.status === "não validada" ? T.red : T.yellow}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textDim }}>ELO: {h.elo}</span>
                <StatusBadge status={h.status} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 4 }}>Se {h.text}...</div>
              <div style={{ fontSize: 13, color: T.textMuted }}>→ {h.then}</div>
              <div style={{ fontSize: 12, color: T.textDim, marginTop: 6 }}>KPI: {h.kpi}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CLIENT DASHBOARD ───
function ClientDashboard({ t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <div>
        <SectionHeader label={t.journeyLabel + " — Março 2026"} title={t.journeyTitle} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <MetricCard label={t.reached} value="45.200" tooltip={t.reachedTip} color={T.blue} />
          <MetricCard label={t.contacts} value="156" sub={t.contactsSub} tooltip={t.contactsTip} color={T.green} />
          <MetricCard label={t.visits} value="23" tooltip={t.visitsTip} color={T.accent} />
          <MetricCard label={t.costPerContact} value="€ 4,23" tooltip={t.costTip} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 16, lineHeight: 1.7 }}>{t.journeySub}</div>
        <FunnelSection isAdmin={false} t={t} />
      </div>
      <div>
        <SectionHeader title={t.working} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "✅", text: "Os vídeos pós-evento continuam a gerar forte atração, com taxa de cliques acima da média do mercado (3%)." },
            { icon: "📈", text: "O volume de contactos cresceu 22% em relação ao mês anterior — mais pessoas estão a demonstrar interesse." },
            { icon: "🎯", text: "Estamos a testar novos públicos baseados em quem já assistiu aos seus vídeos, para encontrar pessoas mais qualificadas." },
            { icon: "⚠️", text: "Próximo foco: melhorar a triagem das mensagens para garantir que o seu tempo é investido nos contactos certos." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "14px 18px", background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}`, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.7 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: T.bgCard, borderRadius: 12, padding: 20, border: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.investLabel}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>€ 660,00</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.budgetLabel}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>€ 22/dia</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.nextFeedback}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.accent }}>02/04</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ───
export default function ClassycoGrowthOS() {
  const [view, setView] = useState("admin");
  const [lang, setLang] = useState("pt-BR");
  const [showLang, setShowLang] = useState(false);
  const [adminTab, setAdminTab] = useState("overview");
  const t = i18n[lang];
  const currentLang = LANGS.find(l => l.code === lang);
  const FlagIcon = FLAG_COMPONENTS[lang];

  const adminTabs = [
    { id: "overview", label: t.overview },
    { id: "campaigns", label: t.campaigns },
    { id: "channels", label: t.channels },
    { id: "diagnosis", label: t.diagnosis },
    { id: "generate", label: t.generate },
  ];

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      {/* ─── HEADER ─── */}
      <div style={{ padding: "14px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: T.bg, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: T.accent }}>
            Classyco<span style={{ fontSize: 11, color: T.textDim, fontFamily: "'DM Sans', sans-serif", fontWeight: 400, marginLeft: 4 }}>Growth OS</span>
          </div>
          <div style={{ width: 1, height: 20, background: T.border }} />
          <div style={{ fontSize: 13, color: T.textMuted }}>Rui da Cruz</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Language Switcher */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowLang(!showLang)}
              style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <FlagIcon size={16} />
              {currentLang.code.split("-")[0].toUpperCase()}
            </button>
            {showLang && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden", zIndex: 99, minWidth: 180, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                {LANGS.map(l => {
                  const LFlag = FLAG_COMPONENTS[l.code];
                  return (
                    <button key={l.code} onClick={() => { setLang(l.code); setShowLang(false); }}
                      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", border: "none", background: lang === l.code ? T.accentDim : "transparent", color: lang === l.code ? T.accent : T.textMuted, fontSize: 13, cursor: "pointer", textAlign: "left" }}>
                      <LFlag size={18} /> {l.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {/* View Toggle */}
          <div style={{ display: "flex", background: T.bgCard, borderRadius: 8, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <button onClick={() => setView("admin")}
              style={{ padding: "7px 14px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: view === "admin" ? T.accentDim : "transparent", color: view === "admin" ? T.accent : T.textMuted }}>
              🔧 {t.admin}
            </button>
            <button onClick={() => setView("client")}
              style={{ padding: "7px 14px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: view === "client" ? T.accentDim : "transparent", color: view === "client" ? T.accent : T.textMuted }}>
              👤 {t.client}
            </button>
          </div>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 24px" }}>
        {view === "admin" && (
          <div>
            <div style={{ display: "flex", gap: 4, paddingBottom: 20, borderBottom: `1px solid ${T.border}`, marginBottom: 24, overflowX: "auto" }}>
              {adminTabs.map(tab => (
                <button key={tab.id} onClick={() => setAdminTab(tab.id)}
                  style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", background: adminTab === tab.id ? T.accentDim : "transparent", color: adminTab === tab.id ? T.accent : T.textMuted }}>
                  {tab.label}
                </button>
              ))}
            </div>
            {adminTab === "overview" && <AdminOverview t={t} />}
            {adminTab === "campaigns" && <AdminCampaigns t={t} />}
            {adminTab === "channels" && <AdminChannels t={t} />}
            {adminTab === "diagnosis" && <AdminDiagnosis t={t} />}
            {adminTab === "generate" && <FeedbackGenerator t={t} />}
          </div>
        )}
        {view === "client" && <ClientDashboard t={t} />}
      </div>

      <div style={{ padding: "20px 24px", borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
        <span style={{ fontSize: 11, color: T.textDim }}>Classyco Growth OS — Módulo Tráfego & Diagnóstico — Protótipo MVP v0.3</span>
      </div>
    </div>
  );
}
