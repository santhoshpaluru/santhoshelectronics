// The site's signature device: printer/fabrication-drawing style corner
// crop-marks, standing in for the registration marks found on a real PCB
// fabrication panel. Wrap any relative-positioned box with this.
export default function CropMarks({ color = 'var(--color-ink)', size = 10, inset = -1 }) {
  const common = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
  };

  const corners = [
    { top: inset, left: inset, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    { top: inset, right: inset, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
    { bottom: inset, left: inset, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    { bottom: inset, right: inset, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
  ];

  return (
    <>
      {corners.map((style, i) => (
        <span key={i} aria-hidden="true" style={{ ...common, ...style }} />
      ))}
    </>
  );
}
