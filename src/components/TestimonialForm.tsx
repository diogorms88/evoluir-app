import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestimonialFormData {
  name: string;
  position: string;
  department: string;
  unit: string;
  content: string;
  imageFile?: File;
}

interface TestimonialFormProps {
  onSubmit: (data: TestimonialFormData) => void;
  isSubmitting?: boolean;
}

const TestimonialForm = ({ onSubmit, isSubmitting = false }: TestimonialFormProps) => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    position: "",
    department: "",
    unit: "",
    content: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  const handleInputChange = (field: keyof TestimonialFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "Por favor, selecione uma imagem menor que 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Tipo de arquivo inválido",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
        return;
      }

      setFormData(prev => ({ ...prev, imageFile: file }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.position || !formData.department || !formData.unit || !formData.content) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="bg-gradient-card shadow-elegant border-0 max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Compartilhe Seu Depoimento
        </CardTitle>
        <p className="text-muted-foreground">
          Conte sua experiência no Programa Evoluir e inspire outros colaboradores
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24 shadow-lg">
              <AvatarImage src={previewUrl} alt="Preview" />
              <AvatarFallback className="bg-muted">
                <Camera size={24} className="text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                id="image-upload"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="cursor-pointer"
                asChild
              >
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload size={16} className="mr-2" />
                  Escolher Foto
                </label>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Cargo *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="Seu cargo na empresa"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Departamento *</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              placeholder="Seu departamento"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unidade *</Label>
            <select
              id="unit"
              value={formData.unit}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Selecione sua unidade</option>
              <option value="Betim">Betim</option>
              <option value="Caçapava">Caçapava</option>
              <option value="Curitiba">Curitiba</option>
              <option value="Jundiaí">Jundiaí</option>
              <option value="São Bernardo do Campo">São Bernardo do Campo</option>
              <option value="Varginha">Varginha</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Seu Depoimento *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Compartilhe sua experiência no Programa Evoluir... Como o programa impactou seu desenvolvimento profissional? Quais conhecimentos adquiriu? O que mais marcou?"
              rows={6}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:shadow-glow transition-smooth text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Compartilhar Depoimento"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestimonialForm;