import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { Collaborators } from '@/components/Collaborators'
import EBTExplanation from '@/components/EBTExplanation'
import EBTImplementation from '@/components/EBTImplementation'
import Footer from '@/components/Footer'
import Module from '@/components/Module'
import { Gallery } from '@/components/Gallery'


export default function Home(showNavbar = false) {
    return (
        <>
            {
                showNavbar && <Navbar />
            }
            <Hero />
            <Collaborators />
            <EBTExplanation />
            <EBTImplementation />
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
