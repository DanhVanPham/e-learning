import { Document } from "mongoose";

export const parseMongoDocToPlainObject = (document: Document | Document[] | undefined | null) => {
    if(!document) return null;
    
    return JSON.parse(JSON.stringify(document))
}

export const formatVndPrice = (price: Number, nullValue = 0) => {
    if(!price) return nullValue;

    return `${price.toLocaleString()}đ`
}

export const formatThousandSeperator = (number: Number, nullValue = 0) => {
    if(!number) return nullValue;

    return number.toLocaleString()
}

export const normalizeData = (arrData: any[] | undefined, key: string) => {
    if(!arrData || !arrData.length) return;

    return arrData.reduce((result, currItem) => {
        return {
            ...result,
            [currItem[key]]: currItem
        }
    }, {})
}