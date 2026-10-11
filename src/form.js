export function renderForm() {
  const steps = [
    {
      num: 1,
      title: "Informations personnelles",
      desc: "Informations d'état civil figurant sur votre Carte d'Identité Nationale (CIN).",
      fields: `
        <div class="form-grid">
          <div class="form-group">
            <label for="nom">Nom <span class="required">*</span></label>
            <input type="text" id="nom" placeholder="Ex : BENHADDOU" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group">
            <label for="prenom">Prénom <span class="required">*</span></label>
            <input type="text" id="prenom" placeholder="Ex : Mohamed" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group">
            <label for="cin">Numéro CIN <span class="required">*</span></label>
            <input type="text" id="cin" placeholder="Ex : AB123456" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group">
            <label for="dateNaissance">Date de naissance <span class="required">*</span></label>
            <input type="date" id="dateNaissance" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group full">
            <label for="lieuNaissance">Lieu de naissance <span class="required">*</span></label>
            <input type="text" id="lieuNaissance" placeholder="Ex : Casablanca" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group full">
            <label>Sexe <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-pill"><input type="radio" name="sexe" value="Masculin" required /> Masculin</label>
              <label class="radio-pill"><input type="radio" name="sexe" value="Féminin" /> Féminin</label>
            </div>
          </div>
        </div>
      `
    },
    {
      num: 2,
      title: "Coordonnées de contact",
      desc: "Coordonnées téléphoniques, électroniques et adresse de résidence.",
      fields: `
        <div class="form-grid">
          <div class="form-group">
            <label for="email">Adresse email <span class="required">*</span></label>
            <input type="email" id="email" placeholder="exemple@domaine.ma" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group">
            <label for="telephone">Numéro de téléphone <span class="required">*</span></label>
            <input type="tel" id="telephone" placeholder="06 XX XX XX XX" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group full">
            <label for="adresse">Adresse de résidence <span class="required">*</span></label>
            <input type="text" id="adresse" placeholder="N°, rue, quartier..." required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group">
            <label for="ville">Ville <span class="required">*</span></label>
            <input type="text" id="ville" placeholder="Ex : Agadir" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group">
            <label for="codePostal">Code postal</label>
            <input type="text" id="codePostal" placeholder="Ex : 80000" />
          </div>
        </div>
      `
    },
    {
      num: 3,
      title: "Informations professionnelles",
      desc: "Grade, spécialité et date de prise de service.",
      fields: `
        <div class="form-grid">
          <div class="form-group">
            <label for="grade">Grade <span class="required">*</span></label>
            <input type="text" id="grade" placeholder="Ex : Administrateur 2ème grade, Ingénieur..." required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
          <div class="form-group">
            <label for="specialite">Spécialité / Profil</label>
            <input type="text" id="specialite" placeholder="Ex : Gestion, Droit, Informatique..." />
          </div>
          <div class="form-group full">
            <label for="dateAffectation">Date de prise de service / affectation <span class="required">*</span></label>
            <input type="date" id="dateAffectation" required />
            <span class="field-error">Ce champ est obligatoire</span>
          </div>
        </div>
      `
    },
    {
      num: 4,
      title: "Situation familiale",
      desc: "Situation de famille pour le traitement du dossier administratif.",
      fields: `
        <div class="form-grid">
          <div class="form-group full">
            <label>Situation matrimoniale <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-pill"><input type="radio" name="situationFamiliale" value="Célibataire" required /> Célibataire</label>
              <label class="radio-pill"><input type="radio" name="situationFamiliale" value="Marié(e)" /> Marié(e)</label>
              <label class="radio-pill"><input type="radio" name="situationFamiliale" value="Divorcé(e)" /> Divorcé(e)</label>
              <label class="radio-pill"><input type="radio" name="situationFamiliale" value="Veuf(ve)" /> Veuf(ve)</label>
            </div>
          </div>
          <div class="form-group">
            <label for="nbEnfants">Nombre d'enfants</label>
            <input type="number" id="nbEnfants" value="0" min="0" max="25" />
          </div>
        </div>
      `
    },
    {
      num: 5,
      title: "Informations sur le poste précédent",
      desc: "Informations sur votre précédent poste ou administration d'origine (facultatif).",
      fields: `
        <div class="form-grid">
          <div class="form-group full">
            <label for="administrationOrigine">Administration ou employeur précédent <span style="font-weight:normal;color:var(--text-muted);font-size:0.78rem;">(facultatif)</span></label>
            <input type="text" id="administrationOrigine" placeholder="Ex : Ministère de l'Éducation, Société..." />
          </div>
          <div class="form-group">
            <label for="postePrecedent">Poste ou fonction occupée <span style="font-weight:normal;color:var(--text-muted);font-size:0.78rem;">(facultatif)</span></label>
            <input type="text" id="postePrecedent" placeholder="Ex : Chargé d'études, Technicien..." />
          </div>
          <div class="form-group">
            <label for="villePrecedente">Ville de l'ancien poste <span style="font-weight:normal;color:var(--text-muted);font-size:0.78rem;">(facultatif)</span></label>
            <input type="text" id="villePrecedente" placeholder="Ex : Rabat" />
          </div>
          <div class="form-group full">
            <label for="dateQuittance">Date de cessation ou départ <span style="font-weight:normal;color:var(--text-muted);font-size:0.78rem;">(facultatif)</span></label>
            <input type="date" id="dateQuittance" />
          </div>
          <div class="form-group full">
            <label for="observations">Remarques ou observations particulières <span style="font-weight:normal;color:var(--text-muted);font-size:0.78rem;">(facultatif)</span></label>
            <textarea id="observations" placeholder="Toute précision utile pour le service RH..."></textarea>
          </div>
        </div>
      `
    }
  ];

  const stepTitles = ["Identité", "Contact", "Poste", "Famille", "Poste précédent"];

  const stepperHTML = steps.map((s, i) => `
    <div class="step-badge ${i === 0 ? 'active' : ''}" id="stepper-step-${i}">
      <span class="step-badge-num">${s.num}</span>
      <span class="step-badge-text">${stepTitles[i]}</span>
    </div>
  `).join('');

  const stepHTML = steps.map((step, i) => `
    <div class="wizard-step" style="display:${i === 0 ? 'block' : 'none'}">
      <div class="step-header">
        <h2 class="step-title">${step.title}</h2>
        <p class="step-desc">${step.desc}</p>
      </div>
      <div class="step-body">
        ${step.fields}
      </div>
    </div>
  `).join('');

  return `
    <div class="form-container">
      <div class="form-box">
        
        <!-- Header Banner with Moroccan Identity & Emploi-Public Navy/Gold -->
        <div class="form-header-banner">
          <div class="banner-top-line">ROYAUME DU MAROC</div>
          <h1 class="banner-title">Fiche d'Intégration du Fonctionnaire</h1>
          <p class="banner-sub">Formulaire de prise en charge administrative</p>
        </div>

        <!-- Progress Stepper (Step 1 -> Step 2 -> Step 3 ...) -->
        <div class="stepper-bar">
          ${stepperHTML}
        </div>

        <!-- Wizard Steps -->
        <div class="wizard-content">
          ${stepHTML}
        </div>

        <!-- Footer Buttons -->
        <div class="form-footer-nav">
          <button type="button" class="btn btn-prev" id="btn-prev" style="visibility:hidden">← Précédent</button>
          <span class="step-counter-text" id="step-counter">Étape 1 sur 5</span>
          <button type="button" class="btn btn-next" id="btn-next">Suivant →</button>
        </div>

      </div>
    </div>

    <div class="toast-container" id="toast-container"></div>
  `;
}
