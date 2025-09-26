const Footer = () => {
  return (
    <footer className="bg-dark text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">Pedidos Express</h3>
          <p className="text-sm text-slate-200">Delivery moderno para tu ciudad.</p>
        </div>
        <div className="text-sm text-slate-300 space-y-1">
          <p>Contacto: hola@pedidosexpress.com</p>
          <p>Teléfono: +54 11 5555-0000</p>
        </div>
        <div className="text-sm text-slate-400">© {new Date().getFullYear()} Pedidos Express</div>
      </div>
    </footer>
  );
};

export default Footer;
