function Container({ classes, width, children }) {
  width = width || 1100;
  return (
    <div className={`max-w-[900px] mx-auto text-left w-full ${classes}`}>
      {children}
    </div>
  );
}
export default Container;
