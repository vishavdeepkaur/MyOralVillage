import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AppState } from './app.service';
import { ContentService } from './services'
/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: `./app.component.html`

})
export class AppComponent implements OnInit {
  private data;

  constructor(
    public appState: AppState,
    public contentService: ContentService
  ) { }

  public ngOnInit() {
    this.contentService.getTest().subscribe(val=> {this.appState.set("testData", val); console.log(val,"subscription complete")})
    //this.appState.set("test", "value")
    
    console.log('Initial App State', this.appState.state);
    // this.data = this.route.snapshot.data['data']
  }
}

