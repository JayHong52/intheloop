"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayLogInPage = exports.DisplayContactUsPage = exports.DisplayServicePage = exports.DisplayProjectPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}
exports.DisplayHomePage = DisplayHomePage;
;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About Us', page: 'about' });
}
exports.DisplayAboutPage = DisplayAboutPage;
;
function DisplayProjectPage(req, res, next) {
    res.render('index', { title: 'Projects', page: 'project' });
}
exports.DisplayProjectPage = DisplayProjectPage;
;
function DisplayServicePage(req, res, next) {
    res.render('index', { title: 'Services', page: 'service' });
}
exports.DisplayServicePage = DisplayServicePage;
;
function DisplayContactUsPage(req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact' });
}
exports.DisplayContactUsPage = DisplayContactUsPage;
;
function DisplayLogInPage(req, res, next) {
    res.render('index', { title: 'Log In', page: 'login' });
}
exports.DisplayLogInPage = DisplayLogInPage;
;
//# sourceMappingURL=index.js.map