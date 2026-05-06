import { SKILLS } from "./skills";
import { ResumeData } from "../../types";

export const DEFAULT_DATA: ResumeData = {
  head: {
    firstname: 'Emilien',
    lastname: 'Jegou',
    jobTitle: 'Ingénieur Fullstack',
    links: {
      location: 'France',
      email: 'emilien.jegou@proton.me',
      portfolio: { link: 'https://emje.dev/', label: 'emje.dev' },
      github: { label: 'github.com/emilien-jegou', link: 'https://github.com/emilien-jegou' },
      //linkedin: { label: 'in/emilien-jegou', link: 'www.linkedin.com/in/emilien-jegou' },
    },
  },
  about: {
    intro: 'Ingénieur Fullstack senior spécialisé en architectures robustes et produits innovants.',
    details: `Je possède 3 années d'expérience en développement d'applications web au sein d'équipes Agile, une bonne maîtrise des normes de design et une excellente connaissance des pratiques et outils DevOps. Habitué à évoluer en autonomie sur des problématiques techniques complexes, je suis proactif dans mes échanges avec les clients et utilisateurs pour comprendre leurs besoins et apporter des solutions techniques adaptées.`
  },
  experiences: [
    {
      title: 'Développeur Fullstack',
      company: 'Auto-entrepreneur',
      companyLink: 'https://emje.dev',
      date: 'Oct 2025 - Présent',
      place: 'France',
      skills: ['Rust', 'TypeScript','Terraform', 'Redis', 'Postgres', 'Grafana', 'RabbitMQ', 'Nomad'].slice(0, 6),
      bullets: [
        `Développement et déploiement d'une stack HashiCorp (Terraform, Nomad, Consul) sur OVH (openstack) ainsi que l'installation des services tiers de l'infra (registre git, envoy, Grafana, workers)`,
        `Extraction de données commerciales (gammes de produits) via des tâches de scraping et sauvegarde automatisée vers un datalake`,
        `Recherche et développement d'un framework UI pour Qwik.js inspiré des systèmes de design react (Base UI, shadcn, fluid systems).`,
        `Développement d'une application open-source de suivi de temps et de traçage d'activité pour Linux.`,
      ],
    },
    {
      title: 'Développeur Fullstack Senior',
      company: 'Housemates',
      date: 'Nov 2022 - Déc 2023',
      companyLogo: '/resume/housemates-logo.png',
      place: 'Manchester, UK',
      skills: ['Typescript', 'Sentry', 'MySQL', 'Next.js', 'Laravel', 'Mixpanel'].slice(0, 5),
      bullets: [
        `Développement d'une plateforme de réservation de logements universitaires pour étudiants internationaux en Laravel.`,
        `Collaboration avec le designer pour le redéveloppement complet de l'e-commerce et du portfolio B2B de l'entreprise.`,
        `Amélioration des capacités B2B (internationalisation, intégration de systèmes de gestion immobilière, coopération avec l'équipe relation client).`,
        `Augmentation du score Lighthouse de 40% (97+) sur mobile et PC à travers une refonte agressive du frontend (React).`,
        `Renforcement des efforts SEO; résolution des problèmes d’indexation, amélioration du reférencement général et priorisation d'indexation des logements à forte valeur ajoutée.`,
        `Mise en oeuvre de solutions data pour améliorer l'expérience client (ex. A/B testing, monitoring utilisateur, conformité RGPD).`,
      ].slice(0,6),
    },
    {
      title: 'Développeur Fullstack',
      company: 'Polyconseil (maintenant Polycea) - Bolloré',
      companyLink: 'https://polycea.fr/',
      companyLogo: '/resume/polyconseil-logo.png',
      date: 'Avr 2021 - Nov 2022',
      place: 'France, Paris',
      skills: ['React', 'TypeScript', 'Node.js', 'Kubernetes', 'Azure', 'Postgres', 'Sentry', 'Grafana',],
      bullets: [
        `Développement complet d'une plateforme web de téléopération de parkings. Intégration sur le réseau Indigo (600 sites) et déploiement international.`,
        `Responsable de l'implémentation des flux vidéos des parkings pour visionnage dans l'application: transcodage RTSP, gestion des connexions et reutilisation des flux videos, configuration et visionnage dans l'application`,
        `Utilisation intensive des services Azure Cloud pour la communication IoT, flux WebSockets, sauvegarde DataLake et assets`,
        `Coordination en Agile avec manager et designer pour atteindre les besoins opérationnels du produit dans une équipe de 2 à 4 développeurs web.`,
        `Présentation bihebdomadaire des avancées techniques du produit auprès du client, adaptation flexible des prérequis.`,
        `Mise en place rigoureuse de pipelines de tests E2E et automatisation de la qualité du code via GitLab.`,
        `Intégration d'outils GitOps pour les déploiements, rollbacks, et sécurisation des secrets.`,
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
      { icon: 'aws', name: 'AWS' },
      { icon: 'typescript', name: 'Typescript' },
      { icon: 'postgres', name: 'Postgresql' },
      { icon: 'nodejs', name: 'Node.js' },
      { icon: 'kubernetees', name: 'Kubernetes' },
    ]
  },
  languages: [
    { ac: 'FR', level: 'native' },
    { ac: 'EN', level: 'professional' },
  ],
};
