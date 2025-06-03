import { Client, Storage, Databases } from 'appwrite';

export const PUBLIC_BUCKET_ID = '6831492d00156bbc6069';
export const DATABASE_ID = '683492360036bd7a5816';

const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const client = new Client()
	.setEndpoint(APPWRITE_ENDPOINT)
	.setProject(APPWRITE_PROJECT_ID);

export const storage = new Storage(client);
export const databases = new Databases(client);
