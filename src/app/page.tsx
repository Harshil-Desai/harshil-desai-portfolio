import Nav from '@/components/sections/Nav'
import ProfileHeader from '@/components/sections/ProfileHeader'
import Socials from '@/components/sections/Socials'
import About from '@/components/sections/About'
import Contributions from '@/components/sections/Contributions'
import Stack from '@/components/sections/Stack'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import NowBuilding from '@/components/sections/NowBuilding'
import Bookmarks from '@/components/sections/Bookmarks'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <ProfileHeader />
          <Socials />
          <About />
          <Contributions />
          <Stack />
          <Experience />
          <Projects />
          <NowBuilding />
          <Bookmarks />
          <Footer />
        </div>
      </main>
    </>
  )
}
