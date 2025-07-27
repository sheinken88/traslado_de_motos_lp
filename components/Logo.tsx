export default function Logo() {
  return (
    <div className="flex items-center space-x-3 group">
      <div className="relative">
        {/* Logo background glow */}
        <div className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Background circle */}
          <circle cx="24" cy="24" r="23" fill="#FFD100" fillOpacity="0.1" />
          
          {/* Motorcycle icon - more detailed and modern */}
          <g transform="translate(6, 8)">
            {/* Rear wheel */}
            <circle cx="8" cy="20" r="5" fill="none" stroke="#FFD100" strokeWidth="2" />
            <circle cx="8" cy="20" r="2" fill="#FFD100" />
            
            {/* Front wheel */}
            <circle cx="28" cy="20" r="5" fill="none" stroke="#FFD100" strokeWidth="2" />
            <circle cx="28" cy="20" r="2" fill="#FFD100" />
            
            {/* Motorcycle body */}
            <path
              d="M8 20L12 16L16 12H20L24 12L28 16L28 20"
              stroke="#FFD100"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            
            {/* Engine detail */}
            <rect x="14" y="14" width="8" height="6" rx="1" fill="#FFD100" opacity="0.8" />
            
            {/* Seat */}
            <path
              d="M16 12L20 8L24 8L26 12"
              stroke="#FFD100"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            
            {/* Handlebars */}
            <path
              d="M24 8L26 6M24 8L26 10"
              stroke="#FFD100"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          
          {/* Speed lines */}
          <path
            d="M3 20L8 20M3 24L10 24M3 28L8 28"
            stroke="#FFD100"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-2xl font-oswald font-bold leading-none tracking-tight">
          <span className="text-white">MOTO</span>
          <span className="text-yellow-400">TRANSFER</span>
        </h1>
        <p className="text-[10px] text-sand-300 tracking-widest uppercase mt-0.5 font-light">
          Transporte Profesional
        </p>
      </div>
    </div>
  )
}
