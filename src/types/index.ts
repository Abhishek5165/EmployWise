export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export interface ApiResponse<T> {
  data: T;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}