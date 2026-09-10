import { CollegeInfo } from '../types';

export const COLLEGES_LIST: CollegeInfo[] = [
  {
    id: 'col-slrtce',
    code: 'SLRTCE-MUM',
    name: 'Shri L. R. Tiwari College of Engineering',
    shortName: 'SLRTCE',
    city: 'Mira Road, Mumbai',
    state: 'Maharashtra',
    type: 'Autonomous Engineering College',
    partnerOpportunitiesCount: 28,
    featuredHackathon: 'Innobuzz National Hackathon 2026',
    logoText: 'SLRT',
    isPopular: true
  },
  {
    id: 'col-tcet',
    code: 'TCET-MUM',
    name: 'Thakur College of Engineering and Technology',
    shortName: 'TCET Mumbai',
    city: 'Kandivali, Mumbai',
    state: 'Maharashtra',
    type: 'Autonomous Engineering College',
    partnerOpportunitiesCount: 26,
    featuredHackathon: 'Zephyr Hackfest & Tech Carnival 2026',
    logoText: 'TCET',
    isPopular: true
  },
  {
    id: 'col-atharva',
    code: 'ACE-MUM',
    name: 'Atharva College of Engineering (Atharva University)',
    shortName: 'Atharva College',
    city: 'Malad, Mumbai',
    state: 'Maharashtra',
    type: 'Autonomous Engineering College & University',
    partnerOpportunitiesCount: 22,
    featuredHackathon: 'Techithon Robotics & AI Hackathon',
    logoText: 'ACE',
    isPopular: true
  },
  {
    id: 'col-mithibai',
    code: 'MITHIBAI-MUM',
    name: "SVKM's Mithibai College of Arts & Science",
    shortName: 'Mithibai College',
    city: 'Vile Parle, Mumbai',
    state: 'Maharashtra',
    type: 'Autonomous Premier College',
    partnerOpportunitiesCount: 20,
    featuredHackathon: 'Mithibai Tech Innovations & Data Fest',
    logoText: 'MITH',
    isPopular: true
  },
  {
    id: 'col-vjti',
    code: 'VJTI-MATUNGA',
    name: 'Veermata Jijabai Technological Institute',
    shortName: 'VJTI Mumbai',
    city: 'Matunga, Mumbai',
    state: 'Maharashtra',
    type: 'Autonomous Institute',
    partnerOpportunitiesCount: 32,
    featuredHackathon: 'Technovanza CodeWars 2026',
    logoText: 'VJTI',
    isPopular: true
  },
  {
    id: 'col-spit',
    code: 'SPIT-ANDHERI',
    name: 'Sardar Patel Institute of Technology',
    shortName: 'SPIT Mumbai',
    city: 'Andheri, Mumbai',
    state: 'Maharashtra',
    type: 'Autonomous Engineering Institute',
    partnerOpportunitiesCount: 25,
    featuredHackathon: 'Oculus National TechSprint',
    logoText: 'SPIT',
    isPopular: true
  },
  {
    id: 'col-iitb',
    code: 'IITB-POWAI',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    city: 'Powai, Mumbai',
    state: 'Maharashtra',
    type: 'Institute of National Importance',
    partnerOpportunitiesCount: 42,
    featuredHackathon: 'e-Yantra Robotics & AI Hackathon',
    logoText: 'IITB',
    isPopular: true
  },
  {
    id: 'col-bits',
    code: 'BITS-PILANI',
    name: 'Birla Institute of Technology and Science, Pilani',
    shortName: 'BITS Pilani',
    city: 'Pilani',
    state: 'Rajasthan',
    type: 'Deemed to be University',
    partnerOpportunitiesCount: 38,
    featuredHackathon: 'APOGEE Innovation Challenge',
    logoText: 'BITS',
    isPopular: true
  }
];

export const DEFAULT_COLLEGE: CollegeInfo = COLLEGES_LIST[0]; // Shri L. R. Tiwari College of Engineering
