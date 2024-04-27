import { useState } from "react";
import Container from "./Container";
import useStore from "../store/store";
import { useNavigate, useLocation, Link } from "react-router-dom";
import authService from "../services/auth.service";
import ModalBg from "./ModalBg";

function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const setUser = useStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login({
        email: info.email,
        password: info.password,
      });
      setUser(user);
      setInfo({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <ModalBg>
      <Container classes="flex justify-center items-center my-16">
        <div className="bg-darkish-400 p-3 md:p-6 rounded-lg max-w-[400px] w-[95%] text-bright">
          <h2 className="text-3xl font-semibold text-center">Login</h2>
          <div className="mt-12">
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-6"
            >
              <div>
                <label
                  htmlFor=""
                  className="font-medium text-lg block"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={info.email}
                  onChange={handleChange}
                  className="w-full py-2 px-2 rounded-md mt-1 text-dark bg-gray-200 shadow-lg shadow-darkish-700"
                  placeholder="e.g. matty@1975.com"
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="font-medium text-lg block"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={info.password}
                  onChange={handleChange}
                  className="w-full py-2 px-2 rounded-md mt-1 text-dark bg-gray-200 shadow-lg shadow-darkish-700"
                  placeholder="e.g. chipichipichapachapa278"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-md bg-purple text-bright font-semibold mt-2 shadow-lg shadow-darkish-700 text-lg"
              >
                Login
              </button>
            </form>
            <p
              style={{ color: "#d0d0d0" }}
              className="mt-4"
            >
              Create an account{" "}
              <Link
                to="/signup"
                className="text-purple underline"
              >
                here
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </ModalBg>
  );
}
export default Login;
