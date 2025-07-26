const Separator = ({
  horizontal = false,
  dark = false,
}: {
  horizontal?: boolean;
  dark?: boolean;
}) => {
  return (
    <div
      className={
        `${dark ? 'bg-background/20' : 'bg-foreground/30'} rounded-full ` +
        (!horizontal ? "w-[1px] min-h-full mx-2" : "h-[1px] my-2 min-w-full")
      }
    ></div>
  );
};

export default Separator;
