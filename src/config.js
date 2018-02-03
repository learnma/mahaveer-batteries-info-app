const configDev = {
    FIREBASE_KEY: 'AIzaSyBo6ScCquacmQnrvQda4dJHFymr_XwBr8k',
    FIRBASE_PROJECT: 'mahaveerbattries-dev'
}

const configProd = {
    FIREBASE_KEY: 'AIzaSyAigos2RNJYNgDmHoaXkIjLz6w_hzffNZE',
    FIRBASE_PROJECT: 'mahaveerbattries'
}

const config = process.env.NODE_ENV === 'production' ? configProd : configDev;
const firestoreBaseUrl = 'https://firestore.googleapis.com/v1beta1';
const firestoreDocumentsBaseUrl = `${firestoreBaseUrl}/projects/${config.FIRBASE_PROJECT}/databases/(default)/documents`;
const firestoreDoumentsQueryUrl = `${firestoreDocumentsBaseUrl}:runQuery`;

export { config, firestoreBaseUrl, firestoreDocumentsBaseUrl, firestoreDoumentsQueryUrl };

