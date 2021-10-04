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
exports.removeTodo = exports.updateTodo = exports.addTodo = exports.getTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_1.default.find();
    res.status(200).json({ todos });
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield todo_1.default.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        else {
            res.status(200).json({ result });
        }
    });
});
exports.getTodo = getTodo;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body.title || !body.status) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: Todo validation failed: title: ${body.title}, status: ${body.status}`
        });
        return;
    }
    const newTodoModel = new todo_1.default({
        title: body.title,
        status: body.status
    });
    const newTodo = yield newTodoModel.save();
    const updatedAllTodosAfterSave = yield todo_1.default.find();
    res.status(201).json({
        message: 'Todo successfully added!',
        addedTodo: newTodo,
        allTodosAfterAddition: updatedAllTodosAfterSave
    });
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body } = req;
    if (!body.title || !body.status || !id) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: _id or required body properties is not defined.`
        });
        return;
    }
    const updatedTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
    const updatedAllTodosAfterUpdate = yield todo_1.default.find();
    if (!updatedTodo) {
        res
            .status(501)
            .json({ status: 501, errorMessage: 'Edit todo failed. Not implemented' });
        return;
    }
    res.status(200).json({
        message: 'Todo successfully edited',
        updateTodo: exports.updateTodo,
        todos: updatedAllTodosAfterUpdate
    });
});
exports.updateTodo = updateTodo;
const removeTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    if (!id) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: Params _id is not defined.`
        });
        return;
    }
    const removedTodo = yield todo_1.default.findByIdAndRemove(id);
    const updatedAllTodosAfterRemove = yield todo_1.default.find();
    if (!removedTodo) {
        res.status(501).json({
            status: 501,
            errorMessage: 'Remove todo failed. Not implemented'
        });
        return;
    }
    res.status(200).json({
        message: 'Todo successfully removed',
        removeTodo: exports.removeTodo,
        todos: updatedAllTodosAfterRemove
    });
});
exports.removeTodo = removeTodo;
//# sourceMappingURL=index.js.map