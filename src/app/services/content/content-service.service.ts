import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ContentItemBase, ContentItemServer, Theme, Category, Country } from './content-service.model'
import fakedata from '../fakedata'


@Injectable()
export class ContentService {

    constructor(private http: Http) { }

    baseUrl = "http://localhost:3004"

    //   getSmallCollection(type) {
    //     //   let resultType = <Theme | Category | Country>{};
    //     return this.http.get(`http:localhost:8090/api/${type}`)
    //       .map((response: Response) => {
    //         return response.json();
    //       }).catch(this.handleError);
    //   }

    getTest() {
        return Observable.of({ test: "hello" }).delay(2000)
    }

    getSmallCollection(type) {
        //   let resultType = <Theme | Category | Country>{};
        //  return fakedata[type].slice(0);
        console.log('getting small collection')
        return this.http.get(`${this.baseUrl}/${type}` || "/api/contentItems")
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    // getContentItems() {
    //     return fakedata.contentItems.slice(0);//.filter((item) => item.id == data.id)
    // }


    getContentItems(data = null) {
        let params = new URLSearchParams();
        if (data)
            for (let p of Object.keys(data))
                params.append(p, JSON.stringify(data[p]))

        return this.http.get(`${this.baseUrl}/contentItems` || "/api/contentItems", { search: params })
            .map((response: Response) => {
                return <ContentItemServer[]>response.json();
            }).catch(this.handleError);
    }

    //   getContentItem(id: number) {
    //     return this.http.get("/api/events/" + id)
    //       .map((response: Response) => {
    //         return <Event>response.json();
    //       }).catch(this.handleError);
    //   }

    addContentItem(itemData: any) {
        console.log("in add Item service", itemData)
        debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var ret = this.http.post(`${this.baseUrl}/contentItems` || "/api/document/new", JSON.stringify(itemData), options);
        return ret.map((response: Response) => {
            var returnedData = response.json();
            return returnedData;
        }).catch(this.handleError);
    }


    searchTags(searchTerm: string) {
        return this.http.get(`${this.baseUrl}/tags`)
            .map((response: Response) => {

                let filtered = response.json().filter((term: any, i) => {
                    if (term.includes(searchTerm))
                        return term.includes(searchTerm)
                    return false;
                })

                console.log(filtered, "filtered test")
                return filtered;
            })
            .catch(this.handleError);
    }

    // search(terms: Observable<string>) {
    //     return terms.debounceTime(400)
    //         .distinctUntilChanged()
    //         .switchMap(term => this.searchTags(term));
    // }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server Error");
    }
}
