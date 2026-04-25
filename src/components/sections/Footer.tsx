export default function Footer() {
  return (
    <footer className="mt-10 pt-5 border-t border-[var(--border)] pb-8">
      <p className="text-[12px] text-[var(--fg-muted)]">
        Built with care by{' '}
        <a
          href="https://linkedin.com/in/harshil-desai-a89918201"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--fg)] hover:underline underline-offset-2"
        >
          Harshil Desai
        </a>
        {'. '}Source on{' '}
        <a
          href="https://github.com/Harshil-Desai"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--fg)] hover:underline underline-offset-2"
        >
          GitHub
        </a>
        .
      </p>
      <p className="text-[11px] text-[var(--fg-muted)] mt-3 font-mono">
        © {new Date().getFullYear()} · v2.0
      </p>
    </footer>
  )
}
