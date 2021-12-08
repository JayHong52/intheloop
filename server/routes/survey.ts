/*=======================================================
  FileName: /server/routes/survey.ts
  ProjectName: IntheLoop - Survey 
  CompanyName: Centennial Collge, Fall 2021
  Author: Hong, Jiwoong - 301153138
          Vargas, Joel  - 301161522
          Zheng, Ziwei  - 301180464
  Date: 2021-11-26
  Remarks: Survey router
  ======================================================*/

import express from 'express';
import { DisplaySurveyAddPage, DisplaySurveyEditPage, DisplaySurveyListPage, DisplaySurveyActivePage, ProcessSurveyAddPage, ProcessSurveyDeletePage, ProcessSurveyEditPage } from '../controllers/survey';
const router = express.Router();

// Survey-list : DISPLAY 
router.get('/list', DisplaySurveyListPage);

// Survey-active : DISPLAY 
router.get('/active', DisplaySurveyActivePage);

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

