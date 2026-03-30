# Classyco Growth OS — Briefing do Projeto

**Autor:** Paulo Teodoro Vicente  
**Empresa:** Classyco Real Estate Advisory  
**Data:** 29/03/2026  
**Versão:** 1.0

---

## 1. O que é este projeto

O Classyco Growth OS é o **Módulo 1** de um futuro sistema operacional (ERP) da Classyco. Este primeiro módulo é um **Painel de Diagnóstico de Growth Marketing** focado no mercado imobiliário.

Não é apenas um dashboard de métricas. É uma **máquina de diagnóstico** baseada no método científico aplicado ao marketing — o método "Destrava Receita", inspirado na V4 Company / Denner Lipert. O sistema identifica onde está a "trava" (gargalo) que impede o crescimento do negócio do cliente, formula hipóteses testáveis, e acompanha a validação dessas hipóteses em ciclos de 90 dias.

O MVP será usado inicialmente para gerenciar o tráfego pago e canais de aquisição do **Rui da Cruz**, corretor autónomo em Portugal. Mas a estrutura já nasce pronta para múltiplos clientes.

---

## 2. Quem usa o sistema

**Gestor de Tráfego (Admin):** Paulo, fundador da Classyco. Precisa de visão técnica profunda — métricas detalhadas, tendências de campanhas, diagnóstico de travas, geração de relatórios e feedbacks.

**Cliente:** Rui da Cruz (e futuros clientes). Precisa entender em 5 segundos o que está acontecendo com seu investimento. Linguagem simples, visual educativo, tooltips explicando cada conceito.

---

## 3. De onde vêm os dados

**MVP — Sem integrações de API complexas.** Todas as fontes alimentam um Data Hub centralizado no Notion:

- **Meta Ads:** Paulo exporta CSV ou tira print do Gerenciador de Anúncios → Claude (via MCP do Notion) preenche a base.
- **Canais offline:** Idealista, Indicação, Google Meu Negócio, Prospecção Direta — preenchidos manualmente pelo Paulo ou pelo cliente.
- **Dados de venda/visita:** Quando disponíveis, o cliente preenche numa estrutura simples no Notion.

**Futuro:** Integração via API com Meta Ads, Google Ads, GoHighLevel quando Paulo tiver conta própria (não subconta).

---

## 4. O método por trás do sistema

### 4.1 A Fábrica de Receita (8 Elos do Funil)

Toda empresa é uma fábrica de receita com 8 elos sequenciais. A "trava" é o elo mais fraco que limita o crescimento:

1. **Exposição** — Quantas pessoas veem os anúncios
2. **Atenção** — Quantas param e clicam
3. **Interesse** — Quantas exploram o conteúdo
4. **Qualificação** — Quantas iniciam contato
5. **Compromisso** — Quantas agendam visita
6. **Decisão** — Quantas fazem proposta
7. **Retenção** — Quantas voltam a comprar
8. **Indicação** — Quantas recomendam

### 4.2 Framework STEP (Nível de Maturidade)

Avalia o cliente em 4 dimensões, cada uma de 1 a 4:

- **S (Saber):** Consciência sobre seus próprios dados e métricas
- **T (Ter):** Infraestrutura disponível (CRM, ferramentas, automações)
- **E (Executar):** Capacidade operacional de time e processos
- **P (Potencializar):** Capacidade de escalar com o que já tem

### 4.3 Hipóteses Testáveis

Formato obrigatório: **"Se fizermos X → então Y acontece → medido por Z"**
Os KPIs são definidos ANTES de executar. Cada hipótese pode ser: Pendente, Validada, Não Validada.

### 4.4 Ciclo de 90 dias

Resolver uma trava → a próxima trava emerge → novo ciclo. Crescimento composto ao longo do tempo. Otimizações locais que não atacam o elo mais fraco não movem o sistema.

---

## 5. O que o sistema faz

### 5.1 Visão Admin — 5 abas

**Visão Geral:** KPIs principais (Investimento, CPL Médio, Leads, CAC), funil dos 8 elos com indicação visual da trava, e framework STEP do cliente.

**Campanhas:** Tabela detalhada de criativos do Meta Ads — Gasto, Leads, CPL, CTR, Média Móvel 3d e 7d, e etiquetas de tendência (Escalando/Estável/Deteriorando/Atenção). Painel de análise com sugestão de CPL ideal baseado em histórico.

**Canais:** Visão consolidada de TODOS os canais de aquisição (Meta Ads, Idealista, Google, Indicação, Prospecção), com investimento, leads, vendas e CAC por canal.

**Diagnóstico:** Identificação da trava atual com explicação contextualizada ao perfil do cliente. Painel de hipóteses ativas no formato "Se X → então Y → medido por Z" com status de validação.

**Gerar Feedback / Relatório:** Três tipos de output:
- **Feedback Cliente** — formato WhatsApp (6 mensagens separadas com botão copiar individual) e formato Notion (markdown compatível + criação direta da página via MCP)
- **Relatório Cliente** — documento completo com resumo executivo, tabela de funil, análise de campanhas e próximos passos
- **Relatório Admin** — documento profundo com contexto operacional, STEP detalhado, performance por campanha com ações, cross-channel, hipóteses e recomendações por prioridade temporal

Seletor de período: Semanal, Quinzenal, Mensal, ou intervalo personalizado.

### 5.2 Visão Cliente

Métricas simplificadas em linguagem acessível. Funil visual com tooltips educativos (ícone "i"). Resumo do que está funcionando. Dados de investimento e próximo feedback.

### 5.3 Funcionalidades Transversais

- **Troca de idioma** com bandeiras: PT-BR, PT-PT, EN, ES
- **Funil com duas visualizações:** formato funil (padrão) e barras horizontais
- **Onboarding de cliente:** cadastro com perfil do negócio (eugência vs equipe, canais ativos, etc.) para contextualizar os diagnósticos
- **Integração Notion:** leitura e escrita direta via MCP — feedback salvo com ícone, nome e local corretos

---

## 6. Design

**Tema:** Dark mode obrigatório na visão cliente. Azul marinho sofisticado.  
**Referências visuais:** Painel OpenClaw do Bruno Okamoto (tabela de criativos com etiquetas), HTML do Método Destrava Receita (cards, funil visual, tipografia).  
**Cores semânticas:** Verde (saudável/escala), Amarelo (atenção/fadiga), Vermelho (urgência/pausa).  
**Tipografia:** Playfair Display para títulos, DM Sans para corpo.  
**Componentes:** Cantos arredondados, bordas sutis, espaçamento generoso.

---

## 7. Visão de futuro (não é MVP)

- **Classyco OS completo** — ERP com múltiplos módulos (Financeiro, CRM, Conteúdo, etc.)
- **Apps mobile e desktop** — React Native para mobile, Tauri/Electron para desktop
- **Integrações via API** — Meta Ads, Google Ads, GoHighLevel
- **Envio automático via WhatsApp** — feedback direto para o cliente
- **Decisões automatizadas** — pausar/escalar campanhas baseado em regras pré-definidas
- **Multi-tenant completo** — workspace por cliente com permissões granulares

---

## 8. Tom de voz dos outputs

**Feedback/Relatório do cliente:** Corporativo mas natural. Otimista sem ser forçado. Usa analogias quando ajuda. Mostra métricas com contexto ("3% de taxa de cliques — acima da média do mercado"). Nunca jargão sem explicação.

**Relatório Admin:** Direto, técnico, denso. Assume fluência em marketing digital. Foco em dados, diagnóstico e ação.
