import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../app.service';
import { ContentService, Selection, Category, ContentItemServer, ContentItemBase, Theme, Country } from '../../services';
import { NotificationsService } from 'angular2-notifications'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContentModal } from './modals/add-content-modal'
import { EditContentModal } from './modals/edit-content-modal'
/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'view-content',
  styleUrls: ['./view-content.component.css'
  ],
  templateUrl: `./view-content.component.html`

})
export class ViewContentComponent implements OnInit {
  @Input() categories: Category[];
  @Input() contentItems: ContentItemServer[];
  @Input() themes: Theme[];
  @Input() countries: Country[];
  sidebarVisible: boolean = true;


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

  constructor(
    public appState: AppState,
    private activeRoute: ActivatedRoute,
    private contentService: ContentService,
    private notificationService: NotificationsService,
    private modalService: NgbModal
  ) { }

  openAdd() {
    const modalRef = this.modalService.open(AddContentModal);
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
    
    this.categories = this.contentService.getSmallCollection("categories")
    this.themes = this.contentService.getSmallCollection("themes");
    this.countries = this.contentService.getSmallCollection("countries")
    this.contentItems = this.contentService.getContentItems();

  }


  // handlers
  addContentItem(itemData) {

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

  getContentItems({data}, {skip, max, sortBy, sortAsc}) {

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

