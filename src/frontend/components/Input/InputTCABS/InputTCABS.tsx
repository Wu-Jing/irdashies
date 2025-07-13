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
  tcActive?: boolean;
  absSetting?: number;
  tcSetting?: number;
  settings?: {
    enabled: boolean;
    showSettings: boolean;
  };
  // New prop to choose icon style
  iconStyle?: 'default' | 'automotive' | 'technical' | 'safety' | 'modern' | 'custom';
}

export const InputTCABS = ({ 
  absActive = false, 
  tcActive = false, 
  absSetting = 0, 
  tcSetting = 0,
  settings = { enabled: true, showSettings: true },
  iconStyle = 'default'
}: InputTCABSProps) => {
  if (!settings.enabled) return null;

  // Icon selection based on style
  const getIcons = () => {
    switch (iconStyle) {
      case 'automotive':
        return {
          abs: Circle,
          tc: Gauge
        };
      case 'technical':
        return {
          abs: Cpu,
          tc: Lightning
        };
      case 'safety':
        return {
          abs: Warning,
          tc: CheckCircle
        };
      case 'modern':
        return {
          abs: Circle,
          tc: CarProfile
        };
      case 'custom':
        return {
          abs: CustomAbsIcon,
          tc: Gauge
        };
      default:
        return {
          abs: Shield,
          tc: Car
        };
    }
  };

  const { abs: AbsIcon, tc: TcIcon } = getIcons();

  return (
    <div className="flex flex-row justify-between h-full items-center py-2 gap-2">
      {/* ABS Indicator */}
      <div className="flex flex-col items-center justify-center flex-1 h-full">
        <div className={`flex flex-col items-center gap-2 ${absActive ? 'text-red-400' : 'text-gray-500'}`}>
          <AbsIcon 
            size={48} 
            weight={absActive ? 'fill' : 'regular'}
            className={`transition-all duration-200 ${absActive ? 'text-red-400 drop-shadow-lg' : 'text-gray-500'}`}
          />
          <span className="text-sm font-bold">ABS</span>
        </div>
        {settings.showSettings && absSetting > 0 && (
          <div className="flex gap-1 mt-2">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  level <= absSetting ? 'bg-red-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* TC Indicator */}
      <div className="flex flex-col items-center justify-center flex-1 h-full">
        <div className={`flex flex-col items-center gap-2 ${tcActive ? 'text-yellow-400' : 'text-gray-500'}`}>
          <TcIcon 
            size={48} 
            weight={tcActive ? 'fill' : 'regular'}
            className={`transition-all duration-200 ${tcActive ? 'text-yellow-400 drop-shadow-lg' : 'text-gray-500'}`}
          />
          <span className="text-sm font-bold">TC</span>
        </div>
        {settings.showSettings && tcSetting > 0 && (
          <div className="flex gap-1 mt-2">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  level <= tcSetting ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 