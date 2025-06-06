const CommonHading = ({ text, color }: { text: string; color: string }) => {
  return (
    <div>
      <h1
        className={`mb-4 text-3xl font-bold tracking-tight leading-none md:text-4xl xl:text-5xl ${color} dark:text-white`}
      >
        {text}
      </h1>
    </div>
  );
};

export default CommonHading;
