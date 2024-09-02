// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(auth);
// Add this before server.use(router)
server.use(
    jsonServer.rewriter({
        "/common/job-postings?page=:page": "/job-postings?_page=:page&_limit=24",
        "/common/job-postings/:jobPostingKey": "/job-postings/:jobPostingKey",
        "/companies/:companyKey/information": "/companies/:companyKey",
        "/companies/:companyKey/job-postings": "/job-postings",
        "/companies/:companyKey/posted-job-postings": "/job-postings?companyKey=:companyKey",
        "/job-postings/:jobPostingKey/apply": "/appliedJobPosting/",
        "/candidates/:candidateKey/applied-job-postings":
            "/appliedJobPosting?candidateKey=:candidateKey",
    })
);
server.use(router);
server.listen(3001, () => {
    console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
