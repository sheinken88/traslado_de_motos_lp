export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-yellow-400"
      >
        {/* Motorcycle silhouette */}
        <path
          d="M8 28C10.2091 28 12 26.2091 12 24C12 21.7909 10.2091 20 8 20C5.79086 20 4 21.7909 4 24C4 26.2091 5.79086 28 8 28Z"
          fill="currentColor"
        />
        <path
          d="M32 28C34.2091 28 36 26.2091 36 24C36 21.7909 34.2091 20 32 20C29.7909 20 28 21.7909 28 24C28 26.2091 29.7909 28 32 28Z"
          fill="currentColor"
        />
        <path
          d="M12 24H16L18 20H22L24 16H28L30 12H34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 24H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Motion lines */}
        <path d="M2 14H6M2 18H8M2 22H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div>
        <h1 className="text-xl font-bold text-white">
          MOTO<span className="text-yellow-400">TRANSFER</span>
        </h1>
      </div>
    </div>
  )
}
