import Game from '../../Domain/Game/Game.ts'

export default function (): Game[] {
  return [
    {
      id: 1,
      description: 'Básico',
      author: 'william@phpcomrapadura.org.br',
      createdAt: new Date(),
      updatedAt: new Date(),
      questions: [
        {
          id: 1,
          text: 'Qual das funções pode ser usada para verificar se um número é inteiro?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '`int`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`is_interger`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`is_int`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`isInt`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`isInteger`'
            }
          ]
        }
      ]
    }, {
      id: 2,
      description: 'Avançado',
      author: 'william@phpcomrapadura.org.br',
      createdAt: new Date(),
      updatedAt: new Date(),
      questions: [
        {
          id: 2,
          text: 'Qual método pode-se usar como construtor de uma classe?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: true,
              createdAt: new Date(),
              text: '`__construct()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`contruct__()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`__constructor()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`construtor__`'
            }
          ]
        },
        {
          id: 3,
          text: 'Utilizando banco de dados MySQL, qual a função para enviar uma consulta SQL ao banco de dados ativo?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '`mysql_free_result()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`mysql_stmt_start()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`mysql_fetch_array()`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`mysql_query()`'
            }
          ]
        },
        {
          id: 4,
          text: 'Qual função compara duas strings de forma case insensitive?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '`strcmp()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`str_cmp()`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`strcasecmp()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`stricmp()`'
            }
          ]
        },
        {
          id: 5,
          text: 'Com relação as funções `str_replace()`, `str_ireplace()` e `str_casereplace()`, marque a alternativa correta?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: 'Não há diferença entre elas'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`str_ireplace` e `str_casereplace` não existem'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`str_ireplace` e `str_casereplace` são para substituir caracteres em strings com case insensitive'
            },
            {

              correct: true,
              createdAt: new Date(),
              text: '`str_ireplace` é para substituir caracteres em strings com case insensitive e `str_casereplace` não existe',
            }
          ]
        },
        {
          id: 6,
          text: 'Qual é o resultado da variável `$a`, dado que: \n\n`$a = \'1 gato\' + \'2 cachorros\' == \'3 mamíferos\';` ?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '`false`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`null`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`true`'
            }
          ]
        },
        {
          id: 7,
          text: 'Qual é o valor da variável `$a`, dado que: \n\n`$a = stristr(\'ElePHPant\', \'p\', true)`',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: 'PHP'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: 'Ele'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'ElePHPant'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'php'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'PHPAnt'
            }
          ]
        },
        {
          id: 8,
          text: 'Em qual versão o PHP ganhou uma API de hashing de senhas?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '5.3'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '5.4'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '5.5'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '5.6'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '7'
            }
          ]
        },
        {
          id: 9,
          text: 'Quais são, respectivamente, os métodos mágicos chamados antes de `serialize()` e depois de `unserialize()`?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '`__serialize()` e `__unserialize()`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`__sleep()` e `__wakeup()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`__begin()` e `__end()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`__construct()` e `__destruct()`'
            }
          ]
        },
        {
          id: 10,
          text: 'O que a keyword `final` faz?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: true,
              createdAt: new Date(),
              text: 'Impede que uma classe ou método seja sobrescrito'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Encerra o script PHP'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Indica o final do programa'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Nada, pois keyword \'final\' não existe'
            }
          ]
        },
        {
          id: 11,
          text: 'Zivinho quer que seu sistema PHP funcione com qualquer banco de dados sem depender de funções específicas (como mysql_* para MySQL). Como ele pode fazer isso?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: 'Não pode'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: 'Com PDO'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Com ADODB'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Com PHP Global Databases'
            }
          ]
        },
        {
          id: 12,
          text: 'Indique o resultado da seguinte expressão: \n\n block```$var = \'0\'; echo empty($var) ? \'Vazio\' : \'Tem conteúdo\';```block',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: 'Dá erro: String to Integer convertion error'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`\'Tem conteúdo\'`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`\'Vazio\'`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`\'0\'`'
            }
          ]
        },
        {
          id: 13,
          text: 'Indique o resultado da seguinte expressão: \n\n block```$var = \'2015PHPinga\'; echo $var == 2015 ? \'Igual\' : \'Diferente\';```block',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: 'Dá erro: String to Integer convertion error'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`\'Igual\'`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`\'Diferente\'`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`\'2015PHPinga\'`'
            }
          ]
        },
        {
          id: 14,
          text: 'O que originalmente significava PHP antes de significar \'PHP: Hypertext Preprocessor\'?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: true,
              createdAt: new Date(),
              text: 'Personal Home Page'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Preprocessor for Huge Parallelization'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Packaged Hints for Programming'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Program for High Problems'
            }
          ]
        },
        {
          id: 15,
          text: 'Escolha a resposta correta',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '`(1 | 2) == 1`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`(1 ^ 3) == 2`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`(2 ^ 3) == 8`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`(2 & 3) == 6`'
            }
          ]
        },
        {
          id: 16,
          text: 'Dado que `strtolower()` é usado para aplicar lower case a strings, que função é usada para first case em cada palavra (ex.: _"First Case Em Palavras"_)?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '`strtofirst()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`firstcharupper()`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`ucwords()`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`firstcase()`'
            }
          ]
        },
        {
          id: 17,
          text: 'Qual comando para iniciar o PHP em modo interativo (REPL - Read-Eval-Print-Delete loop)?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: '`php --repl`'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: '`php -a`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`php -i`'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: '`php -r`'
            }
          ]
        },
        {
          id: 18,
          text: 'Espaços após tags de fechamento (`?>`) ao final de um arquivo `*.php` costumam causar problemas em aplicações PHP. Por quê?',
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: [
            {
              correct: false,
              createdAt: new Date(),
              text: 'Espaços após `?>` ocasionam erros de execução'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Espaços após `?>` iniciam o envio de cabeçalhos da requisição'
            },
            {
              correct: true,
              createdAt: new Date(),
              text: 'Espaços após `?>` iniciam o envio do corpo da requisição'
            },
            {
              correct: false,
              createdAt: new Date(),
              text: 'Espaços após `?>` encerram o envio do corpo da requisição'
            }
          ]
        }
      ]
    }
  ]
}
