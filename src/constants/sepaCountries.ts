// The 30 EU/EEA countries where Lumi is currently open to SEPA account holders
// (kept in sync with the FAQ "Who can sign up" answer). Used for the phone
// country-code selector on the signup form.
export interface SepaCountry {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  dial: string; // international dialing code, incl. leading +
}

export const SEPA_COUNTRIES: SepaCountry[] = [
  { code: "FR", name: "France", dial: "+33" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "BG", name: "Bulgaria", dial: "+359" },
  { code: "HR", name: "Croatia", dial: "+385" },
  { code: "CY", name: "Cyprus", dial: "+357" },
  { code: "CZ", name: "Czechia", dial: "+420" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "EE", name: "Estonia", dial: "+372" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "HU", name: "Hungary", dial: "+36" },
  { code: "IS", name: "Iceland", dial: "+354" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "LV", name: "Latvia", dial: "+371" },
  { code: "LI", name: "Liechtenstein", dial: "+423" },
  { code: "LT", name: "Lithuania", dial: "+370" },
  { code: "LU", name: "Luxembourg", dial: "+352" },
  { code: "MT", name: "Malta", dial: "+356" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "RO", name: "Romania", dial: "+40" },
  { code: "SK", name: "Slovakia", dial: "+421" },
  { code: "SI", name: "Slovenia", dial: "+386" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "SE", name: "Sweden", dial: "+46" },
];
