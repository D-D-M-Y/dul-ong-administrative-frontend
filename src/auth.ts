import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { userService } from '@/app/lib/userService';
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers : [
    Credentials({
        async authorize(credentials){
            const {email, password} = credentials as {
                email: string;
                password: string;
            }

            return userService.authenticate(email, password)
        }
    })],
});