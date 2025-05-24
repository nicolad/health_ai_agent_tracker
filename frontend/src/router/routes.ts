import { lazy } from 'react';

const L = (p: string) => lazy(() => import(`@/pages/${p}.tsx`));

export const routes = [
  /* ── top-level pages ───────────────────────────────────────────── */
  { path: '/', label: 'Home', element:    L('Home') },

  /* ── PROTOCOL SECTION ──────────────────────────────────────────── */
  {
    label: 'Protocol',
    path:  '/protocol',             /* parent path for grouping only */
    children: [
      { path: '/protocol/starter',      label: 'Starter Guide',                   element: L('protocol/Starter') },
      { path: '/protocol/numbers',      label: 'By The Numbers',                  element: L('protocol/Numbers') },
      { path: '/protocol/step-1',       label: 'Step 1 \u00B7 Meal Prep',              element: L('protocol/Step1') },
      { path: '/protocol/step-2',       label: 'Step 2 \u00B7 Supplements',            element: L('protocol/Step2') },
      { path: '/protocol/step-3',       label: 'Step 3 \u00B7 Track Progress',         element: L('protocol/Step3') },

      { path: '/protocol/bryan',        label: 'Bryan Johnson\u2019s Protocol',        element: L('protocol/Bryan') },
      { path: '/protocol/results',      label: 'Current Results',                 element: L('protocol/Results') },
      { path: '/protocol/measurement',  label: 'Routine Measurement',             element: L('protocol/Measurement') },
      { path: '/protocol/gene',         label: 'Gene Therapy',                    element: L('protocol/Gene') },
      { path: '/protocol/heart',        label: 'Heart / Brain / Lung',            element: L('protocol/HeartBrain') },
      { path: '/protocol/gi',           label: 'Gastrointestinal',                element: L('protocol/GI') },
      { path: '/protocol/joints',       label: 'Joints',                          element: L('protocol/Joints') },
      { path: '/protocol/hair-skin',    label: 'Hair / Skin / Eye / Ear',         element: L('protocol/HairSkin') },
      { path: '/protocol/oral',         label: 'Oral / Sleep / Other',            element: L('protocol/Oral') },
      { path: '/protocol/diet',         label: 'Diet / Supplements',              element: L('protocol/Diet') },
      { path: '/protocol/fitness',      label: 'Fitness',                         element: L('protocol/Fitness') },
      { path: '/protocol/challenges',   label: 'Notable Challenges',              element: L('protocol/Challenges') },
      { path: '/protocol/appendix',     label: 'Appendix',                        element: L('protocol/Appendix') },
      { path: '/protocol/photos',       label: 'Latest Photos',                   element: L('protocol/Photos') },
      { path: '/protocol/notes',        label: '[Archived] Monthly Notes',        element: L('protocol/Notes') },
    ],
  },

  /* ── fallback ──────────────────────────────────────────────────── */
  { path: '*', label: 'Not Found', element: L('NotFound') },
] as const;

