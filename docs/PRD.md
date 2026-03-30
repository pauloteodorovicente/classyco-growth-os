# PRD — Classyco Growth OS: Módulo Tráfego & Diagnóstico

**Versão:** 1.0  
**Data:** 29/03/2026  
**Proprietário:** Paulo Teodoro Vicente — Classyco Real Estate Advisory  
**Destino:** Claude Code (desenvolvimento), GitHub (versionamento)

---

## 0. PRINCÍPIOS CARDEAIS

Estes princípios são INVIOLÁVEIS durante todo o desenvolvimento. Qualquer decisão técnica deve ser validada contra eles.

### 0.1 — IA somente onde código não resolve

**REGRA DE OURO ABSOLUTA:** Tudo que um código resolver com o mesmo grau de qualidade que uma IA teria, utiliza-se código ao invés de IA. IA entra exclusivamente onde é insubstituível: análise semântica de dados, geração de texto contextualizado, diagnóstico que exige interpretação cruzada de múltiplas variáveis.

Exemplos práticos:
- Calcular CPL médio dos últimos 90 dias → **CÓDIGO** (média aritmética simples)
- Identificar tendência de uma campanha (escalando/estável/deteriorando) → **CÓDIGO** (comparação MM3d vs MM7d com thresholds)
- Sugerir meta de CPL baseado em percentis do histórico → **CÓDIGO** (cálculo estatístico)
- Determinar qual elo do funil é a trava atual → **CÓDIGO** (taxa de conversão entre elos, identificar o maior drop-off relativo)
- Gerar texto do feedback com linguagem natural contextualizada ao perfil do cliente → **IA** (requer interpretação e redação)
- Gerar diagnóstico textual cruzando dados de múltiplos canais com contexto do negócio → **IA** (requer raciocínio complexo)

Em caso de dúvida: **use código**. Só escale para IA se o resultado do código for qualitativamente inferior.

### 0.2 — Zero Débitos Técnicos

O objetivo é ficar sempre o mais próximo possível de ZERO débitos técnicos. Sempre que durante a construção surgir a necessidade de um débito técnico, o desenvolvedor DEVE:

1. **Explicar** por que o débito é necessário neste momento
2. **Descrever** o impacto técnico e funcional do débito
3. **Propor** quando e como será resolvido
4. **Obter aprovação** antes de prosseguir

Débitos técnicos silenciosos são proibidos. TODO comments no código sem justificação documentada são proibidos.

### 0.3 — Execução por etapas sem afobação

Nunca escrever o sistema inteiro de uma vez. Cada módulo deve ser funcional e testável antes de avançar para o próximo. O desenvolvedor deve orientar o proprietário passo a passo, explicando o que está sendo feito e por quê.

---

## 1. VISÃO DO PRODUTO

### 1.1 Resumo

Sistema web de diagnóstico de growth marketing baseado no método "Destrava Receita" — framework científico de identificação de gargalos (travas) e validação de hipóteses. MVP focado em gestão de tráfego pago e canais de aquisição para o mercado imobiliário.

### 1.2 Contexto Estratégico

Este módulo é a **primeira ferramenta** dentro do futuro **Classyco OS** (ERP completo). A arquitetura deve permitir que módulos futuros sejam adicionados sem refatoração significativa. Porém, não deve ser over-engineered — sem API-First, sem microserviços, sem separação de backend agora. Full-stack monolítico com Next.js é a decisão correta para o MVP.

### 1.3 Usuários

| Papel | Descrição | Acesso |
|-------|-----------|--------|
| Admin (Gestor de Tráfego) | Paulo. Visão técnica completa. Gera feedbacks e relatórios. | Total |
| Cliente | Rui da Cruz (e futuros). Visão simplificada e educativa. | Apenas sua visão |

---

## 2. STACK TECNOLÓGICA

### 2.1 Decisões Travadas

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | **Next.js 14+ (App Router)** | Full-stack, React nativo, API Routes embutidas, SSR quando necessário |
| Styling | **Tailwind CSS** | Design tokens fáceis, dark mode nativo, sem CSS custom |
| Linguagem | **TypeScript** | Tipagem forte previne bugs em lógica de métricas |
| Data Hub | **Notion (via API/MCP)** | Já é o sistema operacional da Classyco; permissão total disponível |
| Hosting | **Vercel (plano gratuito)** | Deploy automático, zero config para Next.js |
| Versionamento | **GitHub** | Repositório `classyco-growth-os` |

### 2.2 Decisões Futuras (NÃO implementar no MVP)

- API separada do frontend (só quando houver app mobile)
- React Native para mobile
- Tauri/Electron para desktop
- Integrações de API com Meta Ads / Google Ads / GoHighLevel
- Autenticação e multi-tenancy com permissões granulares

### 2.3 Estrutura de Pastas

```
classyco-growth-os/
├── app/
│   ├── layout.tsx              # Layout raiz com providers
│   ├── page.tsx                # Redirect para /dashboard
│   ├── dashboard/
│   │   ├── page.tsx            # Admin dashboard
│   │   └── client/
│   │       └── page.tsx        # Visão cliente
│   └── api/
│       ├── notion/
│       │   ├── read/route.ts   # Lê dados do Data Hub
│       │   ├── write/route.ts  # Escreve feedback/relatório no Notion
│       │   └── clients/route.ts # Lista clientes do Portal
│       └── reports/
│           └── generate/route.ts # Gera relatório (usa IA apenas para texto)
├── components/
│   ├── ui/                     # Componentes base (Card, Badge, Tooltip, etc.)
│   ├── funnel/
│   │   ├── FunnelView.tsx      # Componente principal com toggle bars/funnel
│   │   ├── FunnelTraditional.tsx # Visualização em formato de funil (SVG)
│   │   └── FunnelBars.tsx      # Visualização em barras horizontais
│   ├── dashboard/
│   │   ├── MetricsRow.tsx
│   │   ├── CampaignTable.tsx
│   │   ├── ChannelList.tsx
│   │   ├── DiagnosisPanel.tsx
│   │   ├── HypothesesList.tsx
│   │   └── StepFramework.tsx
│   ├── feedback/
│   │   ├── FeedbackGenerator.tsx
│   │   ├── WhatsAppPreview.tsx
│   │   └── NotionPreview.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── LanguageSwitcher.tsx
│       └── ViewToggle.tsx
├── lib/
│   ├── notion.ts               # Client do Notion API
│   ├── metrics.ts              # Cálculos de métricas (CPL, CAC, tendências)
│   ├── diagnosis.ts            # Lógica de identificação de travas
│   ├── i18n.ts                 # Traduções (pt-BR, pt-PT, en, es)
│   └── types.ts                # Tipos TypeScript
├── data/
│   └── design-tokens.ts        # Cores, fontes, espaçamentos
├── public/
│   └── flags/                  # SVGs das bandeiras
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── README.md
```

---

## 3. MODELO DE DADOS

### 3.1 Notion como Banco de Dados

O Notion é o banco de dados do MVP. Estrutura de databases necessárias:

#### Database: Data Hub — Métricas de Tráfego
Armazena dados de campanhas por período.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| Cliente | Relation → Portal do Cliente | Qual cliente |
| Período | Date range | Data início e fim |
| Canal | Select | Meta Ads, Idealista, Google, Indicação, Prospecção, Outro |
| Campanha | Text | Nome da campanha (para Meta Ads) |
| Investimento | Number (€) | Valor gasto |
| Impressões | Number | Total de impressões |
| Cliques | Number | Total de cliques |
| Leads | Number | Contatos gerados |
| Visitas Agendadas | Number | Visitas marcadas |
| Vendas | Number | Fechamentos |
| CPL | Formula | Investimento ÷ Leads |
| CTR | Formula | (Cliques ÷ Impressões) × 100 |
| CAC | Formula | Investimento ÷ Vendas |
| Status | Select | Ativo, Pausado, Encerrado |

#### Database: Contexto do Cliente
Armazena informações necessárias para o diagnóstico contextualizado.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| Cliente | Relation → Portal do Cliente | |
| Modelo de Negócio | Select | Corretor Autônomo, Agência Pequena, Imobiliária |
| Tamanho do Time | Select | Eugência, 2-3 pessoas, 4-10, 10+ |
| Canais Ativos | Multi-select | Meta Ads, Google Ads, Idealista, Imovirtual, Indicação, Prospecção, Portal Local |
| CRM Utilizado | Select | GoHighLevel, Hubspot, Nenhum, Outro |
| Observações | Rich Text | Notas livres sobre o cliente |
| STEP - Saber | Number (1-4) | |
| STEP - Ter | Number (1-4) | |
| STEP - Executar | Number (1-4) | |
| STEP - Potencializar | Number (1-4) | |
| Trava Atual | Select | Exposição, Atenção, Interesse, Qualificação, Compromisso, Decisão, Retenção, Indicação |

#### Database: Hipóteses
Rastreia hipóteses do método Destrava Receita.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| Cliente | Relation → Portal do Cliente | |
| Elo | Select | (os 8 elos) |
| Se (condição) | Text | "Se implementarmos X..." |
| Então (resultado) | Text | "então Y acontece..." |
| KPI | Text | Métrica que valida |
| Valor Antes | Number | KPI antes do teste |
| Meta | Number | Valor esperado |
| Valor Depois | Number | KPI após o teste (preenchido depois) |
| Status | Select | Pendente, Em Teste, Validada, Não Validada |
| Ciclo | Number | Número do ciclo de 90 dias |

#### Estrutura existente no Notion (não criar, apenas acessar):
- **Portal do Cliente** → database existente
  - Dentro de cada cliente → **Documentos e Feedbacks** → database existente onde os feedbacks são salvos

---

## 4. LÓGICA DE NEGÓCIO (TUDO EM CÓDIGO)

### 4.1 Cálculo de Métricas — `lib/metrics.ts`

```typescript
// Todas estas funções são CÓDIGO PURO. Sem IA.

// CPL = Investimento / Leads
function calculateCPL(investment: number, leads: number): number

// CAC = Investimento / Vendas
function calculateCAC(investment: number, sales: number): number | null

// CTR = (Cliques / Impressões) * 100
function calculateCTR(clicks: number, impressions: number): number

// ROAS = Receita / Investimento
function calculateROAS(revenue: number, investment: number): number | null

// CPL Meta = Percentil 40 do histórico dos últimos 90 dias
function calculateCPLTarget(historicalCPLs: number[]): number

// Média Móvel
function movingAverage(values: number[], window: number): number

// Tendência da campanha baseada em MM3d vs MM7d
function getCampaignTrend(mm3d: number, mm7d: number): 'escalando' | 'estável' | 'deteriorando' | 'atenção'
// Regras:
// mm3d > mm7d * 1.10 → escalando
// mm3d < mm7d * 0.70 → deteriorando  
// mm3d entre 0.90 e 1.10 de mm7d → estável
// outros → atenção
```

### 4.2 Identificação de Travas — `lib/diagnosis.ts`

```typescript
// CÓDIGO PURO. Sem IA.

// Identifica a trava analisando a maior queda relativa entre elos consecutivos
function identifyTrava(funnelData: FunnelElo[]): TravaResult {
  // Para cada par de elos consecutivos, calcula taxa de conversão
  // A trava é o elo onde a taxa de conversão é a mais baixa 
  // relativa ao benchmark do setor (se disponível) ou relativa à média dos outros elos
}

// Regras de Pausa (gatilhos automáticos)
function shouldPauseCampaign(campaign: CampaignData, cplTarget: number): PauseRecommendation {
  // Se gastou 2x o CPL meta sem gerar lead → PAUSAR
  // Se CTR < 1% por 3 dias seguidos → CRIATIVO FADIGOU
  // Se MM3d < MM7d * 0.60 → DETERIORANDO RÁPIDO
}

// Regras de Escala
function shouldScaleCampaign(campaign: CampaignData, cplTarget: number): ScaleRecommendation {
  // Se CPL < CPL meta E leads estão gerando visitas → ESCALAR
  // Aumento sugerido: 15-20% a cada 2 dias
}
```

### 4.3 Geração de Relatórios — Onde IA entra

A IA (Claude API via Anthropic SDK) é usada EXCLUSIVAMENTE para:

1. **Gerar o texto narrativo** do feedback/relatório, recebendo como input os dados já calculados por código
2. **Contextualizar o diagnóstico** considerando o perfil do cliente (eugência vs equipe, canais ativos, etc.)
3. **Sugerir próximos passos** cruzando dados de múltiplas fontes com contexto de negócio

O prompt para a IA recebe um JSON estruturado com todos os dados já processados. A IA nunca calcula métricas — ela recebe os números prontos e redige o texto.

---

## 5. FUNCIONALIDADES DETALHADAS

### 5.1 Funil dos 8 Elos

**NOTA TÉCNICA:** A visualização em formato de funil (a padrão) deve ser implementada com **SVG** — não CSS puro. Barras CSS não conseguem criar o efeito de afunilamento proporcional aos dados de forma confiável. O SVG permite controle preciso de larguras, posicionamento centralizado, e escalas proporcionais.

Dois modos de visualização com toggle:
- **Funil** (padrão): barras centralizadas, largura proporcional ao valor (escala logarítmica para que valores pequenos ainda sejam visíveis), afunilando visualmente de cima para baixo
- **Barras**: barras horizontais alinhadas à esquerda, largura proporcional linear

Ambos os modos exibem:
- Número do elo, nome, valor, label da métrica (admin) ou só valor (cliente)
- Taxa de conversão para o próximo elo
- Tooltip educativo ao passar mouse no ícone "i"
- Badge "TRAVA" em vermelho no elo identificado como gargalo

### 5.2 Tabela de Campanhas (estilo OpenClaw/Okamoto)

Colunas: Criativo, Gasto, Leads, CPL (com badge colorido), CTR, MM3d, MM7d, Tendência (StatusBadge).

Cores do CPL badge:
- Verde: ≤ CPL meta
- Amarelo: entre CPL meta e CPL meta × 1.2
- Vermelho: > CPL meta × 1.2

Box de "Análise" abaixo da tabela com CPL histórico, meta sugerida, e recomendações automáticas. Estas recomendações são CÓDIGO (regras de pausa/escala), não IA.

### 5.3 Canais de Aquisição

Lista visual de todos os canais com investimento, leads, vendas e CAC.  
Nota informativa de que dados offline são preenchidos manualmente no Notion.

### 5.4 Diagnóstico e Hipóteses

**Painel de Trava:** Card destacado em vermelho mostrando qual elo é a trava, por que (em linguagem do negócio), e ação sugerida.

**Lista de Hipóteses:** Cards com elo vinculado, formato "Se → Então → Medido por", KPI e status. Status visuais: Pendente (amarelo), Validada (verde), Não Validada (vermelho).

### 5.5 Gerador de Feedback / Relatório

**Seletor de período:** Semanal, Quinzenal, Mensal, Personalizado (date range).

**Três tipos de output:**

| Output | Destinatário | Profundidade | Onde salva |
|--------|-------------|-------------|-----------|
| Feedback Cliente | Cliente (via WhatsApp) | Leve — cenário + otimizações | WhatsApp (manual) + Notion |
| Relatório Cliente | Cliente | Médio — resumo executivo, funil, campanhas, próximos passos | Notion |
| Relatório Admin | Paulo | Profundo — contexto operacional, STEP, cross-channel, hipóteses, recomendações por prioridade | Notion |

**Formato Feedback WhatsApp:**
Dividido em 6 mensagens independentes, cada uma com botão "Copiar":
1. Título e introdução
2. Análise (Cenário Encontrado)
3. Otimizações Realizadas
4. Orçamento atual
5. Investimento do período
6. Data do próximo feedback

Formatação: asteriscos para negrito (`*texto*`), bullets com `•`, emojis padronizados.

**Formato Notion:**
Markdown com hierarquia de headings (H1 para título, H2 para seções), bold com `**`, listas com `-`. Sem caracteres especiais que quebrem no Notion.

**Botão "Salvar no Notion":**
Cria página DIRETAMENTE no Notion via API/MCP:
- Local: Portal do Cliente → [Nome do Cliente] → Documentos e Feedbacks
- Ícone: conforme padrão existente (📝 para feedback, 📊 para relatório)
- Nome: "[Tipo] [Número] | Tráfego | [Nome do Cliente]"
- Conteúdo: texto completo formatado

### 5.6 Internacionalização (i18n)

4 idiomas desde o MVP: PT-BR, PT-PT, EN, ES.  
Seletor no header com bandeiras SVG (não emoji).  
Toda a interface e labels traduzidos. Os textos gerados por IA respeitam o idioma selecionado.

### 5.7 Onboarding de Cliente

Antes da primeira análise, o sistema requer um cadastro básico:
- Nome do cliente
- Modelo de negócio (eugência, agência pequena, imobiliária)
- Tamanho do time
- Canais ativos
- CRM utilizado
- STEP inicial (1-4 em cada dimensão)

Estes dados alimentam o motor de diagnóstico para não gerar recomendações irrelevantes (ex: "escale o time" para um corretor que atua sozinho).

---

## 6. DESIGN TOKENS

```typescript
// data/design-tokens.ts

export const tokens = {
  colors: {
    bg: {
      primary: '#0a0e1a',        // Fundo principal
      card: '#111827',            // Cards
      cardHover: '#1a2236',       // Card hover
      surface: '#0f1525',         // Superfícies elevadas
    },
    accent: {
      gold: '#c8a96e',            // Accent principal (dourado)
      goldDim: 'rgba(200,169,110,0.15)',
    },
    semantic: {
      green: '#22c55e',           // Saudável, escalando, validada
      greenDim: 'rgba(34,197,94,0.12)',
      yellow: '#eab308',          // Atenção, fadiga, pendente
      yellowDim: 'rgba(234,179,8,0.12)',
      red: '#ef4444',             // Urgência, pausa, trava
      redDim: 'rgba(239,68,68,0.12)',
      blue: '#3b82f6',            // Info, estável, links
      blueDim: 'rgba(59,130,246,0.12)',
      purple: '#7c6fcd',          // Relatório admin, potencializar
      purpleDim: 'rgba(124,111,205,0.12)',
    },
    text: {
      primary: '#f1f5f9',
      muted: '#94a3b8',
      dim: '#64748b',
    },
    border: {
      default: '#1e293b',
      light: '#334155',
    },
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', -apple-system, sans-serif",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '12px',
    xl: '14px',
  },
}
```

---

## 7. INTEGRAÇÃO COM NOTION

### 7.1 Leitura (Data Hub → Sistema)

O sistema lê as databases do Notion para popular o dashboard. A API route `/api/notion/read` consulta:
- Data Hub de Métricas filtrado por cliente e período
- Contexto do Cliente para alimentar diagnóstico
- Hipóteses ativas do cliente

### 7.2 Escrita (Sistema → Notion)

A API route `/api/notion/write` cria páginas de feedback/relatório dentro da database "Documentos e Feedbacks" do cliente correspondente.

Campos enviados:
- `parent`: page_id da seção "Documentos e Feedbacks" do cliente
- `icon`: emoji adequado
- `title`: nome padronizado
- `content`: blocos Notion (heading, paragraph, bulleted_list, divider)

### 7.3 MCP do Notion

Paulo já tem o MCP do Notion instalado no Claude.ai com permissão total. O sistema pode usar a Notion API diretamente (via `@notionhq/client`) para operações programáticas, e o MCP para operações via chat quando necessário.

---

## 8. FASES DE DESENVOLVIMENTO

### Fase 1 — Esqueleto funcional (Semana 1)

- [ ] Setup do projeto (Next.js, Tailwind, TypeScript, GitHub, Vercel)
- [ ] Estrutura de pastas conforme seção 2.3
- [ ] Design tokens implementados
- [ ] Layout base (Header, ViewToggle, LanguageSwitcher com bandeiras SVG)
- [ ] i18n com as 4 línguas
- [ ] Página admin com as 5 abas navegáveis (conteúdo placeholder)
- [ ] Página cliente com layout base

### Fase 2 — Dashboard com dados mock (Semana 2)

- [ ] Componente de Funil (SVG) com toggle barras/funil e escala proporcional
- [ ] MetricCards reutilizáveis com tooltips
- [ ] Tabela de campanhas com StatusBadges e CPL colorido
- [ ] Lista de canais de aquisição
- [ ] Framework STEP visual
- [ ] Dados mock hardcoded para validação visual

### Fase 3 — Notion como backend (Semana 3)

- [ ] Criar databases no Notion (Data Hub, Contexto do Cliente, Hipóteses)
- [ ] API route de leitura do Notion
- [ ] Substituir dados mock por dados reais do Notion
- [ ] API route de escrita (salvar feedback/relatório)
- [ ] Testar criação de página no local correto

### Fase 4 — Lógica de negócio e diagnóstico (Semana 4)

- [ ] `lib/metrics.ts` — todas as funções de cálculo
- [ ] `lib/diagnosis.ts` — identificação de trava, regras de pausa/escala
- [ ] Painel de diagnóstico conectado aos dados reais
- [ ] Painel de hipóteses conectado ao Notion

### Fase 5 — Gerador de feedback/relatório (Semana 5)

- [ ] Templates dos 3 tipos de output (feedback, relatório cliente, relatório admin)
- [ ] Seletor de período funcional
- [ ] Formato WhatsApp com 6 mensagens separadas e botões copiar
- [ ] Formato Notion com markdown correto
- [ ] Integração com Claude API para geração do texto narrativo (ÚNICO uso de IA)
- [ ] Botão "Salvar no Notion" funcional

### Fase 6 — Polish e deploy (Semana 6)

- [ ] Onboarding de cliente
- [ ] Responsividade mobile
- [ ] Testes end-to-end com dados reais do Rui da Cruz
- [ ] Deploy final na Vercel
- [ ] Documentação do README

---

## 9. ITENS CONHECIDOS PARA RESOLVER

| Item | Descrição | Prioridade |
|------|-----------|-----------|
| Funil SVG | A visualização em formato de funil precisa ser refeita com SVG para garantir afunilamento proporcional correto. CSS puro não resolve. | Alta — Fase 2 |
| Feedback Notion | Testar se a API do Notion preserva formatação de emojis nos títulos de página e ícones | Média — Fase 3 |
| Multi-tenant | Estrutura atual suporta seleção de cliente, mas não tem auth. Deixar preparado com `clientId` como parâmetro em todas as queries. | Baixa — preparar, não implementar |

---

## 10. INSTRUÇÕES PARA O CLAUDE CODE

Ao receber este PRD:

1. **Leia o documento inteiro** antes de escrever qualquer código.
2. **Faça perguntas** se algo estiver ambíguo — não assuma.
3. **Siga as fases na ordem.** Não pule para a Fase 3 sem a Fase 2 estar completa e aprovada.
4. **Respeite os Princípios Cardeais** (seção 0). Especialmente: IA só onde código não resolve, e zero débitos técnicos silenciosos.
5. **Oriente o Paulo** sobre o que ele precisa fazer no ambiente local (instalar dependências, configurar variáveis de ambiente, etc.).
6. **Mostre o progresso** ao final de cada fase antes de avançar.
7. **Ao encontrar necessidade de débito técnico:** pare, explique, proponha solução, e espere aprovação.

Junto com este PRD, o Paulo pode fornecer:
- O protótipo visual em React (Artifact do Claude.ai) como referência de design
- Screenshots do Notion com a estrutura do Portal do Cliente
- PDF de feedback existente como template de tom de voz
- Transcrição do método Destrava Receita como referência metodológica
