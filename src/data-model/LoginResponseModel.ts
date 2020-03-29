import {DbModel} from '../data-model/DbModel';
export class LoginResponseModel{
   public userId: string;
   public userName: string;
   public repository: RepoDetails;
   public frontend: string;
   public service :string;
   public db : string;
   public status : boolean;

}
export class RepoDetails{
   public frontEndUrl: string;
   public serviceEndUrl: string;
   public username: string;
   public password: string;
   
}
