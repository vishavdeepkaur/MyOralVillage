import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ContentItemBase, ContentItemServer, Theme, Category, Country } from './content-service.model'
import fakedata from './fakedata'


@Injectable()
export class ContentService {

    constructor(private http: Http) { }



    //   getSmallCollection(type) {
    //     //   let resultType = <Theme | Category | Country>{};
    //     return this.http.get(`/api/collections/${type}`)
    //       .map((response: Response) => {
    //         return response.json()
    //       }).catch(this.handleError);
    //   }

    getSmallCollection(type) {
        //   let resultType = <Theme | Category | Country>{};
        return fakedata[type].slice(0);
    }

    getContentItems() {
        return fakedata.contentItems.slice(0);//.filter((item) => item.id == data.id)
    }


    //   getContentItems({data}) {
    //     let params = new URLSearchParams();
    //     for(let p of Object.keys(data))
    //         params.append(p,JSON.stringify(data[p]))

    //     return this.http.get("/api/contentItems",{search:params})
    //       .map((response: Response) => {
    //         return <ContentItemServer[]>response.json();
    //       }).catch(this.handleError);
    //   }

    //   getContentItem(id: number) {
    //     return this.http.get("/api/events/" + id)
    //       .map((response: Response) => {
    //         return <Event>response.json();
    //       }).catch(this.handleError);
    //   }

    // addContentItem(itemData: any) {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });

    //     var ret = this.http.post("/api/contentItems", JSON.stringify(itemData), options);
    //     return ret.map((response: Response) => {
    //         var returnedData = response.json();
    //         return returnedData;
    //     }).catch(this.handleError);

    // }


    searchSessions(searchTerm: string) {
        return this.http.get(`/api/sessions/search?search=${searchTerm}`)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server Error");
    }
}
