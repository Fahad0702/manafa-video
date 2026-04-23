import React from 'react';

const BASE = import.meta.env.BASE_URL;

interface RiyalSymbolProps {
  height?: number | string;
  color?: 'white' | 'blue' | 'current';
  style?: React.CSSProperties;
  className?: string;
}

const COLOR_FILTER: Record<string, string> = {
  white: 'brightness(0) invert(1)',
  blue: 'brightness(0) saturate(100%) invert(21%) sepia(99%) saturate(2862%) hue-rotate(221deg) brightness(96%) contrast(96%)',
  current: 'brightness(0) invert(1)',
};

export default function RiyalSymbol({ height = '0.85em', color = 'white', style, className }: RiyalSymbolProps) {
  return (
    <img
      src={`${BASE}riyal-symbol.png`}
      alt="﷼"
      className={className}
      style={{
        height,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
        position: 'relative',
        top: '-0.05em',
        filter: COLOR_FILTER[color] ?? COLOR_FILTER.white,
        marginRight: '0.1em',
        ...style,
      }}
    />
  );
}
