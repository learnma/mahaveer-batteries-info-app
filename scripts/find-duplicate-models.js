const admin = require('firebase-admin');
var serviceAccount = require('./prod.key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var models = [];
db.collection('batterymodels').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            models.push(doc.data().model);
        });

        console.log(models.length);
        const sorted = models.sort();
        const duplicates = [];
        for (var i = 1; i < sorted.length; i++) {
            if (sorted[i - 1] === sorted[i]) {
                duplicates.push(sorted[i - 1]);
            }
        }

        const unique = [...new Set(duplicates)];
        console.log(unique);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });