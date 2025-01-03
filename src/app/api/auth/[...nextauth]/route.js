import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) throw new Error('No user found');
        
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error('Invalid password');
        
        return user;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image
            });
          }
        } catch (error) {
          console.error('Error saving Google user:', error);
          return false;
        }
      }
      return true;
    }
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };
