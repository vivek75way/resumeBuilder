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
exports.getAllResume = exports.getResumeById = exports.deleteResume = exports.editResume = exports.updateResume = exports.createResume = void 0;
const resume_schema_1 = __importDefault(require("./resume.schema"));
const createResume = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.create(Object.assign(Object.assign({}, data), { active: true }));
    return result;
});
exports.createResume = createResume;
const updateResume = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
exports.updateResume = updateResume;
const editResume = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.findOneAndUpdate({ _id: id }, data);
    return result;
});
exports.editResume = editResume;
const deleteResume = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.deleteOne({ _id: id });
    return result;
});
exports.deleteResume = deleteResume;
const getResumeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.findById(id).lean();
    return result;
});
exports.getResumeById = getResumeById;
const getAllResume = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.find({}).lean();
    return result;
});
exports.getAllResume = getAllResume;
