/*=======================================================
  FileName: /server/controllers/intex.ts
  ProjectName: IntheLoop - Survey 
  CompanyName: Centennial Collge, Fall 2021
  Author: Hong, Jiwoong - 301153138
          Vargas, Joel  - 301161522
          Jiang, Chen   - 301082999
          Zheng, Ziwei  - 301180464
  Date: 2021-11-12
  Remarks: Index route controller 
  ======================================================*/

import express from 'express';

export function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Home', page: 'home' });
};

export function DisplayAboutPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'About Us', page: 'about' });
};

export function DisplayProjectPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Projects', page: 'project' });
};

export function DisplayServicePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Services', page: 'service' });
};

export function DisplayContactUsPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Contact Us', page: 'contact' });
};

export function DisplayLogInPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Log In', page: 'login' });
};

