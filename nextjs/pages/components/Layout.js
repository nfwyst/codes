import Head from 'next/head'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'

Router.events.on('routeChangeStart', url => {
  if (url === '/list' || url === '/l') {
    location.href = '/nopermission'
  }
})

export default ({ children }) => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch('/nestStyle')
  }, [])
  return (
    <div>
      <Head>
        <title>layout head</title>
      </Head>
      <div>
        <Link href="/">
          <a>
            主页
          </a>
        </Link> |
        <Link as="l" href="/list">
          <a>
            列表页
          </a>
        </Link> |
        <Link href="/nestStyle">
          <a>
            内联样式页
          </a>
        </Link>
      </div>
      {children}
      <footer>
        版权所有
    </footer>
    </div>
  )
}
