import CanvasRevealEffectDemo from '@/components/canvas-reveal-effect-demo'
import LandingHeroSection from '@/components/landing-hero-section'
import { NavbarDarkShadow } from '@/components/ui/navbar-dark-shadow'
import FAQsWithDashedLinesDemo from '@/components/faqs-with-dashed-lines-demo'
import SimpleFooterWithFourGridsDemo from '@/components/simple-footer-with-four-grids-demo'
import ContactFormGridWithDetailsDemo from '@/components/contact-form-grid-with-details-demo'
import FeaturesSectionDemo from '@/components/features-section-demo-2'
import AboutUsSection11Demo from '@/components/about-us-section-11-demo'

export default function Home() {
  return (
    <div className="landing-page">
      <NavbarDarkShadow />
      <div id="home" className="scroll-mt-24">
        <LandingHeroSection />
      </div>
      <div id="about" className="scroll-mt-24">
        <AboutUsSection11Demo />
      </div>
      <div id="features" className="scroll-mt-24">
        <CanvasRevealEffectDemo count={7} rows={2} cols={3} />
        <FeaturesSectionDemo />
      </div>
      <div id="faq" className="scroll-mt-24">
        <FAQsWithDashedLinesDemo />
      </div>
      <div id="contact" className="scroll-mt-24">
        <ContactFormGridWithDetailsDemo />
      </div>
      <SimpleFooterWithFourGridsDemo />
    </div>
  )
}
