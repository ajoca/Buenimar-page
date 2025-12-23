export default function PortalSection({
  title,
  buttonText,
  href,
}: {
  title: string;
  buttonText: string;
  href: string;
}) {
  const external = href.startsWith("http");
  return (
    <section className="pb-[var(--section-gap)]">
      <div className="container-x">
        <h2 className="section-title">{title}</h2>
        <div className="mt-3">
          <a
            className="btn btn-accent inline-flex transition-all duration-300 hover:scale-110 hover:-translate-y-[2px] hover:rotate-2 hover:shadow-2xl hover:border-red-500 active:scale-105 active:-translate-y-[1px] border-2 border-transparent"
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
