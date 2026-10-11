// ── Admin HTML renderer ──────────────────────────────────
export function renderAdmin() {
  return `
    <div class="page active" id="page-admin">
      <!-- Top utility bar -->
      <div class="top-bar">
        <div class="top-bar-inner">
          <span class="top-bar-left">🇲🇦 Espace Administration RH — Wilaya / Province</span>
          <div class="top-bar-right">
            <button class="top-bar-link" id="btn-back-form-top">← Retour au portail public</button>
          </div>
        </div>
      </div>

      <!-- Header -->
      <header class="header">
        <div class="header-inner">
          <div class="logo">
            <div class="logo-emblem">🏛</div>
            <div class="logo-text-block">
              <div class="logo-kingdom">Royaume du Maroc</div>
              <div class="logo-name">Emploi <span>Public</span> · RH</div>
              <div class="logo-tagline">Gestion administrative et interconnexion Google Sheets</div>
            </div>
          </div>
          <div class="header-nav-right">
            <button class="btn-admin-link" id="btn-back-form">← Retour au formulaire</button>
          </div>
        </div>
      </header>

      <!-- Login Section -->
      <div id="admin-login-section" class="admin-login">
        <div class="login-card">
          <div class="login-card-header">
            <div class="logo-emblem">🇲🇦</div>
            <h2>Espace Privé RH</h2>
            <p>Accès réservé aux gestionnaires RH de la Province</p>
          </div>
          <div class="login-card-body">
            <form id="login-form">
              <div class="form-group" style="margin-bottom:1.25rem">
                <label for="admin-password">Mot de passe administratif</label>
                <input type="password" id="admin-password" placeholder="Entrez le mot de passe..." required />
                <span style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Mot de passe : <code>rh@province2024</code></span>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%">
                Accéder à l'espace d'administration
              </button>
              <div class="login-error" id="login-error">
                Mot de passe incorrect.
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Dashboard Section -->
      <div id="admin-dashboard" style="display:none; flex:1; flex-direction:column">
        <div class="admin-content">
          <div class="admin-header-bar">
            <div>
              <h2>📊 Tableau de bord RH & Synchronisation</h2>
              <p style="font-size:0.83rem;color:var(--text-muted)">Suivi des fonctionnaires arrivants et gestion du flux Google Sheets</p>
            </div>
            <div style="display:flex;gap:0.75rem;align-items:center">
              <button class="btn btn-primary" onclick="window.exportCSV()">⬇ Exporter CSV</button>
            </div>
          </div>

          <!-- Private Google Sheet Configuration Box -->
          <div class="admin-sheet-config-box">
            <div class="admin-sheet-config-title">
              <span>📊</span>
              <span>Liaison Privée Google Sheets (Webhook URL)</span>
            </div>
            <p class="admin-sheet-config-desc">
              Les fonctionnaires remplissent le formulaire sans voir ce lien. Dès qu'un fonctionnaire soumet sa fiche, une nouvelle ligne est automatiquement créée dans votre feuille Google Sheet privée.
            </p>
            <div class="admin-sheet-row">
              <input type="url" id="sheet-webhook-input" placeholder="https://script.google.com/macros/s/.../exec" />
              <button type="button" class="btn-admin-save-sheet" id="btn-save-sheet-url">Enregistrer la liaison</button>
            </div>
            <div class="sheet-script-accordion">
              <details>
                <summary>📋 Voir le code Google Apps Script à coller dans votre feuille Google Sheet (Extensions > Apps Script)</summary>
                <pre class="code-box"><code>function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["ID", "Date de soumission", "Nom", "Prénom", "CIN", "Date Naissance", "Lieu Naissance", "Sexe", "Email", "Téléphone", "Adresse", "Ville", "Code Postal", "Grade", "Corps", "Spécialité", "Service", "Date Affectation", "Situation Familiale", "Enfants", "Admin Origine", "Province Origine", "Date Quittance", "Observations"]);
  }
  sheet.appendRow([
    data.id || "", new Date(), data.nom || "", data.prenom || "", data.cin || "", 
    data.dateNaissance || "", data.lieuNaissance || "", data.sexe || "",
    data.email || "", data.telephone || "", data.adresse || "", data.ville || "", 
    data.codePostal || "", data.grade || "", data.corps || "", data.specialite || "", 
    data.service || "", data.dateAffectation || "", data.situationFamiliale || "", 
    data.nbEnfants || "", data.administrationOrigine || "", data.provinceOrigine || "", 
    data.dateQuittance || "", data.observations || ""
  ]);
  return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
}</code></pre>
              </details>
            </div>
          </div>

          <div class="admin-stats">
            <div class="stat-card">
              <div class="stat-label">Total des fiches enregistrées</div>
              <div class="stat-value" id="stat-total">0</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Enregistrées aujourd'hui</div>
              <div class="stat-value" id="stat-today">0</div>
            </div>
          </div>

          <div class="search-bar">
            <input type="text" id="search-input" placeholder="🔍 Rechercher par nom, CIN, grade, service..." />
          </div>

          <div class="submissions-table">
            <table>
              <thead>
                <tr>
                  <th>Fonctionnaire</th>
                  <th>CIN</th>
                  <th>Grade</th>
                  <th>Division / Service</th>
                  <th>Date de soumission</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="submissions-tbody"></tbody>
            </table>
            <div class="empty-state" id="empty-state" style="display:none">
              <div class="icon">📂</div>
              <p>Aucun dossier soumis pour le moment.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Modal -->
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <div>
              <h3 id="modal-name">Détail du dossier</h3>
              <p id="modal-ref"></p>
            </div>
            <button class="modal-close" id="modal-close">✕</button>
          </div>
          <div class="modal-body" id="modal-content"></div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="modal-dl-pdf">⬇ Télécharger Fiche PDF</button>
            <button class="btn btn-ghost" id="modal-close-btn" onclick="document.getElementById('modal-overlay').classList.remove('open')">Fermer</button>
          </div>
        </div>
      </div>

      <div class="toast-container" id="toast-container"></div>
    </div>
  `;
}
