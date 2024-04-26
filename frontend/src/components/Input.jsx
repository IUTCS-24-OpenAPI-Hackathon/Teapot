import clsx from "clsx";

function Input({ type, children, onChange, value, classes, name }) {
  classes = classes ? classes : "";
  return (
    <>
      <label className="text-l block">{children}</label>
      <input
        type={type}
        className={clsx("bg-slate-200 p-2 rounded-xl", classes)}
        name={name}
        value={value ? value : ""}
        onChange={onChange}
      />
    </>
  );
}
export default Input;
