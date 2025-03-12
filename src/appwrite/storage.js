import { Client, Databases } from "appwrite";
import conf from "../conf/conf";

class StorageService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async getAllDocuments() {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            );

            return result;
        }
        catch(err) {
            return null;
        }
    }

    async createDocument({id, quizName, pokeName, totalQues, quesCnt}) {
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {QuizName: quizName, PokemonName: pokeName, TotalQuestions: totalQues, QuestionCnt: quesCnt}
            );

            return result;
        }
        catch(err) {
            return null;
        }
    }
};

export const storage = new StorageService();