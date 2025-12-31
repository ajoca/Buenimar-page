export default function ProductSkeleton() {
  return (
    <div className="panel overflow-hidden animate-pulse">
      {/* Imagen skeleton */}
      <div 
        className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
        style={{
          height: "clamp(120px, 165px, 200px)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
      
      {/* Contenido skeleton */}
      <div className="p-2 md:p-3 space-y-2">
        {/* Título */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        {/* Subtítulo */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        {/* Código */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
