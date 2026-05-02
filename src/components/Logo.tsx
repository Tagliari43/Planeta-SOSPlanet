import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-md',
    md: 'w-12 h-12 rounded-lg',
    lg: 'w-24 h-24 rounded-2xl', // increased lg from 20 to 24 to match previous design token area better
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-2xl',
  };

  const globeClasses = {
    sm: 'w-3 h-3',
    md: 'w-[14px] h-[14px]',
    lg: 'w-6 h-6',
  };

  const subClasses = {
    sm: 'text-[0.35rem]',
    md: 'text-[0.4rem]',
    lg: 'text-[0.6rem]',
  };

  if (!imageError) {
    return (
      <img 
        src="/logo.png" 
        alt="SOSPlanet Logo" 
        className={cn("object-cover shadow-sm", sizeClasses[size], className)}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center bg-gradient-to-b from-[#2A7543] to-[#1b4332] shadow-inner border border-green-500/30 overflow-hidden relative shrink-0",
      sizeClasses[size],
      className
    )}>
      {/* Background flair */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400/20 via-transparent to-transparent"></div>
      
      <div className={cn("flex items-center text-[#9ed841] font-black tracking-tighter drop-shadow-md relative z-10", textClasses[size])}>
        <span style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>S</span>
        <Globe className={cn("mx-[1px] text-[#4fcae8] drop-shadow", globeClasses[size])} strokeWidth={2.5} />
        <span style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>S</span>
      </div>
      <span 
        className={cn("font-bold text-[#e1db32] tracking-[0.15em] drop-shadow-md leading-none mt-0.5 relative z-10", subClasses[size])}
        style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
      >
        PLANET
      </span>
    </div>
  );
}
