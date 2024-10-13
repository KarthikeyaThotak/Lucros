import React from 'react'
import Header from './components/HomePage/Header'
import Hero from './components/HomePage/Hero'
import Benefits from './components/HomePage/Benefits'
import Collaboration from './components/HomePage/Collaboration'
import Services from './components/HomePage/Services'
import Roadmap from './components/HomePage/Roadmap'
import Footer from './components/HomePage/Footer'
import ButtonGradient from "./assets/svg/ButtonGradient"

function Hompage() {
    return (
        <>
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
                <Hero />
                <Benefits />
                <Roadmap />
                <Footer />
            </div>
            <ButtonGradient />
        </>

    )
}

export default Hompage