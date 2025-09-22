import TestimonialCard from "./TestimonialCard";
import { useTestimonials } from "@/hooks/useTestimonials";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";

const TestimonialsSection = () => {
  const { testimonials, isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Depoimentos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compartilhe sua experiência no Programa Evoluir e inspire outros colaboradores.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Depoimentos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compartilhe sua experiência no Programa Evoluir e inspire outros colaboradores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              position={testimonial.position}
              department={testimonial.department}
              unit={testimonial.unit}
              content={testimonial.content}
              imageUrl={testimonial.image_url || profilePlaceholder}
              date={testimonial.created_at}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;