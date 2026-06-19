'use client'

import { useState, useTransition } from 'react'
import type { Locale } from '@/lib/i18n'
import { localeConfig } from '@/lib/i18n'
import type { SiteContent } from '@/lib/content/types'
import { saveContentAction } from '@/app/admin/actions'
import { logoutAction } from '@/app/admin/actions'
import { Field, TextInput, TextArea, Toggle, FieldGroup } from './fields'
import { ProjectsEditor } from './projects-editor'

type ContentByLocale = Record<string, SiteContent>

export function AdminEditor({
  locales,
  initialLocale,
  contentByLocale,
}: {
  locales: readonly Locale[]
  initialLocale: Locale
  contentByLocale: ContentByLocale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [drafts, setDrafts] = useState<ContentByLocale>(contentByLocale)
  const [dirty, setDirty] = useState<Record<string, boolean>>({})
  const [message, setMessage] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const content = drafts[locale]

  function update(updater: (draft: SiteContent) => SiteContent) {
    setDrafts((prev) => ({ ...prev, [locale]: updater(prev[locale]) }))
    setDirty((prev) => ({ ...prev, [locale]: true }))
    setMessage(null)
  }

  function save() {
    startTransition(async () => {
      const result = await saveContentAction(locale, drafts[locale])
      if (result.ok) {
        setDirty((prev) => ({ ...prev, [locale]: false }))
        setMessage('Saved. Public site updated.')
      } else {
        setMessage(result.error ?? 'Save failed.')
      }
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-sans text-base font-semibold tracking-[0.3em] text-foreground">
              LMVK
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              CMS
            </span>
          </div>
          <div className="flex items-center gap-3">
            {dirty[locale] ? (
              <span className="text-xs text-warm-grey">Unsaved changes</span>
            ) : null}
            <button
              type="button"
              onClick={save}
              disabled={pending || !dirty[locale]}
              className="bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {pending ? 'Saving…' : 'Save'}
            </button>
            <form action={logoutAction}>
              <button
                type="submit"
                className="border border-border px-4 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        <div className="mx-auto flex max-w-5xl items-center gap-1 px-6 pb-3">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                l === locale
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {localeConfig[l].label}
              {dirty[l] ? <span className="ml-1.5 text-gold">•</span> : null}
            </button>
          ))}
        </div>
      </header>

      {message ? (
        <div className="mx-auto max-w-5xl px-6 pt-4">
          <p className="border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-foreground">
            {message}
          </p>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
        {/* Settings & SEO */}
        <FieldGroup title="Settings & SEO">
          <Field label="Site title">
            <TextInput
              value={content.settings.siteTitle}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  settings: { ...d.settings, siteTitle: v },
                }))
              }
            />
          </Field>
          <Field label="Site description">
            <TextArea
              value={content.settings.siteDescription}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  settings: { ...d.settings, siteDescription: v },
                }))
              }
            />
          </Field>
          <Field label="SEO title" hint="Falls back to site title when empty.">
            <TextInput
              value={content.settings.seoTitle}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  settings: { ...d.settings, seoTitle: v },
                }))
              }
            />
          </Field>
          <Field
            label="SEO description"
            hint="Falls back to site description when empty."
          >
            <TextArea
              value={content.settings.seoDescription}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  settings: { ...d.settings, seoDescription: v },
                }))
              }
            />
          </Field>
          <Field
            label="Open Graph title"
            hint="Used for social shares. Falls back to SEO title when empty."
          >
            <TextInput
              value={content.settings.ogTitle ?? ''}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  settings: { ...d.settings, ogTitle: v },
                }))
              }
            />
          </Field>
          <Field
            label="Open Graph description"
            hint="Used for social shares. Falls back to SEO description when empty."
          >
            <TextArea
              value={content.settings.ogDescription ?? ''}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  settings: { ...d.settings, ogDescription: v },
                }))
              }
            />
          </Field>
        </FieldGroup>

        {/* Brand Assets */}
        <FieldGroup title="Brand Assets">
          <Field
            label="Open Graph / social image path"
            hint="Path to the share image, e.g. /og-image.png. Updates live."
          >
            <TextInput
              value={content.settings.ogImage}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  settings: { ...d.settings, ogImage: v },
                }))
              }
            />
          </Field>
          <p className="text-xs leading-relaxed text-muted-foreground">
            The logo and favicon are fixed brand-manual assets managed in code
            (no image upload yet), so they are not editable here. The OG / social
            image above is editable because it is referenced by path. To change
            the logo or favicon, replace the asset files in the project.
          </p>
        </FieldGroup>

        {/* Navigation */}
        <FieldGroup title="Navigation">
          {(['about', 'philosophy', 'portfolio', 'contact'] as const).map(
            (key) => (
              <Field key={key} label={`${key} label`}>
                <TextInput
                  value={content.nav[key]}
                  onChange={(v) =>
                    update((d) => ({
                      ...d,
                      nav: { ...d.nav, [key]: v },
                    }))
                  }
                />
              </Field>
            ),
          )}
        </FieldGroup>

        {/* Hero */}
        <FieldGroup title="Hero">
          <Field label="Eyebrow">
            <TextInput
              value={content.hero.eyebrow}
              onChange={(v) =>
                update((d) => ({ ...d, hero: { ...d.hero, eyebrow: v } }))
              }
            />
          </Field>
          <Field label="Headline">
            <TextArea
              value={content.hero.headline}
              onChange={(v) =>
                update((d) => ({ ...d, hero: { ...d.hero, headline: v } }))
              }
            />
          </Field>
          <Field label="Subtitle">
            <TextArea
              value={content.hero.subtitle}
              onChange={(v) =>
                update((d) => ({ ...d, hero: { ...d.hero, subtitle: v } }))
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary button label">
              <TextInput
                value={content.hero.primaryCtaText}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    hero: { ...d.hero, primaryCtaText: v },
                  }))
                }
              />
            </Field>
            <Field label="Primary button link">
              <TextInput
                value={content.hero.primaryCtaLink}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    hero: { ...d.hero, primaryCtaLink: v },
                  }))
                }
              />
            </Field>
            <Field label="Secondary button label">
              <TextInput
                value={content.hero.secondaryCtaText}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    hero: { ...d.hero, secondaryCtaText: v },
                  }))
                }
              />
            </Field>
            <Field label="Secondary button link">
              <TextInput
                value={content.hero.secondaryCtaLink}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    hero: { ...d.hero, secondaryCtaLink: v },
                  }))
                }
              />
            </Field>
          </div>
        </FieldGroup>

        {/* Brand Essence */}
        <FieldGroup title="Brand Essence">
          <Field label="Eyebrow">
            <TextInput
              value={content.brandEssence.eyebrow}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  brandEssence: { ...d.brandEssence, eyebrow: v },
                }))
              }
            />
          </Field>
          <Field label="Statement">
            <TextArea
              value={content.brandEssence.statement}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  brandEssence: { ...d.brandEssence, statement: v },
                }))
              }
            />
          </Field>
          {content.brandEssence.items.map((item, i) => (
            <div
              key={i}
              className="grid gap-4 border-t border-border pt-4 sm:grid-cols-[1fr_2fr]"
            >
              <Field label={`Item ${i + 1} — label`}>
                <TextInput
                  value={item.label}
                  onChange={(v) =>
                    update((d) => {
                      const items = [...d.brandEssence.items]
                      items[i] = { ...items[i], label: v }
                      return {
                        ...d,
                        brandEssence: { ...d.brandEssence, items },
                      }
                    })
                  }
                />
              </Field>
              <Field label={`Item ${i + 1} — statement`}>
                <TextArea
                  value={item.statement}
                  onChange={(v) =>
                    update((d) => {
                      const items = [...d.brandEssence.items]
                      items[i] = { ...items[i], statement: v }
                      return {
                        ...d,
                        brandEssence: { ...d.brandEssence, items },
                      }
                    })
                  }
                />
              </Field>
            </div>
          ))}
        </FieldGroup>

        {/* Philosophy */}
        <FieldGroup title="Philosophy">
          <Field label="Eyebrow">
            <TextInput
              value={content.philosophy.eyebrow}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  philosophy: { ...d.philosophy, eyebrow: v },
                }))
              }
            />
          </Field>
          <Field label="Title">
            <TextArea
              value={content.philosophy.title}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  philosophy: { ...d.philosophy, title: v },
                }))
              }
            />
          </Field>
          <Field label="Intro">
            <TextArea
              value={content.philosophy.intro}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  philosophy: { ...d.philosophy, intro: v },
                }))
              }
            />
          </Field>
          {content.philosophy.principles.map((p, i) => (
            <div
              key={i}
              className="grid gap-4 border-t border-border pt-4 sm:grid-cols-[1fr_2fr]"
            >
              <Field label={`Principle ${i + 1} — title`}>
                <TextInput
                  value={p.title}
                  onChange={(v) =>
                    update((d) => {
                      const principles = [...d.philosophy.principles]
                      principles[i] = { ...principles[i], title: v }
                      return {
                        ...d,
                        philosophy: { ...d.philosophy, principles },
                      }
                    })
                  }
                />
              </Field>
              <Field label={`Principle ${i + 1} — description`}>
                <TextArea
                  value={p.description}
                  onChange={(v) =>
                    update((d) => {
                      const principles = [...d.philosophy.principles]
                      principles[i] = { ...principles[i], description: v }
                      return {
                        ...d,
                        philosophy: { ...d.philosophy, principles },
                      }
                    })
                  }
                />
              </Field>
            </div>
          ))}
        </FieldGroup>

        {/* Portfolio */}
        <FieldGroup title="Portfolio">
          <Field label="Eyebrow">
            <TextInput
              value={content.portfolio.eyebrow}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  portfolio: { ...d.portfolio, eyebrow: v },
                }))
              }
            />
          </Field>
          <Field label="Title">
            <TextArea
              value={content.portfolio.title}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  portfolio: { ...d.portfolio, title: v },
                }))
              }
            />
          </Field>
          <Field label="Intro">
            <TextArea
              value={content.portfolio.intro}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  portfolio: { ...d.portfolio, intro: v },
                }))
              }
            />
          </Field>
        </FieldGroup>

        {/* Projects */}
        <ProjectsEditor
          projects={content.projects}
          onChange={(projects) => update((d) => ({ ...d, projects }))}
        />

        {/* Featured */}
        <FieldGroup title="Featured (Golden Lama)">
          <Field label="Eyebrow">
            <TextInput
              value={content.featured.eyebrow}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  featured: { ...d.featured, eyebrow: v },
                }))
              }
            />
          </Field>
          <Field label="Title">
            <TextArea
              value={content.featured.title}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  featured: { ...d.featured, title: v },
                }))
              }
            />
          </Field>
          <Field label="Body">
            <TextArea
              rows={4}
              value={content.featured.body}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  featured: { ...d.featured, body: v },
                }))
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Link label">
              <TextInput
                value={content.featured.ctaText}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    featured: { ...d.featured, ctaText: v },
                  }))
                }
              />
            </Field>
            <Field label="Link URL">
              <TextInput
                value={content.featured.ctaLink}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    featured: { ...d.featured, ctaLink: v },
                  }))
                }
              />
            </Field>
          </div>
        </FieldGroup>

        {/* Contact */}
        <FieldGroup title="Contact">
          <Field label="Eyebrow">
            <TextInput
              value={content.contact.eyebrow}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  contact: { ...d.contact, eyebrow: v },
                }))
              }
            />
          </Field>
          <Field label="Title">
            <TextArea
              value={content.contact.title}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  contact: { ...d.contact, title: v },
                }))
              }
            />
          </Field>
          <Field label="Text">
            <TextArea
              value={content.contact.text}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  contact: { ...d.contact, text: v },
                }))
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email">
              <TextInput
                value={content.contact.email}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    contact: { ...d.contact, email: v },
                  }))
                }
              />
            </Field>
            <Field label="Phone" hint="Optional. Hidden when empty.">
              <TextInput
                value={content.contact.phone ?? ''}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    contact: { ...d.contact, phone: v },
                  }))
                }
              />
            </Field>
            <Field label="Company / legal line" hint="Optional. Hidden when empty.">
              <TextInput
                value={content.contact.company ?? ''}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    contact: { ...d.contact, company: v },
                  }))
                }
              />
            </Field>
            <Field label="Person name">
              <TextInput
                value={content.contact.personName}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    contact: { ...d.contact, personName: v },
                  }))
                }
              />
            </Field>
            <Field label="Person role">
              <TextInput
                value={content.contact.personRole}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    contact: { ...d.contact, personRole: v },
                  }))
                }
              />
            </Field>
          </div>
        </FieldGroup>

        {/* Footer */}
        <FieldGroup title="Footer">
          <Field label="Description">
            <TextArea
              value={content.footer.description}
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  footer: { ...d.footer, description: v },
                }))
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Navigate column label">
              <TextInput
                value={content.footer.navigateLabel}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    footer: { ...d.footer, navigateLabel: v },
                  }))
                }
              />
            </Field>
            <Field label="Projects column label">
              <TextInput
                value={content.footer.projectsLabel}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    footer: { ...d.footer, projectsLabel: v },
                  }))
                }
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company line">
              <TextInput
                value={content.footer.company}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    footer: { ...d.footer, company: v },
                  }))
                }
              />
            </Field>
            <Field label="Claim / copyright line">
              <TextInput
                value={content.footer.claim}
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    footer: { ...d.footer, claim: v },
                  }))
                }
              />
            </Field>
          </div>
        </FieldGroup>

        <div className="flex items-center justify-end gap-3 pb-16">
          <a
            href={`${localeConfig[locale].origin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            View {localeConfig[locale].label} site
          </a>
          <button
            type="button"
            onClick={save}
            disabled={pending || !dirty[locale]}
            className="bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {pending ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </main>
  )
}
