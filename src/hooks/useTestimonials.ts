import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase, Testimonial, TestimonialInsert } from "@/lib/supabase";

interface TestimonialFormData {
  name: string;
  position: string;
  department: string;
  unit: string;
  content: string;
  imageFile?: File;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Carregar depoimentos do Supabase
  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTestimonials(data || []);
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar os depoimentos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar depoimentos ao montar o componente
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload usando Supabase Storage
      const { data, error } = await supabase.storage
        .from('evoluir')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('evoluir')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar a imagem. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }
  };

  const submitTestimonial = async (formData: TestimonialFormData) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = "";
      
      // Upload image if provided
      if (formData.imageFile) {
        const uploadedUrl = await uploadImage(formData.imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      // Preparar dados para inserção
      const testimonialData: TestimonialInsert = {
        name: formData.name,
        position: formData.position,
        department: formData.department,
        unit: formData.unit,
        content: formData.content,
        image_url: imageUrl || undefined,
      };

      // Inserir no Supabase
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonialData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Depoimento enviado!",
        description: "Obrigado por compartilhar sua experiência no Programa Evoluir. Seu depoimento será analisado e publicado em breve.",
      });

      // Recarregar depoimentos para incluir o novo (se aprovado)
      await fetchTestimonials();

      return true;
    } catch (error) {
      console.error('Erro ao enviar depoimento:', error);
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar seu depoimento. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    testimonials,
    isSubmitting,
    isLoading,
    submitTestimonial,
    fetchTestimonials,
  };
};