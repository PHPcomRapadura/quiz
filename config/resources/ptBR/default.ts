export default function (name: string) {
  return {
    layouts: {
      public: {
        brand: name,
        play: 'Jogar',
        signIn: 'Entrar',
        myAccount: 'Minha Conta',
        copyright: '© PHP com Rapadura',
        pending: 'Carregando ...',
      },
      dashboard: {
        brand: name,
        play: 'Jogar',
        signOut: 'Sair',
        myAccount: 'Minha Conta',
        pending: 'Carregando ...',
        navigation: {
          index: 'Meus Jogos',
          games: 'Meus Jogos',
          account: 'Minha Conta',
          settings: 'Configurações'
        }
      }
    },
    pages: {
      home: {
        title: name,
        description: 'O melhor jogo de perguntas e respostas para jogar com os amigos!\n' +
          'Reúna sua galera e divirta-se com moderação! 🍻',
        contributing: 'Não se esqueça de contribuir com o projeto no link abaixo! 😉',
        callToAction: 'Jogar agora »'
      },
      game: {
        play: {
          pending: 'Carregando Jogo ...',
          rejected: 'Não foi possível carregar o jogo',
          error: 'Oh snap!',
          instructions: {
            title: 'O jogo já vai começar!',
            selected: 'Jogo Selecionado: ',
            description: 'Certifique-se de que todos estão prontos e clique em Começar!\n' +
              'Lembrando que este jogo tem um tempo limite de {{timeout}} segundos para responder ' +
              'cada pergunta e {{total}} perguntas ao todo',
            greetings: 'Boa sorte!',
            start: 'Começar'
          },
          session: {
            correct: {
              title: 'Certa a resposta! Acerto Mizeravi!',
              description: 'Você acertou! Escolha alguém para beber e passe a vez para a pessoa à sua esquerda.'
            },
            wrong: {
              title: 'Você errou! Bebe!',
              description: 'Errou feio, errou Rude! Agora tem de beber e passar a vez para a pessoa à sua esquerda.'
            },
            expired: {
              title: 'Acabou o tempo!',
              description: 'Você demorou demais para responder! Agora tem de beber e passar a vez para a pessoa à sua esquerda.'
            },
            unanswered: {
              timer: 'Tempo restante: {{time}} segundos',
            },
            next: 'Próximo',
            answer: 'Responder',
          }
        },
        welcome: {
          title: 'Escolha um Jogo',
          description: 'Depois de selecionar um jogo cada um na mesa deve responder a uma pergunta.\n' +
            'Caso acerte, pode escolher uma pessoa para beber, caso erre tem de beber.\n' +
            'Ao terminar, passa-se para o jogador da esquerda.',
          pending: 'Carregando jogos ...',
          rejected: 'Não foi possível carregar os jogos',
          error: 'Oh snap!'
        },
        end: {
          title: 'O jogo acabou!',
          description: 'Não está bêbado suficiente? Clique em "Começar de novo"!',
          waiting: 'Recomeçar em {{timer}} segundos',
          restart: 'Começar de novo'
        }
      },
      dashboard: {
        soon: 'Em breve!',
        settings: {
          title: 'Configurações',
          description: 'Aqui você pode configurar as fontes de dados e outras preferências dos jogos. Esta ' +
            'configuração não afeta a experiência de outros jogadores.',
          fields: {
            type: {
              label: 'Tipo de Driver',
              drivers: {
                memory: 'Nenhuma configuração adicional é necessária',
                json: 'Usa um JSON estático fornecido por uma URL HTTP',
                http: 'Utiliza uma API HTTP devidamente compartível com a aplicação',
                supabase: 'Realiza a Conexão com o backend do Supabase'
              },
              details: 'Configuração que define de onde os dados dos jogos serão carregados',
            },
            config: {
              label: 'Configuração',
              drivers: {
                memory: 'Usa os dados inclusos no aplicativo e os manipula em memória',
                json: {
                  url: {
                    label: 'URL',
                    placeholder: 'Informe a URL do JSON que contém os jogos',
                    details: 'A URL do JSON é o endereço de um arquivo JSON que contém os dados dos jogos ' +
                      'disponíveis para jogar. Geralmente é um arquivo hospedado em um servidor HTTP'
                  },
                },
                http: {
                  url: {
                    label: 'URL',
                    placeholder: 'Informe a URL base do backend HTTP',
                    details: 'A URL base do backend HTTP é o endereço da API HTTP que contém os dados dos jogos ' +
                      'disponíveis para jogar. Geralmente é um endereço de um servidor HTTP'
                  },
                  authorization: {
                    label: 'Cabeçalho de autorização',
                    placeholder: 'Informe o cabeçalho de autorização do backend HTTP',
                    details: 'O cabeçalho de autorização do backend HTTP é um token de acesso que permite ' +
                      'consultar os dados protegidos. Geralmente chama-se Authorization e recebe um token JWT'
                  },
                },
                supabase: {
                  url: {
                    label: 'URL',
                    placeholder: 'Informe a URL do backend do Supabase',
                    details: 'A URL do backend do Supabase é o endereço da API HTTP do Supabase, geralmente ' +
                      'assemelha-se a "https://<project>.supabase.co"'
                  },
                  anonKey: {
                    label: 'Chave Anônima',
                    placeholder: 'Informe a chave anônima do backend do Supabase',
                    details: 'A chave anônima do backend do Supabase é um token de acesso que permite ' +
                      'consultar os dados sem autenticação. Geralmente é um token JWT'
                  }
                }
              },
            },
            language: {
              title: 'Idioma',
              description: 'Escolha o idioma do jogo'
            }
          },
          save: 'Salvar',
        }
      }
    },
    components: {
      game: {
        list: {
          title: 'Jogos Disponíveis',
          empty: 'Não há nenhum jogo disponível no momento'
        }
      }
    }
  }
}
