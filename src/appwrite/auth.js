import { loadConfigFromFile } from "vite";
import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setProject(config.appwriteProjectId) // Your project ID
      .setEndpoint(config.appwriteURL); // Your API Endpoint
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique(), email, password);

      if (userAcc) {
        console.log("Acc created Sucess->", userAcc);
        return userAcc;
      }
    } catch (error) {
      console.log("erro in createAccount ->", error.message);
    }
    return null;
  }
  async login({ email, password }) {
    return await this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return null;
    }
    // }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;

// const client = new Client()
//   .setEndpoint("https://<REGION>.cloud.appwrite.io/v1") // Your API Endpoint
//   .setProject("<PROJECT_ID>"); // Your project ID

// const account = new Account(client);

// const user = await account.create({
//   userId: ID.unique(),
//   email: "email@example.com",
//   password: "password",
// });
