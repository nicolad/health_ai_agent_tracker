import React from 'react';
export type Route = { path:string; label:string; group:string; element:React.ReactNode|null };
const lazy = (p:string)=>React.lazy(()=>import(`@/pages/${p}.tsx`));
export const routes:Route[] = [
  /* Blueprint Protocol */
  { path:'starter-guide',     label:'Protocol Starter Guide', group:'Blueprint Protocol',      element:lazy('StarterGuide') },
  { path:'by-the-numbers',    label:'By The Numbers',         group:'Blueprint Protocol',      element:lazy('ByTheNumbers') },
  { path:'meal-prep',         label:'Step 1: Meal Prep',      group:'Blueprint Protocol',      element:lazy('MealPrep') },
  { path:'supplements',       label:'Step 2: Supplements',    group:'Blueprint Protocol',      element:lazy('Supplements') },
  { path:'track-progress',    label:'Step 3: Track Progress', group:'Blueprint Protocol',      element:lazy('TrackProgress') },

  /* Bryan Johnson’s Protocol – FULL LIST */
  { path:'protocol/current-results',     label:'Current Results',          group:'Bryan Johnson’s Protocol', element:lazy('protocol/CurrentResults') },
  { path:'protocol/routine-measurement', label:'Routine Measurement',      group:'Bryan Johnson’s Protocol', element:lazy('protocol/RoutineMeasurement') },
  { path:'protocol/gene-therapy',        label:'Gene Therapy',             group:'Bryan Johnson’s Protocol', element:lazy('protocol/GeneTherapy') },
  { path:'protocol/heart-brain-lung',    label:'Heart / Brain / Lung',     group:'Bryan Johnson’s Protocol', element:lazy('protocol/HeartBrainLung') },
  { path:'protocol/gastrointestinal',    label:'Gastrointestinal',         group:'Bryan Johnson’s Protocol', element:lazy('protocol/Gastrointestinal') },
  { path:'protocol/joints',              label:'Joints',                   group:'Bryan Johnson’s Protocol', element:lazy('protocol/Joints') },
  { path:'protocol/hair-skin-eye-ear',   label:'Hair / Skin / Eye / Ear',  group:'Bryan Johnson’s Protocol', element:lazy('protocol/HairSkinEyeEar') },
  { path:'protocol/oral-sleep-other',    label:'Oral / Sleep / Other',     group:'Bryan Johnson’s Protocol', element:lazy('protocol/OralSleepOther') },
  { path:'protocol/diet-supplements',    label:'Diet / Supplements',       group:'Bryan Johnson’s Protocol', element:lazy('protocol/DietSupplements') },
  { path:'protocol/fitness',             label:'Fitness',                  group:'Bryan Johnson’s Protocol', element:lazy('protocol/Fitness') },
  { path:'protocol/notable-challenges',  label:'Notable Challenges',       group:'Bryan Johnson’s Protocol', element:lazy('protocol/NotableChallenges') },
  { path:'protocol/appendix',            label:'Appendix',                 group:'Bryan Johnson’s Protocol', element:lazy('protocol/Appendix') },
  { path:'protocol/latest-photos',       label:'Latest Photos',            group:'Bryan Johnson’s Protocol', element:lazy('protocol/LatestPhotos') },
  { path:'protocol/monthly-notes',       label:'[Archived] Monthly Notes', group:'Bryan Johnson’s Protocol', element:lazy('protocol/MonthlyNotes') },

  /* CTAs (null element = external link) */
  { path:'olive-oil',     label:'Blueprint Olive Oil →', group:'CTA', element:null },
  { path:'join-our-team', label:'Join our team →',       group:'CTA', element:null },
  { path:'media-kit',     label:'Media Kit →',           group:'CTA', element:null },

  /* Connect */
  { path:'connect', label:'Connect', group:'Connect', element:lazy('Connect') },
];
