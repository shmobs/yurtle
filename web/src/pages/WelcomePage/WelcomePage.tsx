import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Hero from 'src/components/welcome/Hero'

const WelcomePage = () => {
  return (
    <>
      <MetaTags title="Welcome" description="Welcome page" />

      <Hero />
    </>
  )
}

export default WelcomePage
