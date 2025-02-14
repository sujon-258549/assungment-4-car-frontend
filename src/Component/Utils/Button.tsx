const Button = ({ name }: { name: string }) => {
  return (
    <div className="group relative px-3 py-2 md:px-5 md:py-3 rounded-xl bg-zinc-900 text-amber-300 font-bold tracking-widest uppercase text-sm border-b-4 border-amber-400/50 hover:border-amber-400 transition-all duration-300 ease-in-out hover:text-amber-200 shadow-[0_10px_20px_rgba(251,191,36,0.15)] hover:shadow-[0_15px_30px_rgba(251,191,36,0.25)] active:border-b-0 active:translate-y-1">
      <span className="flex items-center gap-3 relative z-10">
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className=" w-4 h-4 md:w-5 md:h-5"
        >
          <path d="M12 2L9.1 9.1H2L7.5 13.8L5.7 21L12 17.3L18.3 21L16.5 13.8L22 9.1H14.9L12 2Z"></path>
        </svg>
        <span className="text-sm"> {name}</span>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1"
        >
          <path d="M12 4L10.6 5.4L16.2 11H4V13H16.2L10.6 18.6L12 20L20 12L12 4Z"></path>
        </svg>
      </span>
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 blur-2xl group-hover:blur-xl transition-all duration-300 -z-10 opacity-0 group-hover:opacity-100"></div>
    </div>
  );
};

export default Button;
