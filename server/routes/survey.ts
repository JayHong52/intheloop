/*=============================================
  FileName: routes/Survey.ts
  ProjectName: COMP229-005, Assignment #2
  CompanyName: Centennial Collge, Fall 2021
  Author: Jiwoong Hong, 301153138
  Date: 2021-10-22
  ============================================*/

import express from 'express';
import { DisplaySurveyAddPage, DisplaySurveyEditPage, DisplaySurveyListPage, ProcessSurveyAddPage, ProcessSurveyDeletePage, ProcessSurveyEditPage } from '../controllers/survey';
const router = express.Router();

// Survey-list : DISPLAY 
router.get('/list', DisplaySurveyListPage);

// Survey-edit : DISPLAY
router.get('/edit/:id', DisplaySurveyEditPage);

// Survey-edit : PROCESS
router.post('/edit/:id', ProcessSurveyEditPage);
  
// Survey-edit : Create - DISPLAY
router.get('/add', DisplaySurveyAddPage);

// Survey-edit : Create - PROCESS 
router.post('/add', ProcessSurveyAddPage);

// Survey-edit : Delete - PROCESS 
router.get('/delete/:id', ProcessSurveyDeletePage);

export default router;

