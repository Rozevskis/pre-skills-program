import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    // console.log(formData);
    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    }
  }
  return (
    <>
      <div className="p-4 flex flex-col items-center gap-3">
        <h2 className="text-4xl">Register</h2>
        <div className="bg-slate-500 w-2/3 rounded-xl p-4 flex flex-col items-center">
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex flex-col items-center ">
              <label>Username</label>
              <input
                className=" bg-slate-200 text-black px-2 py-1 rounded-sm"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="flex flex-col items-center">
              <label>E-mail</label>
              <input
                className=" bg-slate-200 text-black px-2 py-1 rounded-sm"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="flex flex-col items-center">
              <label>Password</label>
              <input
                className=" bg-slate-200 text-black px-2 py-1 rounded-sm"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="flex flex-col items-center">
              <label>Confirm Password</label>
              <input
                className=" bg-slate-200 text-black px-2 py-1 rounded-sm"
                type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button
              className=" bg-slate-200 text-black px-3 py-1 rounded-sm"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
