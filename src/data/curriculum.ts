import { Module, Exercise, SocraticExplanation, TheoryContent, MASTERY_CONFIG } from '@/types/learning';
import { theoryContent } from './content/theoryContent';
import { exercisesBank } from './content/exercisesBank';

// Helper to create lesson with default mastery values
const createLesson = (
  id: string, 
  title: string, 
  description: string, 
  type: 'theory' | 'concept' | 'exercise' | 'challenge' | 'review',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  xpReward: number
) => ({
  id,
  title,
  description,
  type,
  difficulty,
  xpReward,
  completed: false,
  masteryLevel: 0,
  exercisesCompleted: 0,
  exercisesRequired: type === 'theory' ? 3 : MASTERY_CONFIG.minExercisesPerConcept,
  correctAnswers: 0,
  totalAttempts: 0,
});

export const curriculum: Module[] = [
  {
    id: 'py-fundamentals',
    title: 'Fundamentos do Python',
    description: 'Por que programar? Entenda a lógica por trás de tudo.',
    icon: '🐍',
    category: 'python-basics',
    unlocked: true,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 25,
    lessons: [
      createLesson('py-fund-theory', 'Introdução à Programação', 'Por que o computador precisa de instruções?', 'theory', 'beginner', 25),
      createLesson('py-fund-1', 'O que é programação?', 'Antes de escrever código, entenda por que ele existe.', 'concept', 'beginner', 50),
      createLesson('py-fund-2', 'Variáveis: Dando nomes às coisas', 'Por que precisamos guardar informações?', 'concept', 'beginner', 75),
      createLesson('py-fund-3', 'Tipos de dados', 'Por que o computador diferencia números de textos?', 'concept', 'beginner', 100),
      createLesson('py-fund-4', 'Desafio: Primeiros passos', 'Aplique o que aprendeu em exercícios práticos.', 'exercise', 'beginner', 150),
    ],
  },
  {
    id: 'py-logic',
    title: 'Lógica e Decisões',
    description: 'Como o computador toma decisões? Condicionais e lógica.',
    icon: '🔀',
    category: 'python-basics',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 30,
    lessons: [
      createLesson('py-logic-theory', 'Pensamento Condicional', 'Como estruturar decisões de forma lógica?', 'theory', 'beginner', 25),
      createLesson('py-logic-1', 'Condicionais: if, elif, else', 'Por que precisamos que programas tomem decisões?', 'concept', 'beginner', 100),
      createLesson('py-logic-2', 'Operadores lógicos', 'AND, OR, NOT - combinando condições.', 'concept', 'beginner', 100),
      createLesson('py-logic-3', 'Comparações e verdades', 'Como o Python avalia verdadeiro e falso?', 'concept', 'intermediate', 125),
      createLesson('py-logic-4', 'Desafio: Tomada de Decisão', 'Resolva problemas usando condicionais.', 'exercise', 'intermediate', 175),
    ],
  },
  {
    id: 'py-loops',
    title: 'Repetições e Loops',
    description: 'Automatize tarefas repetitivas com elegância.',
    icon: '🔄',
    category: 'python-basics',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 35,
    lessons: [
      createLesson('py-loops-theory', 'O Poder da Repetição', 'Por que automatizar tarefas repetitivas?', 'theory', 'beginner', 25),
      createLesson('py-loops-1', 'For loops: iterando sobre sequências', 'Por que repetir manualmente quando o código pode fazer?', 'concept', 'beginner', 100),
      createLesson('py-loops-2', 'While loops: repetindo enquanto...', 'Quando não sabemos quantas vezes repetir.', 'concept', 'intermediate', 125),
      createLesson('py-loops-3', 'List comprehensions', 'A forma Pythonica de criar listas.', 'concept', 'intermediate', 150),
      createLesson('py-loops-4', 'Break, Continue e Else', 'Controlando o fluxo dentro de loops.', 'concept', 'intermediate', 125),
      createLesson('py-loops-5', 'Desafio: Automação', 'Automatize tarefas complexas com loops.', 'exercise', 'intermediate', 200),
    ],
  },
  {
    id: 'py-structures',
    title: 'Estruturas de Dados',
    description: 'Listas, dicionários, tuplas - organizando informações.',
    icon: '📦',
    category: 'python-intermediate',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 40,
    lessons: [
      createLesson('py-struct-theory', 'Organizando Informações', 'Por que precisamos de diferentes estruturas?', 'theory', 'beginner', 25),
      createLesson('py-struct-1', 'Listas: coleções ordenadas', 'Por que precisamos agrupar dados?', 'concept', 'beginner', 100),
      createLesson('py-struct-2', 'Métodos de Lista', 'append, insert, remove, sort e mais.', 'concept', 'beginner', 100),
      createLesson('py-struct-3', 'Dicionários: chave-valor', 'Quando a posição não importa, mas o nome sim.', 'concept', 'intermediate', 125),
      createLesson('py-struct-4', 'Sets e Tuplas', 'Imutabilidade e unicidade.', 'concept', 'intermediate', 125),
      createLesson('py-struct-5', 'Desafio: Manipulação de Dados', 'Combine estruturas para resolver problemas reais.', 'exercise', 'intermediate', 200),
    ],
  },
  {
    id: 'py-functions',
    title: 'Funções',
    description: 'Reutilize código, organize pensamentos.',
    icon: '⚙️',
    category: 'python-intermediate',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 35,
    lessons: [
      createLesson('py-func-theory', 'Modularização', 'Por que dividir código em pedaços reutilizáveis?', 'theory', 'beginner', 25),
      createLesson('py-func-1', 'Definindo funções', 'Por que não repetir código?', 'concept', 'beginner', 100),
      createLesson('py-func-2', 'Parâmetros e retorno', 'Entrada, processamento, saída.', 'concept', 'intermediate', 125),
      createLesson('py-func-3', 'Escopo de variáveis', 'Onde uma variável vive?', 'concept', 'intermediate', 150),
      createLesson('py-func-4', 'Lambda e funções anônimas', 'Funções curtas para situações específicas.', 'concept', 'advanced', 175),
      createLesson('py-func-5', 'Desafio: Refatoração', 'Transforme código repetitivo em funções.', 'exercise', 'advanced', 225),
    ],
  },
  {
    id: 'pandas-intro',
    title: 'Introdução ao Pandas',
    description: 'A biblioteca que transformou análise de dados.',
    icon: '🐼',
    category: 'pandas-basics',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 30,
    lessons: [
      createLesson('pd-intro-theory', 'O Mundo dos Dados', 'Por que análise de dados é essencial?', 'theory', 'beginner', 25),
      createLesson('pd-intro-1', 'Por que Pandas existe?', 'O problema que Pandas resolve.', 'concept', 'beginner', 100),
      createLesson('pd-intro-2', 'Series: a coluna fundamental', 'Entendendo o bloco básico do Pandas.', 'concept', 'beginner', 100),
      createLesson('pd-intro-3', 'DataFrame: a tabela poderosa', 'Como o Pandas organiza dados tabulares.', 'concept', 'beginner', 125),
      createLesson('pd-intro-4', 'Desafio: Primeiros DataFrames', 'Crie e manipule seus primeiros DataFrames.', 'exercise', 'beginner', 175),
    ],
  },
  {
    id: 'pandas-manipulation',
    title: 'Manipulação de Dados',
    description: 'Seleção, filtros e transformações.',
    icon: '🔧',
    category: 'pandas-basics',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 40,
    lessons: [
      createLesson('pd-manip-theory', 'A Arte da Seleção', 'Por que precisamos filtrar e selecionar dados?', 'theory', 'beginner', 25),
      createLesson('pd-manip-1', 'Selecionando dados: loc e iloc', 'Por nome ou por posição?', 'concept', 'beginner', 125),
      createLesson('pd-manip-2', 'Filtros booleanos', 'Encontrando exatamente o que você precisa.', 'concept', 'intermediate', 150),
      createLesson('pd-manip-3', 'Criando e modificando colunas', 'Transformando dados existentes.', 'concept', 'intermediate', 150),
      createLesson('pd-manip-4', 'Ordenação e Ranking', 'Organizando dados por critérios.', 'concept', 'intermediate', 125),
      createLesson('pd-manip-5', 'Desafio: Transformação de Dados', 'Aplique todas as técnicas de manipulação.', 'exercise', 'intermediate', 200),
    ],
  },
  {
    id: 'pandas-analysis',
    title: 'Análise e Agregação',
    description: 'GroupBy, estatísticas, insights.',
    icon: '📊',
    category: 'pandas-intermediate',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 45,
    lessons: [
      createLesson('pd-analysis-theory', 'Extraindo Insights', 'Como transformar dados em informação?', 'theory', 'intermediate', 25),
      createLesson('pd-analysis-1', 'GroupBy: dividir para conquistar', 'Agregando dados por categorias.', 'concept', 'intermediate', 175),
      createLesson('pd-analysis-2', 'Estatísticas descritivas', 'Resumindo dados numericamente.', 'concept', 'intermediate', 150),
      createLesson('pd-analysis-3', 'Pivot tables', 'Reestruturando dados para análise.', 'concept', 'advanced', 200),
      createLesson('pd-analysis-4', 'Funções de Agregação', 'sum, mean, count, agg e transform.', 'concept', 'advanced', 175),
      createLesson('pd-analysis-5', 'Desafio: Relatório Analítico', 'Crie um relatório completo de análise.', 'exercise', 'advanced', 250),
    ],
  },
  {
    id: 'pandas-advanced',
    title: 'Pandas Avançado',
    description: 'Merge, join, dados faltantes, otimização.',
    icon: '🚀',
    category: 'pandas-intermediate',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 50,
    lessons: [
      createLesson('pd-adv-theory', 'Dados do Mundo Real', 'Lidando com complexidade e imperfeições.', 'theory', 'intermediate', 25),
      createLesson('pd-adv-1', 'Merge e Join', 'Combinando múltiplos DataFrames.', 'concept', 'intermediate', 175),
      createLesson('pd-adv-2', 'Tipos de Join', 'inner, outer, left, right - quando usar cada um.', 'concept', 'intermediate', 175),
      createLesson('pd-adv-3', 'Lidando com dados faltantes', 'NaN não é o fim do mundo.', 'concept', 'intermediate', 150),
      createLesson('pd-adv-4', 'Apply e vetorização', 'Performance em grandes datasets.', 'concept', 'advanced', 200),
      createLesson('pd-adv-5', 'Casos reais de MBA', 'Análises típicas de processos seletivos.', 'challenge', 'advanced', 300),
    ],
  },
  {
    id: 'tech-english-reading',
    title: 'Inglês Técnico: Leitura',
    description: 'Interpretação de documentação e manuais técnicos.',
    icon: '📚',
    category: 'technical-english',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 40,
    lessons: [
      createLesson('eng-read-theory', 'Estratégias de Leitura Técnica', 'Como ler documentação de forma eficiente?', 'theory', 'beginner', 25),
      createLesson('eng-read-1', 'Vocabulário Essencial Python', 'Termos que aparecem em toda documentação.', 'concept', 'beginner', 100),
      createLesson('eng-read-2', 'Estrutura de Documentação', 'API docs, tutorials, references.', 'concept', 'beginner', 100),
      createLesson('eng-read-3', 'Interpretando Stack Overflow', 'Extraindo soluções de discussões técnicas.', 'concept', 'intermediate', 125),
      createLesson('eng-read-4', 'Error Messages em Inglês', 'Decodificando mensagens de erro.', 'concept', 'intermediate', 125),
      createLesson('eng-read-5', 'Desafio: Documentação Real', 'Interprete documentação oficial.', 'exercise', 'intermediate', 175),
    ],
  },
  {
    id: 'tech-english-patterns',
    title: 'Inglês Técnico: Patterns',
    description: 'Padrões linguísticos em contexto de TI.',
    icon: '🔤',
    category: 'technical-english',
    unlocked: false,
    completed: false,
    masteryPercentage: 0,
    requiredMastery: 80,
    minExercisesToMaster: 35,
    lessons: [
      createLesson('eng-pattern-theory', 'Padrões Recorrentes', 'Estruturas que se repetem em textos técnicos.', 'theory', 'intermediate', 25),
      createLesson('eng-pattern-1', 'Verbos de Ação Técnica', 'implement, deploy, execute, iterate...', 'concept', 'intermediate', 125),
      createLesson('eng-pattern-2', 'Condicionais e Requisitos', 'if, unless, provided that, as long as...', 'concept', 'intermediate', 125),
      createLesson('eng-pattern-3', 'Comparações Técnicas', 'faster than, more efficient, unlike...', 'concept', 'intermediate', 125),
      createLesson('eng-pattern-4', 'Instruções e Procedimentos', 'first, then, finally, make sure to...', 'concept', 'intermediate', 125),
      createLesson('eng-pattern-5', 'Desafio: Questões de Prova', 'Simule questões reais de inglês técnico.', 'exercise', 'advanced', 200),
    ],
  },
];

// Export theory and exercises from separate files
export const sampleTheoryContent = theoryContent;
export const sampleExercises = exercisesBank;

export const sampleExercises: Exercise[] = [
  {
    id: 'ex-var-1',
    lessonId: 'py-fund-2',
    type: 'code',
    question: 'Crie uma variável chamada `idade` que guarde sua idade. Depois, crie outra variável `ano_nascimento` que calcule o ano em que você nasceu (considere o ano atual como 2025).',
    socraticHints: [
      {
        level: 1,
        type: 'why',
        question: 'Por que você acha que precisamos de duas variáveis diferentes aqui?',
        hint: 'Pense: uma guarda um dado direto, outra é calculada.',
      },
      {
        level: 2,
        type: 'what-for',
        question: 'Se você tivesse que calcular o ano de nascimento de 1000 pessoas, preferiria fazer manualmente ou deixar o computador fazer?',
        hint: 'Variáveis permitem que o computador faça cálculos para nós.',
      },
      {
        level: 3,
        type: 'how',
        question: 'Qual operação matemática transforma idade em ano de nascimento?',
        hint: 'Subtração: ano_atual - idade = ano_nascimento',
      },
    ],
    starterCode: '# Crie suas variáveis aqui\n\n',
    expectedOutput: '',
    testCases: [
      {
        input: '',
        expectedOutput: '',
        description: 'Variável idade deve existir e ser um número',
      },
    ],
    explanation: {
      why: 'Variáveis existem porque precisamos guardar informações para usar depois. Imagine tentar fazer contas de cabeça com 100 números - impossível!',
      whatFor: 'Elas resolvem o problema de não precisar lembrar de tudo. O computador lembra para você.',
      how: 'Em Python, usamos o sinal de igual (=) para "guardar" um valor em um nome. Depois, podemos usar esse nome em cálculos.',
      commonMistakes: [
        'Usar espaços no nome da variável (use underscores: ano_nascimento)',
        'Começar com números (2idade não funciona, idade2 sim)',
        'Confundir = (atribuição) com == (comparação)',
      ],
      realWorldExample: 'Em uma planilha de funcionários, cada célula é uma variável. A idade está em uma coluna, o salário em outra. Sistemas calculam bônus, férias, tudo usando essas "variáveis".',
    },
    difficulty: 'beginner',
    tags: ['variáveis', 'atribuição', 'cálculo'],
    xpReward: 50,
    professionalContext: 'Em sistemas de RH, variáveis armazenam dados de funcionários para cálculos automáticos de benefícios.',
    militaryApplication: 'Sistemas de logística usam variáveis para calcular suprimentos necessários: número_soldados * rações_por_dia = total_rações.',
  },
  {
    id: 'ex-logic-1',
    lessonId: 'py-logic-1',
    type: 'output-prediction',
    question: 'Analise o código abaixo e diga qual será o output:\n\n```python\nx = 15\nif x > 20:\n    print("Grande")\nelif x > 10:\n    print("Médio")\nelse:\n    print("Pequeno")\n```',
    socraticHints: [
      {
        level: 1,
        type: 'why',
        question: 'Por que existem três caminhos diferentes nesse código?',
        hint: 'Cada caminho representa uma "decisão" diferente baseada no valor de x.',
      },
      {
        level: 2,
        type: 'how',
        question: 'Em que ordem o Python avalia as condições?',
        hint: 'De cima para baixo. Assim que uma é verdadeira, executa aquele bloco e ignora o resto.',
      },
    ],
    options: ['Grande', 'Médio', 'Pequeno', 'Erro'],
    correctAnswer: 1,
    explanation: {
      why: 'Condicionais existem porque programas precisam se adaptar a diferentes situações. Um app de banco se comporta diferente se o saldo é positivo ou negativo.',
      whatFor: 'Elas permitem que um único código funcione para milhões de casos diferentes, sem escrever milhões de versões.',
      how: 'O Python avalia as condições na ordem: primeiro if, depois elif(s), por último else. A primeira condição verdadeira "ganha".',
      commonMistakes: [
        'Esquecer os dois pontos (:) após a condição',
        'Não indentar o bloco corretamente',
        'Usar = ao invés de == para comparação',
      ],
      realWorldExample: 'Sistemas de preços: desconto de 20% se comprar mais de 100 unidades, 10% se comprar mais de 50, preço cheio caso contrário.',
    },
    difficulty: 'beginner',
    tags: ['condicionais', 'if', 'elif', 'else'],
    xpReward: 75,
    professionalContext: 'Sistemas de aprovação de crédito usam condicionais para definir limites baseados em score.',
    militaryApplication: 'Sistemas de alerta usam condicionais: se ameaça > crítica, evacuar; se ameaça > moderada, alertar; senão, monitorar.',
  },
  {
    id: 'ex-loop-1',
    lessonId: 'py-loops-1',
    type: 'output-prediction',
    question: 'O que este código imprime?\n\n```python\nresultado = 0\nfor numero in [1, 2, 3, 4, 5]:\n    resultado = resultado + numero\nprint(resultado)\n```',
    socraticHints: [
      {
        level: 1,
        type: 'why',
        question: 'Por que usamos um loop ao invés de somar manualmente?',
        hint: 'E se a lista tivesse 1000 números?',
      },
      {
        level: 2,
        type: 'how',
        question: 'O que acontece com `resultado` a cada iteração?',
        hint: 'resultado começa em 0. Depois: 0+1=1, 1+2=3, 3+3=6...',
      },
    ],
    options: ['15', '5', '0', '[1, 2, 3, 4, 5]'],
    correctAnswer: 0,
    explanation: {
      why: 'Loops existem para automatizar repetições. Humanos erram em tarefas repetitivas; computadores não.',
      whatFor: 'Permitem processar qualquer quantidade de dados com o mesmo código.',
      how: 'O for percorre cada elemento da lista, executando o bloco interno. A variável resultado acumula a soma.',
      commonMistakes: [
        'Esquecer de inicializar a variável acumuladora',
        'Confundir range() com lista literal',
        'Modificar a lista enquanto itera sobre ela',
      ],
      realWorldExample: 'Calcular o total de vendas do mês somando cada venda individual.',
    },
    difficulty: 'beginner',
    tags: ['loops', 'for', 'acumulador'],
    xpReward: 75,
    professionalContext: 'Relatórios financeiros usam loops para somar transações de milhares de clientes.',
    militaryApplication: 'Contabilizar recursos: loop por cada unidade para somar efetivo total disponível.',
  },
  {
    id: 'ex-pandas-1',
    lessonId: 'pd-manip-2',
    type: 'code',
    question: 'Dado um DataFrame `df` com as colunas "nome", "idade" e "salario", filtre apenas os funcionários com salário maior que 5000 E idade menor que 30.',
    socraticHints: [
      {
        level: 1,
        type: 'why',
        question: 'Por que precisamos combinar duas condições aqui?',
        hint: 'Queremos funcionários que atendam AMBOS os critérios, não apenas um.',
      },
      {
        level: 2,
        type: 'how',
        question: 'Em Pandas, como combinamos condições? É igual ao Python puro?',
        hint: 'Use & para "E" e | para "OU", mas cada condição precisa estar entre parênteses.',
      },
      {
        level: 3,
        type: 'how',
        question: 'Onde colocamos o filtro - dentro ou fora dos colchetes?',
        hint: 'df[CONDIÇÃO] retorna as linhas onde CONDIÇÃO é True.',
      },
    ],
    starterCode: 'import pandas as pd\n\n# DataFrame de exemplo já está criado como df\n# Escreva seu filtro abaixo:\n\nresultado = ',
    expectedOutput: '',
    testCases: [
      {
        input: '',
        expectedOutput: '',
        description: 'Deve retornar apenas funcionários com salário > 5000 E idade < 30',
      },
    ],
    explanation: {
      why: 'Filtros existem porque dados reais são enormes. Precisamos focar apenas no que importa para nossa análise.',
      whatFor: 'Em um processo seletivo de MBA, você terá dados de milhares de empresas. Filtros permitem responder perguntas específicas rapidamente.',
      how: 'df[(condição1) & (condição2)] aplica ambas as condições. Os parênteses são obrigatórios porque o operador & tem precedência sobre comparações.',
      commonMistakes: [
        'Usar "and" ao invés de "&" (Python puro vs Pandas)',
        'Esquecer parênteses nas condições individuais',
        'Confundir & (E) com | (OU)',
      ],
      realWorldExample: 'Análise de RH: encontrar candidatos que têm experiência mínima E formação específica E pretensão salarial dentro do budget.',
    },
    difficulty: 'intermediate',
    tags: ['pandas', 'filtros', 'booleanos', 'dataframe'],
    xpReward: 100,
    professionalContext: 'Filtros são essenciais em análise financeira para segmentar clientes por múltiplos critérios.',
    militaryApplication: 'Seleção de pessoal: filtrar efetivo por patente E especialização E disponibilidade para missão.',
  },
];

export const getLevelFromXP = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const getXPForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 100;
};

export const calculateMasteryDecay = (lastPracticed: Date): number => {
  const daysSince = (Date.now() - lastPracticed.getTime()) / (1000 * 60 * 60 * 24);
  // Ebbinghaus curve: retention decreases exponentially
  return Math.max(0, 100 * Math.exp(-daysSince / 7));
};

// Calculate next review date based on Ebbinghaus intervals
export const getNextReviewDate = (currentInterval: number, performance: number): { nextDate: Date; nextInterval: number } => {
  const intervals = [1, 3, 7, 14, 30, 60, 120];
  const currentIndex = intervals.indexOf(currentInterval);
  
  let nextInterval: number;
  if (performance >= 0.8) {
    // Good performance: move to next interval
    nextInterval = intervals[Math.min(currentIndex + 1, intervals.length - 1)];
  } else if (performance >= 0.6) {
    // Medium performance: stay at current interval
    nextInterval = currentInterval;
  } else {
    // Poor performance: go back to shorter interval
    nextInterval = intervals[Math.max(currentIndex - 1, 0)];
  }
  
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + nextInterval);
  
  return { nextDate, nextInterval };
};
