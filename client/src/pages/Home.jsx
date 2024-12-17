import { Gallery } from '@/components/Gallery';
import ModuleWithImage from '@/components/ModuleWithImage';
import ModuleWithVideo from '@/components/ModuleWithVideo';
import React, { Suspense, lazy } from 'react';

const Navbar = lazy(() => import('@/components/Navbar'));
const Hero = lazy(() => import('@/components/Hero'));
const Collaborators = lazy(() => import('@/components/Collaborators'));
const EBTExplanation = lazy(() => import('@/components/EBTExplanation'));
const Footer = lazy(() => import('@/components/Footer'));

export default function Home({ showNavbar = true }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {showNavbar && <Navbar />}
            <Hero />
            <Collaborators />
            <EBTExplanation />
            <ModuleWithImage />
            <ModuleWithVideo />
            <Gallery />
            <Footer />
        </Suspense>
    );
}
