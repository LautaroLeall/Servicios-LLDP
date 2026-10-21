import { useEffect, useState } from 'react'

export default function useScrollSpy(sectionIds, offset = 160) {
    const idsString = sectionIds.join(',')

    const [activeId, setActiveId] = useState(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.replace('#', '')
            if (hash && sectionIds.includes(hash)) {
                return hash
            }
        }
        return sectionIds[0] || 'home'
    })

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (ticking) return
            ticking = true

            window.requestAnimationFrame(() => {
                ticking = false

                const scrollY = window.scrollY || window.pageYOffset || 0
                const windowHeight = window.innerHeight || document.documentElement.clientHeight || 0
                const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0

                if (scrollY < 120) {
                    setActiveId(sectionIds[0] || 'home')
                    return
                }

                if (scrollY + windowHeight >= documentHeight - 60) {
                    setActiveId(sectionIds[sectionIds.length - 1] || '')
                    return
                }

                const scrollPos = scrollY + offset
                let currentSection = sectionIds[0] || 'home'

                for (let i = sectionIds.length - 1; i >= 0; i--) {
                    const id = sectionIds[i]
                    const element = document.getElementById(id)
                    if (element) {
                        const rect = element.getBoundingClientRect()
                        const elementTop = rect.top + scrollY

                        if (scrollPos >= elementTop - 30) {
                            currentSection = id
                            break
                        }
                    }
                }

                setActiveId(currentSection)
            })
        }

        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '')
            if (hash && sectionIds.includes(hash)) {
                setActiveId(hash)
            } else {
                handleScroll()
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('hashchange', handleHashChange)
        window.addEventListener('resize', handleScroll)

        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('hashchange', handleHashChange)
            window.removeEventListener('resize', handleScroll)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idsString, offset])

    return activeId
}
