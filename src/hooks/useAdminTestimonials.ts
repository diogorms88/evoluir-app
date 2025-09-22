import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase, Testimonial } from "@/lib/supabase";

export const useAdminTestimonials = () => {
  const [pendingTestimonials, setPendingTestimonials] = useState<Testimonial[]>([]);
  const [approvedTestimonials, setApprovedTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Buscar depoimentos pendentes
  const fetchPendingTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPendingTestimonials(data || []);
    } catch (error) {
      console.error('Erro ao carregar depoimentos pendentes:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar os depoimentos pendentes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar depoimentos aprovados
  const fetchApprovedTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setApprovedTestimonials(data || []);
    } catch (error) {
      console.error('Erro ao carregar depoimentos aprovados:', error);
    }
  };

  // Aprovar depoimento
  const approveTestimonial = async (id: string, featured: boolean = false) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ 
          is_approved: true,
          is_featured: featured 
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Depoimento aprovado!",
        description: featured ? "Depoimento aprovado e destacado." : "Depoimento aprovado com sucesso.",
      });

      // Recarregar listas
      await fetchPendingTestimonials();
      await fetchApprovedTestimonials();
    } catch (error) {
      console.error('Erro ao aprovar depoimento:', error);
      toast({
        title: "Erro ao aprovar",
        description: "Não foi possível aprovar o depoimento.",
        variant: "destructive",
      });
    }
  };

  // Rejeitar/remover depoimento
  const rejectTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Depoimento removido",
        description: "Depoimento foi removido com sucesso.",
      });

      // Recarregar listas
      await fetchPendingTestimonials();
      await fetchApprovedTestimonials();
    } catch (error) {
      console.error('Erro ao remover depoimento:', error);
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover o depoimento.",
        variant: "destructive",
      });
    }
  };

  // Alterar status de destaque
  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_featured: !currentFeatured })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Status atualizado",
        description: !currentFeatured ? "Depoimento destacado." : "Destaque removido.",
      });

      await fetchApprovedTestimonials();
    } catch (error) {
      console.error('Erro ao alterar destaque:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível alterar o status de destaque.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPendingTestimonials();
    fetchApprovedTestimonials();
  }, []);

  return {
    pendingTestimonials,
    approvedTestimonials,
    isLoading,
    approveTestimonial,
    rejectTestimonial,
    toggleFeatured,
    refreshData: () => {
      fetchPendingTestimonials();
      fetchApprovedTestimonials();
    }
  };
};