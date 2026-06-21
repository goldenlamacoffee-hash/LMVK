import type { Locale } from '@/lib/i18n'

/**
 * Fixed UI chrome strings that are not part of the editable CMS content
 * (button labels, section labels and templated sentences on the project
 * detail pages and in the footer). Localized per supported locale.
 */
export type UiStrings = {
  /** Prefix for the "Visit <website>" link on a project detail page. */
  visit: string
  /** Label above a project's value list. */
  brandValues: string
  /** Section label above a project's philosophy statement. */
  philosophy: string
  /** Section label above a project's image gallery. */
  gallery: string
  /** "Back to portfolio" link label. */
  backToPortfolio: string
  /** Closing sentence on a project detail page. `{name}` is replaced. */
  closing: (name: string) => string
  /** Footer copyright suffix. */
  allRightsReserved: string
}

const en: UiStrings = {
  visit: 'Visit',
  brandValues: 'Brand Values',
  philosophy: 'Philosophy',
  gallery: 'Gallery',
  backToPortfolio: 'Back to portfolio',
  closing: (name) =>
    `${name} is part of LMVK Group — a private holding and venture group building premium brands with taste, discipline and long-term vision.`,
  allRightsReserved: 'All rights reserved.',
}

const sk: UiStrings = {
  visit: 'Navštíviť',
  brandValues: 'Hodnoty značky',
  philosophy: 'Filozofia',
  gallery: 'Galéria',
  backToPortfolio: 'Späť na portfólio',
  closing: (name) =>
    `${name} je súčasťou LMVK Group — súkromnej holdingovej a venture skupiny, ktorá buduje prémiové značky s vkusom, disciplínou a dlhodobou víziou.`,
  allRightsReserved: 'Všetky práva vyhradené.',
}

const cs: UiStrings = {
  visit: 'Navštívit',
  brandValues: 'Hodnoty značky',
  philosophy: 'Filozofie',
  gallery: 'Galerie',
  backToPortfolio: 'Zpět na portfolio',
  closing: (name) =>
    `${name} je součástí LMVK Group — soukromé holdingové a venture skupiny, která buduje prémiové značky s vkusem, disciplínou a dlouhodobou vizí.`,
  allRightsReserved: 'Všechna práva vyhrazena.',
}

const dictionaries: Record<Locale, UiStrings> = { en, sk, cs }

export function uiStrings(locale: Locale): UiStrings {
  return dictionaries[locale] ?? en
}
