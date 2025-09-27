import type { User, UserRole } from '~/types/user';

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@hrms.com',
    name: 'John Admin',
    role: 'admin',
    department: 'IT'
  },
  {
    id: '2',
    email: 'hr@hrms.com',
    name: 'Sarah HR',
    role: 'hr',
    department: 'HR'
  },
  {
    id: '3',
    email: 'manager@hrms.com',
    name: 'Mike Manager',
    role: 'manager',
    department: 'Engineering',
    teamId: 'eng-team-1'
  },
  {
    id: '4',
    email: 'employee@hrms.com',
    name: 'Jane Employee',
    role: 'employee',
    department: 'Engineering',
    teamId: 'eng-team-1'
  }
];

export const useUser = () => {
  const user = useState<User | null>('user', () => null);
  
  const isAuthenticated = computed(() => !!user.value);
  
  const hasRole = (role: UserRole) => {
    return user.value?.role === role;
  };
  
  const hasAnyRole = (roles: UserRole[]) => {
    return roles.includes(user.value?.role as UserRole);
  };
  
  const isAdmin = computed(() => hasRole('admin'));
  const isHR = computed(() => hasRole('hr'));
  const isManager = computed(() => hasRole('manager'));
  const isEmployee = computed(() => hasRole('employee'));
  
  // Mock login with role selection
  const login = (email: string, password: string) => {
    // Find mock user by email
    const mockUser = MOCK_USERS.find(u => u.email === email);
    if (mockUser) {
      user.value = mockUser;
      const authToken = useCookie('auth_token', {
        default: () => '',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      authToken.value = `TOKEN_${mockUser.id}`;
      return { success: true, user: mockUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };
  
  const logout = () => {
    user.value = null;
    const authToken = useCookie('auth_token');
    authToken.value = null;
  };
  
  // Initialize user from token on app start
  const initializeUser = () => {
    const authToken = useCookie('auth_token');
    if (authToken.value && authToken.value.startsWith('TOKEN_')) {
      const userId = authToken.value.replace('TOKEN_', '');
      const mockUser = MOCK_USERS.find(u => u.id === userId);
      if (mockUser) {
        user.value = mockUser;
      }
    }
  };
  
  return {
    user: readonly(user),
    isAuthenticated,
    hasRole,
    hasAnyRole,
    isAdmin,
    isHR,
    isManager,
    isEmployee,
    login,
    logout,
    initializeUser
  };
};