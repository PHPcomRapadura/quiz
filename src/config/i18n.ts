import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  'ptBR': {
    default: {
      pages: {
        game: {
          welcome: {
            title: 'PHPinga',
            description: 'Cada um na mesa deve responder a uma pergunta sobre PHP.\n' +
              'Caso acerte, pode escolher uma pessoa para beber, caso erre tem de beber.\n' +
              'Ao terminar, passa-se para o jogador da esquerda.',
            callToAction: 'Ir para o Jogo'
          },
          play: {
            title: 'O jogo já vai começar!',
            selected: 'Jogo Selecionado: ',
            description: 'Certifique-se de que todos estão prontos para começar e clique em Começar!\n' +
              'Lembrando que este jogo tem um tempo limite de {{timeout}} segundos para responder ' +
              'cada pergunta e {{total}} perguntas ao todo',
            greetings: 'Boa sorte!',
            start: 'Começar'
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
