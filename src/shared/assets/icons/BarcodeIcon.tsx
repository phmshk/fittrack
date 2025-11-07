export const RealisticBarcodeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 120 60" // Соотношение сторон 2:1
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges" // Для четких линий
  >
    {/* Имитация штрих-кода с полосами разной ширины */}
    <rect x="10" y="10" width="2" height="40" />
    <rect x="14" y="10" width="1" height="40" />
    <rect x="17" y="10" width="4" height="40" />
    <rect x="23" y="10" width="2" height="40" />
    <rect x="27" y="10" width="1" height="40" />
    <rect x="30" y="10" width="3" height="40" />
    <rect x="35" y="10" width="1" height="40" />
    <rect x="38" y="10" width="2" height="40" />
    <rect x="42" y="10" width="2" height="40" />
    <rect x="46" y="10" width="1" height="40" />
    {/* Центральные "защитные" полосы (чуть длиннее) */}
    <rect x="51" y="10" width="1" height="45" />
    <rect x="54" y="10" width="1" height="45" />
    <rect x="57" y="10" width="1" height="45" />
    {/* Правая часть */}
    <rect x="61" y="10" width="3" height="40" />
    <rect x="66" y="10" width="2" height="40" />
    <rect x="70" y="10" width="1" height="40" />
    <rect x="73" y="10" width="4" height="40" />
    <rect x="79" y="10" width="1" height="40" />
    <rect x="82" y="10" width="2" height="40" />
    <rect x="86" y="10" width="1" height="40" />
    <rect x="89" y="10" width="3" height="40" />
    <rect x="94" y="10" width="1" height="40" />
    <rect x="97" y="10" width="2" height="40" />
    <rect x="101" y="10" width="1" height="40" />
    <rect x="104" y="10" width="2" height="40" />
  </svg>
);
