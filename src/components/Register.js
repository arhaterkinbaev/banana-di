import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await registerUser(form);
      navigate("/");
    } catch (err) {
      alert("Ошибка регистрации!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Регистрация</h2>

        <input
          className="auth-input"
          name="name"
          placeholder="Имя"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
        />

        <button className="auth-button" onClick={handleSubmit}>
          Зарегистрироваться
        </button>

        <p className="auth-bottom-text">
          Уже есть аккаунт?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Войти
          </span>
        </p>
      </div>
    </div>
  );
}
