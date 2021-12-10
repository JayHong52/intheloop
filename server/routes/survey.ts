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
import { DisplaySurveyAddPage, DisplaySurveyEditPage, 
         DisplaySurveyManagePage, DisplaySurveyActivePage, 
         ProcessSurveyAddPage, ProcessSurveyDeletePage, ProcessSurveyEditPage, 
         DisplayQuestionAddPage, ProcessQuestionAddPage, ProcessQuestionDeletePage, 
         DisplayTakeSurvey, ProcessTakeSurvey, DisplaySurveyResultPage } from '../controllers/survey';
                  
const router = express.Router();

// Survey-list : DISPLAY 
router.get('/manage', DisplaySurveyManagePage);

// Survey-active : DISPLAY 
router.get('/active', DisplaySurveyActivePage);

// Survey-edit : DISPLAY
router.get('/manage/:id', DisplaySurveyEditPage);

// Survey-edit : PROCESS
router.post('/manage/:id', ProcessSurveyEditPage);
  
// Survey-edit : Create - DISPLAY
router.get('/add', DisplaySurveyAddPage);

// Survey-edit : Create - PROCESS 
router.post('/add', ProcessSurveyAddPage);

// Survey-edit : Delete - PROCESS 
router.get('/delete/:id', ProcessSurveyDeletePage);

/* =========================================================================== */
/*  Take Survey 
/* =========================================================================== */

router.get('/take/:id', DisplayTakeSurvey);

router.post('/take/:id', ProcessTakeSurvey);

/* =========================================================================== */
/*  See Results
/* =========================================================================== */

router.get('/result/:id', DisplaySurveyResultPage);

/* =========================================================================== */
/*  Questions 
/* =========================================================================== */

// Survey Add Questions: DISPLAY
router.get('/manage/:id/question/add', DisplayQuestionAddPage);

// Survey Questions: PROCESS
router.post('/manage/:id/question/add', ProcessQuestionAddPage);

// Survey Questions: Delete 
router.get('/manage/:id/question/delete/:qid', ProcessQuestionDeletePage)

export default router;

