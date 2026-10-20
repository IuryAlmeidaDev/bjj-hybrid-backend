// backend/src/autoreg/engine.js
export function applyReadiness(workout, lastBjj = null) {
  const cloned = structuredClone(workout);

  for (const ex of cloned.exercises) {
    ex.adjusted_sets = ex.default_sets;
    ex.recommended_rir = 1;
  }

  if (!lastBjj) {
    return {
      recovery_score: 100,
      status_banner: 'Recuperação 100% — Treino padrão ouro liberado com carga total.',
      alerts: [],
      workout: cloned,
    };
  }

  const rpe = Number(lastBjj.rpe_intensity || 0);
  const rounds = Number(lastBjj.rounds_count || 0);
  const tags = Array.isArray(lastBjj.body_stress_tags) ? lastBjj.body_stress_tags : [];

  const score = Math.max(25, 100 - rpe * 5 - rounds * 3);
  const alerts = [];
  let statusBanner = 'Prontidão Normal — Siga o plano mantendo 1 a 2 repetições na reserva.';

  // Rule 1: High RPE (>= 8) reduces 1 set from primary compound and locks RIR to 2
  if (rpe >= 8) {
    statusBanner = 'Fadiga Alta do Tatame Detectada — Volume ajustado para proteger o SNC.';
    alerts.push(
      'Rola intenso ontem (RPE >= 8): reduzimos 1 série do primeiro exercício composto e travamos o RIR em 2.'
    );
    cloned.exercises.forEach((ex, idx) => {
      ex.recommended_rir = 2;
      if (idx === 0 && ex.adjusted_sets > 2) {
        ex.adjusted_sets = ex.default_sets - 1;
      }
    });
  }

  // Rule 2: Lower back fatigue ('lombar')
  if (tags.includes('lombar')) {
    alerts.push(
      'Atenção Lombar: RDL e Remada Livre sugerem troca automática para Opção C (sem compressão axial).'
    );
    for (const ex of cloned.exercises) {
      if (ex.slug === 'rdl_terra_romeno' || ex.slug === 'remada_curvada') {
        ex.auto_swapped_to_tier = 'C';
        ex.auto_swap_reason =
          'Lombar fadigada no Jiu-Jítsu: priorize a Opção C para evitar compressão vertebral.';
      }
    }
  }

  // Rule 3: Shoulder stress ('ombro')
  if (tags.includes('ombro')) {
    alerts.push(
      'Atenção Ombro: Adicionada 1 série preventiva no Manguito Rotador e sugerida pegada neutra.'
    );
    for (const ex of cloned.exercises) {
      if (ex.slug === 'manguito_rotador') {
        ex.adjusted_sets = ex.default_sets + 1;
      }
      if (ex.slug === 'supino_reto') {
        ex.auto_swapped_to_tier = 'B';
        ex.auto_swap_reason =
          'Ombro sinalizado no Jiu: use Halteres (Opção B) para rotação livre e segura da articulação.';
      }
    }
  }

  // Rule 4: Grip / Fingers fatigue ('pegada')
  if (tags.includes('pegada')) {
    alerts.push(
      'Atenção Pegada/Dedos: Barra Fixa ajustada para Opção B (Pulley) para poupar os flexores dos dedos.'
    );
    for (const ex of cloned.exercises) {
      if (ex.slug === 'barra_fixa') {
        ex.auto_swapped_to_tier = 'B';
        ex.auto_swap_reason = 'Pegada desgastada do quimono: use a Puxada Alta (Opção B).';
      }
    }
  }

  return {
    recovery_score: score,
    status_banner: statusBanner,
    alerts,
    workout: cloned,
  };
}
