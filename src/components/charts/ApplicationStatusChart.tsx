import React, { useState } from 'react';
import { Opportunity, ApplicationStatus } from '../../types';

interface Props {
  opportunities: Opportunity[];
}

export const ApplicationStatusChart: React.FC<Props> = ({ opportunities }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const statusConfigs: { status: ApplicationStatus; color: string; label: string }[] = [
    { status: 'Applied', color: '#27221f', label: 'Applied' },
    { status: 'Shortlisted', color: '#21845f', label: 'Shortlisted' },
    { status: 'Preparing', color: '#a66d12', label: 'Preparing' },
    { status: 'Saved', color: '#84294a', label: 'Saved' },
    { status: 'Rejected', color: '#a99c91', label: 'Rejected' },
  ];

  const counts = statusConfigs.map(item => {
    const count = opportunities.filter(o => o.status === item.status).length;
    return { ...item, count };
  });

  const total = counts.reduce((sum, item) => sum + item.count, 0) || 1;

  let cumulativeAngle = 0;
  const radius = 64;
  const cx = 85;
  const cy = 85;

  const slices = counts.map((item, idx) => {
    const angle = (item.count / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = angle >= 359.9
      ? `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius} Z`
      : `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const percentage = Math.round((item.count / total) * 100);

    return {
      ...item,
      pathData,
      percentage,
      idx
    };
  });

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="relative flex-shrink-0">
        <svg
          viewBox="0 0 170 170"
          className="w-40 h-40 transform -rotate-90 filter drop-shadow-sm transition-transform duration-300"
        >
          {slices.map((slice) => {
            const isHovered = hoveredIdx === slice.idx;
            return (
              <path
                key={slice.status}
                d={slice.pathData}
                fill={slice.color}
                className="transition-all duration-300 cursor-pointer"
                opacity={hoveredIdx === null || isHovered ? 1 : 0.55}
                transform={isHovered ? 'scale(1.04) translate(-3, -3)' : 'scale(1)'}
                onMouseEnter={() => setHoveredIdx(slice.idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
          <circle cx={cx} cy={cy} r={40} className="fill-white transition-colors" />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
            {hoveredIdx !== null ? slices[hoveredIdx]?.count : total}
          </span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
            {hoveredIdx !== null ? slices[hoveredIdx]?.label : 'Applications'}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-1.5">
        {slices.map((slice) => {
          const isHovered = hoveredIdx === slice.idx;
          return (
            <div
              key={slice.status}
              onMouseEnter={() => setHoveredIdx(slice.idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-xs ${
                isHovered
                  ? 'border-slate-900 bg-slate-100 text-slate-950 shadow-xs'
                  : 'border-slate-200/90 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: slice.color }} />
                <span className="font-medium">{slice.label}</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-slate-900">
                <span>{slice.count}</span>
                <span className="text-[10px] text-slate-400 font-mono">({slice.percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
