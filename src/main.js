import './style.css';
import { renderForm } from './form.js';
import { sendToGoogleSheets } from './storage.js';

// Router & App Initializer
function initApp() {
  const path = decodeURIComponent(window.location.pathname).toLowerCase();
  const hash = decodeURIComponent(window.location.hash).toLowerCase();
  const app = document.getElementById('app');

  // If visiting the hub root or if multiple apps are on grh.marouaneberhil.online
  // Any path like /fiche-integration, /fiche_integration, /fiche%20integration, or default loads the form
  if (path === '/' && !hash && false) {
    // Reserved for future GRH portal hub
  } else {
    app.innerHTML = renderForm();
    setupWizard();
  }
}

function setupWizard() {
  let currentStep = 0;
  const totalSteps = 5;

  showStep(currentStep);
  updateStepper(currentStep);

  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-prev');

  btnNext?.addEventListener('click', async () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps - 1) {
        currentStep++;
        showStep(currentStep);
        updateStepper(currentStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Final submit
        btnNext.disabled = true;
        btnNext.textContent = 'Envoi en cours...';

        const data = collectFormData();
        data.id = 'FNC-' + Date.now().toString(36).toUpperCase();
        data.submittedAt = new Date().toISOString();

        await sendToGoogleSheets(data);

        showSuccessView();
      }
    }
  });

  btnPrev?.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      updateStepper(currentStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function showStep(step) {
  const steps = document.querySelectorAll('.wizard-step');
  steps.forEach((el, i) => {
    el.style.display = i === step ? 'block' : 'none';
  });

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const counter = document.getElementById('step-counter');

  if (btnPrev) btnPrev.style.visibility = step === 0 ? 'hidden' : 'visible';
  if (counter) counter.textContent = `Étape ${step + 1} sur 5`;

  if (btnNext) {
    if (step === 4) {
      btnNext.textContent = '✓ Envoyer le formulaire';
      btnNext.className = 'btn btn-submit';
    } else {
      btnNext.textContent = 'Suivant →';
      btnNext.className = 'btn btn-next';
    }
  }
}

function updateStepper(step) {
  for (let i = 0; i < 5; i++) {
    const el = document.getElementById(`stepper-step-${i}`);
    if (el) {
      el.className = 'step-badge' + (i === step ? ' active' : i < step ? ' done' : '');
    }
  }
}

function validateStep(step) {
  const steps = document.querySelectorAll('.wizard-step');
  const stepEl = steps[step];
  if (!stepEl) return true;

  let valid = true;
  const required = stepEl.querySelectorAll('[required]');

  required.forEach(input => {
    const group = input.closest('.form-group');
    if (!input.value.trim()) {
      group?.classList.add('invalid');
      valid = false;
    } else {
      group?.classList.remove('invalid');
    }
  });

  // Radios
  const radioGroups = stepEl.querySelectorAll('.radio-group');
  radioGroups.forEach(rg => {
    const radios = rg.querySelectorAll('input[type="radio"][required]');
    if (radios.length > 0) {
      const checked = rg.querySelector('input[type="radio"]:checked');
      const group = rg.closest('.form-group');
      if (!checked) {
        group?.classList.add('invalid');
        valid = false;
      } else {
        group?.classList.remove('invalid');
      }
    }
  });

  if (!valid) {
    const firstInvalid = stepEl.querySelector('.form-group.invalid input, .form-group.invalid select');
    firstInvalid?.focus();
    showToast('Veuillez remplir tous les champs obligatoires.', 'error');
  }

  return valid;
}

function collectFormData() {
  const getVal = id => document.getElementById(id)?.value?.trim() || '';
  const getRadio = name => document.querySelector(`input[name="${name}"]:checked`)?.value || '';

  return {
    nom: getVal('nom'),
    prenom: getVal('prenom'),
    cin: getVal('cin'),
    dateNaissance: getVal('dateNaissance'),
    lieuNaissance: getVal('lieuNaissance'),
    sexe: getRadio('sexe'),
    email: getVal('email'),
    telephone: getVal('telephone'),
    adresse: getVal('adresse'),
    ville: getVal('ville'),
    codePostal: getVal('codePostal'),
    grade: getVal('grade'),
    specialite: getVal('specialite'),
    dateAffectation: getVal('dateAffectation'),
    situationFamiliale: getRadio('situationFamiliale'),
    nbEnfants: getVal('nbEnfants'),
    administrationOrigine: getVal('administrationOrigine'),
    postePrecedent: getVal('postePrecedent'),
    villePrecedente: getVal('villePrecedente'),
    dateQuittance: getVal('dateQuittance'),
    observations: getVal('observations'),
  };
}

function showSuccessView() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="form-container">
      <div class="form-box">
        <div class="success-screen">
          <div class="success-icon-circle">✓</div>
          <h2 class="success-title">Votre fiche a été transmise avec succès</h2>
          <p class="success-message">Vos informations ont bien été enregistrées dans le système des Ressources Humaines.</p>
        </div>
      </div>
    </div>
  `;
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = (type === 'success' ? '✓ ' : '⚠ ') + msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Support history navigation
window.addEventListener('popstate', initApp);

// Start
initApp();
