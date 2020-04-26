1. why 127.0.0.1? - default for localhost
2. can i use any other ip?
3. how and where to extract user's defined port name?
4. do I need some additional flags in order to allow the user to define the port?
5. MimeType constant has to have a key as an extension with the dot, is it okay?
6. which ports are reserved by the operating system?
7. which range shall i allow for the user to specify their port?
8. how to make the server serve the contents of the static folder?

1. How to debug in chrome?
2. What to do with the 500 error& currently it is responding with 500 and then immediately switches to serving images from the cache)
	- and checking with fs.access or fs.stat is not recomended
3. Almost after each command the process is still running, shall I do something about this?

1. In the lecture I saw __dirname, what is that and in which cases shall we use it?

1. Shall I use specific methods names or can I use app.use method for everything? What is better?
2. Should the path match the directory structure?
3. Should I remove X-Powered-By: Express header?
4. What does "Offers" mean, an offer from the entity or the whole entity?
5. Why do we need this makeAsync function? (taken from the lecture)
6. I generate entities in each request, is it okay?
7. app.use and app.get are outside of the execute function, shall I put them inside?

1. How to pass a mesasge from the error to the reponse?
2. I have error messages from my error classes when I run test. What shall I do with that?
3. I made error handling like it was shown in the lecture, is it okay?

1. How to rename makeAsync? // wrapAsync
2. Why do i have to convert price to a string? why does the price come as a string?
3. We send data and then we receive this data, why? What's the purpose?
4. Do I need to use the keyword "new" when calling express.Router()?
5. Do I need to use the keyword "new" when calling express.json()?
6. What exactly does express.json()? just JSON.parse()?

1. Can I send not one field, but the whole object for the test?
2. Not all fields are in the task specification as it was in generate data, what's the deal with that?
3. FREELANCE
	!!! Do you work as a freelancer in Germany?
	!!! How do you work combine working for a company and working for academy?
	!!! Are you registered as a freelancer?
	!!! What do you do with taxation?

1. How and what to test in the address field?

1. Why do I need to check for multipart/form-data? (router.js => inside try block)

// run this: mongod --port 27017 --dbpath /home/bitusr/keks-node/data
1. Should I create data directory right in the project folder?
2. Is mongodb.js okay name?
3. How to rewrite mongodb.js with async/await?
4. Is cursor provided by mongo or we should implement it ourselves?
5. I named export of the offerStore with the first small letter because a promise is imported, is it okay?
6. In lecture we move data generatio to test folder, but I have this generation for the cli application, should I move generate-entity.js to test or not?
7. What should I use as a field for getting an offer?
8. How to work with nested fields? // findOne llok up documentation
9. What does it mean - in store.js: collection.createIndex({name: -1}, {unique: true}); What does createIndex do? What is {name: -1} // returns a sorted index in descending order, index is for easy search
10. Where does cursor come from? and why do we mock it?
11. Why database is still not closed when tests have finished even though it seems I'm already mpocking everything?
12. Should I do something with environment variables in this task?
13. Should I do something about the CORS in this task?
14. What does it mean, that all resources should be available at /api? (see specification, sources)

1. Do I need to use error handlers right inside the router?
2. How to centrally handle errors in router?
3. How to test post requesets from the browser? Should I change action attribute, and is it okay? // I can modify whatever I want
4. Why address is readonly field? Can I change it? // yes
5. what the heck is chunkSzeBytes?
6. What is return void 0? // just undefined
7. What to do with the bucketName in images/store?
8. How to set content type correctly for :date/avatar

1. 
