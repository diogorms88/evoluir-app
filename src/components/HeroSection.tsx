import heroImage from "@/assets/hero-evoluir.jpg";
import TestimonialCard from "./TestimonialCard";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useEffect } from "react";

const HeroSection = () => {
  const { testimonials, isLoading, fetchTestimonials } = useTestimonials();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Pegar apenas os depoimentos destacados para o hero
  const featuredTestimonials = testimonials.filter(testimonial => testimonial.is_featured);

  // Se não houver depoimentos destacados, usar todos os aprovados
  const displayTestimonials = featuredTestimonials.length > 0 
    ? featuredTestimonials 
    : testimonials;

  // Duplicar os depoimentos para criar o efeito de loop infinito
  const duplicatedTestimonials = [...displayTestimonials, ...displayTestimonials];

  return (
    <section className="relative h-[110vh] flex items-center justify-center overflow-hidden -mt-16">
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center 25%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero/80"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center h-full flex items-end">
        <div className="mb-12 w-full overflow-hidden">
          {isLoading ? (
            <div className="flex gap-6 animate-slide-right" style={{width: 'calc(200% + 1.5rem)'}}>
              {/* Skeleton loading */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white flex-shrink-0 animate-pulse" style={{width: 'calc(33.333% - 1rem)'}}>
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 mr-4"></div>
                    <div className="text-left flex-1">
                      <div className="h-4 bg-white/20 rounded mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/20 rounded"></div>
                    <div className="h-3 bg-white/20 rounded w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-6" style={{width: `calc(${duplicatedTestimonials.length * 350}px + ${(duplicatedTestimonials.length - 1) * 24}px)`, animation: `slide-testimonials ${duplicatedTestimonials.length * 3}s linear infinite`}}>
              {duplicatedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white flex-shrink-0" style={{width: '350px'}}>
                  <div className="flex items-center mb-3">
                    <img 
                      src={testimonial.image_url || profilePlaceholder} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover" 
                    />
                    <div className="text-left">
                      <h4 className="font-semibold text-base">{testimonial.name}</h4>
                      <p className="text-sm text-white/80">{testimonial.position} - {testimonial.department}</p>
                      <p className="text-xs text-white/70">{testimonial.unit}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90 text-left">
                    "{testimonial.content.length > 150 ? testimonial.content.substring(0, 150) + '...' : testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;