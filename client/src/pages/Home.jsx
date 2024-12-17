import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Collaborators from '@/components/Collaborators'
import EBTExplanation from '@/components/EBTExplanation'
import Footer from '@/components/Footer'

import { Gallery } from '@/components/Gallery'
import ModuleWithImage from '@/components/ModuleWithImage'
import ModuleWithVideo from '@/components/ModuleWithVideo'
export default function Home(showNavbar = false) {
    return (
        <>
            {
                showNavbar && <Navbar />
            }
            <Hero />
            <Collaborators />
            <EBTExplanation />
            <ModuleWithImage />           
            <ModuleWithVideo
            />
            <Gallery />
            <Footer />
        </>
    )
}
