import React, { useState } from 'react';

interface GrowthDataPoint {
  month: string;
  count: number;
  skillAdded: string;
}

interface Props {
  data?: GrowthDataPoint[];
}

export const OpportunityGrowthChart: React.FC<Props> = ({ data: propData }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const defaultData: GrowthDataPoint[] = [
    { month: 'Sep', count: 14, skillAdded: 'Python Basics' },
    { month: 'Oct', count: 19, skillAdded: 'Git & GitHub' },
    { month: 'Nov', count: 28, skillAdded: 'React & Tailwind' },
    { month: 'Dec', count: 35, skillAdded: 'SQL & Database Design' },
    { month: 'Jan', count: 46, skillAdded: 'FastAPI / Node Backend' },
    { month: 'Feb', count: 64, skillAdded: 'System Design Basics' },
  ];

  const data = propData || defaultData;

  const width = 500;
  const height = 180;
  const paddingX = 36;
  const paddingTop = 20;
  const paddingBottom = 30;

  const maxVal = Math.max(...data.map((d) => d.count), 70);
  const minVal = 0;

  const getX = (index: number) =>
    paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
  const getY = (val: number) =>
    height - paddingBottom - ((val - minVal) / (maxVal - minVal)) * (height - paddingTop - paddingBottom);

  const points = data.map((d, i) => ({
    x: getX(i),
    y: getY(d.count),
  }));

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    pathD += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#27221f" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#27221f" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 20, 40, 60].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  className="stroke-slate-200"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] font-medium fill-slate-400 font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill="url(#growthGradient)" />

          {/* Line stroke */}
          <path
            d={pathD}
            fill="none"
            className="stroke-slate-900"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((p, i) => {
            const isHovered = hoveredPoint === i;
            return (
              <g key={i} className="cursor-pointer">
                {isHovered && (
                  <line
                    x1={p.x}
                    y1={paddingTop}
                    x2={p.x}
                    y2={height - paddingBottom}
                    className="stroke-slate-400/50"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 4}
                  className="fill-slate-900 stroke-white transition-all duration-200"
                  strokeWidth="2.5"
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Month labels */}
                <text
                  x={p.x}
                  y={height - paddingBottom + 18}
                  textAnchor="middle"
                  className={`text-[11px] font-medium transition-colors font-['Outfit',sans-serif] ${
                    isHovered
                      ? 'fill-slate-900 font-bold'
                      : 'fill-slate-500'
                  }`}
                >
                  {data[i].month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredPoint !== null && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-lg border border-slate-700 text-xs flex items-center gap-3 pointer-events-none transition-all"
          >
            <div>
              <span className="font-semibold text-slate-300 font-mono">{data[hoveredPoint].month}:</span>{' '}
              <span className="font-bold text-white">{data[hoveredPoint].count} Matched Opportunities</span>
            </div>
            <div className="text-[11px] text-slate-300 border-l border-slate-700 pl-3">
              Unlocked via <span className="text-amber-300 font-medium">{data[hoveredPoint].skillAdded}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Upward Trajectory: +357% Eligible Positions
        </span>
        <span className="font-semibold text-slate-700 font-mono">Total pool: 64 matches</span>
      </div>
    </div>
  );
};
