import {DbModel} from '../data-model/DbModel';
export class LoginResponseModel{
   public token: string;
   public userName: string;
   public repoUserName: string;
   public frontend: string;
   public backend :string;
   public db : DbModel;
   public submit : boolean;
}
