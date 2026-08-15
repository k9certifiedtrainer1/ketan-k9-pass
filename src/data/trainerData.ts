export interface TrainerProfile {
  name: string;
  credentials: string;
  role: string;
  motto: string;
  avatarUrl: string;
  titles: string[];
  partnership: {
    name: string;
    domain: string;
    url: string;
    badge: string;
  };
  contact: {
    phoneFormatted: string;
    phoneRaw: string;
    telUrl: string;
    whatsappFormatted: string;
    whatsappRaw: string;
    whatsappDirectUrl: string;
    email: string;
    emailMailto: string;
    instagramHandle: string;
    instagramUrl: string;
    instagramFollowers: string;
    location: string;
    websiteUrl: string;
  };
  telemetry: {
    systemStatus: string;
    clearanceLevel: string;
    serialNumber: string;
  };
}

export const TRAINER_DATA: TrainerProfile = {
  name: "Ketan Panchal",
  credentials: "US CERTIFIED DOG TRAINER & BEHAVIOURIST",
  role: "Canine Behavior Specialist & Master Trainer",
  motto: "Creating A Lifetime Bond",
  avatarUrl: "/trainer_avatar.jpg",
  titles: [
    "US Certified Dog Trainer & Behaviourist",
    "Canine Behavior Specialist",
    "Executive & Advanced K9 Command",
    "Advanced Off-Leash Obedience",
    "Severe Aggression & Fear Rehabilitation",
    "Partner @ The Bark University",
  ],
  partnership: {
    name: "The Bark University",
    domain: "thebarkuniversity.com",
    url: "https://thebarkuniversity.com/",
    badge: "THE BARK UNIVERSITY",
  },
  contact: {
    phoneFormatted: "+91 70965 07017",
    phoneRaw: "+917096507017",
    telUrl: "tel:+917096507017",
    whatsappFormatted: "+91 70965 07017",
    whatsappRaw: "917096507017",
    whatsappDirectUrl: "https://api.whatsapp.com/send?phone=917096507017&text=Hello%20Ketan,%20I%20saw%20your%20Digital%20Executive%20Pass%20and%20would%20like%20to%20inquire%20about%20dog%20training.",
    email: "k9certifiedtrainer@gmail.com",
    emailMailto: "mailto:k9certifiedtrainer@gmail.com?subject=Dog%20Training%20Inquiry%20//%20Ketan%20Panchal&body=Hello%20Ketan,%0D%0A%0D%0AI%20would%20like%20to%20inquire%20about%20dog%20training.%0D%0A%0D%0AYour%20Name:%20%0D%0ADog%20Breed%20&%20Age:%20%0D%0ACity%20/%20Area:%20%0D%0AWhat%20help%20do%20you%20need:%20%0D%0A%0D%0AThank%20you.",
    instagramHandle: "@k9certifiedtrainer",
    instagramUrl: "https://www.instagram.com/k9certifiedtrainer?igsh=MWNjOWZsdzB3bm02cg==",
    instagramFollowers: "96.6K",
    location: "India & Global",
    websiteUrl: "https://thebarkuniversity.com/",
  },
  telemetry: {
    systemStatus: "SYS: OPTIMAL // NFC ACTIVE",
    clearanceLevel: "CLEARANCE: MASTER-K9 · ID: KP-70965",
    serialNumber: "KP-CPDTKA-70965",
  },
};
