import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestModel } from 'src/data-model/LoginRequestModel';
import { LoginResponseModel } from 'src/data-model/LoginResponseModel';
import { DescriptionRequestModel } from 'src/data-model/DescriptionRequest.model';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private http: HttpClient) { }
  
  

  public getLoginData(LoginObj: LoginRequestModel): Observable<any> {
    //console.log(this.executeCode_enpoint);
    const loginData = '../assets/Mock-Data/LoginResponse.json';
    //return this.http.post(this.executeCode_enpoint, executionObj);
    return this.http.get<LoginResponseModel>(loginData);
  }

  public getLoginDataWithDetails(LoginObj: LoginRequestModel): Observable<any> {
    //console.log(this.executeCode_enpoint);
    const loginData = '../assets/Mock-Data/LoginWithDataResponse.json';
    //return this.http.post(this.executeCode_enpoint, executionObj);
    return this.http.get<LoginResponseModel>(loginData);
  }


  public getDescriptionStatus(DescriptionObj: DescriptionRequestModel): Observable<any> {
    //console.log(this.executeCode_enpoint);
    const descriptionData = '../assets/Mock-Data/DescriptionResponse.json';
    //return this.http.post(this.executeCode_enpoint, executionObj);
    return this.http.get<LoginResponseModel>(descriptionData);  
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
