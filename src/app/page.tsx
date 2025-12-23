import Nav from '@/components/sections/Nav'
import ProfileHeader from '@/components/sections/ProfileHeader'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Blog from '@/components/sections/Blog'
import Stack from '@/components/sections/Stack'
import Honors from '@/components/sections/Honors'
import Certifications from '@/components/sections/Certifications'
import Bookmarks from '@/components/sections/Bookmarks'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-14">
        {/* Main content container with Notion document style */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 border border-zinc-50 rounded-xl my-6 p-0">
          <div className="px-6 py-4">
            <ProfileHeader />
            <About />
            <Projects />
            <Experience />
            <Stack />
            {/* <Blog /> */}
            {/* <Honors /> */}
            {/* <Certifications /> */}
            {/* <Bookmarks /> */}
            <Footer />
          </div>
        </div>
      </main>
    </>
  )
}