
export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-4 md:space-y-6">
          <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wider drop-shadow-lg">VAMOS QUE VAMOS</p>
          <div className="text-base md:text-lg lg:text-xl space-y-2 md:space-y-3 font-medium">
            <p className="break-words">📍 Pablo Zufriategui 374 - Colonia del Sacramento, Uruguay</p>
            <p className="break-words">📞 Tel: +598 4522 4091</p>
            <p className="break-words">📱 WhatsApp: +598 97 557 366</p>
            <p className="break-words">📧 Email: pedidos@buenimar.com</p>
          </div>
          <p className="text-xs md:text-sm opacity-90 pt-2 md:pt-4">© 2025 Buenimar Colonia - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
