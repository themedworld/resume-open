"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.setGlobalPrefix('api/v1');
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map