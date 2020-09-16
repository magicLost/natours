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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
var isEmail_1 = require("validator/lib/isEmail");
var bcryptjs_1 = require("bcryptjs");
var crypto_1 = require("crypto");
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [[true, "Please, tell us your name"]],
        minlength: [2, "Too short name"],
        maxlength: [55, "Too long name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail_1["default"], "Please provide a valid email"]
    },
    role: {
        type: String,
        "enum": ["admin", "user", "guide", "lead-guide"],
        "default": "user"
    },
    photo: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minlength: [8, "Too low secure password."],
        maxlength: [255, "What? Are you serious."],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please, confirm your password"],
        validate: {
            //This only work on .CREATE and .SAVE!!!
            validator: function (value) {
                return value === this.password;
            },
            message: "Password is not the same"
        },
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        "default": true,
        select: false
    }
});
/* userSchema.pre(/^find/, function(next) {
  //this points to query
  this.find({ active: { $ne: false } });
  next();
}); */
exports.UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!this.isModified("password"))
                        return [2 /*return*/, next()];
                    _a = this;
                    return [4 /*yield*/, bcryptjs_1.hash(this.password, 12)];
                case 1:
                    _a.password = _b.sent();
                    this.passwordConfirm = "";
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
exports.UserSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew)
        return next();
    this.passwordChangedAt = (Date.now() - 1000).toString();
    next();
});
exports.UserSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1.compare(candidatePassword, userPassword)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.UserSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
    if (this.passwordChangedAt) {
        var changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
        return jwtTimestamp < changedTimestamp;
    }
    return false;
};
exports.UserSchema.methods.createPasswordResetToken = function () {
    var resetToken = crypto_1.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto_1.createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
var UserModel = mongoose_1.model("User", exports.UserSchema);
exports["default"] = UserModel;
