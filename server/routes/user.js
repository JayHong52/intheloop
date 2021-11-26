"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/login', user_1.DisplayLogInPage);
router.post('/login', user_1.ProcessLogInPage);
router.get('/register', user_1.DisplayRegisterPage);
router.post('/register', user_1.ProcessRegisterPage);
router.get('/logout', user_1.ProcessLogout);
exports.default = router;
//# sourceMappingURL=user.js.map