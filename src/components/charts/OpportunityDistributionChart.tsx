import React, { useState } from 'react';
import { Opportunity } from '../../types';

interface Props {
  opportunities: Opportunity[];
}

export const OpportunityDistributionChart: React.FC<Props> = ({ opportunities }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories = [
    { name: 'Internship', color: '#27221f', bgClass: 'bg-slate-900' },
    { name: 'Hackathon', color: '#84294a', bgClass: 'bg-plum-700' },
    { name: 'Open Source', color: '#21845f', bgClass: 'bg-emerald-600' },
    { name: 'Research', color: '#a66d12', bgClass: 'bg-amber-600' },
    { name: 'Scholarship', color: '#7a7a2b', bgClass: 'bg-lime-700' },
    { name: 'Competition', color: '#bc4f38', bgClass: 'bg-rose-600' },
  ];

  const counts = categories.map(cat => {
    const count = opportunities.filter(o => o.type === cat.name && !o.isMissed).length;
    return { ...cat, count };
  });

  const total = counts.reduce((sum, item) => sum + item.count, 0) || 1;

  // SVG Pie chart calculation
  let cumulativeAngle = 0;
  const radius = 68;
  const cx = 90;
  const cy = 90;

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
      {/* Donut SVG */}
      <div className="relative flex-shrink-0">
        <svg
          viewBox="0 0 180 180"
          className="w-44 h-44 transform -rotate-90 filter drop-shadow-sm transition-transform duration-300"
        >
          {slices.map((slice) => {
            const isHovered = hoveredIdx === slice.idx;
            return (
              <path
                key={slice.name}
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
          {/* Donut center hole */}
          <circle cx={cx} cy={cy} r={42} className="fill-white transition-colors" />
        </svg>

        {/* Center statistic label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            {hoveredIdx !== null ? slices[hoveredIdx]?.count : total}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
            {hoveredIdx !== null ? slices[hoveredIdx]?.name : 'Opportunities'}
          </span>
        </div>
      </div>

      {/* Legend list with clean pill counts */}
      <div className="flex-1 w-full grid grid-cols-2 gap-2 text-xs">
        {slices.map((slice) => {
          const isHovered = hoveredIdx === slice.idx;
          return (
            <div
              key={slice.name}
              onMouseEnter={() => setHoveredIdx(slice.idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                isHovered
                  ? 'border-slate-900 bg-slate-100 text-slate-950 shadow-xs'
                  : 'border-slate-200/90 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="font-medium truncate">{slice.name}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 pl-1 font-semibold text-slate-900">
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
