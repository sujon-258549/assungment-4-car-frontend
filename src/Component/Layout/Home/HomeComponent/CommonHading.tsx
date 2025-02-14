const CommonHading = ({ text, color }: { text: string; color: string }) => {
  return (
    <div>
      <h1
        className={`mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl ${color} dark:text-white`}
      >
        {text}
      </h1>
    </div>
  );
};

export default CommonHading;
