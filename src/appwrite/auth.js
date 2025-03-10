import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class Auth {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async getAccount() {
        return this.account.get();
    }

    async CreateAccount({email, password, name}) {
        try {
            const userAcc = await this.account.create(ID.unique(), email, password, name);

            if(userAcc) return this.loginAccount({email, password});
            return null;
        }
        catch(err) {
            console.log("error: occ");
        }
    }

    async loginAccount({email, password}) {
        try {
            const userAcc = this.account.createEmailPasswordSession(email, password);

            return userAcc;
        }
        catch(err) {
            // console.log("Error Occured: ", err);
        }
    }

    async logout() {
        try {
            const info = await this.account.deleteSessions();
        } 
        catch (err) {
            // console.log("Error Occured: ", err);
        }
    }
};

const authService = new Auth();

export default authService;