import { useState } from "react";
import { useAdminTestimonials } from "@/hooks/useAdminTestimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Star, StarOff, RefreshCw, Eye, EyeOff } from "lucide-react";
import { Testimonial } from "@/lib/supabase";

const TestimonialCard = ({ 
  testimonial, 
  onApprove, 
  onReject, 
  onToggleFeatured, 
  isPending = false 
}: {
  testimonial: Testimonial;
  onApprove?: (id: string, featured: boolean) => void;
  onReject?: (id: string) => void;
  onToggleFeatured?: (id: string, currentFeatured: boolean) => void;
  isPending?: boolean;
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const contentPreview = testimonial.content.length > 150 
    ? testimonial.content.substring(0, 150) + "..." 
    : testimonial.content;

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {testimonial.position} - {testimonial.department}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.unit}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(testimonial.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex gap-2">
            {!isPending && (
              <Badge variant={testimonial.is_featured ? "default" : "secondary"}>
                {testimonial.is_featured ? "Destacado" : "Normal"}
              </Badge>
            )}
            <Badge variant={isPending ? "destructive" : "default"}>
              {isPending ? "Pendente" : "Aprovado"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm">
            {showFullContent ? testimonial.content : contentPreview}
          </p>
          {testimonial.content.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullContent(!showFullContent)}
              className="mt-2 p-0 h-auto"
            >
              {showFullContent ? (
                <><EyeOff className="w-4 h-4 mr-1" /> Mostrar menos</>
              ) : (
                <><Eye className="w-4 h-4 mr-1" /> Mostrar mais</>
              )}
            </Button>
          )}
        </div>
        
        {testimonial.image_url && (
          <div className="mb-4">
            <img 
              src={testimonial.image_url} 
              alt={`Foto de ${testimonial.name}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {isPending && onApprove && (
            <>
              <Button
                onClick={() => onApprove(testimonial.id, false)}
                size="sm"
                variant="default"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Aprovar
              </Button>
              <Button
                onClick={() => onApprove(testimonial.id, true)}
                size="sm"
                variant="secondary"
              >
                <Star className="w-4 h-4 mr-1" />
                Aprovar e Destacar
              </Button>
            </>
          )}
          
          {isPending && onReject && (
            <Button
              onClick={() => onReject(testimonial.id)}
              size="sm"
              variant="destructive"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Rejeitar
            </Button>
          )}

          {!isPending && onToggleFeatured && (
            <Button
              onClick={() => onToggleFeatured(testimonial.id, testimonial.is_featured)}
              size="sm"
              variant="outline"
            >
              {testimonial.is_featured ? (
                <><StarOff className="w-4 h-4 mr-1" /> Remover Destaque</>
              ) : (
                <><Star className="w-4 h-4 mr-1" /> Destacar</>
              )}
            </Button>
          )}

          {!isPending && onReject && (
            <Button
              onClick={() => onReject(testimonial.id)}
              size="sm"
              variant="destructive"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Remover
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const AdminTestimonials = () => {
  const {
    pendingTestimonials,
    approvedTestimonials,
    isLoading,
    approveTestimonial,
    rejectTestimonial,
    toggleFeatured,
    refreshData
  } = useAdminTestimonials();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Administração de Depoimentos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie os depoimentos enviados pelos colaboradores
          </p>
        </div>
        <Button onClick={refreshData} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">
            Pendentes ({pendingTestimonials.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Aprovados ({approvedTestimonials.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : pendingTestimonials.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">Nenhum depoimento pendente de aprovação.</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {pendingTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  onApprove={approveTestimonial}
                  onReject={rejectTestimonial}
                  isPending={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="mt-6">
          {approvedTestimonials.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">Nenhum depoimento aprovado ainda.</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {approvedTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  onToggleFeatured={toggleFeatured}
                  onReject={rejectTestimonial}
                  isPending={false}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTestimonials;