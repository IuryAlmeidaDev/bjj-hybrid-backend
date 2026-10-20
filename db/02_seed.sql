INSERT INTO users (id, name, email)
VALUES ('00000000-0000-0000-0000-000000000001', 'Atleta Jiu-Jitsu', 'atleta@bjjhybrid.local');

-- Workouts A, B, C
INSERT INTO workouts (id, code, title, tag, day_of_week, description) VALUES
('10000000-0000-0000-0000-000000000001', 'A', 'TREINO A — TERÇA-FEIRA', 'EMPURRAR & OMBROS', 2, 'Força de Empurrar, Deltoides em V & Blindagem do Manguito. Costas e pegada descansam do Jiu de segunda.'),
('10000000-0000-0000-0000-000000000002', 'B', 'TREINO B — QUINTA-FEIRA', 'PUXAR & ANTEBRAÇO', 4, 'Força de Tração, Dorsais em V & Pegada Inquebrável de Quimono.'),
('10000000-0000-0000-0000-000000000003', 'C', 'TREINO C — SÁBADO', 'PERNAS & QUADRIL', 6, 'Potência de Quadril, Pernas & Estabilidade de Core com 48h de descanso até segunda.');

-- Exercises for Treino A
INSERT INTO exercises (id, workout_id, slug, name, name_en, target_muscle, default_sets, reps_range, rest_seconds, video_url, bjj_benefit, sort_order) VALUES
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'supino_inclinado', 'Supino Inclinado com Halteres', 'Incline Dumbbell Press', 'Peitoral Superior & Tríceps', 4, '6 a 8', 120, 'https://www.youtube.com/watch?v=wkUemXl4vFI', 'Desenvolve a porção clavicular do peito e gera força explosiva para tirar oponentes de cima no rola.', 1),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'supino_reto', 'Supino Reto com Barra', 'Barbell Bench Press', 'Peitoral Geral & Potência de Tronco', 3, '8 a 10', 90, 'https://www.youtube.com/watch?v=72UUJVBuT7o', 'Base primária de empurrar para reposição de guarda e evitar amassamento na meia guarda.', 2),
('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'desenvolvimento_halteres', 'Desenvolvimento com Halteres Sentado', 'Seated Dumbbell Shoulder Press', 'Deltoide Anterior & Lateral', 3, '8 a 10', 90, 'https://www.youtube.com/watch?v=DFXtzdXN_iY', 'Ombros fortes para brigas de esgrima, domínio de nuca e projeções.', 3),
('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'elevacao_lateral', 'Elevação Lateral com Halteres', 'Side Lateral Raise', 'Deltoide Lateral (Estética em V)', 4, '12 a 15', 60, 'https://www.youtube.com/watch?v=yURmeIEl1Fg', 'Alarga a linha dos ombros para o físico em V e estabiliza a cintura escapular.', 4),
('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 'triceps_corda', 'Tríceps na Polia com Corda', 'Triceps Rope Pushdown', 'Tríceps Braquial', 3, '10 a 12', 60, 'https://www.youtube.com/watch?v=VnFopAIGO7E', 'Extensão potente do antebraço para afastar o adversário e travar defesas.', 5),
('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', 'manguito_rotador', 'Rotação Externa de Manguito na Polia', 'Cable External Rotation', 'Infraespinhal & Redondo Menor', 3, '15', 45, 'https://www.youtube.com/watch?v=goprHr4m6uk', 'Blindagem obrigatória contra kimura, americana e quedas.', 6);

-- Exercises for Treino B
INSERT INTO exercises (id, workout_id, slug, name, name_en, target_muscle, default_sets, reps_range, rest_seconds, video_url, bjj_benefit, sort_order) VALUES
('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000002', 'barra_fixa', 'Barra Fixa (Pull-Up)', 'Pull-Ups', 'Grande Dorsal & Força Relativa', 4, '6 a 8', 120, 'https://www.youtube.com/watch?v=-EygvlZgdic', 'Constrói costas largas em V e força de tração para fechar a guarda e puxar o adversário.', 1),
('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000002', 'remada_curvada', 'Remada Curvada com Barra (Pronada)', 'Bent-Over Barbell Row', 'Espessura de Costas & Romboides', 4, '8', 90, 'https://www.youtube.com/watch?v=e53vSzibkO0', 'Densidade dorsal e sustentação postural contra amassos na guarda.', 2),
('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000002', 'remada_unilateral', 'Remada Unilateral com Halter (Serrote)', 'One-Arm Dumbbell Row', 'Grande Dorsal Unilateral & Core', 3, '10 cada lado', 60, 'https://www.youtube.com/watch?v=FoqVbMluqwA', 'Simetria entre os lados e tração individualizada para estourar pegadas.', 3),
('20000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000002', 'face_pull', 'Face Pull na Polia com Corda', 'Cable Face Pull', 'Deltoide Posterior & Trapézio Médio', 3, '12 a 15', 60, 'https://www.youtube.com/watch?v=IeOqdw9WI90', 'Corrige a postura encurvada do lutador e previne dores nos ombros.', 4),
('20000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000002', 'rosca_martelo', 'Rosca Martelo com Halteres', 'Dumbbell Hammer Curl', 'Braquial, Braquiorradial & Bíceps', 3, '10 a 12', 60, 'https://www.youtube.com/watch?v=GilFwBs_kOs', 'Dá espessura aos braços e fortalece tendões para manter pegadas de quimono.', 5),
('20000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000002', 'farmers_walk', 'Farmers Walk (Caminhada do Fazendeiro)', 'Heavy Farmers Carry', 'Força Isométrica de Pegada & Core', 3, '40 passos', 90, 'https://www.youtube.com/watch?v=1uOs1hP3u4A', 'Cria uma pegada de aço inquebrável nos dedos e punhos.', 6);

-- Exercises for Treino C
INSERT INTO exercises (id, workout_id, slug, name, name_en, target_muscle, default_sets, reps_range, rest_seconds, video_url, bjj_benefit, sort_order) VALUES
('20000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000003', 'agachamento_livre', 'Agachamento Livre com Barra', 'Barbell Back Squat', 'Quadríceps, Glúteos & Core', 4, '6 a 8', 120, 'https://www.youtube.com/watch?v=iGLzCCZr_Xw', 'Base pesada inabalável para passagem de guarda e estabilidade de joelhos.', 1),
('20000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000003', 'rdl_terra_romeno', 'Levantamento Terra Romeno (RDL)', 'Romanian Deadlift', 'Isquiotibiais, Glúteos & Lombar', 4, '8', 90, 'https://www.youtube.com/watch?v=dta3aMVe9qA', 'Blinda a coluna lombar contra dores causadas pela guarda e fortalece posteriores.', 2),
('20000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000003', 'agachamento_bulgaro', 'Agachamento Búlgaro com Halteres', 'Bulgarian Split Squat', 'Força Unilateral & Glúteo Médio', 3, '8 a 10 cada perna', 60, 'https://www.youtube.com/watch?v=ZpIMkV6cf7c', 'Potência direta para entradas de queda (Single/Double leg) e equilíbrio.', 3),
('20000000-0000-0000-0000-000000000016', '10000000-0000-0000-0000-000000000003', 'elevacao_pelvica', 'Elevação Pélvica com Barra (Hip Thrust)', 'Barbell Hip Thrust', 'Glúteo Máximo & Extensão de Quadril', 3, '10 a 12', 90, 'https://www.youtube.com/watch?v=DgnsGNobz6I', 'Transfere diretamente para a saída de quadril e pontes explosivas para raspar.', 4),
('20000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000003', 'cadeira_flexora', 'Cadeira Flexora (ou Mesa Flexora)', 'Seated Leg Curl', 'Isolamento de Isquiotibiais', 3, '10 a 12', 60, 'https://www.youtube.com/watch?v=MqhoP1kWMA8', 'Protege os ligamentos cruzados do joelho em ganchos e chaves de perna.', 5),
('20000000-0000-0000-0000-000000000018', '10000000-0000-0000-0000-000000000003', 'prancha_abdominal', 'Prancha Abdominal (com Carga)', 'Weighted Plank', 'Core Anti-Extensão & Transverso', 3, '45s a 60s', 60, 'https://www.youtube.com/watch?v=Zex85qTPc4s', 'Cinturão de aço no abdômen para suportar pressão de oponentes pesados.', 6),
('20000000-0000-0000-0000-000000000019', '10000000-0000-0000-0000-000000000003', 'panturrilha_em_pe', 'Panturrilha em Pé (Máquina ou Halter)', 'Standing Calf Raise', 'Gastrocnêmio & Tornozelo', 4, '12 a 15', 45, 'https://www.youtube.com/watch?v=EILF4iyBxSQ', 'Estética de pernas proporcionais e impulsão rápida nos pés.', 7);

-- 38 Alternatives (Plan B and Plan C for each of the 19 exercises)
INSERT INTO exercise_alternatives (exercise_id, tier, name, equipment, reason_to_use, video_url) VALUES
-- 1. Supino Inclinado
('20000000-0000-0000-0000-000000000001', 'B', 'Supino Inclinado com Barra', 'Barra', 'Use se os halteres pesados estiverem ocupados; facilita sobrecarga progressiva.', 'https://www.youtube.com/watch?v=6jBx5YwAb7E'),
('20000000-0000-0000-0000-000000000001', 'C', 'Supino Inclinado na Máquina / Smith', 'Máquina', 'Estabilidade máxima para treinar pesado em segurança sem precisar de ajudante.', 'https://www.youtube.com/watch?v=KK5ZSj22h7s'),
-- 2. Supino Reto
('20000000-0000-0000-0000-000000000002', 'B', 'Supino Reto com Halteres', 'Halteres', 'Bancos de barra ocupados; maior amplitude e correção de assimetrias.', 'https://www.youtube.com/watch?v=YiP-Zhk5YMk'),
('20000000-0000-0000-0000-000000000002', 'C', 'Flexão de Braço com Carga nas Costas', 'Solo / Anilha', 'Zero aparelhos livres; força funcional pura de tronco e escápulas.', 'https://www.youtube.com/watch?v=w1O51Nq1JaI'),
-- 3. Desenvolvimento Halteres
('20000000-0000-0000-0000-000000000003', 'B', 'Desenvolvimento Militar em Pé com Barra (OHP)', 'Barra', 'Ativa glúteos e core para sustentar a barra; excelente base de luta em pé.', 'https://www.youtube.com/watch?v=930c6LGuO6Q'),
('20000000-0000-0000-0000-000000000003', 'C', 'Desenvolvimento na Máquina Articulada', 'Máquina', 'Trajetória guiada que protege os tendões quando os halteres estão ocupados.', 'https://www.youtube.com/watch?v=VFbijwqdsTU'),
-- 4. Elevação Lateral
('20000000-0000-0000-0000-000000000004', 'B', 'Elevação Lateral na Polia Baixa', 'Polia', 'Tensão constante no deltoide lateral desde o início do movimento.', 'https://www.youtube.com/watch?v=89J3D_XDa3A'),
('20000000-0000-0000-0000-000000000004', 'C', 'Elevação Lateral na Máquina', 'Máquina', 'Isolamento estrito sem roubo ou balanço de quadril.', 'https://www.youtube.com/watch?v=-vzaGAaUDjg'),
-- 5. Tríceps Corda
('20000000-0000-0000-0000-000000000005', 'B', 'Tríceps na Polia com Barra Reta ou W', 'Polia', 'Corda ocupada; permite estabilizar os punhos com cargas maiores.', 'https://www.youtube.com/watch?v=UdfF_LQ1iak'),
('20000000-0000-0000-0000-000000000005', 'C', 'Tríceps Francês Sentado com Halter', 'Halter', 'Polias lotadas; foco na cabeça longa do tríceps para dar volume ao braço.', 'https://www.youtube.com/watch?v=9IZIgdT5Mag'),
-- 6. Manguito Rotador
('20000000-0000-0000-0000-000000000006', 'B', 'Rotação Externa Deitado de Lado com Halter', 'Halter', 'Sem polia livre; a gravidade cria resistência ideal para o manguito.', 'https://www.youtube.com/watch?v=goprHr4m6uk'),
('20000000-0000-0000-0000-000000000006', 'C', 'Rotação Externa com Elástico / Miniband', 'Elástico', 'Portátil; pode ser feito antes mesmo do treino no tatame.', 'https://www.youtube.com/watch?v=-AhA_mNBXNI'),
-- 7. Barra Fixa
('20000000-0000-0000-0000-000000000007', 'B', 'Puxada Alta Aberta no Pulley', 'Polia', 'Barra ocupada ou fadiga pós-rola; calibra a carga exata mantendo amplitude.', 'https://www.youtube.com/watch?v=oF-RqXrkZHU'),
('20000000-0000-0000-0000-000000000007', 'C', 'Barra Fixa no Graviton ou Superband', 'Máquina / Elástico', 'Mantém o padrão motor da barra fixa com alívio controlado de peso.', 'https://www.youtube.com/watch?v=lRCROSJkTKM'),
-- 8. Remada Curvada
('20000000-0000-0000-0000-000000000008', 'B', 'Remada Cavalinho (T-Bar Row)', 'Barra / Máquina', 'Pegada neutra que alivia o estresse nos punhos e permite alta carga.', 'https://www.youtube.com/watch?v=Qh_-C7gE6zk'),
('20000000-0000-0000-0000-000000000008', 'C', 'Remada Curvada com Halteres', 'Halteres', 'Barras olímpicas ocupadas; rotação natural do punho protege os cotovelos.', 'https://www.youtube.com/watch?v=j-OssGQT9kg'),
-- 9. Remada Unilateral
('20000000-0000-0000-0000-000000000009', 'B', 'Remada Baixa Unilateral na Polia', 'Polia', 'Tensão contínua e desafio de estabilidade anti-rotacional para o core.', 'https://www.youtube.com/watch?v=LpQMEygJfNY'),
('20000000-0000-0000-0000-000000000009', 'C', 'Remada Articulada na Máquina (Apoio no Peito)', 'Máquina', 'Poupa 100% a lombar caso ela esteja cansada da guarda.', 'https://www.youtube.com/watch?v=Sq7rWvJtzDY'),
-- 10. Face Pull
('20000000-0000-0000-0000-000000000010', 'B', 'Crucifixo Inverso com Halteres no Banco 30°', 'Halteres', 'Polia ocupada; apoiar o peito no banco isola o deltoide posterior.', 'https://www.youtube.com/watch?v=Z3hRQSnfcys'),
('20000000-0000-0000-0000-000000000010', 'C', 'Voador Invertido no Peck Deck', 'Máquina', 'Movimento guiado e rápido para fortalecer a cintura escapular.', 'https://www.youtube.com/watch?v=vvw5dWLXvRI'),
-- 11. Rosca Martelo
('20000000-0000-0000-0000-000000000011', 'B', 'Rosca Martelo na Polia com Corda', 'Polia', 'Tensão constante no braquiorradial sem ponto de descanso.', 'https://www.youtube.com/watch?v=cUXEYaGjB-c'),
('20000000-0000-0000-0000-000000000011', 'C', 'Rosca Inversa com Barra W', 'Barra W', 'Blindagem suprema contra epicondilite (dor de cotovelo de pegada).', 'https://www.youtube.com/watch?v=OXKrSL1mZn4'),
-- 12. Farmers Walk
('20000000-0000-0000-0000-000000000012', 'B', 'Dead Hang na Barra com Quimono ou Toalha', 'Barra / Pano', 'Sem espaço para caminhar; pendure-se segurando o pano por 30s a 45s.', 'https://www.youtube.com/watch?v=XPcT3capkyk'),
('20000000-0000-0000-0000-000000000012', 'C', 'Pinça de Anilhas (Plate Pinch Hold)', 'Anilhas', 'Segure duas anilhas lisas com a ponta dos dedos; força pura para lapela.', 'https://www.youtube.com/watch?v=G-F6Sks4FwY'),
-- 13. Agachamento Livre
('20000000-0000-0000-0000-000000000013', 'B', 'Leg Press 45° Pesado', 'Máquina', 'Gaiola ocupada ou lombar cansada; suporte total para a coluna.', 'https://www.youtube.com/watch?v=DQ4-HXFlKXI'),
('20000000-0000-0000-0000-000000000013', 'C', 'Agachamento no Smith ou Hack Squat', 'Máquina', 'Trilho guiado permite focar totalmente nos quadríceps com segurança.', 'https://www.youtube.com/watch?v=qcqSQrQCU3c'),
-- 14. RDL Terra Romeno
('20000000-0000-0000-0000-000000000014', 'B', 'Stiff com Halteres', 'Halteres', 'Mais confortável para os punhos e aproxima o peso do centro de gravidade.', 'https://www.youtube.com/watch?v=BU_87JJzNA4'),
('20000000-0000-0000-0000-000000000014', 'C', 'Extensão Lombar no Banco Romano 45°', 'Banco Romano', 'Fortalece glúteos e eretores da coluna sem compressão axial nas vértebras.', 'https://www.youtube.com/watch?v=3N4AYwY7VJ0'),
-- 15. Agachamento Búlgaro
('20000000-0000-0000-0000-000000000015', 'B', 'Passada / Avanço com Halteres', 'Halteres', 'Sem banco livre; deslocamento dinâmico idêntico à entrada de quedas.', 'https://www.youtube.com/watch?v=XKbZF4JR5Go'),
('20000000-0000-0000-0000-000000000015', 'C', 'Subida no Banco / Step-Up com Halteres', 'Banco / Halteres', 'Pura força concêntrica unilateral sem estresse patelar.', 'https://www.youtube.com/watch?v=8q9LVgN2RD4'),
-- 16. Elevação Pélvica
('20000000-0000-0000-0000-000000000016', 'B', 'Elevação Pélvica na Máquina Articulada', 'Máquina', 'Montagem rápida na academia cheia sem precisar montar barra no chão.', 'https://www.youtube.com/watch?v=EygaKO0sCLk'),
('20000000-0000-0000-0000-000000000016', 'C', 'Ponte de Glúteo Unilateral no Solo', 'Solo / Halter', 'Corrige assimetrias de força de quadril entre os lados de raspagem.', 'https://www.youtube.com/watch?v=0e1SXFq806U'),
-- 17. Cadeira Flexora
('20000000-0000-0000-0000-000000000017', 'B', 'Mesa Flexora Deitado', 'Máquina', 'Aparelho sentado ocupado; trabalha posteriores com o quadril estendido.', 'https://www.youtube.com/watch?v=IXg1PQ_5gmw'),
('20000000-0000-0000-0000-000000000017', 'C', 'Flexão Nórdica (Nordic Curl)', 'Solo / Espaldar', 'Padrão ouro na blindagem contra estiramentos de posteriores de coxa.', 'https://www.youtube.com/watch?v=9HQ6_NFBu8U'),
-- 18. Prancha Abdominal
('20000000-0000-0000-0000-000000000018', 'B', 'Roda Abdominal (Ab Wheel Rollout)', 'Roda Abdominal', 'Nível avançado de anti-extensão para blindar o tronco.', 'https://www.youtube.com/watch?v=DWFt7uGwJFQ'),
('20000000-0000-0000-0000-000000000018', 'C', 'Pallof Press na Polia ou Elástico', 'Polia / Elástico', 'Core anti-rotacional contra torções de guarda e meia guarda.', 'https://www.youtube.com/watch?v=vgkJb94lK10'),
-- 19. Panturrilha em Pé
('20000000-0000-0000-0000-000000000019', 'B', 'Panturrilha no Leg Press 45°', 'Máquina', 'Máquina em pé ocupada; excelente amplitude e carga segura.', 'https://www.youtube.com/watch?v=erUNxqpFxkc'),
('20000000-0000-0000-0000-000000000019', 'C', 'Panturrilha Sentado (Gêmeos Sentado)', 'Máquina', 'Foco no músculo sóleo para resistência de base em pé.', 'https://www.youtube.com/watch?v=ciTzpPbR2WY');
