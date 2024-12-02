import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { Collaborators } from '@/components/Collaborators'
import EBTExplanation from '@/components/EBTExplanation'
import Footer from '@/components/Footer'
import Module from '@/components/ModuleWithVideo'
import { Gallery } from '@/components/Gallery'
import ModuleWithImage from '@/components/ModuleWithImage'


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
            <Module
                src="https://docs.material-tailwind.com/demo.mp4"
                poster="https://www.example.com/poster.jpg"
                width="800"
                height="450"
            />
            <Gallery />
            <Footer />
        </>
    )
}
