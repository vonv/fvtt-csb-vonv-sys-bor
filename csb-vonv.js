/* Scripts du système CSB / Everywhen pour Foundry VTT */

// message d'accueil à l'activation du module
async function welcomeMessage() {
    ChatMessage.create({
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: '🐙 Ph\'n glui,<br />Cliquez @UUID[Compendium.vonv-fvtt-csb-everywhen-module.journaux.JournalEntry.bshsJ2c5z0ckMTLt]{ici} pour accéder à toute la documentation de ces compendiums pour l\'Appel V7. Bon jeu !',
      speaker: { alias: "Vonv" }
    })
    game.user.setFlag("vonv-fvtt-csb-everywhen", "welcomeMessageShown092024", true)
  }
  
  Hooks.on('ready', async function () {
    // mise à jour automatique des paramètres du système
    if (game.settings.get('custom-system-builder', 'overrideSheetArtwork')) {
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
      if (!game.user.getFlag("vonv-fvtt-csb-everywhen", "welcomeMessageShown092024")) {
          welcomeMessage()
      }
  
    }
      
  })