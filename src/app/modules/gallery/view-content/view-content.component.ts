import { Component, OnInit, Input, Output, state, trigger, animate, transition, style } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../app.service';
import { ContentService, UploadService, Selection, Category, ContentItemServer, ContentItemBase, Theme, Country } from '../../../services';
import { NotificationsService } from 'angular2-notifications'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContentModal } from './modals/add-content-modal'
import { EditContentModal } from './modals/edit-content-modal'
import { Observable, BehaviorSubject } from 'rxjs'
import { Uploader, UploadItem } from 'angular2-http-file-upload'
/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'view-content',
  styleUrls: ['./view-content.component.css'
  ],
  templateUrl: `./view-content.component.html`,
  animations: [
    trigger('onCreate', [
      state('in', style({
        opacity: 1
      })),
      state('out', style({
        opactiy: 0
      })),
      transition('void <=> *', animate('500ms ease-out'))
    ])]

})
export class ViewContentComponent implements OnInit {
  @Input() categories: Category[];
  @Input() contentItems: ContentItemServer[];
  @Input() themes: Theme[];
  @Input() countries: Country[];
  sidebarVisible: boolean = true;

  private userInfo;

  selection: Selection = {
    category: null,
    contentItem: null,
    theme: null,
    country: null,
    sortBy: "name",
    sortAsc: false
  }


  private subscription;
  private contentTypeParam: string;

  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private error = null;


  constructor(
    public appState: AppState,
    private activeRoute: ActivatedRoute,
    private contentService: ContentService,
    // private uploadService: UploadService,
    private uploadService: Uploader,
    private notificationService: NotificationsService,
    private modalService: NgbModal
  ) { }

  openAdd() {
    const modalRef = this.modalService.open(AddContentModal);
    modalRef.componentInstance.onContentItemAdd = this.addContentItem.bind(this);
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.themes = this.themes;
    modalRef.componentInstance.categories = this.categories;

  }
  openEdit(data) {
    const modalRef = this.modalService.open(EditContentModal);
    modalRef.componentInstance.contentItem = data;
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.themes = this.themes;
    modalRef.componentInstance.categories = this.categories;
  }


  public ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe((value: any) => {
      this.contentTypeParam = value.category;
      this.selection.category = value.category;
      console.log(value);
    })

    //     this.contentService.getSmallCollection("categories").subscribe(result => { this.categories = result})
    // this.contentService.getSmallCollection("themes").subscribe(result => { this.themes = result})
    // this.contentService.getSmallCollection("countries").subscribe(result => { this.countries = result})
    this.isLoading$.next(true);

    Observable.forkJoin([
      this.contentService.getSmallCollection("categories"),
      this.contentService.getSmallCollection("themes"),
      this.contentService.getSmallCollection("countries"),
      this.contentService.getContentItems()
    ]).subscribe(data => {
      this.categories = data[0]
      this.themes = data[1]
      this.countries = data[2]
      this.contentItems = data[3]

      this.appState.set("content", {
        categories: this.categories,
        themes: this.themes,
        countries: this.countries,
        contentItems: this.contentItems
      })

      // console.log(this.categories, this.themes, this.countries, this.contentItems)
    },
      error => {
        console.log(error)
      }, () => {
        this.isLoading$.next(false);
        this.isLoading$.complete();
      })

    // Observable.forkJoin()
    // this.categories = this.contentService.getSmallCollection("categories")
    // this.themes = this.contentService.getSmallCollection("themes");
    // this.countries = this.contentService.getSmallCollection("countries")
    // this.contentItems = this.contentService.getContentItems();


    this.userInfo = this.appState.get("user")

  }


  // handlers
  typeaheadClick($event) {
    $event.stopPropagation();
  }


  addContentItem(itemData) {
    //  this.contentService.addContentItem(itemData)
    // this.uploadService.makeFileRequest("http://localhost:8010/api/contentItems/upload/1", [], itemData.files).subscribe((value) => console.log(value), err => console.log(err))
    // this.uploadService.upload("http://localhost:8010/api/contentItems/upload/1", [], itemData.files).subscribe((value) => console.log(value), err => console.log(err))

    let myUploadItem = new UploadItem();
    myUploadItem.file = itemData.files[0];
    myUploadItem.url = 'http://localhost:8010/api/contentItems/upload/1';
    // myUploadItem.headers = { ["Content-Type"]: 'multipart/form-data' };
    console.log(myUploadItem)
    // myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

    this.uploadService.onSuccessUpload = (item, response, status, headers) => {
      // success callback
      console.log("success", item, response)
    };
    this.uploadService.onErrorUpload = (item, response, status, headers) => {
      // error callback
      console.log("error", item, response)

    };
    this.uploadService.onCompleteUpload = (item, response, status, headers) => {
      // complete callback, called regardless of success or failure
      console.log("completed", item, response)

    };
    this.uploadService.upload(myUploadItem);
  }

  editItem($event) {
    console.log($event)
    this.openEdit($event)
  }



  setSelectedItem($event) {
    this.selection.contentItem = $event;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.notificationService.alert("sidebar state changed", this.sidebarVisible ? 'Now Visible' : 'Now Hidden');
  }

  getContentItems({ data }, { skip, max, sortBy, sortAsc }) {

  }


  setSortBy(event, field) {
    this.countries.sort()
  }

  switchSortOrder() {
    this.selection.sortAsc = !this.selection.sortAsc
  }


  updateSelectedDropdownItem(event: Event, type) {
    switch (type) {
      case "category":
        this.selection[type] = this.categories[event.srcElement.getAttribute('index')]
        break;
      case "theme":
        this.selection[type] = this.themes[event.srcElement.getAttribute('index')]
        break;
      case "country":
        this.selection[type] = this.countries[event.srcElement.getAttribute('index')]
        break;
    }
    this.selection[type]
  }

  //---

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

