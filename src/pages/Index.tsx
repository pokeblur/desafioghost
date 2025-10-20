import { Target, TrendingDown, TrendingUp, Calendar, Weight, Activity, Flame, Zap, Trophy, Sparkles, Star, Rocket, Award, Minus, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import WeightChart from '@/components/WeightChart';
import WeighingCard from '@/components/WeighingCard';
import logoImage from '@/assets/proyecto-ghost-logo.png';
import { differenceInDays, parseISO, addDays, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const Index = () => {
  const initialWeight = 103.2;
  const goalWeight = 85.0;
  const initialDate = '2025-09-25';
  
  const initialWeighing = {
    date: '2025-09-25',
    weight: 103.2,
    isInitial: true
  };

  const weighings = [
    {
      date: '2025-09-30',
      weight: 102.3,
      bmi: 33.8,
      bodyFat: 34.3,
      muscle: 31.9,
      visceralFat: 14,
      bodyAge: 64
    },
    {
      date: '2025-10-05',
      weight: 101.3,
      bmi: 33.5,
      bodyFat: 36.9,
      muscle: 30.3,
      visceralFat: 15,
      bodyAge: 64
    },
    {
      date: '2025-10-10',
      weight: 100.8,
      bmi: 33.3,
      bodyFat: 36.7,
      muscle: 30.4,
      visceralFat: 15.0,
      bodyAge: 64
    },
    {
      date: '2025-10-15',
      weight: 99.8,
      bmi: 33,
      bodyFat: 36.6,
      muscle: 30.5,
      visceralFat: 14,
      bodyAge: 63
    }
  ];

  // Calcular fecha actual en zona horaria de Chile
  const chileTimezone = 'America/Santiago';
  const nowInChile = toZonedTime(new Date(), chileTimezone);
  const startDate = parseISO(initialDate);
  // Agregar +1 para incluir el día de inicio en el conteo
  const daysInProject = differenceInDays(nowInChile, startDate) + 1;
  
  // Debug logs
  console.log('Fecha actual en Chile:', format(nowInChile, 'yyyy-MM-dd HH:mm:ss'));
  console.log('Fecha de inicio:', initialDate);
  console.log('Días transcurridos:', daysInProject);
  
  const currentWeight = weighings[weighings.length - 1].weight;
  const weightLost = initialWeight - currentWeight;
  const progressPercentage = ((initialWeight - currentWeight) / (initialWeight - goalWeight) * 100).toFixed(1);
  
  const chartData = [
    { date: initialWeighing.date, weight: initialWeighing.weight },
    ...weighings.map(w => ({ date: w.date, weight: w.weight }))
  ];

  const latestMetrics = weighings[weighings.length - 1];
  const previousMetrics = weighings.length > 1 ? weighings[weighings.length - 2] : null;

  // Calcular tendencias
  const getTrend = (current: number | undefined, previous: number | undefined) => {
    if (!current || !previous) return null;
    const diff = current - previous;
    if (Math.abs(diff) < 0.1) return { icon: Minus, color: 'text-muted-foreground', value: diff };
    return diff > 0 
      ? { icon: TrendingUp, color: 'text-red-500', value: diff }
      : { icon: TrendingDown, color: 'text-green-500', value: diff };
  };

  // Calcular promedios
  const calculateAverages = () => {
    if (weighings.length < 2) return null;
    
    const daysDiff = daysInProject;
    const weeksDiff = daysDiff / 7;
    
    const totalWeightLoss = initialWeight - weighings[weighings.length - 1].weight;
    const weeklyAverage = weeksDiff > 0 ? totalWeightLoss / weeksDiff : 0;
    
    return {
      weeklyAverage: weeklyAverage.toFixed(2),
      totalDays: daysDiff,
      totalWeightLoss: totalWeightLoss.toFixed(1)
    };
  };

  const averages = calculateAverages();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* Animated Love Badge */}
      <div className="fixed bottom-8 right-8 z-50 group">
        <div className="relative bg-card border-2 border-primary/40 rounded-3xl px-8 py-4 shadow-xl transform group-hover:scale-110 transition-all duration-300">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <p className="text-sm font-black text-primary uppercase tracking-wider">
              Hecho con amor por Shays
            </p>
            <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Epic Header */}
        <div className="mb-12 text-center relative">
          <div className="inline-flex flex-col items-center gap-6 mb-8">
            <div className="relative group">
              <img 
                src={logoImage} 
                alt="Proyecto Ghost" 
                className="h-32 w-32 relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
              />
              <div className="absolute -top-2 -right-2 z-20">
                <Star className="h-8 w-8 text-primary fill-primary animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2 z-20">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <div>
              <h1 className="text-7xl md:text-9xl font-black text-primary mb-3 animate-fade-in tracking-tighter">
                PROYECTO GHOST
              </h1>
              <p className="text-lg text-primary font-bold uppercase tracking-wider max-w-3xl mx-auto text-center">
                Documentando la transformación del Cristian a los 85 kg
              </p>
            </div>
          </div>

          {/* Mega Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="relative group">
              <div className="relative bg-primary border-4 border-primary/60 px-10 py-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
                <Trophy className="h-12 w-12 text-background mb-4 mx-auto" />
                <p className="text-xs text-background font-black uppercase tracking-[0.4em] mb-3">Meta Final</p>
                <p className="text-7xl font-black text-background mb-2">{goalWeight}</p>
                <p className="text-base text-background font-bold uppercase tracking-wider">kilogramos</p>
                <div className="absolute -top-3 -right-3">
                  <div className="bg-background text-primary rounded-full p-2">
                    <Target className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-card border-4 border-primary/70 px-10 py-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Flame className="h-12 w-12 text-primary mb-4 mx-auto animate-pulse" />
                <p className="text-xs text-primary font-black uppercase tracking-[0.4em] mb-3">Días Activos</p>
                <p className="text-7xl font-black text-primary mb-2">{daysInProject}</p>
                <p className="text-base text-muted-foreground font-bold uppercase tracking-wider">días de poder</p>
                <div className="absolute -top-3 -left-3">
                  <div className="bg-primary text-background rounded-full p-2 animate-bounce">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-card border-4 border-primary/70 px-10 py-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300">
                <Zap className="h-12 w-12 text-primary mb-4 mx-auto" />
                <p className="text-xs text-primary font-black uppercase tracking-[0.4em] mb-3">Por Conquistar</p>
                <p className="text-7xl font-black text-primary mb-2">{(currentWeight - goalWeight).toFixed(1)}</p>
                <p className="text-base text-muted-foreground font-bold uppercase tracking-wider">kg restantes</p>
                <div className="mt-4 pt-4 border-t-2 border-primary/30">
                  <p className="text-sm text-muted-foreground">Progreso épico: <span className="text-primary font-black text-2xl">{progressPercentage}%</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Weight Display - Mega Card */}
        <div className="mb-8">
          <Card className="relative overflow-hidden bg-card border-4 border-primary/50 shadow-2xl">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/3"></div>
            
            <div className="p-12 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <div className="h-5 w-5 bg-primary rounded-full animate-pulse"></div>
                    <p className="text-base font-black text-primary uppercase tracking-[0.5em]">Peso Actual</p>
                    <div className="h-5 w-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="inline-flex items-baseline gap-6 bg-primary/5 px-12 py-6 rounded-3xl">
                      <span className="text-[10rem] leading-none font-black text-primary">
                        {currentWeight}
                      </span>
                      <div className="flex flex-col justify-end pb-4">
                        <span className="text-6xl text-primary font-black">KG</span>
                        <span className="text-sm text-muted-foreground font-bold mt-2">
                          {(() => {
                            const months: { [key: number]: string } = {
                              1: 'enero', 2: 'febrero', 3: 'marzo', 4: 'abril', 5: 'mayo', 6: 'junio',
                              7: 'julio', 8: 'agosto', 9: 'septiembre', 10: 'octubre', 11: 'noviembre', 12: 'diciembre'
                            };
                            const [year, month, day] = weighings[weighings.length - 1].date.split('-').map(Number);
                            return `${day} de ${months[month]} de ${year}`;
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Epic Progress Bar */}
                  <div className="space-y-6">
                    <div className="relative h-12 bg-muted rounded-3xl overflow-hidden border-2 border-border/50">
                      <div 
                        className="absolute inset-y-0 left-0 bg-primary rounded-3xl transition-all duration-1000"
                        style={{ width: `${progressPercentage}%` }}
                      >
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] animate-[slide_2s_linear_infinite]"></div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <Star className="h-5 w-5 text-background fill-background animate-pulse" />
                          <span className="text-lg font-black text-background">{progressPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        Inicio: {initialWeight} kg
                      </span>
                      <span className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-primary" />
                        Meta: {goalWeight} kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Icon */}
                <div className="relative">
                  <Weight className="h-48 w-48 text-primary/20 animate-pulse" />
                  <Award className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 text-primary" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t-4 border-primary/20">
                <div className="relative group">
                  <div className="relative text-center p-6 bg-background rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all">
                    <Flame className="h-10 w-10 text-primary mx-auto mb-4" />
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-2 font-black">Perdido Total</p>
                    <p className="text-5xl font-black text-primary">-{weightLost.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground font-bold mt-2 uppercase tracking-wider">kilogramos</p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="relative text-center p-6 bg-background rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all">
                    <Target className="h-10 w-10 text-foreground mx-auto mb-4" />
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-2 font-black">Por Perder</p>
                    <p className="text-5xl font-black text-foreground">{(currentWeight - goalWeight).toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground font-bold mt-2 uppercase tracking-wider">kilogramos</p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="relative text-center p-6 bg-background rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all">
                    <Trophy className="h-10 w-10 text-primary mx-auto mb-4 animate-pulse" />
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-2 font-black">Objetivo Final</p>
                    <p className="text-5xl font-black text-primary">{goalWeight}</p>
                    <p className="text-sm text-muted-foreground font-bold mt-2 uppercase tracking-wider">kilogramos</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Body Metrics Panel */}
        <Card className="p-8 bg-card border-3 border-primary/40 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/20 rounded-2xl">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Métricas Corporales</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { 
                label: 'BMI', 
                value: latestMetrics.bmi, 
                icon: Activity,
                prevValue: previousMetrics?.bmi 
              },
              { 
                label: 'Grasa', 
                value: latestMetrics.bodyFat, 
                suffix: '%',
                icon: TrendingDown,
                prevValue: previousMetrics?.bodyFat 
              },
              { 
                label: 'Músculo', 
                value: latestMetrics.muscle, 
                suffix: '%',
                icon: Zap,
                prevValue: previousMetrics?.muscle 
              },
              { 
                label: 'G. Visceral', 
                value: latestMetrics.visceralFat, 
                icon: Target,
                prevValue: previousMetrics?.visceralFat 
              },
              { 
                label: 'Edad Corp.', 
                value: latestMetrics.bodyAge, 
                icon: Calendar,
                prevValue: previousMetrics?.bodyAge 
              }
            ].map((metric, idx) => {
              const trend = getTrend(metric.value, metric.prevValue);
              return (
                <div 
                  key={idx}
                  className="relative group"
                >
                  <div className="relative p-5 bg-background rounded-xl border-2 border-border/60 hover:border-primary/60 transition-all">
                    <metric.icon className="h-6 w-6 text-primary mb-3" />
                    <span className="text-xs font-black text-muted-foreground uppercase tracking-wider block mb-2">{metric.label}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-primary">{metric.value}{metric.suffix || ''}</span>
                      {trend && (
                        <div className={`flex items-center gap-1 ${trend.color}`}>
                          <trend.icon className="h-4 w-4" />
                          <span className="text-xs font-bold">{Math.abs(trend.value).toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Promedios Section */}
        {averages && (
          <Card className="p-8 bg-card border-3 border-primary/40 shadow-xl mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/20 rounded-2xl">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Estadísticas del Proyecto</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="relative text-center p-6 bg-background rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all">
                  <Flame className="h-10 w-10 text-primary mx-auto mb-4 animate-pulse" />
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-2 font-black">Promedio Semanal</p>
                  <p className="text-5xl font-black text-primary">-{averages.weeklyAverage}</p>
                  <p className="text-sm text-muted-foreground font-bold mt-2 uppercase tracking-wider">kg por semana</p>
                </div>
              </div>

              <div className="relative group">
                <div className="relative text-center p-6 bg-background rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all">
                  <Calendar className="h-10 w-10 text-foreground mx-auto mb-4" />
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-2 font-black">Días Totales</p>
                  <p className="text-5xl font-black text-foreground">{averages.totalDays}</p>
                  <p className="text-sm text-muted-foreground font-bold mt-2 uppercase tracking-wider">días de progreso</p>
                </div>
              </div>

              <div className="relative group">
                <div className="relative text-center p-6 bg-background rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all">
                  <Trophy className="h-10 w-10 text-primary mx-auto mb-4 animate-pulse" />
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-2 font-black">Total Perdido</p>
                  <p className="text-5xl font-black text-primary">-{averages.totalWeightLoss}</p>
                  <p className="text-sm text-muted-foreground font-bold mt-2 uppercase tracking-wider">kilogramos</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Weekly Weight Loss Rate Chart */}
        <Card className="p-8 bg-card border-3 border-primary/40 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/20 rounded-2xl">
              <TrendingDown className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Tasa de Pérdida Semanal</h3>
          </div>
          
          <div className="relative group">
            <div className="relative p-8 bg-background rounded-2xl border-2 border-primary/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-2 font-black">Promedio Actual</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-black text-primary">-{averages?.weeklyAverage}</span>
                    <span className="text-2xl text-primary font-black">kg/semana</span>
                  </div>
                </div>
                <Flame className="h-20 w-20 text-primary/30" />
              </div>
              
              {/* Visual bar representation - Dynamic weeks */}
              <div className="space-y-3">
                {(() => {
                  const weeklyData = [];
                  let prevWeight = initialWeight;
                  
                  for (let i = 0; i < weighings.length; i++) {
                    const weighing = weighings[i];
                    const loss = prevWeight - weighing.weight;
                    weeklyData.push({
                      week: `Semana ${i + 1}`,
                      loss: loss
                    });
                    prevWeight = weighing.weight;
                  }
                  
                  const maxLoss = Math.max(...weeklyData.map(w => w.loss), 1.5);
                  
                  return weeklyData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-wider w-24">{item.week}</span>
                      <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${(item.loss / maxLoss) * 100}%` }}
                        >
                          <span className="text-xs font-black text-background">-{item.loss.toFixed(1)} kg</span>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </Card>

        {/* Goal Projection Section */}
        {averages && (
          <Card className="p-8 bg-card border-3 border-primary/40 shadow-xl mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/20 rounded-2xl">
                <Calendar className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Proyección de Meta</h3>
            </div>
            
            <div className="relative group">
              <div className="relative text-center p-10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border-2 border-primary/40">
                <Trophy className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
                <p className="text-sm text-muted-foreground uppercase tracking-[0.3em] mb-4 font-black">Al ritmo actual alcanzará</p>
                <div className="inline-block px-8 py-4 bg-primary/10 rounded-2xl border-2 border-primary/30 mb-6">
                  <p className="text-5xl font-black text-primary mb-2">{goalWeight} kg</p>
                  <div className="flex items-center justify-center gap-3">
                    <Star className="h-5 w-5 text-primary fill-primary" />
                  <p className="text-2xl font-black text-primary">
                      {(() => {
                        const currentWeightValue = weighings[weighings.length - 1].weight;
                        const weightToLose = currentWeightValue - goalWeight;
                        const weeklyRate = parseFloat(averages.weeklyAverage);
                        const weeksNeeded = weightToLose / weeklyRate;
                        const daysNeeded = Math.round(weeksNeeded * 7);
                        
                        const projectedDate = addDays(nowInChile, daysNeeded);
                        
                        const months: { [key: number]: string } = {
                          0: 'enero', 1: 'febrero', 2: 'marzo', 3: 'abril', 4: 'mayo', 5: 'junio',
                          6: 'julio', 7: 'agosto', 8: 'septiembre', 9: 'octubre', 10: 'noviembre', 11: 'diciembre'
                        };
                        
                        return `${projectedDate.getDate()} de ${months[projectedDate.getMonth()]} de ${projectedDate.getFullYear()}`;
                      })()}
                    </p>
                    <Star className="h-5 w-5 text-primary fill-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-background rounded-xl border border-primary/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-black">Días estimados</p>
                    <p className="text-3xl font-black text-foreground">
                      {(() => {
                        const currentWeightValue = weighings[weighings.length - 1].weight;
                        const weightToLose = currentWeightValue - goalWeight;
                        const weeklyRate = parseFloat(averages.weeklyAverage);
                        const weeksNeeded = weightToLose / weeklyRate;
                        return Math.round(weeksNeeded * 7);
                      })()}
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-xl border border-primary/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-black">Semanas restantes</p>
                    <p className="text-3xl font-black text-foreground">
                      {(() => {
                        const currentWeightValue = weighings[weighings.length - 1].weight;
                        const weightToLose = currentWeightValue - goalWeight;
                        const weeklyRate = parseFloat(averages.weeklyAverage);
                        return Math.round(weightToLose / weeklyRate);
                      })()}
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-xl border border-primary/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-black">Kg por perder</p>
                    <p className="text-3xl font-black text-primary">
                      {(weighings[weighings.length - 1].weight - goalWeight).toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Ruleta de Retos Section */}
        <Card className="p-8 bg-card border-3 border-primary/40 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-destructive/20 rounded-2xl">
              <Target className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Ruleta de Retos</h3>
              <p className="text-sm text-muted-foreground font-bold mt-1 uppercase tracking-wide">Solo si Cristian no cumple</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="relative text-center p-12 bg-background rounded-2xl border-2 border-destructive/30 hover:border-destructive/60 transition-all">
              <div className="mb-6">
                <Rocket className="h-24 w-24 text-destructive/40 mx-auto animate-pulse" />
              </div>
              <div className="inline-block px-8 py-3 bg-destructive/10 rounded-full border-2 border-destructive/30 mb-4">
                <p className="text-2xl font-black text-destructive uppercase tracking-[0.3em]">COMING SOON</p>
              </div>
              <p className="text-base text-muted-foreground font-bold max-w-2xl mx-auto">
                Aquí aparecerá el reto que le tocó al Cristian cada vez que no cumpla con su objetivo o si engorda más
              </p>
            </div>
          </div>
        </Card>

        {/* Chart Section */}
        <Card className="p-8 bg-card border-3 border-primary/40 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-2 bg-primary rounded-full"></div>
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">Evolución del Peso</h2>
          </div>
          <WeightChart data={chartData} goal={goalWeight} />
        </Card>

        {/* History Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-2 bg-primary rounded-full"></div>
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">Historial de Pesajes</h2>
          </div>
          <div className="space-y-6">
            <WeighingCard 
              key={initialWeighing.date} 
              data={initialWeighing} 
              index={0} 
              isInitial={true} 
            />
            {weighings.map((weighing, index) => (
              <WeighingCard key={weighing.date} data={weighing} index={index + 1} isInitial={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
