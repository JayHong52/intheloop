/*=======================================================
  FileName: /server/utils/index.ts
  ProjectName: IntheLoop - Survey 
  CompanyName: Centennial Collge, Fall 2021
  Author: Hong, Jiwoong - 301153138
          Vargas, Joel  - 301161522
          Zheng, Ziwei  - 301180464
  Date: 2021-11-26
  Remarks: UserNameDisplay
  ======================================================*/

import { Request } from 'express';

export function UserDisplayName(req: Request){
    if (req.user){
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }
}