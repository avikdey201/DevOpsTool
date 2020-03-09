import {DbModel} from '../data-model/DbModel';
export class LoginResponseModel{
   public token: string;
   public userName: string;
   public repository: RepoDetails;
   public frontend: string;
   public backend :string;
   public db : string;
   public submit : boolean;

}

export class RepoDetails{
   public userName: string;
   public password: string;
   public url: string;

}
