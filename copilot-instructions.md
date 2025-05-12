# Regras Gerais do Projeto Learning_Angular

- O idioma padrão para comunicação é Português (PT-br), mas todo o código, nomes de variáveis, funções, tipos e comentários técnicos devem ser escritos em Inglês.
- Documentação de código (JSDoc, docstrings, comentários explicativos) deve ser sempre em Inglês. Documentação em Português só é permitida em arquivos de ajuda geral (README, CHANGELOG, etc).
- Não criar, modificar ou ler arquivos dentro da pasta "old (Angular 18)", exceto se explicitamente solicitado.
- Sempre que criar uma nova tipagem (type/interface), adicionar exemplos de uso e resultado esperado na documentação (JSDoc).
- Antes de criar uma nova função ou utilitário, verifique se já existe algo equivalente no projeto para evitar duplicidade.
- Funções utilitárias devem ser exportadas de forma nomeada e, se fizer sentido, também como alias padronizado (ex: mathSum, strCapitalize).
- Não utilizar nomes de variáveis, funções ou tipos em Português.
- Ao criar novos arquivos de utilitários, seguir o padrão de exportação e organização dos demais utilitários do projeto.
- Sempre que criar ou modificar código, garantir que a documentação esteja em Inglês e siga o padrão de exemplos adotado no projeto.
- Evitar repetição de código: se encontrar padrões repetidos em tipagens ou funções, crie um utilitário ou type genérico e utilize-o.
- Ao criar componentes, serviços ou diretivas Angular, seguir a estrutura de pastas já existente (ex: components, directives, services).
- Sempre utilizar importações relativas e padronizadas, evitando caminhos absolutos fora do padrão do projeto.
- Não criar arquivos ou pastas na raiz do projeto sem necessidade. Novos módulos devem ser organizados dentro de "src/app" ou "src/utils".
- Ao criar testes, seguir o padrão dos arquivos *.spec.ts e garantir cobertura mínima para novas funcionalidades.
- Sempre manter este arquivo de regras atualizado conforme novas instruções forem fornecidas.

# Regras Específicas para Tipagens

- Tipagens utilitárias (types/interfaces) devem ser criadas em arquivos separados dentro de "src/utils/typescript".
- Sempre documentar as tipagens com exemplos de uso e resultado esperado.
- Reutilizar tipagens já existentes antes de criar novas.
- Não duplicar tipos que já existem na biblioteca padrão do TypeScript, a menos que seja para adicionar documentação ou exemplos.

# Regras para Componentes Angular

- O nome dos componentes deve ser em inglês e no padrão PascalCase.
- Cada componente deve ter seu próprio arquivo de template (.html), estilo (.scss) e teste (.spec.ts).
- Sempre documentar as propriedades públicas e métodos dos componentes com JSDoc em inglês.
- Utilizar o Angular CLI para geração de novos componentes, serviços e módulos sempre que possível.

# Regras para Utilitários

- Utilitários de string, array, objeto, math, etc., devem ser organizados em "src/utils/typescript/natives".
- Funções utilitárias devem ser puras e reutilizáveis.
- Sempre exportar utilitários de forma nomeada.
- Adicionar exemplos de uso em JSDoc.

# Regras para Utilitários (Padrão de Delegação)

- Sempre que possível, funções utilitárias devem ser implementadas como funções nomeadas em arquivos internos (ex: `internal.ts`) dentro do domínio correspondente (ex: `math`, `string`, etc.).
- Agrupe essas funções em um objeto (ex: `_Math`, `_String`) exportado pelo arquivo interno.
- As classes utilitárias (ex: `MathUtils`, `StringUtils`) devem apenas delegar suas operações para as funções do objeto agrupador, mantendo a interface estática e centralizando a lógica nas funções nomeadas.
- Esse padrão deve ser seguido para evitar dependências circulares, facilitar testes e promover reutilização de código.
- Exemplo:
  - Função nomeada em `internal.ts`: `function capitalize(str: string): string { ... }`
  - Objeto agrupador: `export const _String = { capitalize, ... }`
  - Classe delegando: `static capitalize(str: string): string { return _String.capitalize(str); }`

# Regras para Utilitários (internal.ts)

- Arquivos internal.ts devem conter apenas funções nomeadas internas e o objeto agrupador correspondente (ex: _Math, _String, _Mask).
- Não exportar funções, tipos ou constantes individualmente em internal.ts; apenas o objeto agrupador deve ser exportado.
- Todo acesso externo deve ser feito exclusivamente pelo objeto agrupador exportado.
- Não adicionar documentação (JSDoc, docstrings, comentários explicativos) nesses arquivos; a documentação deve ser feita apenas nos arquivos públicos de utilitários.
- O objetivo é centralizar a lógica, evitar poluição do escopo global e garantir o padrão de delegação do projeto.
- Exemplo:
  - Correto:
    ```typescript
    function capitalize(str: string): string { ... }
    export const _String = { capitalize };
    ```
  - Incorreto:
    ```typescript
    export function capitalize(str: string): string { ... }
    export const _String = { capitalize };
    ```
