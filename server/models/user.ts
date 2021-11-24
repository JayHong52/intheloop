/*=============================================
  FileName: models/user.ts
  ProjectName: COMP229-005, Assignment #2
  CompanyName: Centennial Collge, Fall 2021
  Author: Jiwoong Hong, 301153138
  Date: 2021-10-22
  ============================================*/

import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    displayName: String
}, {
    collection: 'users'
});

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
});

// password validation
UserSchema.methods.isValidPassword = async function (password: string) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

declare global {
    export type UserDocument = mongoose.Document & {
        _id: String,
        username: String,
        password: String,
        displayName: String
    }
}

const Model = mongoose.model('User', UserSchema);

export default Model;

