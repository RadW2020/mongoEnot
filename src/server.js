const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
var url = 'mongodb://mongo1,mongo2,mongo3/lora?replicaSet=rs0';

// Database Name
const dbName = 'test-enot';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const intervalTime = 500;

// Use connect method to connect to the server
MongoClient.connect(url, options, function(err, client) {
    assert.strictEqual(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    setInterval(() => {
        insertDocuments(db, function() {
            removeDocument(db, function() {});
        });
    }, intervalTime);


});

const insertDocuments = function(db, callback) {

    // Get the documents collection
    const collection = db.collection('documents');
    // Insert a document
    collection.insertOne({a : 1}, function(err, result) {
        assert.strictEqual(err, null);
        assert.strictEqual(1, result.result.n);
        assert.strictEqual(1, result.ops.length);
        console.log("Inserted 1 documents into the collection");
        callback(result);
    });
}

const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 1, set b equal to 1
    collection.updateOne({ a : 1 }
        , { $set: { b : 1 } }, function(err, result) {
        assert.strictEqual(err, null);
        assert.strictEqual(1, result.result.n);
        console.log("Updated the document with the field a equal to 1");
        callback(result);
    });
}

const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 1
    collection.deleteOne({ a : 1 }, function(err, result) {
        assert.strictEqual(err, null);
        assert.strictEqual(1, result.result.n);
        console.log("Removed the document with the field a equal to 1");
        callback(result);
    });
}