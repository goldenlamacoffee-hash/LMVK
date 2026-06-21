'use client'

import { useState } from 'react'
import type { ImageRef, ProjectContent } from '@/lib/content/types'
import { Field, TextInput, TextArea, Toggle } from './fields'
import { ImagePicker } from './media/image-picker'
import { emptyImage } from '@/lib/content/images'

export function ProjectsEditor({
  projects,
  onChange,
}: {
  projects: ProjectContent[]
  onChange: (projects: ProjectContent[]) => void
}) {
  const [open, setOpen] = useState<string | null>(null)

  function updateProject(slug: string, patch: Partial<ProjectContent>) {
    onChange(projects.map((p) => (p.slug === slug ? { ...p, ...patch } : p)))
  }

  function move(slug: string, dir: -1 | 1) {
    const sorted = [...projects].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex((p) => p.slug === slug)
    const swap = idx + dir
    if (swap < 0 || swap >= sorted.length) return
    const a = sorted[idx]
    const b = sorted[swap]
    onChange(
      projects.map((p) => {
        if (p.slug === a.slug) return { ...p, order: b.order }
        if (p.slug === b.slug) return { ...p, order: a.order }
        return p
      }),
    )
  }

  const ordered = [...projects].sort((a, b) => a.order - b.order)

  return (
    <section className="border border-border bg-secondary/30 p-5">
      <h3 className="font-heading text-xl font-normal text-foreground">Projects</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Reorder, toggle visibility, and edit each project&apos;s content and
        detail page.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {ordered.map((project, i) => (
          <div key={project.slug} className="border border-border bg-card">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => move(project.slug, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => move(project.slug, 1)}
                    disabled={i === ordered.length - 1}
                    aria-label="Move down"
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
                <div>
                  <p className="font-heading text-base text-foreground">
                    {project.name || project.slug}
                  </p>
                  <p className="text-xs text-muted-foreground">/{project.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Toggle
                  checked={project.visible}
                  onChange={(v) => updateProject(project.slug, { visible: v })}
                  label="Visible"
                />
                <button
                  type="button"
                  onClick={() =>
                    setOpen(open === project.slug ? null : project.slug)
                  }
                  className="text-xs font-medium uppercase tracking-[0.2em] text-foreground"
                >
                  {open === project.slug ? 'Close' : 'Edit'}
                </button>
              </div>
            </div>

            {open === project.slug ? (
              <div className="flex flex-col gap-4 border-t border-border p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Index" hint="e.g. 01">
                    <TextInput
                      value={project.index}
                      onChange={(v) => updateProject(project.slug, { index: v })}
                    />
                  </Field>
                  <Field label="Name">
                    <TextInput
                      value={project.name}
                      onChange={(v) => updateProject(project.slug, { name: v })}
                    />
                  </Field>
                  <Field label="Subtitle">
                    <TextInput
                      value={project.subtitle}
                      onChange={(v) =>
                        updateProject(project.slug, { subtitle: v })
                      }
                    />
                  </Field>
                  <Field label="Field">
                    <TextInput
                      value={project.field}
                      onChange={(v) => updateProject(project.slug, { field: v })}
                    />
                  </Field>
                  <Field label="Category">
                    <TextInput
                      value={project.category}
                      onChange={(v) =>
                        updateProject(project.slug, { category: v })
                      }
                    />
                  </Field>
                  <Field label="Status">
                    <TextInput
                      value={project.status}
                      onChange={(v) => updateProject(project.slug, { status: v })}
                    />
                  </Field>
                  <Field label="Mark" hint="Short monogram, e.g. GL">
                    <TextInput
                      value={project.mark}
                      onChange={(v) => updateProject(project.slug, { mark: v })}
                    />
                  </Field>
                </div>
                <Field label="Summary" hint="Shown in the portfolio list">
                  <TextArea
                    value={project.summary}
                    onChange={(v) => updateProject(project.slug, { summary: v })}
                  />
                </Field>
                <Field label="Description" hint="Detail page intro">
                  <TextArea
                    rows={4}
                    value={project.description}
                    onChange={(v) =>
                      updateProject(project.slug, { description: v })
                    }
                  />
                </Field>
                <Field label="Philosophy" hint="Detail page statement">
                  <TextArea
                    rows={4}
                    value={project.philosophy}
                    onChange={(v) =>
                      updateProject(project.slug, { philosophy: v })
                    }
                  />
                </Field>

                <div className="border-t border-border pt-4">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
                    Images
                  </p>
                  <div className="mt-3 flex flex-col gap-5">
                    <ImagePicker
                      label="Cover image"
                      hint="Thumbnail shown on the portfolio card."
                      value={project.coverImage}
                      onChange={(v) =>
                        updateProject(project.slug, { coverImage: v })
                      }
                    />
                    <ImagePicker
                      label="Hero image"
                      hint="Large image at the top of the detail page."
                      value={project.heroImage}
                      onChange={(v) =>
                        updateProject(project.slug, { heroImage: v })
                      }
                    />
                    <ImagePicker
                      label="Open Graph image"
                      hint="Social share image for this project. Falls back to the global OG image when empty."
                      value={project.ogImage}
                      onChange={(v) =>
                        updateProject(project.slug, { ogImage: v })
                      }
                    />

                    {/* Gallery */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
                        Gallery
                      </span>
                      {project.gallery.map((img, gi) => (
                        <div
                          key={gi}
                          className="border border-border bg-card/60 p-3"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Image {gi + 1}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                aria-label="Move image up"
                                disabled={gi === 0}
                                onClick={() => {
                                  const gallery = [...project.gallery]
                                  ;[gallery[gi - 1], gallery[gi]] = [
                                    gallery[gi],
                                    gallery[gi - 1],
                                  ]
                                  updateProject(project.slug, { gallery })
                                }}
                                className="px-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                aria-label="Move image down"
                                disabled={gi === project.gallery.length - 1}
                                onClick={() => {
                                  const gallery = [...project.gallery]
                                  ;[gallery[gi], gallery[gi + 1]] = [
                                    gallery[gi + 1],
                                    gallery[gi],
                                  ]
                                  updateProject(project.slug, { gallery })
                                }}
                                className="px-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                aria-label="Remove image"
                                onClick={() =>
                                  updateProject(project.slug, {
                                    gallery: project.gallery.filter(
                                      (_, idx) => idx !== gi,
                                    ),
                                  })
                                }
                                className="border border-border px-2 py-0.5 text-xs text-muted-foreground hover:border-destructive hover:text-destructive"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          <ImagePicker
                            label={`Gallery image ${gi + 1}`}
                            showCaption
                            value={img}
                            onChange={(v) => {
                              const gallery = [...project.gallery]
                              gallery[gi] = v
                              updateProject(project.slug, { gallery })
                            }}
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          updateProject(project.slug, {
                            gallery: [
                              ...project.gallery,
                              emptyImage() as ImageRef,
                            ],
                          })
                        }
                        className="self-start border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground hover:border-foreground"
                      >
                        Add gallery image
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
                    SEO
                  </p>
                  <div className="mt-3 flex flex-col gap-4">
                    <Field
                      label="SEO title"
                      hint="Falls back to the project name when empty."
                    >
                      <TextInput
                        value={project.seoTitle ?? ''}
                        onChange={(v) =>
                          updateProject(project.slug, { seoTitle: v })
                        }
                      />
                    </Field>
                    <Field
                      label="SEO description"
                      hint="Falls back to the summary when empty."
                    >
                      <TextArea
                        value={project.seoDescription ?? ''}
                        onChange={(v) =>
                          updateProject(project.slug, { seoDescription: v })
                        }
                      />
                    </Field>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
                    Values
                  </p>
                  <div className="mt-3 flex flex-col gap-3">
                    {project.values.map((val, vi) => (
                      <div
                        key={vi}
                        className="grid gap-3 sm:grid-cols-[1fr_2fr]"
                      >
                        <TextInput
                          value={val.title}
                          placeholder="Title"
                          onChange={(v) => {
                            const values = [...project.values]
                            values[vi] = { ...values[vi], title: v }
                            updateProject(project.slug, { values })
                          }}
                        />
                        <div className="flex gap-2">
                          <TextArea
                            value={val.description}
                            placeholder="Description"
                            rows={2}
                            onChange={(v) => {
                              const values = [...project.values]
                              values[vi] = { ...values[vi], description: v }
                              updateProject(project.slug, { values })
                            }}
                          />
                          <button
                            type="button"
                            aria-label="Remove value"
                            onClick={() =>
                              updateProject(project.slug, {
                                values: project.values.filter(
                                  (_, idx) => idx !== vi,
                                ),
                              })
                            }
                            className="shrink-0 self-start border border-border px-2 py-1 text-xs text-muted-foreground hover:border-destructive hover:text-destructive"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateProject(project.slug, {
                          values: [
                            ...project.values,
                            { title: '', description: '' },
                          ],
                        })
                      }
                      className="self-start border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground hover:border-foreground"
                    >
                      Add value
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
