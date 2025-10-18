import { Card } from '@/components/ui/card';
import { Scale, Activity, Droplet, Zap, Heart, Calendar } from 'lucide-react';

interface WeighingData {
  date: string;
  weight: number;
  bmi?: number;
  bodyFat?: number;
  muscle?: number;
  visceralFat?: number;
  bodyAge?: number;
  isInitial?: boolean;
}

interface WeighingCardProps {
  data: WeighingData;
  index: number;
  isInitial?: boolean;
}

const WeighingCard = ({ data, index, isInitial }: WeighingCardProps) => {
  const months: { [key: number]: string } = {
    1: 'enero', 2: 'febrero', 3: 'marzo', 4: 'abril', 5: 'mayo', 6: 'junio',
    7: 'julio', 8: 'agosto', 9: 'septiembre', 10: 'octubre', 11: 'noviembre', 12: 'diciembre'
  };

  const [year, month, day] = data.date.split('-').map(Number);
  const monthWord = months[month] || month.toString();
  const formattedDate = `${day} de ${monthWord} de ${year}`;

  return (
    <Card 
      className={`relative overflow-hidden bg-card transition-all duration-300 hover:shadow-xl group ${
        isInitial 
          ? 'border-4 border-primary shadow-2xl' 
          : 'border-2 border-primary/30 hover:border-primary/60'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="p-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-black text-primary uppercase tracking-wider">
                {isInitial ? 'Pesaje Inicial' : `Pesaje #${index}`}
              </p>
              <p className="text-sm text-muted-foreground font-medium italic">{formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-baseline gap-2 bg-primary/10 px-6 py-3 rounded-2xl">
            <span className="text-5xl font-black text-primary">{data.weight}</span>
            <span className="text-2xl font-bold text-primary">kg</span>
          </div>
        </div>

        {isInitial ? (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground font-bold uppercase tracking-wider">
              🎯 Punto de partida del proyecto
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex flex-col items-center p-4 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-all">
              <Activity className="h-5 w-5 text-primary mb-2" />
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">BMI</span>
              <span className="text-2xl font-black text-foreground">{data.bmi}</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-all">
              <Droplet className="h-5 w-5 text-primary mb-2" />
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Grasa</span>
              <span className="text-2xl font-black text-foreground">{data.bodyFat}%</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-all">
              <Zap className="h-5 w-5 text-primary mb-2" />
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Músculo</span>
              <span className="text-2xl font-black text-foreground">{data.muscle}%</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-all">
              <Scale className="h-5 w-5 text-primary mb-2" />
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">G. Visc.</span>
              <span className="text-2xl font-black text-foreground">{data.visceralFat}</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-all">
              <Heart className="h-5 w-5 text-primary mb-2" />
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">E. Corp.</span>
              <span className="text-2xl font-black text-foreground">{data.bodyAge}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WeighingCard;
