import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4 md:py-5 border-b"
      style={{ 
        borderColor: "rgb(var(--line))",
        background: "linear-gradient(to bottom, rgb(var(--bg)), rgba(var(--bg), 0.98))"
      }}
    >
      <div className="container-x">
        <ol className="flex items-center space-x-2 md:space-x-3 text-sm md:text-base flex-wrap">
          <li className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-red-50 transition-all duration-200 group"
            >
              <svg 
                className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-red-600 font-medium group-hover:text-red-700">Inicio</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2 md:space-x-3">
              <svg 
                className="w-5 h-5 flex-shrink-0" 
                style={{ color: "rgb(var(--muted))" }}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="px-3 py-1.5 rounded-md hover:bg-red-50 transition-all duration-200 font-medium hover:text-red-600"
                  style={{ color: "rgb(var(--text))" }}
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className="px-3 py-1.5 rounded-md bg-red-600 text-white font-semibold shadow-sm"
                >
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
