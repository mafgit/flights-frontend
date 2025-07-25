const Separator = ({ horizontal = false }: { horizontal?: boolean }) => {
  return (
    <div
      className={
        "bg-foreground/30 rounded-full " +
        (!horizontal ? "w-[1px] min-h-full" : "h-[1px] min-w-full")
      }
    ></div>
  );
};

export default Separator;
