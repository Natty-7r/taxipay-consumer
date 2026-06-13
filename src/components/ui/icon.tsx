'use client';


interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, className = '', style }: IconProps) {
  return (
    <svg className={className} style={style}>
      <use href={`/assets/svg/${name}.svg#icon`} />
    </svg>
  );
}