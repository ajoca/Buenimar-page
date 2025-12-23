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
        <div className="mt-3 md:mt-4">
          <a
            className="btn btn-accent inline-flex text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100"
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
