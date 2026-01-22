import { TheoryContent } from '@/types/learning';

// ============================================
// TEORIA SOCRÁTICA COMPLETA - TODOS OS MÓDULOS
// Estrutura: POR QUÊ / PARA QUÊ / COMO
// Contexto: Andragogia Militar/Profissional
// ============================================

export const theoryContent: TheoryContent[] = [
  // ============================================
  // MÓDULO 1: FUNDAMENTOS DO PYTHON
  // ============================================
  {
    id: 'theory-py-fund',
    lessonId: 'py-fund-theory',
    title: 'Introdução à Programação',
    
    realWorldContext: 'Programação é a habilidade de dar instruções precisas para um computador executar tarefas. Em um processo seletivo de MBA, você precisa analisar dados rapidamente - programação permite automatizar isso, transformando horas de trabalho manual em segundos.',
    
    militaryContext: 'Assim como um plano de operação militar requer instruções claras e sequenciais para cada equipe, um programa requer comandos precisos. O computador é como um soldado extremamente disciplinado: ele faz EXATAMENTE o que você ordena, nem mais nem menos. Um erro na ordem pode comprometer toda a missão.',
    
    why: {
      question: 'Por que precisamos de programação se existem planilhas?',
      explanation: 'Planilhas são limitadas: não escalam para milhões de linhas, são propensas a erros humanos e não automatizam tarefas complexas. Programação permite criar soluções que funcionam de forma consistente, independente do volume de dados.',
      analogy: 'É como a diferença entre fazer contas na mão e usar uma calculadora. Sim, você consegue fazer na mão, mas é lento, cansativo e sujeito a erros. Programação é sua "calculadora" para problemas complexos.',
    },
    
    whatFor: {
      question: 'Para que serve aprender Python especificamente?',
      explanation: 'Python é a linguagem mais usada para análise de dados, sendo requisito em processos seletivos de MBA de ponta. Sua sintaxe clara permite focar no problema, não na linguagem.',
      useCases: [
        'Automatizar análise de relatórios financeiros',
        'Processar milhares de currículos para RH',
        'Gerar visualizações de dados para apresentações',
        'Criar modelos preditivos para tomada de decisão',
      ],
    },
    
    how: {
      question: 'Como o computador entende o que escrevemos?',
      explanation: 'O Python traduz suas instruções em linguagem de máquina. Você escreve em inglês simplificado, o interpretador converte para o computador executar.',
      steps: [
        'Você escreve código em Python (texto legível)',
        'O interpretador Python lê seu código linha por linha',
        'Cada linha é convertida em instruções de máquina',
        'O computador executa essas instruções',
        'Resultados são retornados para você ver',
      ],
      codeExample: '# Seu primeiro programa Python\nprint("Olá, futuro aprovado no MBA!")\n\n# O Python vai:\n# 1. Ler esta instrução\n# 2. Executar a função print\n# 3. Mostrar o texto na tela',
    },
    
    keyTakeaways: [
      'Programação é dar instruções precisas ao computador',
      'Python é a linguagem padrão para análise de dados',
      'O código é lido de cima para baixo, linha por linha',
      'Erros de sintaxe impedem o programa de rodar',
    ],
    
    commonPitfalls: [
      'Achar que precisa decorar tudo (você vai consultar documentação sempre)',
      'Ter medo de errar (erros são parte do aprendizado)',
      'Pular a lógica e ir direto para o código',
      'Não testar o código frequentemente',
    ],
    
    comprehensionQuiz: [
      {
        question: 'Por que Python é preferido para análise de dados?',
        options: [
          'Porque é a linguagem mais rápida',
          'Porque tem sintaxe clara e vasto ecossistema de bibliotecas',
          'Porque foi criada especificamente para MBA',
          'Porque não precisa de instalação',
        ],
        correctIndex: 1,
        explanation: 'Python combina sintaxe clara (fácil de aprender) com bibliotecas poderosas como Pandas, tornando-o ideal para análise de dados.',
      },
      {
        question: 'O que acontece quando você executa código Python?',
        options: [
          'O código é compilado e vira um executável permanente',
          'O interpretador lê e executa linha por linha',
          'O navegador traduz para HTML',
          'O sistema operacional reescreve o código',
        ],
        correctIndex: 1,
        explanation: 'Python é uma linguagem interpretada: o interpretador lê cada linha, converte para instruções de máquina e executa imediatamente.',
      },
      {
        question: 'Qual é a maior vantagem de programar vs usar planilhas para análise?',
        options: [
          'Programas são sempre mais rápidos',
          'Planilhas não existem em empresas grandes',
          'Automação, escala e redução de erros humanos',
          'Programas não precisam de computador',
        ],
        correctIndex: 2,
        explanation: 'Programação permite automatizar tarefas repetitivas, processar volumes massivos de dados e eliminar erros de cópia/cola comuns em planilhas.',
      },
    ],
  },

  // ============================================
  // MÓDULO 2: LÓGICA E DECISÕES
  // ============================================
  {
    id: 'theory-py-logic',
    lessonId: 'py-logic-theory',
    title: 'Pensamento Condicional',
    
    realWorldContext: 'Todo sistema inteligente precisa tomar decisões. Quando você usa um app de banco e ele verifica se você tem saldo antes de aprovar uma transferência, isso é um condicional. Em análise de dados, condicionais permitem categorizar, filtrar e classificar informações automaticamente.',
    
    militaryContext: 'Condicionais são como as regras de engajamento (ROE). Se a situação A ocorrer, execute a ação X. Se a situação B ocorrer, execute a ação Y. Caso contrário, mantenha posição. A clareza nas condições é crítica - ambiguidade pode custar vidas. Em código, ambiguidade causa bugs.',
    
    why: {
      question: 'Por que precisamos que programas tomem decisões?',
      explanation: 'Sem condicionais, programas fariam sempre a mesma coisa. Com condicionais, um único programa se adapta a milhões de cenários diferentes. É a diferença entre um formulário estático e um sistema inteligente.',
      analogy: 'Imagine um semáforo que só mostra verde. Seria inútil. O semáforo precisa verificar condições (tempo, sensores) para decidir qual luz mostrar. Condicionais são o "cérebro" do seu código.',
    },
    
    whatFor: {
      question: 'Para que servem condicionais em análise de dados?',
      explanation: 'Condicionais permitem categorizar dados automaticamente, criar alertas baseados em limites, e implementar regras de negócio em análises.',
      useCases: [
        'Classificar clientes por faixa de renda',
        'Alertar quando estoque estiver baixo',
        'Aprovar/reprovar candidatos baseado em critérios',
        'Aplicar descontos diferentes por volume de compra',
      ],
    },
    
    how: {
      question: 'Como estruturar decisões em Python?',
      explanation: 'Python usa if (se), elif (senão se) e else (senão) para criar caminhos diferentes no código. A condição é avaliada como verdadeira ou falsa.',
      steps: [
        'Identifique a condição a ser testada',
        'Escreva "if condição:" seguido de dois pontos',
        'Indente o bloco de código que executa se verdadeiro',
        'Use "elif" para condições alternativas',
        'Use "else" para o caso padrão (opcional)',
      ],
      codeExample: '# Sistema de classificação de nota\nnota = 85\n\nif nota >= 90:\n    classificacao = "Excelente"\nelif nota >= 70:\n    classificacao = "Aprovado"\nelse:\n    classificacao = "Reprovado"\n\nprint(classificacao)  # Aprovado',
    },
    
    keyTakeaways: [
      'Condicionais permitem que o código tome decisões',
      'if, elif, else criam caminhos diferentes',
      'A primeira condição verdadeira é executada',
      'Indentação define o que pertence a cada bloco',
    ],
    
    commonPitfalls: [
      'Esquecer os dois pontos após a condição',
      'Indentação inconsistente (misturar tabs e espaços)',
      'Usar = (atribuição) ao invés de == (comparação)',
      'Não cobrir todos os casos possíveis',
    ],
    
    comprehensionQuiz: [
      {
        question: 'O que acontece quando múltiplas condições if/elif são verdadeiras?',
        options: [
          'Todas são executadas',
          'Apenas a primeira verdadeira é executada',
          'O programa dá erro',
          'A última verdadeira é executada',
        ],
        correctIndex: 1,
        explanation: 'Python avalia de cima para baixo. Assim que uma condição é verdadeira, executa aquele bloco e ignora o resto.',
      },
      {
        question: 'Por que a indentação é obrigatória em Python?',
        options: [
          'Apenas para deixar o código bonito',
          'Para definir quais linhas pertencem a cada bloco',
          'Por causa de uma limitação técnica',
          'Não é obrigatória, é opcional',
        ],
        correctIndex: 1,
        explanation: 'A indentação em Python define a estrutura do código. Ela indica quais linhas fazem parte de um if, loop ou função.',
      },
      {
        question: 'Quando usar elif ao invés de múltiplos if?',
        options: [
          'Quando as condições são mutuamente exclusivas',
          'Quando precisa executar todas as condições',
          'Nunca, são equivalentes',
          'Apenas para condições numéricas',
        ],
        correctIndex: 0,
        explanation: 'elif é usado quando apenas UMA das condições deve ser executada. Múltiplos if independentes podem executar todos.',
      },
    ],
  },

  // ============================================
  // MÓDULO 3: REPETIÇÕES E LOOPS
  // ============================================
  {
    id: 'theory-py-loops',
    lessonId: 'py-loops-theory',
    title: 'O Poder da Repetição',
    
    realWorldContext: 'Loops são a essência da automação. Quando você precisa processar 10.000 linhas de uma planilha, verificar 500 emails, ou calcular métricas para cada mês do ano, loops fazem isso em segundos. É a diferença entre trabalhar horas e trabalhar segundos.',
    
    militaryContext: 'Um loop é como uma ordem para toda a tropa: "Cada soldado deve verificar seu equipamento". Ao invés de dar a ordem individualmente 100 vezes, você dá uma vez e ela se aplica a todos. Eficiência operacional. Em combate, você não grita o nome de cada soldado - dá a ordem uma vez e todos executam.',
    
    why: {
      question: 'Por que automatizar tarefas repetitivas?',
      explanation: 'Humanos cometem erros em tarefas repetitivas - fadiga, distração, tédio. Computadores executam a mesma tarefa milhões de vezes com 100% de precisão. Além disso, o tempo economizado é exponencial.',
      analogy: 'É como a diferença entre escrever 1000 cartas à mão ou usar mala direta. O resultado é o mesmo, mas uma opção leva dias e a outra, minutos.',
    },
    
    whatFor: {
      question: 'Para que servem loops em análise de dados?',
      explanation: 'Loops permitem processar cada linha de um dataset, calcular métricas cumulativas, e aplicar transformações em massa.',
      useCases: [
        'Somar vendas de cada vendedor',
        'Calcular média de notas de cada aluno',
        'Enviar relatório para cada gerente de loja',
        'Verificar padrões em cada transação',
      ],
    },
    
    how: {
      question: 'Como criar loops em Python?',
      explanation: 'Python tem dois tipos principais: for (para iterar sobre sequências) e while (para repetir enquanto condição for verdadeira).',
      steps: [
        'Identifique o que precisa repetir',
        'Escolha for (quantidade definida) ou while (condição)',
        'for: "for item in sequência:" percorre cada elemento',
        'while: "while condição:" repete até condição ser falsa',
        'O bloco indentado é o que se repete',
      ],
      codeExample: '# Processando cada venda do mês\nvendas = [1500, 2300, 1800, 3200, 2100]\n\ntotal = 0\nfor venda in vendas:\n    total = total + venda\n    print(f"Acumulado: R${total}")\n\nprint(f"Total do mês: R${total}")  # R$10900',
    },
    
    keyTakeaways: [
      'for itera sobre sequências conhecidas',
      'while repete enquanto condição for verdadeira',
      'range(n) gera sequência de 0 até n-1',
      'Cuidado com loops infinitos (while True sem break)',
    ],
    
    commonPitfalls: [
      'Esquecer de atualizar a condição do while (loop infinito)',
      'Modificar a lista enquanto itera sobre ela',
      'Confundir range(5) = [0,1,2,3,4] não inclui 5',
      'Não inicializar variáveis acumuladoras antes do loop',
    ],
    
    comprehensionQuiz: [
      {
        question: 'Qual a diferença fundamental entre for e while?',
        options: [
          'for é mais rápido',
          'for itera sobre sequência, while repete por condição',
          'while não pode usar com listas',
          'Não há diferença, são equivalentes',
        ],
        correctIndex: 1,
        explanation: 'for percorre cada item de uma sequência. while repete enquanto uma condição for verdadeira, sem necessariamente iterar sobre algo.',
      },
      {
        question: 'O que range(3) produz?',
        options: [
          '[1, 2, 3]',
          '[0, 1, 2]',
          '[0, 1, 2, 3]',
          '[3]',
        ],
        correctIndex: 1,
        explanation: 'range(n) gera números de 0 até n-1. range(3) produz 0, 1, 2 (três números, começando do zero).',
      },
      {
        question: 'Como evitar um loop infinito em while?',
        options: [
          'Usar for ao invés de while',
          'Garantir que a condição eventualmente se torne falsa',
          'Adicionar mais condições',
          'Não é possível evitar',
        ],
        correctIndex: 1,
        explanation: 'A condição do while deve ser modificada dentro do loop para eventualmente se tornar falsa, ou usar break para sair.',
      },
    ],
  },

  // ============================================
  // MÓDULO 4: ESTRUTURAS DE DADOS
  // ============================================
  {
    id: 'theory-py-struct',
    lessonId: 'py-struct-theory',
    title: 'Organizando Informações',
    
    realWorldContext: 'Dados no mundo real vêm em diferentes formatos: listas de produtos, registros de funcionários com múltiplos campos, conjuntos de categorias únicas. Escolher a estrutura certa pode ser a diferença entre um código elegante de 3 linhas e um monstro de 30.',
    
    militaryContext: 'Pense em como informações são organizadas em uma operação: lista de objetivos (ordem importa), ficha de cada soldado (vários campos por pessoa), conjunto de equipamentos necessários (sem repetição). Cada tipo de informação requer organização diferente. Usar a estrutura errada é como tentar encaixar peça quadrada em buraco redondo.',
    
    why: {
      question: 'Por que existem diferentes estruturas de dados?',
      explanation: 'Cada estrutura é otimizada para um tipo de operação. Listas são boas para ordem, dicionários para busca rápida por chave, sets para unicidade. Escolher errado significa código lento ou complicado.',
      analogy: 'É como escolher entre uma estante, um arquivo de pastas, e uma caixa. Todos guardam coisas, mas cada um é melhor para um propósito específico.',
    },
    
    whatFor: {
      question: 'Para que serve cada estrutura?',
      explanation: 'Listas: quando ordem importa ou precisa de duplicatas. Dicionários: quando precisa acessar por nome/chave. Sets: quando precisa de valores únicos. Tuplas: quando dados não devem mudar.',
      useCases: [
        'Lista: ranking de vendedores (ordem importa)',
        'Dicionário: dados de um cliente (nome, idade, email)',
        'Set: categorias únicas de produtos',
        'Tupla: coordenadas geográficas (não devem mudar)',
      ],
    },
    
    how: {
      question: 'Como criar e usar cada estrutura?',
      explanation: 'Cada estrutura tem sintaxe própria: [] para lista, {} para dicionário/set, () para tupla.',
      steps: [
        'Lista: vendas = [100, 200, 150] - usa índices',
        'Dicionário: pessoa = {"nome": "Ana", "idade": 25}',
        'Set: categorias = {"A", "B", "C"} - sem duplicatas',
        'Tupla: coords = (10.5, 20.3) - imutável',
        'Acesso: lista[0], dict["chave"], valor in set',
      ],
      codeExample: '# Diferentes estruturas para diferentes propósitos\n\n# Lista - ordem das vendas importa\nvendas_mes = [1200, 1500, 1300]\n\n# Dicionário - dados do vendedor\nvendedor = {\n    "nome": "Carlos",\n    "regiao": "Sul",\n    "meta": 5000\n}\n\n# Set - regiões únicas\nregioes = {"Norte", "Sul", "Leste"}\n\nprint(vendedor["nome"])  # Carlos\nprint("Sul" in regioes)  # True',
    },
    
    keyTakeaways: [
      'Lista: ordenada, permite duplicatas, mutável',
      'Dicionário: chave-valor, busca rápida, mutável',
      'Set: valores únicos, sem ordem, operações de conjunto',
      'Tupla: ordenada, imutável, mais leve que lista',
    ],
    
    commonPitfalls: [
      'Usar lista quando dicionário seria mais eficiente',
      'Esquecer que dicionários precisam de chaves únicas',
      'Tentar modificar tupla (gera erro)',
      'Confundir {} vazio (dict) com set() vazio',
    ],
    
    comprehensionQuiz: [
      {
        question: 'Quando usar dicionário ao invés de lista?',
        options: [
          'Quando precisa de ordem',
          'Quando precisa acessar dados por nome/chave',
          'Quando tem poucos elementos',
          'Quando precisa de duplicatas',
        ],
        correctIndex: 1,
        explanation: 'Dicionários são ideais quando você precisa acessar dados por uma chave identificadora, como nome ou ID, em vez de posição.',
      },
      {
        question: 'Qual estrutura garante que não haverá elementos duplicados?',
        options: [
          'Lista',
          'Tupla',
          'Set',
          'Dicionário',
        ],
        correctIndex: 2,
        explanation: 'Sets automaticamente eliminam duplicatas. Se adicionar o mesmo valor duas vezes, ele só aparece uma vez.',
      },
      {
        question: 'Por que usar tupla se lista faz a mesma coisa?',
        options: [
          'Tuplas são mais rápidas para tudo',
          'Tuplas garantem que dados não serão alterados acidentalmente',
          'Listas não funcionam em Python 3',
          'Tuplas permitem mais elementos',
        ],
        correctIndex: 1,
        explanation: 'Tuplas são imutáveis - uma vez criadas, não podem ser alteradas. Isso protege dados que não devem mudar, como coordenadas ou configurações.',
      },
    ],
  },

  // ============================================
  // MÓDULO 5: FUNÇÕES
  // ============================================
  {
    id: 'theory-py-func',
    lessonId: 'py-func-theory',
    title: 'Modularização',
    
    realWorldContext: 'Funções são como máquinas especializadas em uma fábrica. Cada uma faz uma tarefa específica, recebe inputs e produz outputs. Você não reconstrói a máquina toda vez que precisa - apenas a usa. Em programação, funções evitam repetição e organizam o código.',
    
    militaryContext: 'Uma função é como um procedimento operacional padrão (POP). Uma vez definido, qualquer soldado pode executar sem precisar reinventar. "Executar procedimento de evacuação" é uma função: você define uma vez como fazer, depois só chama pelo nome quando precisar. Padronização e reuso.',
    
    why: {
      question: 'Por que criar funções ao invés de escrever tudo em sequência?',
      explanation: 'Funções eliminam repetição, facilitam manutenção e tornam o código testável. Se você copia e cola código, está fazendo errado - deveria ser uma função.',
      analogy: 'Imagine receitas culinárias. Você não descreve como fazer arroz em cada receita - você diz "faça arroz" porque é um procedimento conhecido. Funções são suas "receitas" reutilizáveis.',
    },
    
    whatFor: {
      question: 'Para que servem funções em análise de dados?',
      explanation: 'Funções permitem criar operações customizadas que podem ser aplicadas a diferentes datasets. DRY: Don\'t Repeat Yourself.',
      useCases: [
        'Calcular métricas padronizadas (ROI, margem, etc)',
        'Limpar e formatar dados de diferentes fontes',
        'Validar inputs antes de processar',
        'Aplicar transformações com df.apply()',
      ],
    },
    
    how: {
      question: 'Como criar e usar funções?',
      explanation: 'Use "def nome_funcao(parâmetros):" para definir. Use "return" para devolver resultado. Chame com "nome_funcao(argumentos)".',
      steps: [
        'def define a função com um nome',
        'Parênteses contêm os inputs (parâmetros)',
        'Dois pontos e bloco indentado = corpo da função',
        'return envia o resultado de volta',
        'Chamar: nome_funcao(valores)',
      ],
      codeExample: '# Função para calcular comissão\ndef calcular_comissao(vendas, taxa=0.05):\n    """Calcula comissão sobre vendas.\n    \n    Args:\n        vendas: valor total de vendas\n        taxa: percentual de comissão (default 5%)\n    \n    Returns:\n        valor da comissão\n    """\n    return vendas * taxa\n\n# Usando a função\ncomissao = calcular_comissao(10000)\nprint(f"Comissão: R${comissao}")  # R$500.0\n\n# Com taxa diferente\ncomissao_senior = calcular_comissao(10000, taxa=0.08)\nprint(f"Comissão sênior: R${comissao_senior}")  # R$800.0',
    },
    
    keyTakeaways: [
      'def define, return devolve o resultado',
      'Parâmetros são inputs, argumentos são valores passados',
      'Valores default permitem parâmetros opcionais',
      'Docstrings documentam o que a função faz',
    ],
    
    commonPitfalls: [
      'Esquecer o return (função retorna None)',
      'Modificar variáveis globais dentro da função',
      'Funções muito longas (divida em menores)',
      'Não documentar o que a função espera/retorna',
    ],
    
    comprehensionQuiz: [
      {
        question: 'O que acontece se uma função não tem return?',
        options: [
          'Erro de sintaxe',
          'A função retorna None',
          'Retorna o último valor calculado',
          'O programa trava',
        ],
        correctIndex: 1,
        explanation: 'Funções sem return explícito retornam None automaticamente. Isso é comum em funções que fazem algo (como print) mas não precisam retornar valor.',
      },
      {
        question: 'Qual a vantagem de parâmetros com valores default?',
        options: [
          'Tornam a função mais rápida',
          'Permitem chamar a função sem passar todos os argumentos',
          'Evitam erros de tipo',
          'São obrigatórios em Python',
        ],
        correctIndex: 1,
        explanation: 'Valores default permitem omitir argumentos na chamada. O valor default é usado quando não passamos explicitamente.',
      },
      {
        question: 'Por que documentar funções com docstrings?',
        options: [
          'O Python exige para funcionar',
          'Torna a função mais rápida',
          'Ajuda outros (e você no futuro) a entender o propósito',
          'Apenas para funções públicas',
        ],
        correctIndex: 2,
        explanation: 'Docstrings explicam o que a função faz, quais parâmetros espera e o que retorna. Essencial para código mantível.',
      },
    ],
  },

  // ============================================
  // MÓDULO 6: INTRODUÇÃO AO PANDAS
  // ============================================
  {
    id: 'theory-pd-intro',
    lessonId: 'pd-intro-theory',
    title: 'O Mundo dos Dados',
    
    realWorldContext: 'Pandas é A biblioteca de análise de dados em Python. É usada por cientistas de dados, analistas financeiros e pesquisadores no mundo todo. Se você vai trabalhar com dados em Python, vai usar Pandas. É como Excel com superpoderes.',
    
    militaryContext: 'Pandas é como um sistema de C2 (Comando e Controle) para dados. Assim como um centro de operações consolida informações de múltiplas fontes, organiza em relatórios e permite análises rápidas, Pandas centraliza dados de diferentes origens em uma estrutura uniforme para tomada de decisão.',
    
    why: {
      question: 'Por que usar Pandas se temos planilhas e SQL?',
      explanation: 'Pandas combina a facilidade visual de planilhas com o poder computacional de SQL, tudo em Python. Você pode ler dados de qualquer fonte, manipular com código reproduzível, e salvar em qualquer formato.',
      analogy: 'Planilha é como uma calculadora - bom para coisas simples. SQL é um depósito organizado - bom para armazenar. Pandas é um laboratório completo - você manipula, analisa, visualiza, tudo em um lugar.',
    },
    
    whatFor: {
      question: 'Para que serve Pandas na prática?',
      explanation: 'Pandas permite carregar, limpar, transformar, analisar e exportar dados. É a ferramenta central em qualquer pipeline de análise.',
      useCases: [
        'Carregar CSV de vendas e calcular métricas',
        'Cruzar dados de diferentes sistemas',
        'Limpar dados inconsistentes automaticamente',
        'Gerar relatórios analíticos',
      ],
    },
    
    how: {
      question: 'Como funciona Pandas?',
      explanation: 'Pandas tem duas estruturas principais: Series (uma coluna) e DataFrame (tabela). DataFrames são coleções de Series.',
      steps: [
        'import pandas as pd (convenção universal)',
        'DataFrame = tabela de dados (linhas e colunas)',
        'Series = uma única coluna',
        'df["coluna"] retorna uma Series',
        'df[["col1", "col2"]] retorna um DataFrame',
      ],
      codeExample: 'import pandas as pd\n\n# Criando DataFrame de vendas\ndf = pd.DataFrame({\n    "vendedor": ["Ana", "Carlos", "Maria"],\n    "vendas": [15000, 12000, 18000],\n    "região": ["Sul", "Norte", "Sul"]\n})\n\nprint(df)\n#   vendedor  vendas região\n# 0      Ana   15000    Sul\n# 1   Carlos   12000  Norte\n# 2    Maria   18000    Sul\n\nprint(df["vendas"].mean())  # 15000.0',
    },
    
    keyTakeaways: [
      'DataFrame = tabela, Series = coluna',
      'import pandas as pd é a convenção',
      'Índice identifica cada linha (pode ser número ou nome)',
      'Pandas lê CSV, Excel, SQL, JSON e muito mais',
    ],
    
    commonPitfalls: [
      'Esquecer de importar pandas',
      'Confundir df["col"] (Series) com df[["col"]] (DataFrame)',
      'Não resetar índice após operações que o modificam',
      'Assumir que dados estão limpos (sempre verificar)',
    ],
    
    comprehensionQuiz: [
      {
        question: 'Qual a diferença entre Series e DataFrame?',
        options: [
          'Series é mais rápida',
          'Series é uma coluna, DataFrame é uma tabela',
          'DataFrame só aceita números',
          'Não há diferença',
        ],
        correctIndex: 1,
        explanation: 'Series é unidimensional (uma coluna), DataFrame é bidimensional (tabela com múltiplas colunas). DataFrame é uma coleção de Series.',
      },
      {
        question: 'O que "pd" representa em "import pandas as pd"?',
        options: [
          'Uma versão diferente do Pandas',
          'Um apelido (alias) para usar o pandas',
          'Uma submódulo do pandas',
          'É obrigatório usar pd',
        ],
        correctIndex: 1,
        explanation: 'pd é um alias (apelido) que permite escrever pd.DataFrame() ao invés de pandas.DataFrame(). É convenção universal.',
      },
      {
        question: 'Por que Pandas é preferido sobre planilhas para análise profissional?',
        options: [
          'Planilhas não existem mais',
          'Código é reproduzível, escala melhor e automatiza',
          'Pandas é gratuito e planilhas não',
          'Pandas tem melhor interface visual',
        ],
        correctIndex: 1,
        explanation: 'Código Pandas pode ser reexecutado, versionado, revisado. Planilhas são manuais, propensas a erro e não escalam para milhões de linhas.',
      },
    ],
  },

  // ============================================
  // MÓDULO 7: MANIPULAÇÃO DE DADOS
  // ============================================
  {
    id: 'theory-pd-manip',
    lessonId: 'pd-manip-theory',
    title: 'A Arte da Seleção',
    
    realWorldContext: 'Dados reais são volumosos. Você não analisa tudo de uma vez - seleciona, filtra, recorta. Saber selecionar exatamente o que precisa é a habilidade mais usada em análise de dados. É como um cirurgião: precisão importa.',
    
    militaryContext: 'Filtrar dados é como triagem de inteligência. De milhares de informações, você precisa extrair apenas o que é relevante para a missão. Se filtrar demais, perde informação crítica. Se filtrar de menos, fica sobrecarregado. Precisão cirúrgica.',
    
    why: {
      question: 'Por que precisamos selecionar e filtrar dados?',
      explanation: 'Datasets reais têm milhões de linhas e dezenas de colunas. Analisar tudo é impossível e desnecessário. Filtros focam sua análise no que importa para a pergunta específica.',
      analogy: 'É como pesquisar no Google. Você não lê toda a internet - usa termos específicos para encontrar exatamente o que precisa.',
    },
    
    whatFor: {
      question: 'Para que servem loc e iloc?',
      explanation: 'loc seleciona por nome/label (intuivo), iloc seleciona por posição numérica (quando precisa de índices específicos). Domine ambos.',
      useCases: [
        'Extrair vendas de uma região específica',
        'Selecionar apenas clientes acima de um valor',
        'Obter as primeiras 100 linhas para amostragem',
        'Filtrar por múltiplos critérios combinados',
      ],
    },
    
    how: {
      question: 'Como selecionar dados em Pandas?',
      explanation: 'df[condição] filtra linhas. df["col"] seleciona coluna. df.loc[linhas, colunas] seleciona ambos por nome. df.iloc[linhas, colunas] seleciona por posição.',
      steps: [
        'df["coluna"] - seleciona uma coluna',
        'df[df["col"] > valor] - filtra linhas por condição',
        'df.loc[condição, ["col1", "col2"]] - filtra linhas E colunas',
        'df.iloc[0:10, 0:3] - primeiras 10 linhas, 3 colunas',
        'Combine condições com & (E) e | (OU)',
      ],
      codeExample: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "nome": ["Ana", "Carlos", "Maria", "João"],\n    "vendas": [15000, 12000, 18000, 9000],\n    "regiao": ["Sul", "Norte", "Sul", "Norte"]\n})\n\n# Filtrar vendedores do Sul com vendas > 14000\nfiltro = (df["regiao"] == "Sul") & (df["vendas"] > 14000)\ntop_sul = df.loc[filtro, ["nome", "vendas"]]\nprint(top_sul)\n#     nome  vendas\n# 0    Ana   15000\n# 2  Maria   18000',
    },
    
    keyTakeaways: [
      'df[condição] retorna linhas onde condição é True',
      'loc usa labels/nomes, iloc usa posições numéricas',
      '& para E, | para OU (com parênteses!)',
      'Filtros retornam cópia, não modificam original',
    ],
    
    commonPitfalls: [
      'Usar "and"/"or" ao invés de "&"/"|"',
      'Esquecer parênteses em condições combinadas',
      'Confundir loc (label) com iloc (posição)',
      'Não verificar se o filtro retornou dados',
    ],
    
    comprehensionQuiz: [
      {
        question: 'Qual a diferença entre loc e iloc?',
        options: [
          'loc é mais rápido',
          'loc usa nomes/labels, iloc usa índices numéricos',
          'iloc é para DataFrames grandes',
          'Não há diferença',
        ],
        correctIndex: 1,
        explanation: 'loc seleciona por nome (label-based), iloc seleciona por posição (integer-based). iloc[0] é a primeira linha, loc["2020"] é a linha com índice "2020".',
      },
      {
        question: 'Por que usar & ao invés de "and" em Pandas?',
        options: [
          'Não há diferença, ambos funcionam',
          '"and" opera em valores únicos, & opera elemento a elemento',
          '"and" é mais lento',
          '& é mais fácil de digitar',
        ],
        correctIndex: 1,
        explanation: 'Em Pandas, precisamos comparar elemento por elemento (vetorização). & faz isso, "and" não funciona com Series.',
      },
      {
        question: 'O que acontece ao fazer df[df["col"] > 10]?',
        options: [
          'Modifica o DataFrame original',
          'Retorna nova cópia com linhas onde col > 10',
          'Deleta linhas onde col <= 10',
          'Erro de sintaxe',
        ],
        correctIndex: 1,
        explanation: 'Filtros retornam uma cópia (view) com as linhas que satisfazem a condição. O DataFrame original não é modificado.',
      },
    ],
  },

  // ============================================
  // MÓDULO 8: ANÁLISE E AGREGAÇÃO
  // ============================================
  {
    id: 'theory-pd-analysis',
    lessonId: 'pd-analysis-theory',
    title: 'Extraindo Insights',
    
    realWorldContext: 'Dados brutos não contam histórias - agregações sim. "Vendas por região", "média por categoria", "total por mês" - são agregações que transformam milhares de linhas em insights acionáveis. GroupBy é a ferramenta mais poderosa do Pandas.',
    
    militaryContext: 'GroupBy é como consolidar relatórios de situação (SITREP). Cada unidade reporta individualmente, mas o comando precisa de visão agregada: total de efetivo por região, média de suprimentos por batalhão, situação por setor. Agregar é ver o quadro geral sem perder a capacidade de drill-down.',
    
    why: {
      question: 'Por que agregar dados ao invés de analisar linha por linha?',
      explanation: 'Humanos não processam milhares de números - processam resumos. Agregações transformam dados em informação: total, média, contagem, desvio padrão. Padrões emergem de agregações.',
      analogy: 'É como um boletim escolar. O professor não mostra todas as notas de todas as provas - mostra a média. A média é uma agregação que resume performance.',
    },
    
    whatFor: {
      question: 'Para que serve GroupBy?',
      explanation: 'GroupBy divide dados em grupos (por categoria, região, período), aplica uma função (soma, média, contagem), e combina os resultados. Split-Apply-Combine.',
      useCases: [
        'Vendas totais por região',
        'Média de salário por departamento',
        'Contagem de clientes por categoria',
        'Máximo de vendas por vendedor',
      ],
    },
    
    how: {
      question: 'Como usar GroupBy?',
      explanation: 'df.groupby("coluna_grupo")["coluna_valor"].função(). Pode agrupar por múltiplas colunas e aplicar múltiplas funções com .agg().',
      steps: [
        'Identifique a coluna de agrupamento',
        'Use df.groupby("coluna") para criar grupos',
        'Selecione a coluna para calcular',
        'Aplique a função de agregação (sum, mean, count)',
        'Use .agg() para múltiplas funções',
      ],
      codeExample: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "regiao": ["Sul", "Norte", "Sul", "Norte", "Sul"],\n    "vendedor": ["Ana", "Carlos", "Maria", "João", "Pedro"],\n    "vendas": [15000, 12000, 18000, 9000, 14000]\n})\n\n# Total de vendas por região\npor_regiao = df.groupby("regiao")["vendas"].sum()\nprint(por_regiao)\n# regiao\n# Norte    21000\n# Sul      47000\n\n# Múltiplas estatísticas\nstats = df.groupby("regiao")["vendas"].agg(["sum", "mean", "count"])\nprint(stats)',
    },
    
    keyTakeaways: [
      'GroupBy segue Split-Apply-Combine',
      'sum(), mean(), count(), min(), max() são agregações comuns',
      '.agg() permite múltiplas funções de uma vez',
      'Resultado tem a coluna de grupo como índice',
    ],
    
    commonPitfalls: [
      'Esquecer de selecionar a coluna de valor',
      'Tentar acessar colunas não numéricas com mean()',
      'Não resetar índice quando precisa do grupo como coluna',
      'Confundir transform() com apply()',
    ],
    
    comprehensionQuiz: [
      {
        question: 'O que significa "Split-Apply-Combine" no GroupBy?',
        options: [
          'Três etapas separadas de código',
          'Dividir por grupo, aplicar função, juntar resultados',
          'Uma técnica de otimização',
          'Três tipos diferentes de agregação',
        ],
        correctIndex: 1,
        explanation: 'GroupBy divide os dados em grupos, aplica uma função a cada grupo, e combina os resultados em um único output.',
      },
      {
        question: 'Qual a diferença entre agg() e transform()?',
        options: [
          'agg reduz tamanho, transform mantém tamanho original',
          'transform é mais rápido',
          'agg só funciona com números',
          'Não há diferença',
        ],
        correctIndex: 0,
        explanation: 'agg() retorna um valor por grupo (menor). transform() retorna valor para cada linha original (mesmo tamanho do DataFrame original).',
      },
      {
        question: 'Como obter múltiplas estatísticas de uma vez?',
        options: [
          'Chamar sum(), mean() separadamente',
          'Usar .agg(["sum", "mean"])',
          'Não é possível',
          'Usar loop for',
        ],
        correctIndex: 1,
        explanation: '.agg() aceita lista de funções, retornando DataFrame com uma coluna para cada estatística.',
      },
    ],
  },

  // ============================================
  // MÓDULO 9: PANDAS AVANÇADO
  // ============================================
  {
    id: 'theory-pd-adv',
    lessonId: 'pd-adv-theory',
    title: 'Dados do Mundo Real',
    
    realWorldContext: 'Dados reais são bagunçados: vêm de múltiplas fontes que precisam ser combinadas (merge), têm valores faltantes (NaN), e podem ser enormes (otimização). Este módulo prepara você para a realidade profissional.',
    
    militaryContext: 'Integrar dados é como consolidar inteligência de múltiplas fontes (HUMINT, SIGINT, IMINT). Cada fonte tem formato diferente, alguns dados estão incompletos, e você precisa cruzar para ter visão completa. Merge é a operação de fusão de informações.',
    
    why: {
      question: 'Por que precisamos combinar DataFrames?',
      explanation: 'Dados geralmente estão espalhados: clientes em uma tabela, vendas em outra, produtos em terceira. Merge/Join conecta essas tabelas usando chaves comuns.',
      analogy: 'É como juntar peças de um quebra-cabeça. Cada tabela é uma peça, a chave comum é a forma de encaixe. O resultado final é a imagem completa.',
    },
    
    whatFor: {
      question: 'Para que servem os diferentes tipos de join?',
      explanation: 'Inner: só o que existe em ambos. Left: tudo da esquerda + matches da direita. Right: tudo da direita + matches da esquerda. Outer: tudo de ambos.',
      useCases: [
        'Combinar vendas com dados de clientes',
        'Juntar produtos com categorias',
        'Cruzar performance com metas',
        'Integrar dados de diferentes sistemas',
      ],
    },
    
    how: {
      question: 'Como fazer merge em Pandas?',
      explanation: 'pd.merge(df1, df2, on="chave", how="tipo"). A chave é a coluna comum, how define o tipo de join.',
      steps: [
        'Identifique a coluna comum (chave)',
        'Use pd.merge(df1, df2, on="chave")',
        'how="inner" (default), "left", "right", "outer"',
        'left_on/right_on se colunas têm nomes diferentes',
        'Verifique duplicatas após merge',
      ],
      codeExample: 'import pandas as pd\n\n# Tabela de vendas\nvendas = pd.DataFrame({\n    "cliente_id": [1, 2, 3, 1],\n    "valor": [100, 200, 150, 80]\n})\n\n# Tabela de clientes\nclientes = pd.DataFrame({\n    "id": [1, 2, 4],\n    "nome": ["Ana", "Carlos", "João"]\n})\n\n# Merge: vendas com nomes de clientes\nresultado = pd.merge(\n    vendas, \n    clientes, \n    left_on="cliente_id", \n    right_on="id", \n    how="left"\n)\nprint(resultado)',
    },
    
    keyTakeaways: [
      'merge() combina DataFrames por colunas comuns',
      'Inner: interseção. Outer: união. Left/Right: prioriza um lado',
      'NaN indica valores faltantes após merge',
      'Sempre verificar o tamanho após merge (pode aumentar ou diminuir)',
    ],
    
    commonPitfalls: [
      'Merge gerando mais linhas que esperado (duplicatas na chave)',
      'Esquecer de especificar how (default é inner)',
      'Não tratar NaN após left/right join',
      'Confundir merge com concat',
    ],
    
    comprehensionQuiz: [
      {
        question: 'Qual tipo de join mantém todas as linhas da tabela da esquerda?',
        options: [
          'Inner join',
          'Left join',
          'Outer join',
          'Right join',
        ],
        correctIndex: 1,
        explanation: 'Left join mantém todas as linhas da tabela da esquerda, preenchendo com NaN onde não há correspondência na direita.',
      },
      {
        question: 'O que acontece quando a chave tem duplicatas em ambas as tabelas?',
        options: [
          'Erro de execução',
          'Apenas o primeiro match é usado',
          'Produto cartesiano - todas as combinações',
          'As duplicatas são removidas',
        ],
        correctIndex: 2,
        explanation: 'Se a chave tem duplicatas em ambos os lados, o merge cria todas as combinações possíveis, podendo aumentar muito o número de linhas.',
      },
      {
        question: 'Quando usar concat ao invés de merge?',
        options: [
          'Quando quer combinar por chave comum',
          'Quando quer empilhar DataFrames (mesmas colunas)',
          'Concat é mais rápido',
          'São equivalentes',
        ],
        correctIndex: 1,
        explanation: 'concat() empilha DataFrames verticalmente (mesmas colunas) ou horizontalmente. merge() combina usando chaves comuns.',
      },
    ],
  },

  // ============================================
  // MÓDULO 10: INGLÊS TÉCNICO - LEITURA
  // ============================================
  {
    id: 'theory-eng-read',
    lessonId: 'eng-read-theory',
    title: 'Estratégias de Leitura Técnica',
    
    realWorldContext: 'Documentação técnica em inglês é realidade inescapável. Stack Overflow, documentação oficial, tutoriais - 90% do conteúdo relevante está em inglês. Ler eficientemente é diferencial competitivo.',
    
    militaryContext: 'Leitura técnica é como análise de inteligência estrangeira. Você não precisa traduzir cada palavra - precisa extrair informação acionável. Foco em termos-chave, padrões reconhecíveis e contexto. Velocidade com precisão.',
    
    why: {
      question: 'Por que ler documentação em inglês é inevitável?',
      explanation: 'A comunidade tech é global e inglês é a língua franca. Erros, soluções e novas features aparecem primeiro em inglês. Esperar tradução significa ficar para trás.',
      analogy: 'É como precisar de notícias em tempo real. Você pode esperar o jornal traduzido amanhã, ou ler a fonte original agora. Em tech, velocidade importa.',
    },
    
    whatFor: {
      question: 'Para que serve dominar vocabulário técnico?',
      explanation: 'Vocabulário técnico é limitado e repetitivo. Uma vez dominado, você lê qualquer documentação. São os mesmos 500 termos aparecendo em contextos diferentes.',
      useCases: [
        'Ler documentação oficial do Pandas',
        'Entender respostas no Stack Overflow',
        'Interpretar mensagens de erro',
        'Seguir tutoriais e cursos internacionais',
      ],
    },
    
    how: {
      question: 'Como ler documentação técnica eficientemente?',
      explanation: 'Scanning (visão geral) → Skimming (pontos principais) → Leitura detalhada (quando necessário). Foco em código de exemplo primeiro.',
      steps: [
        'Scanning: títulos, subtítulos, estrutura',
        'Exemplos de código: entenda o que faz',
        'Parâmetros e retorno: inputs e outputs',
        'Notes/Warnings: informações críticas',
        'Detalhes: só quando necessário',
      ],
      codeExample: '# Exemplo: Lendo documentação do pd.merge()\n\n# Parameters:\n# left : DataFrame - o que é\n# right : DataFrame - o que é  \n# how : {"left", "right", "outer", "inner"} - opções\n# on : label or list - como usar\n\n# Returns:\n# DataFrame\n\n# Examples: <- SEMPRE COMEÇAR AQUI\n# pd.merge(df1, df2, on="key")\n# pd.merge(df1, df2, left_on="a", right_on="b")',
    },
    
    keyTakeaways: [
      'Comece pelo exemplo de código, não pela teoria',
      'Parameters = inputs, Returns = outputs',
      'Warnings/Notes contêm armadilhas comuns',
      'Vocabulário técnico é finito e repetitivo',
    ],
    
    commonPitfalls: [
      'Tentar traduzir palavra por palavra',
      'Ignorar exemplos de código',
      'Não usar Ctrl+F para buscar termos específicos',
      'Decorar ao invés de entender padrões',
    ],
    
    comprehensionQuiz: [
      {
        question: 'Por onde começar ao ler documentação de uma função?',
        options: [
          'Pela descrição detalhada',
          'Pelos parâmetros',
          'Pelos exemplos de código',
          'Pelo histórico de versões',
        ],
        correctIndex: 2,
        explanation: 'Exemplos mostram uso prático. Depois de entender o exemplo, os parâmetros e descrição fazem mais sentido.',
      },
      {
        question: 'O que significa "deprecated" em documentação?',
        options: [
          'Funcionalidade nova',
          'Funcionalidade que será removida/substituída',
          'Funcionalidade importante',
          'Funcionalidade rápida',
        ],
        correctIndex: 1,
        explanation: 'Deprecated significa que a função/método ainda funciona mas será removido em versões futuras. Evite usar.',
      },
      {
        question: 'Qual estratégia para entender termos desconhecidos em contexto técnico?',
        options: [
          'Parar e traduzir cada palavra',
          'Inferir pelo contexto e código de exemplo',
          'Ignorar e continuar',
          'Usar tradutor automático em tudo',
        ],
        correctIndex: 1,
        explanation: 'Contexto técnico é previsível. O código de exemplo geralmente esclarece o significado prático do termo.',
      },
    ],
  },

  // ============================================
  // MÓDULO 11: INGLÊS TÉCNICO - PATTERNS
  // ============================================
  {
    id: 'theory-eng-pattern',
    lessonId: 'eng-pattern-theory',
    title: 'Padrões Recorrentes',
    
    realWorldContext: 'Inglês técnico segue padrões previsíveis. Verbos de ação (implement, execute, return), estruturas condicionais (if X, then Y), comparações (faster than, more efficient). Reconhecer padrões acelera compreensão.',
    
    militaryContext: 'Padrões linguísticos são como procedimentos operacionais. Uma vez que você reconhece a estrutura, o conteúdo específico é fácil de encaixar. "If threat detected, then engage" segue o mesmo padrão de "if condition met, then execute".',
    
    why: {
      question: 'Por que focar em padrões ao invés de vocabulário isolado?',
      explanation: 'Padrões são reutilizáveis em infinitos contextos. Vocabulário isolado esquece rápido. Padrões ficam e se aplicam a novos termos automaticamente.',
      analogy: 'É como aprender a estrutura de uma frase em vez de decorar frases inteiras. "Subject + verb + object" funciona para milhões de frases.',
    },
    
    whatFor: {
      question: 'Para que servem padrões em provas de inglês técnico?',
      explanation: 'Provas testam compreensão, não tradução. Reconhecer padrões permite inferir significado mesmo com vocabulário desconhecido.',
      useCases: [
        'Identificar instruções em documentação',
        'Entender condições e requisitos',
        'Comparar opções técnicas',
        'Responder questões de interpretação',
      ],
    },
    
    how: {
      question: 'Quais são os padrões mais comuns?',
      explanation: 'Instruções (imperativos), condicionais (if/when/unless), comparações (than/unlike), sequência (first/then/finally), causa-efeito (because/therefore).',
      steps: [
        'Imperativos: Use, Create, Run, Install, Configure',
        'Condicionais: If X, then Y. When A, B happens',
        'Comparações: X is faster than Y. Unlike Z, W...',
        'Sequência: First, Then, Next, Finally',
        'Causa-efeito: Because, Therefore, As a result',
      ],
      codeExample: '# Padrões em documentação técnica\n\n# IMPERATIVO (instruções):\n# "Install the package using pip"\n# "Create a new DataFrame"\n# "Run the script with python"\n\n# CONDICIONAL:\n# "If the file exists, load it"\n# "When the condition is met, execute"\n# "Unless specified, the default is used"\n\n# COMPARAÇÃO:\n# "NumPy is faster than pure Python"\n# "Unlike lists, arrays are homogeneous"',
    },
    
    keyTakeaways: [
      'Imperativos indicam ações a tomar',
      'Condicionais definem comportamentos situacionais',
      'Comparações ajudam a escolher entre opções',
      'Palavras de transição sinalizam estrutura',
    ],
    
    commonPitfalls: [
      'Focar em palavras isoladas, ignorando estrutura',
      'Não identificar o verbo principal da frase',
      'Confundir "unless" (exceto se) com "if" (se)',
      'Ignorar negações que invertem significado',
    ],
    
    comprehensionQuiz: [
      {
        question: 'O que "unless otherwise specified" significa?',
        options: [
          'Sempre faça isso',
          'Nunca faça isso',
          'A menos que seja dito diferente',
          'Apenas em casos especiais',
        ],
        correctIndex: 2,
        explanation: '"Unless otherwise specified" significa que o comportamento padrão é X, exceto se explicitamente dito para fazer diferente.',
      },
      {
        question: 'Qual padrão indica uma instrução direta?',
        options: [
          'Frases com "should"',
          'Verbos no imperativo (Create, Run, Use)',
          'Frases com "might"',
          'Perguntas',
        ],
        correctIndex: 1,
        explanation: 'Imperativos são comandos diretos: "Create a file", "Run the script", "Install the package". Não há sujeito explícito.',
      },
      {
        question: 'O que "deprecated in favor of X" significa?',
        options: [
          'X é mais antigo',
          'Use X ao invés desta função',
          'X é mais lento',
          'X está quebrado',
        ],
        correctIndex: 1,
        explanation: '"Deprecated in favor of X" significa que a função atual não deve mais ser usada, e X é a alternativa recomendada.',
      },
    ],
  },
];
