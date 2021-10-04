"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const todos_1 = require("../controllers/todos");
const router = (0, express_1.Router)();
const jsonParser = body_parser_1.default.json();
router.get('/api/todos', todos_1.getTodos);
router.get('/api/todo/:id', todos_1.getTodo);
router.post('/api/add-todo', jsonParser, todos_1.addTodo);
router.put('/api/update-todo/:id', jsonParser, todos_1.updateTodo);
router.delete('/api/remove-todo/:id', jsonParser, todos_1.removeTodo);
exports.default = router;
//# sourceMappingURL=index.js.map