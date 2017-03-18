import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../app.service';
import { ContentService, Selection, Category, ContentItemServer, ContentItemBase, Theme, Country } from '../../services';
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
    private contentService: ContentService
  ) { }

  public ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe((value: any) => {
      this.contentTypeParam = value.category;
      this.selection.category = value.category;
      console.log(value);
    })

    this.categories = this.contentService.getSmallCollection("categories").sort((x) => x[this.selection.sortBy]);
    this.themes = this.contentService.getSmallCollection("themes");
    this.countries = this.contentService.getSmallCollection("countries").sort((x, y) => x[this.selection.sortBy] > y[this.selection.sortBy]);
    console.log(this.countries)
    this.contentItems = this.contentService.getContentItems();

  }


  // handlers


  setSortBy(event, field) {
    this.countries.sort()
  }

  getContentItems({data}, {range,sortBy,sortAsc}){

  }

  switchSort() {
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

