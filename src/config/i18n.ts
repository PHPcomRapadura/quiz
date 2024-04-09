import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const name = '🎮 Super Quizz'

const resources = {
  'ptBR': {
    default: {
      layouts: {
        public: {
          brand: name,
          play: 'Jogar',
          signIn: 'Entrar',
          myAccount: 'Minha Conta',
          copyright: '© PHP com Rapadura'
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
  },
  en: {
    translation: {
      // TODO: add translations to EN
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ptBR', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
