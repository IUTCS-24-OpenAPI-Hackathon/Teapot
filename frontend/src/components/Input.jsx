import clsx from "clsx";

function Input({ type, children, onChange, value, classes, name }) {
  classes = classes ? classes : "";
  return (
    <>
      <label className="text-l block">{children}</label>
      <input
        type={type}
        className={clsx("bg-slate-200 py-2 px-4 rounded-xl", classes)}
        name={name}
        value={value ? value : ""}
        onChange={onChange}
      />
    </>
  );
}
export default Input;
