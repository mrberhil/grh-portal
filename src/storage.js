// ══════════════════════════════════════════════════════════════
// CONFIGURATION PRIVÉE GOOGLE SHEET
// ══════════════════════════════════════════════════════════════
export const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyX6-GRoL3PCRvJ3tAfFapcC8-HjJoG8dEaN4Sc9tWHFx9dogDV1qA_093RtZyac2h1Wg/exec';

// Envoi direct et invisible vers Google Sheets
export async function sendToGoogleSheets(data) {
  if (!GOOGLE_SHEET_WEBHOOK_URL) {
    console.warn("URL Google Sheet non définie dans storage.js. Enregistrement local de secours.");
    saveLocalBackup(data);
    return { success: true, localOnly: true };
  }

  try {
    // Mode no-cors permet d'envoyer la requête POST directement à Google Apps Script
    // sans être bloqué par la politique CORS du navigateur
    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    saveLocalBackup(data);
    return { success: true };
  } catch (err) {
    console.error("Erreur envoi Google Sheets:", err);
    saveLocalBackup(data);
    return { success: false, error: err };
  }
}

// Sauvegarde locale de secours (silencieuse)
function saveLocalBackup(data) {
  try {
    const list = JSON.parse(localStorage.getItem('rh_fiches_backup') || '[]');
    list.unshift(data);
    localStorage.setItem('rh_fiches_backup', JSON.stringify(list));
  } catch (e) {
    // ignore
  }
}
