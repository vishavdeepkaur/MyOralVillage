import { Component } from '@angular/core';
import { ContentService } from '../../../services';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'typeahead',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.css'],
})
export class Typeahead {
    searching = false;
    searchFailed = false;
  
    constructor(private searchService: ContentService) {

    }


    search = (text$: Observable<string>) =>
        text$
            .debounceTime(100)
            .distinctUntilChanged()
            .do(() => this.searching = true)
            .switchMap(term =>
                this.searchService.searchTags(term)
                    .do(() => this.searchFailed = false)
                    .catch(() => {
                        this.searchFailed = true;
                        return Observable.of([]);
                    }))
            .do(() => this.searching = false);

}