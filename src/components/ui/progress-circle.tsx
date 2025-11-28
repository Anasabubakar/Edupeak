import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressCircleProps extends React.SVGProps<SVGSVGElement> {
  value?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export const ProgressCircle = React.forwardRef<
  SVGSVGElement,
  ProgressCircleProps
>(
  (
    {
      value = 0,
      size = 80,
      strokeWidth = 8,
      color = 'hsl(var(--primary))',
      className,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={cn('-rotate-90', className)}
          {...props}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold" style={{ color }}>
            {Math.round(value)}%
          </span>
        </div>
      </div>
    );
  }
);
ProgressCircle.displayName = 'ProgressCircle';
