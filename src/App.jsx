import { useEffect, useRef } from 'react'
import TRANSLATIONS from './translations'

// MARKUP: one HTML string per section, kept exactly as the original hand-built
// portfolio markup (Tailwind classes + inline SVGs). Sections live in
// src/sections/*.html so they can be edited independently. The interactive
// behavior is split per feature in src/behaviors/*.js and executed once after
// mount inside the effect below · no behavior or design has changed.

import homeHtml from './sections/home.html?raw'
import aboutHtml from './sections/about.html?raw'
import experienceHtml from './sections/experience.html?raw'
import certificationsHtml from './sections/certifications.html?raw'
import workHtml from './sections/work.html?raw'
import projectModalHtml from './sections/projectModal.html?raw'
import publicationsHtml from './sections/publications.html?raw'
import skillsHtml from './sections/skills.html?raw'
import contactHtml from './sections/contact.html?raw'
import dockHtml from './sections/dock.html?raw'
import inlineStylesHtml from './sections/inlineStyles.html?raw'

import {
  initI18n,
  initDitherBackground,
  initScrambleName,
  initDockActive,
  initScrollReveal,
  initProjectModal,
  initCopyEmail,
  initAnimatedCounters,
  initSkillsMarquee,
} from './behaviors/index.js'

const MARKUP = [
  homeHtml,
  aboutHtml,
  experienceHtml,
  certificationsHtml,
  workHtml,
  projectModalHtml,
  publicationsHtml,
  skillsHtml,
  contactHtml,
  dockHtml,
  inlineStylesHtml,
].join('')

export default function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Make the translation dictionary available to the behavior modules.
    window.__I18N = TRANSLATIONS

    // Run the original behaviors once the markup is in the DOM, in the same
    // order they were defined in the original single script.
    initI18n()
    initDitherBackground()
    initScrambleName()
    initDockActive()
    initScrollReveal()
    initProjectModal()
    initCopyEmail()
    initAnimatedCounters()
    initSkillsMarquee()

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: MARKUP }}
    />
  )
}