'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GSAPInit() {
  useEffect(() => {
    // Fade-up pour tous les éléments marqués [data-gsap]
    const els = document.querySelectorAll('[data-gsap="fade-up"]')
    els.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Stagger pour les grilles [data-gsap-stagger]
    const grids = document.querySelectorAll('[data-gsap-stagger]')
    grids.forEach(grid => {
      const children = Array.from(grid.children)
      gsap.fromTo(children,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Slide depuis la gauche [data-gsap="slide-left"]
    const leftEls = document.querySelectorAll('[data-gsap="slide-left"]')
    leftEls.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Slide depuis la droite [data-gsap="slide-right"]
    const rightEls = document.querySelectorAll('[data-gsap="slide-right"]')
    rightEls.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Zoom depuis le centre [data-gsap="zoom-in"]
    const zoomEls = document.querySelectorAll('[data-gsap="zoom-in"]')
    zoomEls.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.85, y: 30 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Scale in pour les cartes de catégorie [data-gsap="scale-in"]
    const scaleEls = document.querySelectorAll('[data-gsap="scale-in"]')
    scaleEls.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1, scale: 1,
          duration: 0.6,
          ease: 'back.out(1.5)',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return null
}
