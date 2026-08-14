import type { TrainerProfile } from '../data/trainerData';

/**
 * Generates an RFC 6350 / vCard 3.0 formatted string and triggers native download
 * seamlessly across iOS (Safari), Android (Chrome/Samsung), and Desktop.
 */
export function generateVCardString(profile: TrainerProfile): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:Panchal;Ketan;;;`,
    `FN:${profile.name} (Dog Trainer)`,
    `NICKNAME:K9 Certified Trainer`,
    `ORG:${profile.partnership.name};Dog Training & Behavior`,
    `TITLE:${profile.role}`,
    `ROLE:${profile.role}`,
    `TEL;TYPE=CELL,VOICE,PREF:${profile.contact.phoneFormatted}`,
    `TEL;TYPE=WORK,VOICE:${profile.contact.phoneFormatted}`,
    `EMAIL;TYPE=INTERNET,WORK,PREF:${profile.contact.email}`,
    `URL;TYPE=WORK;PREF:${profile.partnership.url}`,
    `URL;TYPE=INSTAGRAM:${profile.contact.instagramUrl}`,
    `X-SOCIALPROFILE;type=instagram:${profile.contact.instagramUrl}`,
    `NOTE:Certified Professional Dog Trainer (CPDT-KA). Partner at The Bark University (https://thebarkuniversity.com). Direct WhatsApp & Call: ${profile.contact.phoneFormatted}. Specializing in Behavior & Aggression Fix, Family Protection Training, and Advanced Off-Leash Obedience.`,
    `CATEGORIES:Dog Trainer,Pet Services,The Bark University,Ketan Panchal`,
    'END:VCARD'
  ].join('\r\n');

  return vcard;
}

/**
 * Triggers the direct browser file download for the .vcf contact card.
 */
export function downloadVCard(profile: TrainerProfile): void {
  const vcardContent = generateVCardString(profile);
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.name.replace(/\s+/g, '_')}_Dog_Trainer.vcf`);
  link.style.display = 'none';
  document.body.appendChild(link);
  
  link.click();
  
  // Clean up resource
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);
}
