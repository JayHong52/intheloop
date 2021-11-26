/*=======================================================
  FileName: /server/routes/user.ts
  ProjectName: IntheLoop - Survey 
  CompanyName: Centennial Collge, Fall 2021
  Author: Hong, Jiwoong - 301153138
          Vargas, Joel  - 301161522
          Zheng, Ziwei  - 301180464
  Date: 2021-11-26
  Remarks: User router
  ======================================================*/

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