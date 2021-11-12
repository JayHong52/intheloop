/*=======================================================
  FileName: /server/routes/index.ts
  ProjectName: IntheLoop - Survey 
  CompanyName: Centennial Collge, Fall 2021
  Author: Hong, Jiwoong - 301153138
          Vargas, Joel  - 301161522
          Jiang, Chen   - 301082999
          Zheng, Ziwei  - 301180464
  Date: 2021-11-12
  Remarks: Index router
  ======================================================*/

import express from 'express';
import { DisplayHomePage } from '../controllers';
const router = express.Router();

// Get Home Page  
router.get('/', DisplayHomePage);

// Get Home Page (/home)
router.get('/home', DisplayHomePage);

export default router;
