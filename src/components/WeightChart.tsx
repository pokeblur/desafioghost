import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/card';

interface WeightChartProps {
  data: { date: string; weight: number }[];
  goal: number;
}

const WeightChart = ({ data, goal }: WeightChartProps) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            domain={[goal - 5, 'dataMax + 2']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '2px solid hsl(var(--primary))',
              borderRadius: '12px',
              padding: '12px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
            itemStyle={{ color: 'hsl(var(--primary))' }}
            formatter={(value: number) => [`${value} kg`, 'Peso']}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              });
            }}
          />
          <ReferenceLine 
            y={goal} 
            stroke="hsl(var(--primary))" 
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{ 
              value: 'Meta', 
              position: 'right',
              fill: 'hsl(var(--primary))',
              fontWeight: 'bold'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="hsl(var(--primary))" 
            strokeWidth={4}
            dot={{ 
              fill: 'hsl(var(--primary))', 
              strokeWidth: 2, 
              r: 6,
              stroke: 'hsl(var(--background))'
            }}
            activeDot={{ 
              r: 8,
              stroke: 'hsl(var(--primary))',
              strokeWidth: 3,
              fill: 'hsl(var(--background))'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;
