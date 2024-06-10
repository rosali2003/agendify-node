export interface TaskProps {
  task: any;
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

export interface AddToToCalendarProps { 
  
}
