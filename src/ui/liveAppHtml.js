// backend/src/ui/liveAppHtml.js
export function getLiveAppHtml() {
  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>BJJ & Strength Hybrid — App Live</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: #09090b;
      color: #fafafa;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #09090b; }
    ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 9999px; }
  </style>
</head>
<body class="bg-zinc-950 text-zinc-50 min-h-screen flex justify-center">
  <!-- Mobile App Container -->
  <div id="app" class="w-full max-w-md min-h-screen bg-zinc-950 border-x border-zinc-900 flex flex-col relative pb-28">
    <!-- Top Status Bar -->
    <header class="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-400">
          BJJ + FORÇA HÍBRIDO
        </span>
      </div>
      <div id="api-badge" class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        API NODE.JS ONLINE
      </div>
    </header>

    <!-- Main Dynamic View -->
    <main id="main-view" class="flex-1 px-4 pt-5"></main>

    <!-- Floating Rest Timer Bar -->
    <div id="rest-timer-bar" class="hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[26rem] z-30 rounded-2xl border border-blue-500/50 bg-zinc-900/95 backdrop-blur px-4 py-3 shadow-2xl flex items-center justify-between">
      <div>
        <div class="text-[10px] font-bold uppercase tracking-wider text-blue-400">Descanso em andamento</div>
        <div id="rest-timer-display" class="text-2xl font-extrabold text-zinc-50 tabular-nums">01:30</div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="window.appActions.addRestSeconds(15)" class="rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 text-xs font-bold text-zinc-200 transition">
          +15s
        </button>
        <button onclick="window.appActions.skipRest()" class="rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 px-3 py-2 text-xs font-bold text-red-300 transition">
          Pular
        </button>
      </div>
    </div>

    <!-- Modal: Check-in Pós-Jiu-Jitsu (30s) -->
    <div id="checkin-modal" class="hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-end justify-center">
      <div class="w-full max-w-md rounded-t-3xl border-t border-zinc-800 bg-zinc-900 p-5 shadow-2xl animate-slide-up">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center rounded-full border border-purple-500/40 bg-purple-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-300">
            CHECK-IN RÁPIDO • 30 SEGUNDOS
          </span>
          <button onclick="window.appActions.closeCheckin()" class="text-xs font-bold text-zinc-400 hover:text-zinc-200 px-2 py-1">✕ Fechar</button>
        </div>
        <h3 class="mt-2 text-lg font-extrabold text-zinc-50">Como foi o treino de Jiu-Jitsu?</h3>
        <p class="text-xs text-zinc-400">O motor de prontidão ajusta automaticamente o volume e protege suas articulações no treino de amanhã.</p>

        <!-- Rolas Stepper -->
        <div class="mt-4 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
          <div>
            <div class="text-xs font-bold text-zinc-200">Quantidade de Rolas (6 min)</div>
            <div class="text-[11px] text-zinc-400">Total de combates no tatame hoje</div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.appActions.changeRounds(-1)" class="h-8 w-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-base font-bold text-zinc-200 flex items-center justify-center">−</button>
            <span id="checkin-rounds" class="text-lg font-extrabold text-zinc-50 w-5 text-center">5</span>
            <button onclick="window.appActions.changeRounds(1)" class="h-8 w-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-base font-bold text-white flex items-center justify-center">+</button>
          </div>
        </div>

        <!-- RPE Selector -->
        <div class="mt-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-zinc-300">Intensidade do Treino (RPE 1 a 10)</span>
            <span id="checkin-rpe-label" class="text-xs font-extrabold text-amber-400">RPE 8 (Guerra / Intenso)</span>
          </div>
          <div id="rpe-buttons" class="mt-2 grid grid-cols-5 gap-1.5"></div>
        </div>

        <!-- Body Stress Tags -->
        <div class="mt-4">
          <span class="text-xs font-bold text-zinc-300">Sentiu desgaste articular ou muscular específico?</span>
          <div id="stress-tags-container" class="mt-2 flex flex-wrap gap-2"></div>
        </div>

        <div class="mt-5 flex gap-2">
          <button onclick="window.appActions.closeCheckin()" class="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 py-3 text-xs font-bold text-zinc-300">
            Cancelar
          </button>
          <button onclick="window.appActions.submitCheckin()" class="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-extrabold text-white shadow-lg shadow-blue-600/25">
            Salvar & Ajustar Treino
          </button>
        </div>
      </div>
    </div>

    <!-- Modal: 1-Touch Machine Swap (Plano A / B / C) -->
    <div id="swap-modal" class="hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-end justify-center">
      <div class="w-full max-w-md rounded-t-3xl border-t border-zinc-800 bg-zinc-900 p-5 shadow-2xl">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            🔄 APARELHO OCUPADO? TROCA EM 1 TOQUE
          </span>
          <button onclick="window.appActions.closeSwap()" class="text-xs font-bold text-zinc-400 hover:text-zinc-200 px-2 py-1">✕</button>
        </div>
        <h3 id="swap-title" class="mt-2 text-lg font-extrabold text-zinc-50">Substituir Exercício</h3>
        <p class="text-xs text-zinc-400">Escolha uma variação biomecânica equivalente disponível agora na academia:</p>
        <div id="swap-options-list" class="mt-3 space-y-2.5"></div>
      </div>
    </div>
  </div>

  <script>
    const WEEKLY_SCHEDULE = [
      { day: 'SEG', type: 'BJJ', label: 'Jiu-Jitsu (20h30–22h00)' },
      { day: 'TER', type: 'GYM', label: 'Treino A • Empurrar & Ombros', workoutCode: 'A' },
      { day: 'QUA', type: 'BJJ', label: 'Jiu-Jitsu (20h30–22h00)' },
      { day: 'QUI', type: 'GYM', label: 'Treino B • Puxar & Pegada', workoutCode: 'B' },
      { day: 'SEX', type: 'BJJ', label: 'Jiu-Jitsu (20h30–22h00)' },
      { day: 'SÁB', type: 'GYM', label: 'Treino C • Pernas & Quadril', workoutCode: 'C' },
      { day: 'DOM', type: 'REST', label: 'Descanso Total (Recuperação SNC)' },
    ];

    const STRESS_OPTIONS = [
      { key: 'ombro', label: '🛡️ Ombro / Manguito' },
      { key: 'lombar', label: '🛡️ Lombar (Guarda)' },
      { key: 'pegada', label: '🥋 Pegada / Antebraço' },
      { key: 'pescoco', label: '🛡️ Pescoço / Cervical' },
      { key: 'joelho', label: '🦵 Joelho' },
    ];

    const state = {
      view: 'home', // 'home' | 'workout'
      selectedCode: 'A',
      workouts: {},
      readinessSummary: 'Carregando prontidão da API Node.js...',
      selectedTiers: {},
      completedSets: {},
      weightsInput: {},
      repsInput: {},
      restRemaining: null,
      restInterval: null,
      swapExerciseId: null,
      checkinRounds: 5,
      checkinRpe: 8,
      checkinTags: ['ombro'],
    };

    async function loadWorkouts() {
      try {
        const res = await fetch('/api/workouts');
        const data = await res.json();
        state.workouts = data.workouts;
        state.readinessSummary = data.readiness_summary;
        render();
      } catch (err) {
        console.error(err);
      }
    }

    function formatTime(secs) {
      const m = Math.floor(secs / 60).toString().padStart(2, '0');
      const s = (secs % 60).toString().padStart(2, '0');
      return m + ':' + s;
    }

    function updateTimerUI() {
      const bar = document.getElementById('rest-timer-bar');
      const display = document.getElementById('rest-timer-display');
      if (state.restRemaining !== null && state.restRemaining > 0) {
        bar.classList.remove('hidden');
        display.textContent = formatTime(state.restRemaining);
      } else {
        bar.classList.add('hidden');
      }
    }

    function startRestTimer(seconds) {
      state.restRemaining = seconds;
      updateTimerUI();
      if (state.restInterval) clearInterval(state.restInterval);
      state.restInterval = setInterval(() => {
        if (state.restRemaining !== null && state.restRemaining > 0) {
          state.restRemaining -= 1;
          updateTimerUI();
        } else {
          clearInterval(state.restInterval);
          state.restRemaining = null;
          updateTimerUI();
        }
      }, 1000);
    }

    function renderHome() {
      const currentWorkout = state.workouts[state.selectedCode];
      if (!currentWorkout) return '<div class="py-10 text-center text-zinc-400">Carregando...</div>';

      const scheduleHtml = WEEKLY_SCHEDULE.map((item) => {
        const isSelected = item.workoutCode === state.selectedCode;
        const badgeClass =
          item.type === 'BJJ'
            ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
            : item.type === 'GYM'
            ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
            : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300';

        const clickAction = item.workoutCode
          ? "window.appActions.selectWorkout('" + item.workoutCode + "')"
          : item.type === 'BJJ'
          ? 'window.appActions.openCheckin()'
          : '';

        return \`
          <div onclick="\${clickAction}" class="cursor-pointer flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition \${
            isSelected ? 'border-blue-500 bg-blue-950/30' : 'border-zinc-800 bg-zinc-900/80 hover:border-zinc-700'
          }">
            <div class="flex items-center gap-3">
              <span class="w-9 text-xs font-extrabold text-zinc-100">\${item.day}</span>
              <span class="text-xs font-semibold text-zinc-300">\${item.label}</span>
            </div>
            <span class="rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold \${badgeClass}">\${item.type}</span>
          </div>
        \`;
      }).join('');

      const tabsHtml = ['A', 'B', 'C']
        .map(
          (code) => \`
          <button onclick="window.appActions.selectWorkout('\${code}')" class="flex-1 rounded-xl border py-2.5 text-xs font-extrabold transition \${
            state.selectedCode === code
              ? 'border-blue-500 bg-blue-600/25 text-white'
              : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200'
          }">
            Treino \${code}
          </button>
        \`
        )
        .join('');

      return \`
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-zinc-50">BJJ & Strength Hybrid</h1>
          <p class="mt-1 text-xs text-zinc-400">
            Metodologia Leandro Twin • 3x Jiu-Jitsu (Seg/Qua/Sex) + 3x Musculação (Ter/Qui/Sáb)
          </p>

          <!-- Readiness Card -->
          <div class="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-4">
            <div class="flex items-center justify-between">
              <span class="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-400">
                STATUS DE PRONTIDÃO
              </span>
              <button onclick="window.appActions.resetReadiness()" class="text-xs font-bold text-emerald-400 underline hover:text-emerald-300">
                Resetar 100%
              </button>
            </div>
            <h2 class="mt-2 text-base font-bold text-zinc-100">Adaptação Dinâmica Pós-Tatame</h2>
            <p class="mt-1 text-xs text-zinc-300 leading-relaxed">\${state.readinessSummary}</p>
            <button onclick="window.appActions.openCheckin()" class="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 py-2.5 text-xs font-extrabold text-zinc-100 transition">
              🥋 Registrar Check-in Pós-Jiu (30s)
            </button>
          </div>

          <!-- Weekly Schedule -->
          <div class="mt-6">
            <div class="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Cronograma Semanal (Seg – Dom)</div>
            <div class="mt-2 space-y-2">\${scheduleHtml}</div>
          </div>

          <!-- Workout Preview Card -->
          <div class="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <span class="inline-block rounded-full border border-blue-500/40 bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-extrabold text-blue-400">
              \${currentWorkout.tag}
            </span>
            <h3 class="mt-2 text-lg font-extrabold text-zinc-50">\${currentWorkout.title}</h3>
            <p class="mt-1 text-xs text-zinc-400">\${currentWorkout.description}</p>
            <div class="mt-3 flex gap-2">\${tabsHtml}</div>
            <button onclick="window.appActions.openWorkout()" class="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition">
              Iniciar \${currentWorkout.title} (\${currentWorkout.exercises.length} exercícios) →
            </button>
          </div>
        </div>
      \`;
    }

    function renderWorkout() {
      const workout = state.workouts[state.selectedCode];
      if (!workout) return '';

      const exercisesHtml = workout.exercises
        .map((ex, exIdx) => {
          const activeTier = state.selectedTiers[ex.id] || ex.auto_swapped_to_tier || 'A';
          const activeAlt = (ex.alternatives || []).find((a) => a.tier === activeTier);
          const displayName = activeAlt ? activeAlt.name : ex.name;
          const displayVideo = activeAlt ? activeAlt.video_url : ex.video_url;
          const setsCount = ex.adjusted_sets || ex.default_sets;

          const setsRows = Array.from({ length: setsCount })
            .map((_, idx) => {
              const setNum = idx + 1;
              const setKey = ex.id + '_set_' + setNum;
              const isDone = !!state.completedSets[setKey];
              const weightVal = state.weightsInput[setKey] || '';
              const repsVal = state.repsInput[setKey] || '';

              return \`
                <div class="flex items-center justify-between rounded-xl border px-3 py-2 transition \${
                  isDone ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950'
                }">
                  <span class="w-14 text-xs font-bold text-zinc-300">Série \${setNum}</span>
                  <input
                    type="number"
                    placeholder="Carga (kg)"
                    value="\${weightVal}"
                    oninput="window.appActions.setWeight('\${setKey}', this.value)"
                    class="w-24 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-center text-xs font-bold text-zinc-100 focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="\${ex.reps_range}"
                    value="\${repsVal}"
                    oninput="window.appActions.setReps('\${setKey}', this.value)"
                    class="w-20 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-center text-xs font-bold text-zinc-100 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onclick="window.appActions.toggleSet('\${ex.id}', \${setNum}, \${ex.rest_seconds}, '\${activeTier}')"
                    class="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-extrabold transition \${
                      isDone ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }"
                  >
                    ✓
                  </button>
                </div>
              \`;
            })
            .join('');

          return \`
            <div class="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1">
                  <div class="text-[11px] font-bold uppercase text-blue-400">Exercício \${exIdx + 1} • Opção \${activeTier}</div>
                  <h3 class="text-base font-extrabold text-zinc-50 mt-0.5">\${displayName}</h3>
                  <p class="text-xs text-zinc-400">\${ex.target_muscle}</p>
                </div>
                <a
                  href="\${displayVideo}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="shrink-0 rounded-xl bg-red-600 hover:bg-red-500 px-3 py-2 text-[11px] font-extrabold text-white shadow"
                >
                  ▶ Execução
                </a>
              </div>

              <p class="mt-2 text-xs text-zinc-300 bg-zinc-950/60 rounded-lg p-2 border border-zinc-800/80">
                🥋 <strong class="text-zinc-200">Jiu-Jitsu:</strong> \${ex.bjj_benefit}
              </p>

              <div class="mt-2.5 flex flex-wrap gap-1.5">
                <span class="rounded-full border border-blue-500/40 bg-blue-500/15 px-2.5 py-0.5 text-[11px] font-bold text-blue-300">
                  \${setsCount} séries × \${ex.reps_range}
                </span>
                <span class="rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                  ⏱️ Descanso: \${ex.rest_seconds}s
                </span>
                <span class="rounded-full border border-purple-500/40 bg-purple-500/15 px-2.5 py-0.5 text-[11px] font-bold text-purple-300">
                  🎯 RIR \${ex.recommended_rir || 1}–2
                </span>
              </div>

              \${
                ex.auto_swap_reason
                  ? \`<div class="mt-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300">🛡️ \${ex.auto_swap_reason}</div>\`
                  : ''
              }

              <!-- 1-Touch Machine Swap Button -->
              <button
                onclick="window.appActions.openSwap('\${ex.id}')"
                class="mt-3 w-full flex items-center justify-between rounded-xl border border-dashed border-zinc-700 bg-zinc-950/80 hover:border-blue-500 px-3 py-2.5 transition"
              >
                <span class="text-xs font-bold text-blue-400">🔄 Aparelho ocupado? Trocar (Plano B / C)</span>
                <span class="text-[11px] font-bold text-zinc-400">Ativo: Opção \${activeTier} ▾</span>
              </button>

              <!-- Sets Table -->
              <div class="mt-3 space-y-2">\${setsRows}</div>
            </div>
          \`;
        })
        .join('');

      return \`
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
            <button onclick="window.appActions.backToHome()" class="rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-200">
              ← Voltar ao Painel
            </button>
            <span class="rounded-full border border-blue-500/40 bg-blue-500/15 px-3 py-0.5 text-xs font-extrabold text-blue-400">
              TREINO \${workout.code}
            </span>
          </div>

          <div class="mt-4">
            <span class="rounded-full border border-blue-500/40 bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-extrabold text-blue-400">
              \${workout.tag}
            </span>
            <h1 class="mt-2 text-2xl font-extrabold text-zinc-50">\${workout.title}</h1>
            <p class="mt-1 text-xs text-zinc-400">\${workout.description}</p>
          </div>

          <div class="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
            <div class="text-xs font-bold text-amber-300">⚡ \${state.readinessSummary}</div>
          </div>

          \${exercisesHtml}
        </div>
      \`;
    }

    function renderCheckinModalControls() {
      document.getElementById('checkin-rounds').textContent = state.checkinRounds;
      const rpeDesc =
        state.checkinRpe >= 9
          ? 'Guerra Absoluta (Fadiga Alta)'
          : state.checkinRpe >= 8
          ? 'Rola Duro / Intenso'
          : state.checkinRpe >= 6
          ? 'Moderado / Técnico'
          : 'Soltinho / Leve';
      document.getElementById('checkin-rpe-label').textContent = 'RPE ' + state.checkinRpe + ' (' + rpeDesc + ')';

      const rpeBtns = [5, 6, 7, 8, 9, 10]
        .map(
          (val) => \`
          <button
            onclick="window.appActions.setRpe(\${val})"
            class="rounded-xl border py-2 text-xs font-extrabold transition \${
              state.checkinRpe === val
                ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                : 'border-zinc-800 bg-zinc-950 text-zinc-400'
            }"
          >
            \${val}
          </button>
        \`
        )
        .join('');
      document.getElementById('rpe-buttons').innerHTML = rpeBtns;

      const tagsHtml = STRESS_OPTIONS.map((tag) => {
        const active = state.checkinTags.includes(tag.key);
        return \`
          <button
            onclick="window.appActions.toggleTag('\${tag.key}')"
            class="rounded-full border px-3 py-1.5 text-xs font-bold transition \${
              active
                ? 'border-red-500 bg-red-500/20 text-red-300'
                : 'border-zinc-800 bg-zinc-950 text-zinc-400'
            }"
          >
            \${tag.label}
          </button>
        \`;
      }).join('');
      document.getElementById('stress-tags-container').innerHTML = tagsHtml;
    }

    function render() {
      const container = document.getElementById('main-view');
      container.innerHTML = state.view === 'home' ? renderHome() : renderWorkout();
    }

    window.appActions = {
      selectWorkout(code) {
        state.selectedCode = code;
        render();
      },
      openWorkout() {
        state.view = 'workout';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      },
      backToHome() {
        state.view = 'home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      },
      openCheckin() {
        renderCheckinModalControls();
        document.getElementById('checkin-modal').classList.remove('hidden');
      },
      closeCheckin() {
        document.getElementById('checkin-modal').classList.add('hidden');
      },
      changeRounds(delta) {
        state.checkinRounds = Math.max(1, Math.min(15, state.checkinRounds + delta));
        renderCheckinModalControls();
      },
      setRpe(val) {
        state.checkinRpe = val;
        renderCheckinModalControls();
      },
      toggleTag(key) {
        if (state.checkinTags.includes(key)) {
          state.checkinTags = state.checkinTags.filter((t) => t !== key);
        } else {
          state.checkinTags.push(key);
        }
        renderCheckinModalControls();
      },
      async submitCheckin() {
        await fetch('/api/bjj-sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rounds_count: state.checkinRounds,
            round_duration_min: 6,
            rpe_intensity: state.checkinRpe,
            body_stress_tags: state.checkinTags,
          }),
        });
        document.getElementById('checkin-modal').classList.add('hidden');
        await loadWorkouts();
      },
      async resetReadiness() {
        await fetch('/api/bjj-sessions', { method: 'DELETE' });
        state.selectedTiers = {};
        await loadWorkouts();
      },
      setWeight(key, val) {
        state.weightsInput[key] = val;
      },
      setReps(key, val) {
        state.repsInput[key] = val;
      },
      async toggleSet(exId, setNum, restSecs, activeTier) {
        const key = exId + '_set_' + setNum;
        const next = !state.completedSets[key];
        state.completedSets[key] = next;
        render();
        if (next) {
          startRestTimer(restSecs);
          await fetch('/api/sets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              workout_code: state.selectedCode,
              exercise_id: exId,
              chosen_tier: activeTier,
              set_number: setNum,
              weight_kg: Number(state.weightsInput[key] || 0),
              reps_done: Number(state.repsInput[key] || 8),
            }),
          });
        }
      },
      addRestSeconds(delta) {
        state.restRemaining = (state.restRemaining || 0) + delta;
        updateTimerUI();
      },
      skipRest() {
        state.restRemaining = null;
        if (state.restInterval) clearInterval(state.restInterval);
        updateTimerUI();
      },
      openSwap(exId) {
        const workout = state.workouts[state.selectedCode];
        const ex = workout.exercises.find((e) => e.id === exId);
        if (!ex) return;
        state.swapExerciseId = exId;
        const activeTier = state.selectedTiers[ex.id] || ex.auto_swapped_to_tier || 'A';
        document.getElementById('swap-title').textContent = ex.name;

        const options = [
          {
            tier: 'A',
            badge: 'OPÇÃO A • PRINCIPAL (PADRÃO OURO)',
            name: ex.name,
            reason: ex.bjj_benefit,
            video_url: ex.video_url,
          },
          ...(ex.alternatives || []).map((alt) => ({
            tier: alt.tier,
            badge: 'OPÇÃO ' + alt.tier + ' • ' + alt.equipment.toUpperCase(),
            name: alt.name,
            reason: alt.reason_to_use,
            video_url: alt.video_url,
          })),
        ];

        document.getElementById('swap-options-list').innerHTML = options
          .map(
            (opt) => \`
            <div
              onclick="window.appActions.selectSwapTier('\${opt.tier}')"
              class="cursor-pointer rounded-2xl border p-3.5 transition \${
                activeTier === opt.tier
                  ? 'border-blue-500 bg-blue-500/15'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
              }"
            >
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">\${opt.badge}</span>
                <a href="\${opt.video_url}" target="_blank" onclick="event.stopPropagation()" class="text-[11px] font-bold text-red-400 underline">▶ Ver Vídeo</a>
              </div>
              <div class="mt-1 text-sm font-bold text-zinc-100">\${opt.name}</div>
              <div class="mt-0.5 text-xs text-zinc-400">\${opt.reason}</div>
            </div>
          \`
          )
          .join('');

        document.getElementById('swap-modal').classList.remove('hidden');
      },
      selectSwapTier(tier) {
        if (state.swapExerciseId) {
          state.selectedTiers[state.swapExerciseId] = tier;
        }
        document.getElementById('swap-modal').classList.add('hidden');
        render();
      },
      closeSwap() {
        document.getElementById('swap-modal').classList.add('hidden');
      },
    };

    loadWorkouts();
  </script>
</body>
</html>`;
}
