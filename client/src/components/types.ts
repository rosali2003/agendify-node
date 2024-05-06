export interface TaskProps {
  id: number;
  message: String;
  completed: boolean;
}

export interface AuthContextType {
  loggedIn: boolean | null;
  checkLoginState: () => void;
  user: any | null;
}

export interface PostType {
  title: string;
  body: string;
}
