const Footer = () => {
  return (
    <footer className="py-6 border-t border-zinc-100 text-center">
      <p className="text-xs text-zinc-500 mb-1">
        Built with Next.js, Tailwind CSS, and Framer Motion
      </p>

      <p className="text-xs text-zinc-400">
        © {new Date().getFullYear()} Harshil Desai
      </p>

      <div className="mt-2 flex justify-center gap-4 text-xs text-zinc-500">
        <a
          href="https://github.com/harshil-desai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-800 transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/harshil-desai-a89918201/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-800 transition"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}

export default Footer
