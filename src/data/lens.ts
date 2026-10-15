/** The Promise Lens, as six stages with the question each one asks. */
export const lensStages = [
  { name: 'Value', question: 'What should we do?' },
  { name: 'Economics', question: 'Does it make economic sense?' },
  { name: 'Context', question: 'What does the environment allow?' },
  { name: 'Change', question: 'What has to change, and who owns it?' },
  { name: 'Delivery', question: 'Can we actually deliver it?' },
  { name: 'Evidence', question: 'Did the promised outcome materialise?' },
] as const
