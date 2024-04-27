import clsx from "clsx";

function Button({ type, onClick, classes, children, color }) {
  classes = classes ? classes : "";
  color = color ? color : "purple";
  return (
    <button
      type={type}
      className={clsx(
        `bg-${color} text-bright py-3 px-8 min-w-20 rounded-full`,
        classes
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Button;
