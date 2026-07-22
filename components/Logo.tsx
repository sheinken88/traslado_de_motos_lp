interface LogoProps {
  inverse?: boolean;
}

export default function Logo({ inverse = false }: LogoProps) {
  return (
    <div
      className={`flex items-center gap-3 ${inverse ? "text-white" : "text-ink-950"}`}
      aria-label="MotoTransfer"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border ${
          inverse
            ? "border-white/20 bg-white/5 text-copper-400"
            : "border-steel-300 bg-white text-copper-500"
        }`}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 36 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="7" cy="20" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="29" cy="20" r="5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M7 20l6-8h8l4 8M13 12l-3-4m11 4 4-6h4M12 20h13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-[17px] font-semibold leading-none tracking-[-0.035em]">
          MotoTransfer
        </span>
        <span
          className={`mt-1 font-mono text-[9px] uppercase tracking-[0.16em] ${
            inverse ? "text-steel-300" : "text-steel-600"
          }`}
        >
          Transporte profesional
        </span>
      </div>
    </div>
  );
}
