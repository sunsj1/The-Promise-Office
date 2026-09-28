import { orgLogos } from '@/assets/orgs'

export const site = {
  brand: 'The Promise Office',
  tagline: 'Make the promise deliverable',
  person: 'Hrishikesh (Rishi) Salunkhe',
  shortName: 'Rishi Salunkhe',
  role: 'Delivery & Transformation Advisory',
  /** Locked founder descriptor — use verbatim wherever an expanded founder line is appropriate. */
  founderDescriptor:
    'Hrishikesh (Rishi) Salunkhe · Delivery & Transformation Advisor to IT Services, GCCs & Enterprise Leaders',
  discipline: 'Independent consulting · delivery, transformation & service performance',
  email: 'hrishikesh.salunkhe@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hrishikesh-v-salunkhe/',
  youtube: 'https://www.youtube.com/@thepromiseoffice',
  cal: {
    link: 'hrishikesh.salunkhe/30min',
    url: 'https://cal.com/hrishikesh.salunkhe/30min',
    namespace: '30min',
    successUrl: 'https://www.thepromiseoffice.com/booked',
  },
  base: 'Pune, India',
  reach: 'Working with distributed teams across India, APAC and the UK. On-site work can be agreed for the mandate.',
  url: 'https://www.thepromiseoffice.com',
  description:
    'Delivery, transformation and managed services advisor for IT services firms, GCCs and enterprise leaders. 21+ years connecting decisions, numbers, teams and operating rhythm.',
  experienceYears: 21,
  markets: ['India', 'Australia', 'New Zealand', 'UK', 'Philippines'],
} as const

export const disclaimers = {
  marks:
    'These marks describe prior employment or customer work and do not imply endorsement of this independent practice.',
  evidence:
    'These examples are from previous employed or client delivery roles. Outcomes are specific to those engagements.',
  figures:
    'Client and employer relationships remain with the organisations involved. Figures are rounded and refer to specific historical engagements; results depend on each client’s context.',
  practice:
    'The examples and experience on this site come from prior employment and customer work; they do not describe contracts or staff of this practice.',
  form: 'This prepares an email for you to review and send. The site does not store or submit your information.',
} as const

export type Organisation = {
  name: string
  src?: string
}

export const organisations: Organisation[] = [
  { name: 'Infosys', src: orgLogos.infosys },
  { name: 'Tech Mahindra', src: orgLogos.techMahindra },
  { name: 'CleverEX Technology', src: orgLogos.cleverex },
  { name: 'BT Group', src: orgLogos.btGroup },
  { name: 'Openreach' },
  { name: 'Vodafone Hutchison Australia', src: orgLogos.vodafone },
  { name: 'TPG Telecom', src: orgLogos.tpgTelecom },
  { name: 'Optus', src: orgLogos.optus },
  { name: 'Nokia', src: orgLogos.nokia },
  { name: 'Aspire Systems', src: orgLogos.aspireSystems },
  { name: 'Globe Telecom', src: orgLogos.globeTelecom },
  { name: 'PiES' },
  { name: 'Spark New Zealand', src: orgLogos.sparkNz },
  { name: 'Rakuten', src: orgLogos.rakuten },
  { name: 'Energy Advance Australia', src: orgLogos.energyAdvance },
]
