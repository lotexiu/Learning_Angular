# LearningAngular

## installing angular
use `-g` to make global
to install angular cli its: `npm install -g @angular/cli`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Help angular
```ts

// anotação para variavel para alterar de forma externa por tags
@Input() variavel1 = ""
@Input({transform:booleanAttribute}) variavel1 = false // variavel boleana

// uma função que é chamada toda vez que uma das variáveis com @Input é alterada de maneira externa
OnChanges()

// uma função que é chamada apenas uma vez na inicialição do componente (na chamada do componente em HTML)
OnInit()

// executado após quando o componente não é mais chamado no html.
OnDestroy()

//Executa quando propriedades do componente são verificadas (alguma alteração ocorre)
1 ngDoCheck()

//executa quando Angular realiza qualquer projeção de conteúdo em seus componentes -- CONTEUDO
1.1 ngAfterContentInit()

// Executa depois que um componente é totalmente inicializada (carregou tudo da parte visual) -- RENDERIZAÇÃO
1.2 ngAfterViewInit()

// Após alguma alteração, a função é chamada depois do ngDoCheck() -- CONTEUDO
1.3 ngAfterContentChecked()

// Após alguma alteração, a função é chamada depois do ngAfterContentChecked() -- RENDERIZAÇÃO
1.4 ngAfterViewChecked()

// popout Alert
alert("texto")

// HTML //
HTML <--{{value}}     TYPESCRIPT
// utilizado normalmente em: visualiação ou envio de informações TS
// EX: class="something {{value}}" OU <p>{{value}}</p> (One-way)

HTML <-- [statement]      TYPESCRIPT
// utilizado normalmente em: envio de informações TS para variaveis html
// EX: [ngModel]="value" (One-way)

HTML     (event) -->  TYPESCRIPT
// utilizado normalmente em: chamada de funçao em evento html e angular
// EX: (click)="callFunction()" OU (ngModel)="value" (One-way)

HTML <--[(event)]-->  TYPESCRIPT
// utilizado normalmente em: envio e retorno de valor do TS e HTML
// EX: ([ngModel])="value"   -- ESTA atualizando a variavel value do TS e também pode atualizar a variavel do elemento (Two-ways)

//TAGS
*nglf // Condicional que verifica se rnodelo deve ser visualizado ou nao
*ngFor // repete um elemento para cada item em uma lista
*ngSwitch // Utilizado para alternar entre alternativos (é um switch case)
*ngSwitchCase // Utilizado para citar os blocos alternativos de um *ngSwitch

//ELEMENTOS
<ng-template> 
// todo conteudo dentro so irá ficar visivel quando *ngIf for true

<ng-content>  
/* 
caso tenha algo dentro do elemento que é a chamada do componente, sera mostrado dentro do ng-content e
utilizando a tag SELECT pode ser citado o elemento que deve ficar dentro do ng-content por exemplo:
select="p"  exibira apenas os elementos p
select="[p]" exibirra apenas os elementos que contem a tag p
 */
```