const app = require('./app');
const config = require('./app/config')

app.listen(config.APP_PORT, () => {
    console.log(`${config.APP_PORT}端口服务器启动成功`);
})
