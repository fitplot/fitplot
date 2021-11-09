const Koa = require("koa");
const koa_router = require("koa-router");

const app = new Koa();
const PORT = 5000;
router = koa_router();

router.get("/healthcheck", async ctx => {
  ctx.body = 200;
});

app.use(router.routes());
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
