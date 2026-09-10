import React, { useState } from 'react';

interface RadarDimension {
  name: string;
  score: number; // 0-100
  target: number; // 0-100
}

interface Props {
  data?: RadarDimension[];
}

export const SkillsRadarChart: React.FC<Props> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultDimensions: RadarDimension[] = [
    { name: 'Programming', score: 88, target: 95 },
    { name: 'Web Dev', score: 82, target: 90 },
    { name: 'AI / ML', score: 72, target: 85 },
    { name: 'Communication', score: 78, target: 88 },
    { name: 'Problem Solving', score: 65, target: 85 },
    { name: 'Projects', score: 85, target: 92 },
  ];

  const dimensions = data || defaultDimensions;
  const numSides = dimensions.length;
  const size = 260;
  const center = size / 2;
  const maxRadius = 88;

  // Grid levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / numSides) * index - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Polygon points for student current score
  const studentPoints = dimensions
    .map((d, i) => {
      const { x, y } = getCoordinates(i, d.score);
      return `${x},${y}`;
    })
    .join(' ');

  // Polygon points for target score
  const targetPoints = dimensions
    .map((d, i) => {
      const { x, y } = getCoordinates(i, d.target);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Concentric webs */}
          {levels.map((level, lvlIdx) => {
            const levelPoints = Array.from({ length: numSides })
              .map((_, i) => {
                const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
                const r = level * maxRadius;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(' ');

            return (
              <polygon
                key={lvlIdx}
                points={levelPoints}
                className="fill-none stroke-slate-200"
                strokeWidth="1"
                strokeDasharray={lvlIdx === levels.length - 1 ? 'none' : '3,3'}
              />
            );
          })}

          {/* Axes from center */}
          {dimensions.map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                className="stroke-slate-200"
                strokeWidth="1"
              />
            );
          })}

          {/* Target benchmark area */}
          <polygon
            points={targetPoints}
            className="fill-slate-300/20 stroke-slate-400"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Current student score area */}
          <polygon
            points={studentPoints}
            className="fill-slate-900/15 stroke-slate-900"
            strokeWidth="2.5"
          />

          {/* Data Points */}
          {dimensions.map((d, i) => {
            const { x, y } = getCoordinates(i, d.score);
            const isHovered = hoveredIndex === i;
            return (
              <g key={i} className="cursor-pointer">
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  className="fill-slate-900 stroke-white transition-all duration-200"
                  strokeWidth="2"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}

          {/* Dimension Labels */}
          {dimensions.map((d, i) => {
            const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
            const r = maxRadius + 22;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);

            // Alignment adjustment
            let textAnchor = 'middle';
            if (Math.cos(angle) > 0.3) textAnchor = 'start';
            else if (Math.cos(angle) < -0.3) textAnchor = 'end';

            const isHovered = hoveredIndex === i;

            return (
              <text
                key={i}
                x={x}
                y={y + 4}
                textAnchor={textAnchor}
                className={`text-[10px] font-semibold transition-colors cursor-pointer select-none font-['Outfit',sans-serif] ${
                  isHovered
                    ? 'fill-slate-900 font-bold'
                    : 'fill-slate-600'
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {d.name} ({d.score}%)
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend & Tooltip note */}
      <div className="flex items-center justify-center gap-6 mt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1.5 rounded-full bg-slate-900" />
          <span className="text-slate-700 font-medium">Your Current Score</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 border-b-2 border-dashed border-slate-400" />
          <span className="text-slate-500">Target Benchmark</span>
        </div>
      </div>
    </div>
  );
};
