import { useState } from "react";
import { Button } from "@/components/ui/button";
import TestimonialForm from "./TestimonialForm";
import { useTestimonials } from "@/hooks/useTestimonials";
import { ChevronDown, ChevronUp } from "lucide-react";

const TestimonialFormSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { submitTestimonial, isSubmitting } = useTestimonials();

  const handleSubmit = async (formData: any) => {
    const success = await submitTestimonial(formData);
    if (success) {
      setIsFormOpen(false);
    }
  };

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Sua Vez!
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Você também participou do Programa Evoluir? Compartilhe sua experiência 
            e inspire outros colaboradores a embarcar nesta jornada de crescimento.
          </p>
          
          <Button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-gradient-primary hover:shadow-glow transition-smooth text-lg px-8 py-4"
          >
            {isFormOpen ? (
              <>
                <ChevronUp className="mr-2" size={20} />
                Fechar Formulário
              </>
            ) : (
              <>
                <ChevronDown className="mr-2" size={20} />
                Compartilhar Meu Depoimento
              </>
            )}
          </Button>
        </div>

        {isFormOpen && (
          <div className="animate-in slide-in-from-top-4 duration-500">
            <TestimonialForm 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialFormSection;