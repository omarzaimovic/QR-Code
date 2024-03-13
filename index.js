import http from "http";
import QRCode from "qrcode";

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    if (url === "/") {
      res.statusCode = 200;
      res.end("Health");
    } else if (url === "/generate" && method === "POST") {
      QRCode.toDataURL(data.code, (error, url) => {
        res.end(url);
      });
    }
  });
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port: ${PORT}`);
});
