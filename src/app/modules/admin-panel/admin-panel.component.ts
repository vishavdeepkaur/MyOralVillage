import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';
import { ContentService } from '../../services';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs'


@Component({
  selector: 'admin-panel',
  styleUrls: ['./admin-panel.component.css'],
  templateUrl: `./admin-panel.component.html`

})
export class AdminPanelComponent implements OnInit {

  private data;
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private error = null;

  private selection = null;

  constructor(
    public appState: AppState,
    public modalService: NgbModal,
    public contentService: ContentService
  ) { }

  promptRemove($event, modal) {
    console.log($event, "opening modal")
    let {index, colName} = $event;

    this.selection = { colName, name: this.data[colName][index].name || this.data[colName][index] }
    this.modalService.open(modal);
  }

  removeItem($event) {
    console.log("approved deletion")
  }

  public ngOnInit() {
    let data = this.appState.get("content")

    console.log('getting app state data', data)

    if (!data) {
      console.log("no data")
      this.isLoading$.next(true);

      Observable.forkJoin([
        this.contentService.getSmallCollection("categories"),
        this.contentService.getSmallCollection("themes"),
        this.contentService.getSmallCollection("countries"),
        this.contentService.getContentItems()
      ]).subscribe(data => {
        this.appState.set("content", {
          categories: data[0],
          themes: data[1],
          countries: data[2],
          contentItems: data[3]
        })
        this.data = this.appState.get("content")
        console.log('in subscribe of admin', this.data)

        // console.log(this.categories, this.themes, this.countries, this.contentItems)
      },
        error => {
          console.log(error)
          this.error = error;
        },
        () => {
          this.isLoading$.next(false);
          this.isLoading$.complete();
          console.log('done')
        })
    }
    else
      this.data = data;

    console.log("admin panel setting data", this.data)

  }
}

