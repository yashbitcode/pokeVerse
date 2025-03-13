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

    async getIdSpecificDocument(quizId) {
        try {
            const result = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quizId
            );

            return result;
        }
        catch(err) {
            return null
        }
    }

    async createDocument({id, QuizName, PokemonName, TotalQuestions, QuestionCnt, AllQuizzes}) {
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {QuizName, PokemonName, TotalQuestions, QuestionCnt, AllQuizzes}
            );

            return result;
        }
        catch(err) {
            return null;
        }
    }

    async updateQuizEssentials({id, QuestionCnt, AllAnswers, Score}) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {QuestionCnt, Score, AllAnswers}
            );

            return result;
        }
        catch(err) {}
    }

    async flagQuizCompletion({id}) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {Completed: true}
            );

            return result;
        }
        catch(err) {}
    }
};

export const storage = new StorageService();