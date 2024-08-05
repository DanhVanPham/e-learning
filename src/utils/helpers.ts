import { Document } from "mongoose";

export const parseMongoDocToPlainObject = (document: Document | undefined | null) => {
    if(!document) return null;
    
    return JSON.parse(JSON.stringify(document))
}