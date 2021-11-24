import passport from "passport";
import passportLocal, { IVerifyOptions } from 'passport-local';
import UserModel from '../models/user';
import { Request, Response } from 'express';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: any = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
};
// =================
//  Log-In Function
// =================
const loginFunction: any = async (
    req: Request,
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void) => {

    const user: any = await UserModel.findOne({ username });

    if (!user) {
        return done(null, false, { message: "User does not exist" });
    };
    if (!(await user.isValidPassword(password))) {
        return done(null, false, { message: "Password is not valid" });
    };
    return done(null, user);
};

// ==================
//  Sign-Up Function
// ==================
const signupFunction: any = async (
    req: Request,
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
    try {
        //deconstructing
        const { username, password, firstName, lastName, email } = req.body;
        console.log(req.body);

        if (!username || !password || !email || !firstName || !lastName) {
            console.log("Invalid body fields");
            return done(null, false);
        };

        const query = {
            $or: [{ username: username }, { email: email }]
        };

        console.log(query);

        const user = await UserModel.findOne(query);

        if (user) {
            console.log('User already exists');
            console.log(user);
            return done(null, false);
        } else {
            const userData = {
                username,
                password,
                email,
                displayName: firstName + " " + lastName
            }

            const newUser = new UserModel(userData);
            await newUser.save();

            return done(null, newUser)
        }
    } catch (err) {
        done(err);
    }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunction));
passport.use('signup', new LocalStrategy(strategyOptions, signupFunction));

// ==================
//  isLogged-In: 
// ==================
export const isLoggedIn = (req: Request, res: Response, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
    if (!req.user) {
        console.log(' Redirecting: /auth/login ');
        return res.redirect('/auth/login');
    }
    done(null, req.user);
};

interface User {
    _id?: String;
};

passport.serializeUser((user: User, done) => {
    done(null, user._id)
});

passport.deserializeUser((userId, done) => {
    UserModel.findById(userId, function (err: any, user: any) {
        done(err, user);
    });
});

export default passport;    