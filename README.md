# 🥋 BJJ Hybrid Backend (Node.js + PostgreSQL + Docker)

API REST em **Node.js (ES Modules)** e banco de dados **PostgreSQL 16** para conciliação inteligente entre **Jiu-Jítsu e Musculação**, baseada na metodologia de periodização de **Leandro Twin**.

## 🚀 Funcionalidades

- **Catálogo Padrão Ouro + Alternativas (Plano B e C):** 3 divisões de treino (Treinos A, B e C), 19 exercícios principais e 38 substituições táticas com links de execução em vídeo.
- **Motor de Auto-regulação de Fadiga (`src/autoreg/engine.js`):**
  - **RPE $\ge$ 8 no Tatame:** Reduz automaticamente 1 série do primeiro exercício composto e trava o RIR em 2 para proteger o Sistema Nervoso Central.
  - **Estresse na Lombar (`lombar`):** Sugere troca automática do Levantamento Terra Romeno / Remada Livre para a Opção C sem compressão axial (Banco Romano 45° / Máquina).
  - **Estresse no Ombro (`ombro`):** Adiciona 1 série preventiva no Manguito Rotador e prioriza halteres com pegada neutra.
  - **Fadiga de Pegada (`pegada`):** Ajusta a Barra Fixa para Puxada Alta no Pulley.

## 🐳 Como Rodar na VPS com Docker

```bash
docker compose up -d --build
```

## 🧪 Como Rodar os Testes Automatizados

```bash
node --test src/**/*.test.js
```

## 📡 Rotas da API

- `GET /api/health` — Status do servidor
- `GET /api/workouts/:code/readiness` — Retorna o treino (`A`, `B` ou `C`) já adaptado conforme o último treino de Jiu-Jítsu
- `POST /api/bjj-sessions` — Registra o check-in pós-rola (quantidade de rolas, RPE e tags articulares)
- `GET /api/bjj-sessions` — Lista histórico de treinos de Jiu-Jítsu
- `POST /api/sets` — Registra carga, repetições e RIR série a série
