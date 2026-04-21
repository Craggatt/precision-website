'use client'

import { useState } from 'react'
import EntranceAnimation from './EntranceAnimation'
import NewHomeSection from './sections/NewHomeSection'
import Navbar from './Navbar'

export default function HeroEntrance() {
  const [ready, setReady] = useState(false)
  return (
    <>
      <Navbar ready={ready} />
      <EntranceAnimation onComplete={() => setReady(true)} />
      <NewHomeSection ready={ready} />
    </>
  )
}
