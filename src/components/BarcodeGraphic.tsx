import React from 'react';

interface BarcodeGraphicProps {
  serial: string;
  className?: string;
}

export const BarcodeGraphic: React.FC<BarcodeGraphicProps> = ({ serial, className = "" }) => {
  const barPattern = [
    3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 4, 2, 1, 3, 1, 2, 1, 4, 2, 1, 3
  ];

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Vector Barcode Lines */}
      <div className="flex items-end justify-between h-7 w-full overflow-hidden opacity-80 px-1">
        {barPattern.map((width, idx) => (
          <div
            key={idx}
            className={`h-full ${idx % 2 === 0 ? 'bg-slate-300' : 'bg-transparent'}`}
            style={{ width: `${width * 1.5}px` }}
          />
        ))}
      </div>

      {/* Monospace Serial & Security Hash Telemetry */}
      <div className="flex items-center justify-between font-mono text-[9px] tracking-widest text-slate-400 border-t border-white/10 pt-1">
        <span className="text-slate-300 font-semibold">{serial}</span>
        <span className="text-slate-500 uppercase">[ AUTH: VERIFIED ]</span>
      </div>
    </div>
  );
};
