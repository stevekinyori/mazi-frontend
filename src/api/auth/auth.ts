
import { UserState } from '../../interfaces';

export function loginUser({ email, password }: { email: string; password: string }): Promise<UserState> {
  return new Promise<UserState>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user_id: "abc123",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        email: "johndoe@example.com",
        first_name: "John",
        last_name: "Doe",
        initialized: true,
        authenticated: true,
        
      });
    }, 1000);
  });
}
