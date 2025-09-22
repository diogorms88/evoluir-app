const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="mb-6">
            <img 
              src="/responsive_logo_image.png" 
              alt="Plascar Logo" 
              className="h-12 w-auto mx-auto mb-2"
            />
            <p className="text-background/80">Programa Evoluir</p>
          </div>
          


          <div className="border-t border-background/20 pt-8">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Plascar. Programa Evoluir - Desenvolvendo o futuro através do conhecimento.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;