import type { Brand, Catalog, Product, Slide, SocialLink } from "./types";
/**
 * 
 */
export const SITE: {
  heroSlides: Slide[];
  productsTitle: string;
  products: Product[];
  portal: { title: string; buttonText: string; href: string };
  companyTitle: string;
  companySlides: Slide[];
  companyParagraphs: string[];
  contactTitle: string;
  contactLines: string[];
  socials: SocialLink[];
  brandsTitle: string;
  catalogs: Catalog[];
  brands: Brand[];
} = {
  heroSlides: [
    { title: " ", text: " " },
    { title: " ", text: " " },
    { title: " ", text: " " },
  ],

  productsTitle: "Nuevos Productos",
  products: [
    { id: "p1", name: "Producto 1", subtitle: "Formato / cantidad", code: "COD-001" },
    { id: "p2", name: "Producto 2", subtitle: "Formato / cantidad", code: "COD-002" },
    { id: "p3", name: "Producto 3", subtitle: "Formato / cantidad", code: "COD-003" },
    { id: "p4", name: "Producto 4", subtitle: "Formato / cantidad", code: "COD-004" },
    { id: "p5", name: "Producto 5", subtitle: "Formato / cantidad", code: "COD-005" },
    { id: "p6", name: "Producto 6", subtitle: "Formato / cantidad", code: "COD-006" },
    { id: "p7", name: "Línea nueva", subtitle: "Nombre de línea" },
    { id: "p8", name: "Producto 8", subtitle: "Formato / cantidad", code: "COD-008" },
  ],

  portal: {
    title: "Consulta (Portal)",
    buttonText: "Ingrese aquí",
    href: "/contacto",
  },

  companyTitle: "Nuestra empresa",
  companySlides: [
    { image: "/img/BUENIMAR-2.avif" },
    { image: "/img/2070a6_8e37e4c151464366bcebb084f5bfc667~mv2.avif" },
    { image: "/img/2070a6_342125d997b24b0bab751e45e433da31~mv2.avif" },
    { image: "/img/2070a6_ad4613a31cf44fdc83372f5e1bc0de04~mv2.avif" },
  ],
  companyParagraphs: [
    "Párrafo 1 de descripción (reemplazá por tu texto).",
    "Párrafo 2 de descripción.",
    "Párrafo 3 de descripción.",
  ],

  contactTitle: "Cómo encontrarnos",
contactLines: [
  "Dirección: Pablo Zufriategui 374 - Colonia del Sacramento",
  'Tel.: <a href="tel:+59845224091" class="hover:text-indigo-400 transition-colors underline">+598 4522 4091</a>',
  'Whatsapp: <a href="https://wa.me/59897557366" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-400 transition-colors underline">+598 97 557 366</a>',
  'Email: <a href="mailto:pedidos@buenimar.com" class="hover:text-indigo-400 transition-colors underline">pedidos@buenimar.com</a>',
  'Ubicación: <a href="https://maps.app.goo.gl/yqpgdfnVyrvCvtzL9" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-400 transition-colors underline">Ver en Google Maps</a>',
],

socials: [
  { id: "wa", label: "WhatsApp", href: "https://wa.me/598XXXXXXXX" },
  { id: "ig", label: "Instagram", href: "https://instagram.com/TU_USUARIO" },
  { id: "fb", label: "Facebook", href: "https://facebook.com/TU_PAGINA" },
],

brandsTitle: "Marcas con las que trabajamos",
 catalogs: [
  { id: "c1", title: "Catálogo Conaprole", file: "Catalogo-Conaprole.pdf" },
  { id: "c2", title: "Catálogo La Especialista", file: "Catalogo-La-Especialista.pdf" },
  { id: "c3", title: "Catálogo Pagnifique", file: "Catalogo-Pagnifique.pdf" },
  { id: "c4", title: "Catálogo Almena", file: "Catalogo-Almena.pdf" },
],

  brands: [
    { id: "001", name: "Marca 001", image: "/img/marcas/001.png" },
    { id: "002", name: "Marca 002", image: "/img/marcas/002.png" },
    { id: "003", name: "Marca 003", image: "/img/marcas/003.png" },
    { id: "004", name: "Marca 004", image: "/img/marcas/004.png" },
    { id: "005", name: "Marca 005", image: "/img/marcas/005.png" },
    { id: "006", name: "Marca 006", image: "/img/marcas/006.png" },
    { id: "007", name: "Marca 007", image: "/img/marcas/007.png" },
    { id: "008", name: "Marca 008", image: "/img/marcas/008.png" },
    { id: "009", name: "Marca 009", image: "/img/marcas/009.png" },
    { id: "010", name: "Marca 010", image: "/img/marcas/010.png" },
    { id: "012", name: "Marca 012", image: "/img/marcas/012.png" },
    { id: "013", name: "Marca 013", image: "/img/marcas/013.png" },
    { id: "014", name: "Marca 014", image: "/img/marcas/014.png" },
    { id: "015", name: "Marca 015", image: "/img/marcas/015.png" },
    { id: "016", name: "Marca 016", image: "/img/marcas/016.png" },
    { id: "017", name: "Marca 017", image: "/img/marcas/017.png" },
    { id: "019", name: "Marca 019", image: "/img/marcas/019.png" },
    { id: "021", name: "Marca 021", image: "/img/marcas/021.png" },
    { id: "022", name: "Marca 022", image: "/img/marcas/022.png" },
    { id: "025", name: "Marca 025", image: "/img/marcas/025.png" },
    { id: "026", name: "Marca 026", image: "/img/marcas/026.png" },
    { id: "029", name: "Marca 029", image: "/img/marcas/029.png" },
    { id: "030", name: "Marca 030", image: "/img/marcas/030.png" },
    { id: "032", name: "Marca 032", image: "/img/marcas/032.png" },
    { id: "033", name: "Marca 033", image: "/img/marcas/033.png" },
    { id: "035", name: "Marca 035", image: "/img/marcas/035.png" },
    { id: "036", name: "Marca 036", image: "/img/marcas/036.png" },
    { id: "039", name: "Marca 039", image: "/img/marcas/039.png" },
    { id: "047", name: "Marca 047", image: "/img/marcas/047.png" },
    { id: "048", name: "Marca 048", image: "/img/marcas/048.png" },
    { id: "053", name: "Marca 053", image: "/img/marcas/053.png" },
    { id: "054", name: "Marca 054", image: "/img/marcas/054.png" },
    { id: "055", name: "Marca 055", image: "/img/marcas/055.png" },
    { id: "056", name: "Marca 056", image: "/img/marcas/056.png" },
    { id: "057", name: "Marca 057", image: "/img/marcas/057.png" },
    { id: "058", name: "Marca 058", image: "/img/marcas/058.png" },
    { id: "059", name: "Marca 059", image: "/img/marcas/059.png" },
    { id: "060", name: "Marca 060", image: "/img/marcas/060.png" },
    { id: "061", name: "Marca 061", image: "/img/marcas/061.png" },
    { id: "062", name: "Marca 062", image: "/img/marcas/062.png" },
    { id: "063", name: "Marca 063", image: "/img/marcas/063.png" },
    { id: "064", name: "Marca 064", image: "/img/marcas/064.png" },
    { id: "065", name: "Marca 065", image: "/img/marcas/065.png" },
    { id: "066", name: "Marca 066", image: "/img/marcas/066.png" },
    { id: "067", name: "Marca 067", image: "/img/marcas/067.png" },
    { id: "068", name: "Marca 068", image: "/img/marcas/068.png" },
    { id: "069", name: "Marca 069", image: "/img/marcas/069.png" },
    { id: "070", name: "Marca 070", image: "/img/marcas/070.png" },
    { id: "071", name: "Marca 071", image: "/img/marcas/071.png" },
    { id: "072", name: "Marca 072", image: "/img/marcas/072.png" },
    { id: "073", name: "Marca 073", image: "/img/marcas/073.png" },
    { id: "074", name: "Marca 074", image: "/img/marcas/074.png" },
    { id: "075", name: "Marca 075", image: "/img/marcas/075.png" },
    { id: "076", name: "Marca 076", image: "/img/marcas/076.png" },
    { id: "077", name: "Marca 077", image: "/img/marcas/077.png" },
    { id: "080", name: "Marca 080", image: "/img/marcas/080.png" },
    { id: "081", name: "Marca 081", image: "/img/marcas/081.png" },
    { id: "083", name: "Marca 083", image: "/img/marcas/083.png" },
    { id: "084", name: "Marca 084", image: "/img/marcas/084.png" },
    { id: "085", name: "Marca 085", image: "/img/marcas/085.png" },
    { id: "086", name: "Marca 086", image: "/img/marcas/086.png" },
    { id: "089", name: "Marca 089", image: "/img/marcas/089.png" },
    { id: "090", name: "Marca 090", image: "/img/marcas/090.png" },
    { id: "092", name: "Marca 092", image: "/img/marcas/092.png" },
    { id: "093", name: "Marca 093", image: "/img/marcas/093.png" },
    { id: "100", name: "Marca 100", image: "/img/marcas/100_400x400_white.png" },
    { id: "101", name: "Marca 101", image: "/img/marcas/101.PNG" },
    { id: "102", name: "Marca 102", image: "/img/marcas/102_400x400_white.png" },
    { id: "103", name: "Marca 103", image: "/img/marcas/103_400x400_white.png" },
    { id: "104", name: "Glace", image: "/img/marcas/Logo glace.png" },
  ],
};
