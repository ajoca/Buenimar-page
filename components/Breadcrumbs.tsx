import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 md:py-4">
      <div className="container-x">
        <ol className="flex items-center space-x-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
          <li>
            <Link 
              href="/" 
              className="hover:underline transition-colors"
              style={{ color: "rgb(var(--muted))" }}
            >
              Inicio
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>/</span>
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:underline transition-colors"
                  style={{ color: "rgb(var(--muted))" }}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold" style={{ color: "rgb(var(--text))" }}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
