"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createUserTokens = exports.initPassport = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const http_errors_1 = __importDefault(require("http-errors"));
const userService = __importStar(require("../../user/user.service"));
const isValidPassword = (value, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password)
        return false; // Prevents passing undefined to bcrypt
    return yield bcrypt_1.default.compare(value, password);
});
const initPassport = () => {
    passport_1.default.use(new passport_jwt_1.Strategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            done(null, token.user);
        }
        catch (error) {
            done(error);
        }
    })));
    // User login strategy
    passport_1.default.use("login", new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password",
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userService.getUserByEmail(email);
            if (!user) {
                return done((0, http_errors_1.default)(401, "User not found!"), false);
            }
            if (!user.password) {
                return done((0, http_errors_1.default)(500, "User password is missing"), false);
            }
            const validate = yield isValidPassword(password, user.password);
            if (!validate) {
                return done((0, http_errors_1.default)(401, "Invalid email or password"), false);
            }
            const { password: _p } = user, result = __rest(user, ["password"]);
            return done(null, result, { message: "Logged in Successfully" });
        }
        catch (error) {
            return done((0, http_errors_1.default)(500, error.message));
        }
    })));
};
exports.initPassport = initPassport;
const createUserTokens = (user) => {
    var _a;
    const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
    const token = jsonwebtoken_1.default.sign(user, jwtSecret);
    return { accessToken: token, refreshToken: "" };
};
exports.createUserTokens = createUserTokens;
const decodeToken = (token) => {
    const decode = jsonwebtoken_1.default.decode(token);
    return decode;
};
exports.decodeToken = decodeToken;
