import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestModel } from 'src/data-model/LoginRequestModel';
import { LoginResponseModel } from 'src/data-model/LoginResponseModel';
import { DescriptionRequestModel } from 'src/data-model/DescriptionRequest.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private http: HttpClient) { }
  login_endpoint = environment.baseUrls.local_dev + environment.api_endpoints.getUserDetails;
  save_endpoint =  environment.baseUrls.local_dev + environment.api_endpoints.postUserDetails;
  

  public getLoginData(loginObj: LoginRequestModel): Observable<any> {
    //console.log(this.login_endpoint);
    const loginData = '../assets/Mock-Data/LoginResponse.json';
    //return this.http.post(this.login_endpoint, loginObj);
    return this.http.get<LoginResponseModel>(loginData);
  }

  public getLoginDataWithDetails(loginObj: LoginRequestModel): Observable<any> {
    console.log(this.login_endpoint);
    //const loginData = '../assets/Mock-Data/LoginWithDataResponse.json';
    return this.http.post(this.login_endpoint, loginObj);
    //return this.http.get<LoginResponseModel>(loginData);
  }


  public getDescriptionStatus(descriptionObj: DescriptionRequestModel): Observable<any> {
    console.log(this.save_endpoint);
    //const descriptionData = '../assets/Mock-Data/DescriptionResponse.json';
    return this.http.post(this.save_endpoint, descriptionObj);
    //return this.http.get<LoginResponseModel>(descriptionData);  
  }

//   public postSubmitData(submitResponse: SubmitResponse): Observable<any> {
//     console.log('Submit Endpoint::::::::::::====> ',this.submit_endpoint);
//     return this.http.post(this.submit_endpoint, submitResponse);
//   }


//   public getBarChartData(transactionId: string): Observable<BarChartResponse>{
//     //return this.http.get<BarChartResponse>('../assets/Mock-Data/BarData.json');
//     const url = this.barChart_service + transactionId;
//     return this.http.get<BarChartResponse>(url);
//   }
//   public getScatterChartData(transactionId: string): Observable<ScatterChartResponse> {
//     const url= this.scatterChart_service + transactionId;
//     //return this.http.get<ScatterChartResponse>('../assets/Mock-Data/ScatterData.json');
//     console.log('Scatter chart URL::==> ',url);
//     return this.http.get<ScatterChartResponse>(url);
//   }
}
