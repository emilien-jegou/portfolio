import { SKILLS } from "../skills";
import { ResumeData } from "../types";

export const DEFAULT_DATA: ResumeData = {
  head: {
    firstname: 'Emilien',
    lastname: 'Jegou',
    jobTitle: 'Ingénieur Backend',
    links: {
      location: 'France',
      email: 'emilien.jegou@proton.me',
      portfolio: { link: 'https://emje.dev/', label: 'emje.dev' },
      github: { label: 'github.com/emilien-jegou', link: 'https://github.com/emilien-jegou' },
      //linkedin: { label: 'in/emilien-jegou', link: 'www.linkedin.com/in/emilien-jegou' },
    },
  },
  about: {
    intro: 'Ingénieur Backend senior spécialisé en architectures robustes et produits innovants.',
    details: `Possède 3 années d'expérience en développement d'applications web, spécialisé en développement **Node.js/TypeScript**, capable d'intégrer rapidement de nouveaux concepts et paradigmes. Habitué à évoluer en autonomie sur des verticales parfois complexes et apte à communiquer avec le client pour comprendre et résoudre ses besoins techniques. Bonnes maitrise des normes de design et flexible sur differents framework web.`
  },
  experiences: [
    {
      title: 'Développeur Fullstack',
      company: 'Auto-entrepreneur',
      companyLink: 'https://emje.dev',
      date: 'Oct 2025 - Présent',
      place: 'France',
      skills: ['Node.js', 'TypeScript',' Qwik.js', 'Postgres', 'Grafana', 'Terraform', 'RabbitMQ', 'Redis', 'Rust', 'Nomad'].slice(0, 6),
      bullets: [
        `Développement et déploiement d'une stack HashiCorp (Terraform, Nomad, Consul) sur OVH (openstack) et setup des services tiers d'une infra web (registre git, envoy, Grafana, workers)`,
        `Recherche et développement d'un framework UI pour Qwik.js inspiré des systèmes de design react (Base UI, shadcn, fluid systems).`,
        `Extraction de données commerciales (gammes de produits) via des tâches de scraping et sauvegarde automatisée vers un datalake`,
        `Développement d'une application open-source de suivi de temps et de traçage d'activité pour Linux.`,
      ],
    },
    {
      title: 'Développeur Fullstack Senior',
      company: 'Housemates',
      date: 'Nov 2022 - Déc 2023',
      companyLogo: '/resume/housemates-logo.png',
      place: 'Manchester, UK',
      skills: ['Typescript', 'Next.js', 'Sentry', 'Laravel', 'MySQL', 'Mixpanel'].slice(0, 5),
      bullets: [
        `Développement d'une plateforme de réservation de logements universitaires pour étudiants internationaux en Laravel.`,
        `Augmentation du score Lighthouse de 40% (97+) sur mobile et PC à travers une refonte agressive du frontend (React).`,
        `Amélioration des capacités B2B (internationalisation, intégration de systèmes de gestion immobilière, coopération avec l'équipe relation client).`,
        `Collaboration avec le designer pour le redéveloppement complet de l'e-commerce et du portfolio B2B de l'entreprise.`,
        `Mise en oeuvre de solutions data pour améliorer l'expérience client (ex. A/B testing, monitoring utilisateur, conformité RGPD).`,
        `Renforcement des efforts SEO; résolution des problèmes d’indexation, amélioration du reférencement général et priorisation d'indexation des logements à forte valeur ajoutée.`,
      ].slice(0,6),
    },
    {
      title: 'Développeur Fullstack',
      company: 'Polyconseil (maintenant Polycea) - Bolloré',
      companyLink: 'https://polycea.fr/',
      companyLogo: '/resume/polyconseil-logo.png',
      date: 'Avr 2021 - Nov 2022',
      place: 'France, Paris',
      skills: ['Azure Cloud', 'TypeScript', 'Node.js',  'Kubernetes', 'Grafana', 'Postgres', 'React', 'Sentry',].slice(0,6),
      bullets: [
        `Développement complet d'une plateforme web de téléopération de parkings. Intégration sur le réseau Indigo (600 sites) et déploiement international.`,
        `Utilisation intensive des services Azure pour la communication IoT, flux WebSockets, sauvegarde DataLake et assets`,
        `Responsable de l'implémentation des flux vidéos des parkings pour visionnage dans l'application: transcodage RTSP, gestion des connexions et reutilisation des flux videos, configuration et visionnage dans l'application`,
        `Coordination en Agile avec manager et designer pour atteindre les besoins opérationnels du produit dans une équipe de 2 à 4 développeurs web.`,
        `Présentation bihebdomadaire des avancées techniques du produit auprès du client, adaptation flexible des prérequis.`,
        `Intégration d'outils GitOps pour les déploiements, rollbacks, et sécurisation des secrets.`,
        `Mise en place rigoureuse de pipelines de tests E2E et automatisation de la qualité du code via GitLab.`,
      ].slice(0, 4),
    },
  ],
  education: [
    {
      date: 'Sep 2019 - Sep 2021',
      place: 'France, Paris',
      school: 'Epitech',
      schoolLogo: '/resume/epitech-logo.png',
      degree: 'Master  en ingénierie informatique',
    },
    {
      date: 'Sep 2019 - Sep 2020',
      place: 'Taiwan',
      school: 'National Tsing Hua University',
      schoolLogo: '/resume/nthu-logo.png',
      degree: "Année d'échange en Informatique",
    },
    {
      date: 'Sep 2016 - Sep 2019',
      place: 'France, Rennes',
      school: 'Epitech',
      schoolLogo: '/resume/epitech-logo.png',
      degree: 'Bsc en ingénierie informatique',
    },
  ],
  skills: SKILLS.slice(0, 14),
  software: {
    sectionName: 'Stack Technique',
    items: [
      { icon: 'nodejs', name: 'Node.js' },
      { icon: 'azure', name: 'Azure Cloud' },
      { icon: 'react', name: 'React' },
      { icon: 'kubernetees', name: 'Kubernetes' },
      { icon: 'postgres', name: 'Postgres' },
      //{ icon: 'aws', name: 'AWS' },
    ]
  },
  languages: [
    { ac: 'FR', level: 'native' },
    { ac: 'EN', level: 'professional' },
  ],
};
