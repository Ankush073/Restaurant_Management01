"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const router = express_1.default.Router();
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, order_controller_1.default.getMyOrders);
router.post("/checkout/create-checkout-session", auth_1.jwtCheck, auth_1.jwtParse, order_controller_1.default.createCheckoutSession);
router.post("/checkout/webhook", order_controller_1.default.stripeWebhookHandler);
exports.default = router;
