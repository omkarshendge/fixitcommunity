
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatisticCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatisticCard = ({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  className 
}: StatisticCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 overflow-hidden transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-3xl font-bold mt-1">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span 
                className={cn(
                  "text-xs font-medium flex items-center",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground ml-1.5">vs. last month</span>
            </div>
          )}
        </div>
        
        <div className="rounded-full p-2 bg-primary/10 text-primary">
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
      
      <div className="h-1 w-full bg-muted/50 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-1 bg-primary rounded-full animate-pulse-subtle" 
          style={{ width: `${Math.min(Math.max(trend?.value || 50, 5), 100)}%` }} 
        />
      </div>
    </div>
  );
};

export default StatisticCard;
