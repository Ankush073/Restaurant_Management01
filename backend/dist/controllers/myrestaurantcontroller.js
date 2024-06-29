"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_1 = __importDefault(require("../models/restaurant"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = __importDefault(require("../models/order"));
const getMyRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_1.default.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" });
        }
        res.json(restaurant);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching restaurant" });
    }
});
const createMyRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRestaurant = yield restaurant_1.default.findOne({ user: req.userId });
        if (existingRestaurant) {
            return res
                .status(409)
                .json({ message: "User restaurant already exists" });
        }
        const imageUrl = yield uploadImage(req.file);
        const restaurant = new restaurant_1.default(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose_1.default.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        yield restaurant.save();
        res.status(201).send(restaurant);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
const updateMyRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_1.default.findOne({
            user: req.userId,
        });
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" });
        }
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();
        if (req.file) {
            const imageUrl = yield uploadImage(req.file);
            restaurant.imageUrl = imageUrl;
        }
        yield restaurant.save();
        res.status(200).send(restaurant);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
const getMyRestaurantOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_1.default.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" });
        }
        const orders = yield order_1.default.find({ restaurant: restaurant._id })
            .populate("restaurant")
            .populate("user");
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
});
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = yield order_1.default.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        const restaurant = yield restaurant_1.default.findById(order.restaurant);
        if (((_a = restaurant === null || restaurant === void 0 ? void 0 : restaurant.user) === null || _a === void 0 ? void 0 : _a._id.toString()) !== req.userId) {
            return res.status(401).send();
        }
        order.status = status;
        yield order.save();
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "unable to update order status" });
    }
});
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(dataURI);
    return uploadResponse.url;
});
exports.default = {
    updateOrderStatus,
    getMyRestaurantOrders,
    getMyRestaurant,
    createMyRestaurant,
    updateMyRestaurant,
};
