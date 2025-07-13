import { 
  Car, 
  Shield, 
  // Option 1: More automotive-specific icons
  Circle, 
  Gauge,
  // Option 2: Brake and traction focused
  HandPalm,
  // Option 3: Technical/electronic focused
  Cpu,
  Lightning,
  // Option 4: Safety focused
  Warning,
  CheckCircle,
  // Option 5: Modern automotive
  CarProfile
} from '@phosphor-icons/react';

// Custom ABS icon component
const CustomAbsIcon = ({ size = 32, weight = 'regular', className = '' }: { 
  size?: number; 
  weight?: 'regular' | 'fill'; 
  className?: string;
}) => {
  const isActive = weight === 'fill';
  const strokeWidth = isActive ? 2 : 1.5;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      {/* Circle background */}
      <circle 
        cx="16" 
        cy="16" 
        r="14" 
        stroke="currentColor" 
        strokeWidth={strokeWidth}
        fill={isActive ? "currentColor" : "none"}
        opacity={isActive ? 0.2 : 1}
      />
      {/* ABS text */}
      <text 
        x="16" 
        y="20" 
        textAnchor="middle" 
        fontSize="8" 
        fontWeight="bold"
        fill="currentColor"
        className="select-none"
      >
        ABS
      </text>
    </svg>
  );
};

export interface InputTCABSProps {
  absActive?: boolean;
  settings?: {
    enabled: boolean;
  };
  iconStyle?: 'default' | 'automotive' | 'technical' | 'safety' | 'modern' | 'custom';
}

export const InputTCABS = ({ 
  absActive = false, 
  settings = { enabled: true },
  iconStyle = 'default'
}: InputTCABSProps) => {
  if (!settings.enabled) return null;

  // Icon selection based on style
  const getAbsIcon = () => {
    switch (iconStyle) {
      case 'automotive':
        return Circle;
      case 'technical':
        return Cpu;
      case 'safety':
        return Warning;
      case 'modern':
        return Circle;
      case 'custom':
        return CustomAbsIcon;
      default:
        return Shield;
    }
  };

  const AbsIcon = getAbsIcon();

  return (
    <div className="flex flex-row justify-center h-full items-center py-2 gap-2 w-full">
      {/* ABS Indicator */}
      <div className="flex flex-col items-center justify-center flex-1 h-full">
        <div className={`flex flex-col items-center gap-2 ${absActive ? 'text-red-400' : 'text-gray-500'}`}>
          <AbsIcon 
            size={48} 
            weight={absActive ? 'fill' : 'regular'}
            className={`transition-all duration-200 ${absActive ? 'text-red-400 drop-shadow-lg' : 'text-gray-500'}`}
          />
        </div>
      </div>
    </div>
  );
}; 