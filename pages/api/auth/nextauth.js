import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import MicrosoftProvider from 'next-auth/providers/azure-ad'
import { adapter } from "next/dist/server/web/adapter";


const authOptions = NextAuth({
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      authorization:{
        params:{
          scope:'open id email profile https://www.googleapis.com/auth/gmail.readonly',
          access_type:"offline",
          prompt:"consent",
        }
      }
    })
  ],
  secret:process.env.NEXTAUTH_SECRET,
  session:{
    strategy:"jwt"
  },
  callbacks:{
    async jwt({token, account}){
      if(account){
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({session, token}){
      if(account){
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.provider = token.provider;
      }
      return session;
    }
  }
})

export {authOptions as GET, authOptions as POST}
