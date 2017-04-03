import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class DataVisualsService {

    constructor(private http: Http) { }

    getGeoData() {
        return this.http.get('http://localhost:3004/geoData').map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    getSurveyData() {
        return this.http.get('http://localhost:3004/surveyData').map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server Error");
    }
}
