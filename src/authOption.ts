import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialProvider from "next-auth/providers/credentials";
import { BASE_MAIN } from "@/app/config/Constant";
import axios from "axios";

import https from "https";
const agent = new https.Agent({
  rejectUnauthorized: false,
});
const axiosInstance = axios.create({
    httpsAgent: agent,
  });
  
export const authOptions: NextAuthOptions = {
    secret: process.env.JWT_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    session: {
      strategy: "jwt",
      updateAge: 24 * 60 * 60,
      maxAge: 60 * 60 * 24,
    },
    providers: [
      DiscordProvider({
        id: "google-user-login",
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        profile: async (profile) => {
          try {
            const { data } = await axiosInstance.post("BASE_URL", {
              email: profile.email.toString(),
            });
            if (!data.exists) {
              const savedUser = await axiosInstance.post("BASE_URL", {
                first_name: profile.given_name,
                last_name: profile.family_name,
                email: profile.email,
                password: profile.sub,
                source: "web",
              });
              const accessData = await axiosInstance.post("BASE_URL", {
                email: savedUser.data.email,
                password: profile.sub,
              });
              return {
                id: savedUser.data.id,
                email: savedUser.data.email,
                type: "user",
                token: accessData.data.token,
              };
            } else {
              return {
                id: data.user.id.toString(),
                email: data.user.email.toString(),
                type: "user",
                token: data.access.toString(), 
              };
            }
          } catch (err) {
            console.log(err);
            throw err;
          }
        },
      }),
      CredentialProvider({
        name: "credentials",
        id: "login",
        credentials: {
          username: {
            label: "Email",
            type: "email",
            placeholder: "johndoe@test.com",
          },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials: any) => {
          console.log(credentials, "credentials");
  
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }
  
          try {
            const { data } = await axiosInstance.post(
              `${BASE_MAIN}loginAPI/login`,
              {
                email: credentials.email,
                password: credentials.password,
              }
            );
  
            if (!data) {
              throw new Error("Invalid login response");
            }
            const userData = data;
            return {
              id: userData?.data?.message.toString(),
              firstName: userData?.data?.firstName,
              lastName: userData?.data?.lastName,
              contact: userData?.data?.contact,
              email: userData?.data?.email,
              token: userData?.data?.token,
              type: userData?.data?.userId,
              message: userData?.data?.message,
            };
          } catch (error: any) {
  
            throw new Error(
              error.response && error.response.data.message
                ? error.response.data.message
                : "An unexpected error occurred: " + error.message
            );
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        return true;
      },
      async jwt({ token, user }: any) {
        if (user) {
          token.id = user.userId;
          token.email = user.email;
          token.uToken = user.token;
          token.type = user.type;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
        }
        return token;
      },
      async session({ session, token }: any) {
        session.id = token.id;
        session.email = token.email;
        session.uToken = token.uToken;
        session.type = token.type;
        session.message = token.message;
        session.user.id = token.userId;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.type = token.type;
        return session;
      },
    },
    debug: false,
  };