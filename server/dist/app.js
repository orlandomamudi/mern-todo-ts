"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = 8080;
const { MONGODB_ATLAS_USERNAME, MONGODB_ATLAS_PASSWORD, MONGODB_ATLAS_DBNAME } = process.env;
const uri = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0.b3vux.mongodb.net/${MONGODB_ATLAS_DBNAME}?retryWrites=true&w=majority`;
app.use((0, cors_1.default)());
app.use(routes_1.default);
mongoose_1.default.connect(uri)
    .then(() => {
    app.listen(PORT, () => {
        console.info(`app is listening at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    throw error;
});
//# sourceMappingURL=app.js.map