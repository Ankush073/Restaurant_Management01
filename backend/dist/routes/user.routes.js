"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
// /api/my/user
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, user_controller_1.default.getCurrentUser);
router.post("/", auth_1.jwtCheck, user_controller_1.default.createCurrentUser);
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, user_controller_1.default.updateCurrentUser);
exports.default = router;
