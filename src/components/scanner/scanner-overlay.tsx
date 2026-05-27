'use client';

export function CameraOverlay() {
  return (
    <>
      {/* Camera bg overlay */}
      <div className="absolute inset-0 z-0 bg-secondary" />
      
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-20 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </>
  );
}