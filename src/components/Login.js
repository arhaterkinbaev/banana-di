import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await loginUser(form);
      navigate("/");
    } catch (err) {
      alert("Неверный логин или пароль!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Вход</h2>

        <input
          className="auth-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
        />

        <button className="auth-button" onClick={handleSubmit}>
          Войти
        </button>

        <p className="auth-bottom-text">
          Нет аккаунта?{" "}
          <span className="auth-link" onClick={() => navigate("/register")}>
            Регистрация
          </span>
        </p>
      </div>
    </div>
  );
}
