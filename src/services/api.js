import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// ====================== РЕГИСТРАЦИЯ ======================
export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    const { user, token } = response.data;

    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Ошибка регистрации:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Ошибка регистрации. Попробуйте снова."
    );
  }
};

// ====================== ЛОГИН ======================
export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { user, token } = response.data;

    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error("Ошибка входа:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message ||
        "Неверный логин или пароль. Попробуйте снова."
    );
  }
};

// ====================== GET /auth/me ======================
export const getMe = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const me = response.data;

    localStorage.setItem("user", JSON.stringify(me));

    return me;
  } catch (error) {
    console.error("Ошибка получения профиля:", error.response?.data || error);
    return null;
  }
};

// ====================== ПОЛУЧЕНИЕ ТОВАРОВ ======================
export const getProducts = async (category, query = "") => {
  try {
    const response = await api.get(`/products?category=${category}${query}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка получения продуктов:", error);
    return [];
  }
};

// ====================== ОДИН ТОВАР (ИСПРАВЛЕНО) ======================
export const getProductById = async (category, id) => {
  try {
    const response = await api.get(`/products/${category}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка получения продукта:", error);
    return null;
  }
};

// ====================== КОМБО ======================
export const getCombos = async (query = "") => {
  try {
    const response = await api.get(`/combos${query}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки комбо:", error);
    return [];
  }
};

// ====================== КОММЕНТАРИИ ======================
export const getComments = async (productId) => {
  try {
    const response = await api.get(`/comments/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки комментариев:", error);
    return [];
  }
};

// ====================== ДОБАВИТЬ КОММЕНТ ======================
export const addComment = async (comment) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/comments", comment, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка добавления комментария:", error);
    throw error;
  }
};
