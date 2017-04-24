"use strict";

// ES6 way of writing the require
// const {MongoClient} = require("mongodb");

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Let's "get all the tweets". In Mongo-speak, we "find" them.


   function getTweets(callback) {
     db.collection("tweets").find().toArray((err, tweets) => {
       if (err) {
         return callback(err)
       }
       callback(null, tweets)
     });
   }

    // ==> So we Read The Fantastic Manual, right?

    // ==> We can iterate on the cursor to get results, one at a time:
    // logging tweets
    // console.log("find each item yeilded by the corsor");
    // result.each((err, item) => console.log("  ", item));

    // Remember, this is an oversimplified demo. Of course you'd define getTweets
    //in one place and call it somewhere else entirely (probably a different file).
    //What's important is that the connected db is in scope when getTweets is
    //defined--it doesn't matter about when it's called, because it's a closure.
    getTweets((err, tweets) => {
      if (err) throw err;

      console.log("Logging each tweet: ");
      for (let tweet of tweets) {
        console.log(tweet);
      }
      db.close();
    });

  });
  // ==> At the end, we close the connection:


  // ==> In typical node-callback style, any program
  //     logic that needs to use the connection needs
  //     to be invoked from within here.
  //
  // Another way to say: this is an "entry point" for
  // a database-connected application!
