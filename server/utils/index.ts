/*=============================================
  FileName: utils/index.ts
  ProjectName: COMP229-005, Assignment #2
  CompanyName: Centennial Collge, Fall 2021
  Author: Jiwoong Hong, 301153138
  Date: 2021-10-22
  ============================================*/

import { Request } from 'express';

export function UserDisplayName(req: Request){
    if (req.user){
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }
}