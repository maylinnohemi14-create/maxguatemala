import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const TestimonialCard = ({ name, rating, comment, date }: TestimonialCardProps) => {
  return (
    <Card className="animate-fade-in hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-foreground">{name}</h4>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-accent text-accent" : "text-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{comment}</p>
      </CardContent>
    </Card>
  );
};
