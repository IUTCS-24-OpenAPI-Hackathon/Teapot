import { Link } from "react-router-dom";
import useStore from "../store/store";
import Button from "./Button";

function Header() {
  const toggleInput = useStore((state) => state.toggleInput);
  return (
    <header className="h-[90px] bg-dark flex justify-center items-center">
      <div className="w-[90%] max-w-[900px] mx-auto flex justify-end items-center">
        <Button
          type="button"
          color="bright"
          classes="text-dark rounded-sm px-3 py-4 h-[50px] mr-4 flex justify-center items-center"
          onClick={toggleInput}
        >
          Toggle Input
        </Button>
        <div className="flex gap-4 mr-4 text-bright font-semibold text-lg">
          <Link
            className="text-bright hover:text-purple ease-linear transition-all duration-150"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="text-bright hover:text-purple ease-linear transition-all duration-150"
            to="/signup"
          >
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
