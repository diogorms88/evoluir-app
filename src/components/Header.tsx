import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import TestimonialForm from "./TestimonialForm";
import { useTestimonials } from "@/hooks/useTestimonials";
import { X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { submitTestimonial, isSubmitting } = useTestimonials();

  const handleSubmit = async (formData: any) => {
    const success = await submitTestimonial(formData);
    if (success) {
      setIsFormOpen(false);
    }
  };
  
  return (
    <header className="w-full bg-gradient-hero shadow-elegant fixed top-0 z-50">
      <div className="w-full px-6 py-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-4">
              <img 
                src={`/responsive_logo_image.png?v=${Date.now()}`}
                alt="Plascar Logo" 
                className="h-8 w-auto"
                onError={(e) => {
                  console.log('Erro ao carregar imagem:', e);
                }}
              />
              <div className="hidden md:block text-primary-foreground/80 text-sm whitespace-nowrap">
                Programa Evoluir Turma de 2025
              </div>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4 flex-shrink-0 ml-auto">
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                location.pathname === '/about' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Sobre o Programa
            </Link>
            
            <Button 
              variant="secondary" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-smooth"
              onClick={() => setIsFormOpen(true)}
            >
              Compartilhar Depoimento
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Modal Overlay */}
       {isFormOpen && (
         <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
           <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
             <button
               onClick={() => setIsFormOpen(false)}
               className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/20 rounded-full p-2"
             >
               <X size={20} />
             </button>
             <TestimonialForm 
               onSubmit={handleSubmit}
               isSubmitting={isSubmitting}
             />
           </div>
         </div>
       )}
    </header>
  );
};

export default Header;