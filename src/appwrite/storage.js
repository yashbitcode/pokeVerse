import { Client, Databases, Query, Storage } from "appwrite";
import conf from "../conf/conf";

class StorageService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client.setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async getAllDocuments(userId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteQuizCollectionId,
                [
                    Query.equal("UserId", [userId])
                ]
            );

            return result;
        }
        catch(err) {
            return null;
        }
    }

    async getAllRecognizeDocuments(userId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteRecognizeCollectionId,
                [
                    Query.equal("UserId", [userId])
                ]
            );

            return result;
        }
        catch(err) {
            return null;
        }
    }

    async getIdSpecificRecogDocument(recogId) {
        try {
            const result = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRecognizeCollectionId,
                recogId
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
                conf.appwriteQuizCollectionId,
                quizId
            );

            return result;
        }
        catch(err) {
            return null;
        }
    }

    async createDocument({id, UserId, QuizName, PokemonName, TotalQuestions, QuestionCnt, AllQuizzes}) {
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteQuizCollectionId,
                id,
                {QuizName, UserId, PokemonName, TotalQuestions, QuestionCnt, AllQuizzes}
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
                conf.appwriteQuizCollectionId,
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
                conf.appwriteQuizCollectionId,
                id,
                {Completed: true}
            );

            return result;
        }
        catch(err) {}
    }

    async createFile({id, ImageData}) {
        try {
            const result = await this.storage.createFile(
                conf.appwriteBucketId,
                id,
                ImageData
            );

            return result;
        }
        catch(err) {
            return null;
        }
    }

    async addRecognizationDetails({id, UserId, Name, ImageSummary, RecognizedPokemons, ImageId}) {
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRecognizeCollectionId,
                id,
                {Name, UserId, ImageSummary, RecognizedPokemons, ImageId}
            );

            return result;
        }
        catch(err) {
            return null;
        }
    }
};

export const storage = new StorageService();