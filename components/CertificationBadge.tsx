"use client";

export default function CertificationBadge() {
  return (
    <div className="inline-flex flex-col items-center justify-center p-3 md:p-4 bg-white rounded-lg shadow-lg border-2 border-blue-600 md:hover:scale-105 transition-transform duration-300 min-w-[120px] max-w-[140px]">
      <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 mb-2">
        <svg 
          className="w-8 h-8 md:w-10 md:h-10 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
          />
        </svg>
      </div>
      <div className="text-center">
        <div className="text-base md:text-lg font-bold text-blue-600 whitespace-nowrap">ISO 9001</div>
        <div className="text-[10px] md:text-xs text-gray-600 font-semibold whitespace-nowrap">Certificado</div>
        <div className="text-[10px] md:text-xs text-gray-500 mt-1 whitespace-nowrap">Sistema de Gestión</div>
        <div className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">de Calidad</div>
      </div>
    </div>
  );
}
