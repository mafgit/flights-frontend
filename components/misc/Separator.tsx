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
        `bg-${dark ? 'background' : 'light'}/30 rounded-full ` +
        (!horizontal ? "w-[1px] min-h-full" : "h-[1px] min-w-full")
      }
    ></div>
  );
};

export default Separator;
