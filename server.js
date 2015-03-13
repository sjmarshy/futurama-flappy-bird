const app = require("koa")();

app.use(require("koa-static")("public"));

app.listen(process.env.PORT || 3000);
