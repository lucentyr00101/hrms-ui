export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  teamId?: string;
}

export interface UserContext {
  user: User | null;
  isAuthenticated: boolean;
}