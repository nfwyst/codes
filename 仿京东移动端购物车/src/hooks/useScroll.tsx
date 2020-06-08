import { useEffect, useRef, useCallback } from 'react'

type REF = { current: any }

export const useScroll = (handler: Function) => {
  const ref: REF = useRef(null)
  const handleScroll = useCallback((e) => {
    if (ref.current) return
    ref.current = window.setTimeout(() => {
      handler(e)
      ref.current = null
    }, 200)
  }, [handler])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(ref.current)
    }
  }, [handleScroll])
}

export default useScroll
