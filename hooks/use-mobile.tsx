import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }

      // Set initial value
      handleResize()

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}