import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL) // Your API Endpoint
      .setProject(config.appwriteProjectId); // Your project ID
       this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    const userAcc=await this.account.create(ID.unique(), email, password);
    return userAcc
  }
  async login({email,password}) {
    return await this.account.createEmailPasswordSession(email, password);
    
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
        console.log(error);
        throw error;
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
