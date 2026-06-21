'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Trash2, Plus, GripVertical } from 'lucide-react'
import type {
  BlockPlacement,
  BlockType,
  CustomBlock,
  ImageRef,
  ProjectContent,
} from '@/lib/content/types'
import { emptyBlock, emptyImage } from '@/lib/content/images'
import { Field, TextInput, TextArea, Toggle } from './fields'
import { ImagePicker } from './media/image-picker'

const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  text: 'Text / Editorial',
  imageText: 'Image + Text',
  cta: 'Call to Action',
  projectHighlight: 'Project Highlight',
  gallery: 'Gallery',
  statement: 'Divider / Statement',
}

const BLOCK_TYPE_DESCRIPTIONS: Record<BlockType, string> = {
  text: 'Eyebrow, title, body text and an optional CTA.',
  imageText: 'A media image beside editorial text, image left or right.',
  cta: 'A focused call-to-action with primary and secondary buttons.',
  projectHighlight: 'Feature an existing project with overrides.',
  gallery: 'A titled grid of images from the Media Gallery.',
  statement: 'A short premium statement with an optional gold divider.',
}

const PLACEMENT_LABELS: Record<BlockPlacement, string> = {
  afterHero: 'After hero',
  afterBrandEssence: 'After brand essence',
  afterPhilosophy: 'After philosophy',
  afterPortfolio: 'After portfolio',
  beforeContact: 'Before contact',
  beforeFooter: 'Before footer',
}

const BLOCK_TYPES = Object.keys(BLOCK_TYPE_LABELS) as BlockType[]
const PLACEMENTS = Object.keys(PLACEMENT_LABELS) as BlockPlacement[]

const selectClass =
  'w-full border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold'

export function SectionsEditor({
  blocks,
  projects,
  onChange,
}: {
  blocks: CustomBlock[]
  projects: ProjectContent[]
  onChange: (next: CustomBlock[]) => void
}) {
  const [addType, setAddType] = useState<BlockType>('text')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  // Render in stored array order; reorder buttons mutate the array directly.
  const ordered = blocks

  function updateBlock(id: string, patch: Partial<CustomBlock>) {
    onChange(
      blocks.map((b) =>
        b.id === id
          ? { ...b, ...patch, updatedAt: new Date().toISOString() }
          : b,
      ),
    )
  }

  function addBlock() {
    const block = emptyBlock(addType, 'beforeContact', blocks.length)
    onChange([...blocks, block])
    setExpanded(block.id)
  }

  function removeBlock(id: string) {
    onChange(blocks.filter((b) => b.id !== id))
    setConfirmDelete(null)
    if (expanded === id) setExpanded(null)
  }

  function move(index: number, dir: -1 | 1) {
    const next = [...blocks]
    const target = index + dir
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next.map((b, i) => ({ ...b, order: i })))
  }

  return (
    <section className="border border-border bg-secondary/30 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-heading text-xl font-normal text-foreground">
            Page Sections
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Add custom sections to the homepage for this locale. Other locales
            are not affected. {blocks.length} section(s).
          </p>
        </div>
        <div className="flex items-end gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
              Section type
            </span>
            <select
              value={addType}
              onChange={(e) => setAddType(e.target.value as BlockType)}
              className={selectClass}
            >
              {BLOCK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {BLOCK_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={addBlock}
            className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add section
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {BLOCK_TYPE_DESCRIPTIONS[addType]}
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {ordered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No custom sections yet. Choose a type and click “Add section”.
          </p>
        ) : (
          ordered.map((block, index) => (
            <article
              key={block.id}
              className="border border-border bg-card"
            >
              <header className="flex items-center gap-2 px-3 py-2.5">
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm text-foreground">
                    {BLOCK_TYPE_LABELS[block.type]}
                    {block.title ? ` — ${block.title}` : ''}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {PLACEMENT_LABELS[block.placement]}
                    {block.visible ? '' : ' · hidden'}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Move section up"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Move section down"
                  disabled={index === ordered.length - 1}
                  onClick={() => move(index, 1)}
                  className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setExpanded(expanded === block.id ? null : block.id)
                  }
                  className="border border-border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground hover:border-foreground"
                >
                  {expanded === block.id ? 'Close' : 'Edit'}
                </button>
              </header>

              {expanded === block.id ? (
                <div className="flex flex-col gap-4 border-t border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Toggle
                      checked={block.visible}
                      onChange={(v) => updateBlock(block.id, { visible: v })}
                      label={block.visible ? 'Visible' : 'Hidden'}
                    />
                    <label className="flex items-center gap-2">
                      <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
                        Placement
                      </span>
                      <select
                        value={block.placement}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            placement: e.target.value as BlockPlacement,
                          })
                        }
                        className={selectClass}
                      >
                        {PLACEMENTS.map((p) => (
                          <option key={p} value={p}>
                            {PLACEMENT_LABELS[p]}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <BlockFields
                    block={block}
                    projects={projects}
                    onChange={(patch) => updateBlock(block.id, patch)}
                  />

                  <div className="flex items-center gap-2 border-t border-border pt-3">
                    {confirmDelete === block.id ? (
                      <>
                        <span className="text-sm text-foreground">
                          Delete this section?
                        </span>
                        <button
                          type="button"
                          onClick={() => removeBlock(block.id)}
                          className="border border-destructive px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-destructive hover:bg-destructive hover:text-card"
                        >
                          Confirm delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(null)}
                          className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(block.id)}
                        className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground hover:border-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete section
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>
    </section>
  )
}

function BlockFields({
  block,
  projects,
  onChange,
}: {
  block: CustomBlock
  projects: ProjectContent[]
  onChange: (patch: Partial<CustomBlock>) => void
}) {
  const { type } = block

  const eyebrow = (
    <Field label="Eyebrow / label">
      <TextInput
        value={block.eyebrow}
        onChange={(v) => onChange({ eyebrow: v })}
      />
    </Field>
  )
  const title = (
    <Field label="Title">
      <TextInput value={block.title} onChange={(v) => onChange({ title: v })} />
    </Field>
  )
  const text = (
    <Field label="Text">
      <TextArea value={block.text} onChange={(v) => onChange({ text: v })} />
    </Field>
  )
  const primaryCta = (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Button text" hint="Optional. Hidden when empty.">
        <TextInput
          value={block.ctaText}
          onChange={(v) => onChange({ ctaText: v })}
        />
      </Field>
      <Field label="Button link">
        <TextInput
          value={block.ctaLink}
          onChange={(v) => onChange({ ctaLink: v })}
        />
      </Field>
    </div>
  )

  if (type === 'text') {
    return (
      <>
        {eyebrow}
        {title}
        {text}
        {primaryCta}
      </>
    )
  }

  if (type === 'imageText') {
    return (
      <>
        {eyebrow}
        {title}
        {text}
        <Field label="Image position">
          <select
            value={block.imagePosition}
            onChange={(e) =>
              onChange({ imagePosition: e.target.value as 'left' | 'right' })
            }
            className={selectClass}
          >
            <option value="right">Image right</option>
            <option value="left">Image left</option>
          </select>
        </Field>
        <ImagePicker
          label="Image"
          showCaption
          value={block.image}
          onChange={(v) => onChange({ image: v })}
        />
        {primaryCta}
      </>
    )
  }

  if (type === 'cta') {
    return (
      <>
        <Field label="Label">
          <TextInput
            value={block.eyebrow}
            onChange={(v) => onChange({ eyebrow: v })}
          />
        </Field>
        {title}
        {text}
        {primaryCta}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Secondary button text" hint="Optional.">
            <TextInput
              value={block.secondaryCtaText}
              onChange={(v) => onChange({ secondaryCtaText: v })}
            />
          </Field>
          <Field label="Secondary button link">
            <TextInput
              value={block.secondaryCtaLink}
              onChange={(v) => onChange({ secondaryCtaLink: v })}
            />
          </Field>
        </div>
      </>
    )
  }

  if (type === 'projectHighlight') {
    return (
      <>
        <Field
          label="Project"
          hint="Choose an existing project to highlight."
        >
          <select
            value={block.projectSlug}
            onChange={(e) => onChange({ projectSlug: e.target.value })}
            className={selectClass}
          >
            <option value="">— Select a project —</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Title override" hint="Optional. Falls back to project name.">
          <TextInput
            value={block.title}
            onChange={(v) => onChange({ title: v })}
          />
        </Field>
        <Field label="Text override" hint="Optional. Falls back to project summary.">
          <TextArea
            value={block.text}
            onChange={(v) => onChange({ text: v })}
          />
        </Field>
        <ImagePicker
          label="Image override"
          hint="Optional. Falls back to the project cover image."
          showCaption
          value={block.image}
          onChange={(v) => onChange({ image: v })}
        />
        {primaryCta}
      </>
    )
  }

  if (type === 'gallery') {
    return (
      <>
        {title}
        <Field label="Intro text" hint="Optional.">
          <TextArea
            value={block.intro}
            onChange={(v) => onChange({ intro: v })}
          />
        </Field>
        <GalleryFields
          gallery={block.gallery}
          onChange={(gallery) => onChange({ gallery })}
        />
      </>
    )
  }

  // statement
  return (
    <>
      <Field label="Statement" hint="A short, premium editorial line.">
        <TextArea
          value={block.text}
          onChange={(v) => onChange({ text: v })}
        />
      </Field>
      <Toggle
        checked={block.showDivider}
        onChange={(v) => onChange({ showDivider: v })}
        label="Show gold divider"
      />
    </>
  )
}

function GalleryFields({
  gallery,
  onChange,
}: {
  gallery: ImageRef[]
  onChange: (next: ImageRef[]) => void
}) {
  function move(index: number, dir: -1 | 1) {
    const next = [...gallery]
    const target = index + dir
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
        Gallery images
      </span>
      {gallery.map((img, i) => (
        <div key={i} className="border border-border bg-card/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Image {i + 1}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Move image up"
                disabled={i === 0}
                onClick={() => move(i, -1)}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Move image down"
                disabled={i === gallery.length - 1}
                onClick={() => move(i, 1)}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Remove image"
                onClick={() => onChange(gallery.filter((_, idx) => idx !== i))}
                className="border border-border px-2 py-0.5 text-xs text-muted-foreground hover:border-destructive hover:text-destructive"
              >
                Remove
              </button>
            </div>
          </div>
          <ImagePicker
            label={`Gallery image ${i + 1}`}
            showCaption
            value={img}
            onChange={(v) => {
              const next = [...gallery]
              next[i] = v
              onChange(next)
            }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...gallery, emptyImage()])}
        className="self-start border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground hover:border-foreground"
      >
        Add gallery image
      </button>
    </div>
  )
}
