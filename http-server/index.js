// const fs = require("fs");
// fs.writeFile(
//   "sample.txt",
//   "Hello World. Welcome to Node.js File System module.",
//   (err) => {
//     if (err) throw err;
//     console.log("File created!");
//   }
// );

// fs.readFile("sample.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// fs.appendFile("sample.txt", " This is my updated content", (err) => {
//   if (err) throw err;
//   console.log("File updated!");
// });

// fs.rename("sample.txt", "test.txt", (err) => {
//   if (err) throw err;
//   console.log("File name updated!");
// });

// fs.unlink("test.txt", (err) => {
//   if (err) throw err;
//   console.log("File test.txt deleted successfully!");
// });


// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req,res) => {
//   const stream = fs.createReadStream("sample.txt");
//   stream.pipe(res);
//   // fs.readFile("sample.txt",(err,data) => {
//   //   res.end(data);
//   // })
// });
// server.listen(3000);


// const readline = require("readline");

// const lineDetail = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// lineDetail.question(`Please provide your name - `, (name) => {
//   console.log(`Hi ${name}!`);
//   lineDetail.close();
// });

// const args = require("minimist")(process.argv.slice(2));

// console.log(args);

// let args = minimist(process.argv.slice(2), {
//   alias: {
//     n: "name",
//     a: "age",
//   },
//  });

//  console.log(args);
// const minimist = require('minimist');

// let args = minimist(process.argv.slice(2), {
//   default: {
//     greeting: "Hello",
//   },
//  });

//   console.log(args);

// const http = require("http");
// const fs = require("fs");

// fs.readFile("home.html", (err, home) => {
//   console.log(home.toString());
// });

// fs.readFile("home.html", (err, home) => {
//   if (err) {
//     throw err;
//   }
//   http
//     .createServer((request, response) => {
//       response.writeHeader(200, { "Content-Type": "text/html" });
//       response.write(home);
//       response.end();
//     })
//     .listen(3000);
// });

const http = require("http");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("./home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("./project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("./registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});


const server = http.createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "./project.html":
        response.write(projectContent);
        response.end();
        break;
      case "./registration.html":
        response.write(registrationContent);
        response.end();
        break;

      default:
        response.write(homeContent);
        response.end();
        break;
    }
  });

// const port = argv.find((arg) => arg.startsWith("--port="))?.split("=")[1] || 3000;
const port = argv.port || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});