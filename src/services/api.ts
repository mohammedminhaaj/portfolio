import { DATABASE_ID, databases } from './appwrite';
import { Query } from 'appwrite';

const SOCIAL_LINKS_COLLECTION_ID = '6834c85c00339a0b9c10';

export const getSocialLinks = async () => {
	return databases.listDocuments(DATABASE_ID, SOCIAL_LINKS_COLLECTION_ID, [
		Query.select(['name', 'url']),
	]);
};
