export default function ContactPage() {
  return (
    <main className="space-y-10">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Get In Touch</h1>
        <p className="text-base text-slate-600 md:text-lg">
          I would love to hear about new opportunities, collaborations, or any questions you may have.
          Fill out the form and I will respond as soon as possible.
        </p>
      </header>
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm md:p-10">
        <form className="space-y-6" method="post" action="#">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-800">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-slate-800">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              rows={6}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="How can I help you?"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
