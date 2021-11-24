/*=============================================
  FileName: routes/user.ts
  ProjectName: COMP229-005, Assignment #2
  CompanyName: Centennial Collge, Fall 2021
  Author: Jiwoong Hong, 301153138
  Date: 2021-10-22
  ============================================*/

import { Router } from "express";
import { DisplayLogInPage, DisplayRegisterPage, ProcessLogout, ProcessRegisterPage } from "../controllers/user";
import passport from "../middlewares/auth";

const router = Router();

// LogIn Page: DISPLAY 
router.get('/login', DisplayLogInPage);

// LogIn Page: PROCESS
router.post('/login', passport.authenticate('login', {successRedirect: '/survey/list', failureRedirect:'/auth/login'})); 

// Register Page: DISPLAY
router.get('/register', DisplayRegisterPage);

// Register Page: PROCESS
router.post('/register', ProcessRegisterPage);

// Logout 
router.get('/logout', ProcessLogout);

export default router;