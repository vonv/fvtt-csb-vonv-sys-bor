/* Scripts du système CSB / Everywhen pour Foundry VTT */

const mois = (new Date()).getMonth();

// message d'accueil à l'activation du module
async function welcomeMessage() {
  ChatMessage.create({
    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
    content: '🗺️ Hello aventurier/ère,<br />Clique @UUID[Compendium.vonv-fvtt-csb-everywhen.vonvcsbjournaux.JournalEntry.gcwNcRKDMJx6E0ne]{ici} pour tout savoir sur ce que tu viens d\'installer. Bon jeu !',
    speaker: { alias: "Vonv" }
  })
  game.user.setFlag("vonv-fvtt-csb-everywhen", "wellcomemessage", mois)
}
  
Hooks.on('hotReload', async function () {
  // mise à jour automatique des paramètres du système
  if (game.settings.get('custom-system-builder', 'customStyle')) {
    const settings = {
      initFormula: '[2d6+${ini}$]',
      customStyle: 'modules/vonv-fvtt-csb-everywhen/csb-vonv.css'
    }
    game.settings.settings.forEach(async setting => {
      if (typeof settings[setting.key] !== 'undefined' && 
            game.settings.get('custom-system-builder', setting.key) !== settings[setting.key]) {
              await game.settings.set('custom-system-builder', setting.key, settings[setting.key])
      }
    })

    // message d'accueil à l'activation du module
    if (game.user.getFlag("vonv-fvtt-csb-everywhen", "wellcomemessage") !== mois) {
        welcomeMessage()
    }

  }
    
})

Hooks.once('ready', async function () {
  // message d'accueil à l'activation du module
  if (game.user.getFlag("vonv-fvtt-csb-everywhen", "wellcomemessage") !== mois) {
    welcomeMessage()
  }
})