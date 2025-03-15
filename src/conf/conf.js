const conf = {
    appwriteURL: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteQuizCollectionId: import.meta.env.VITE_APPWRITE_QUIZ_COLLECTION_ID,
    appwriteRecognizeCollectionId: import.meta.env.VITE_APPWRITE_RECOGNIZE_COLLECTION_ID,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID
};

export default conf;