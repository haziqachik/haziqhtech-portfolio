import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="space-y-12">
      <section className="grid gap-10 md:grid-cols-[minmax(0,260px)_1fr] md:items-center">
        <div className="flex justify-center md:justify-start">
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-blue-100 bg-gradient-to-br from-blue-200 via-blue-100 to-white shadow-xl">
            <Image
              src="/profile.jpg"
              alt="Portrait of Haziq Asyraaf"
              width={192} // matches h-48 w-48
              height={192}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="space-y-4 text-slate-700">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">About Me</h1>
          <p>
            I am Haziq Asyraaf, an IT professional who thrives at the intersection of infrastructure, data, and
            security. My journey spans deploying scalable environments, automating workflows, and uncovering insights
            that empower teams to make informed decisions.
          </p>
          <p>
            With a strong foundation in DevOps practices, data analytics, and cybersecurity principles, I focus on
            building systems that are both resilient and efficient. I enjoy solving complex problems, collaborating with
            cross-functional teams, and continuously expanding my technical toolkit.
          </p>
        </div>
      </section>
    </main>
  );
}
