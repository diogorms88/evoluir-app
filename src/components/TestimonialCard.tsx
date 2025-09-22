import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  position: string;
  department: string;
  unit: string;
  content: string;
  imageUrl?: string;
  date: string;
}

const TestimonialCard = ({ 
  name, 
  position, 
  department, 
  unit, 
  content, 
  imageUrl, 
  date 
}: TestimonialCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-smooth border-0 relative overflow-hidden group">
      <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-smooth">
        <Quote size={48} />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16 shadow-md">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">{name}</h3>
            <p className="text-muted-foreground text-sm">{position}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {department}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {unit}
              </Badge>
            </div>
          </div>
        </div>
        
        <blockquote className="text-foreground/90 leading-relaxed mb-4 relative z-10">
          {content}
        </blockquote>
        
        <div className="text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;