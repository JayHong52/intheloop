/*=============================================
  FileName: routes/index.ts
  ProjectName: COMP229-005, Assignment #2
  CompanyName: Centennial Collge, Fall 2021
  Author: Jiwoong Hong, 301153138
  Date: 2021-10-22
  ============================================*/

import express from 'express';
import { DisplayHomePage } from '../controllers';
const router = express.Router();

// Get Home Page  
router.get('/', DisplayHomePage);

// Get Home Page (/home)
router.get('/home', DisplayHomePage);

export default router;
