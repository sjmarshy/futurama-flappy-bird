const app = require("koa")();

app.use(require("koa-static")("public"));

app.listen(process.env.NODE_PORT | 3000);
