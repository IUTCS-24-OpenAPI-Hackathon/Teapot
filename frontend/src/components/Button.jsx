import clsx from "clsx";

function Button({ type, onClick, classes, children }) {
  classes = classes ? classes : "";
  return (
    <button
      type={type}
      className={clsx("bg-dark text-bright p-2 min-w-20", classes)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Button;
