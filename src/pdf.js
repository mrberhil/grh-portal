// ── PDF Generator ────────────────────────────────────────
import jsPDF from 'jspdf';

export function generatePDF(s) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210;
  const margin = 18;
  let y = 0;

  // ── Header banner (Royal Moroccan Navy #1B3A6B) ──
  doc.setFillColor(27, 58, 107);
  doc.rect(0, 0, W, 38, 'F');

  // Gold accent strip
  doc.setFillColor(232, 163, 23);
  doc.rect(0, 38, W, 2.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('ROYAUME DU MAROC', W / 2, 11, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Wilaya / Province — Division des Ressources Humaines et des Moyens Généraux', W / 2, 19, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('FICHE INDIVIDUELLE D\'INTÉGRATION DU FONCTIONNAIRE', W / 2, 29, { align: 'center' });

  y = 48;

  // ── Reference & date ──
  doc.setTextColor(108, 117, 125);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`RÉFÉRENCE : ${s.id}`, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date de soumission : ${new Date(s.submittedAt).toLocaleString('fr-FR')}`, W - margin, y, { align: 'right' });

  y += 8;

  // ── Section helper ──
  function section(title, num) {
    doc.setFillColor(244, 245, 247);
    doc.rect(margin, y, W - margin * 2, 7.5, 'F');
    doc.setDrawColor(27, 58, 107);
    doc.setLineWidth(0.6);
    doc.rect(margin, y, W - margin * 2, 7.5);
    
    // Left blue tag
    doc.setFillColor(27, 58, 107);
    doc.rect(margin, y, 6, 7.5, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(num, margin + 3, y + 5.2, { align: 'center' });

    doc.setTextColor(27, 58, 107);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin + 9, y + 5.2);

    y += 11;
  }

  function row(label, value, col2 = false, label2 = '', value2 = '') {
    const colW = (W - margin * 2) / 2;
    doc.setTextColor(108, 117, 125);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(label.toUpperCase(), margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(26, 26, 46);
    doc.text(value || '—', margin, y + 4.5);

    if (col2) {
      doc.setTextColor(108, 117, 125);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(label2.toUpperCase(), margin + colW, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(26, 26, 46);
      doc.text(value2 || '—', margin + colW, y + 4.5);
    }

    y += 12;
    doc.setDrawColor(226, 230, 234);
    doc.setLineWidth(0.2);
    doc.line(margin, y - 3, W - margin, y - 3);
  }

  // ── Section 1 : Identité ──
  section('Informations personnelles & État Civil', '1');
  row('Nom', s.nom, true, 'Prénom', s.prenom);
  row('Numéro CIN', s.cin, true, 'Sexe', s.sexe);
  row('Date de naissance', s.dateNaissance, true, 'Lieu de naissance', s.lieuNaissance);
  y += 2;

  // ── Section 2 : Contact ──
  section('Coordonnées & Résidence', '2');
  row('Adresse email', s.email, true, 'Numéro de téléphone', s.telephone);
  row('Adresse de résidence', `${s.adresse || ''}, ${s.ville || ''} ${s.codePostal || ''}`.trim());
  y += 2;

  // ── Section 3 : Poste ──
  section('Informations professionnelles & Affectation', '3');
  row('Grade', s.grade, true, 'Corps', s.corps);
  row('Spécialité / Profil', s.specialite, true, 'Division / Service', s.service);
  row("Date d'affectation dans la Province", s.dateAffectation);
  y += 2;

  // ── Section 4 : Famille ──
  section('Situation familiale', '4');
  row('Situation matrimoniale', s.situationFamiliale, true, "Nombre d'enfants à charge", s.nbEnfants?.toString() || '0');
  y += 2;

  // ── Section 5 : Origine ──
  section("Administration d'origine & Observations", '5');
  row("Administration / Ministère d'origine", s.administrationOrigine);
  row("Province / Préfecture d'origine", s.provinceOrigine, true, 'Date de quittance / départ', s.dateQuittance);
  if (s.observations) row('Observations RH', s.observations);

  // ── Signatures ──
  y += 8;
  doc.setDrawColor(27, 58, 107);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + 55, y);
  doc.line(W - margin - 55, y, W - margin, y);

  doc.setTextColor(108, 117, 125);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Signature de l\'intéressé(e)', margin, y + 4.5);
  doc.text('Visa & Cachet du Service RH', W - margin - 55, y + 4.5);

  // ── Footer ──
  doc.setFillColor(11, 37, 69);
  doc.rect(0, 287, W, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Réf: ${s.id}  ·  Portail de la Fonction Publique — Fiche d'intégration générée le ${new Date().toLocaleDateString('fr-FR')}`, W / 2, 293.5, { align: 'center' });

  doc.save(`Fiche_Integration_${s.nom || 'Agent'}_${s.cin || s.id}.pdf`);
}
