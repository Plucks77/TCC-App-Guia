import api from "../services/api";

interface ResponseSignIn {
  token: string;
  user_id: string;
}

export async function signIn(email: string, password: string) {
  try {
    const response = await api.post<ResponseSignIn>("/user/login", { email, password });
    return response.data;
  } catch (e) {
    if (e.response.data[0].field === "email") {
      return "email";
    } else {
      return "password";
    }
  }
}
