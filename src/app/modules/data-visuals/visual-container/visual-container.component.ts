import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.service';
import { DataVisualsService } from '../../../services';
import { BehaviorSubject } from 'rxjs/Rx'

@Component({
  selector: 'visual-container',
  styleUrls: ['./visual-container.component.css'],
  templateUrl: `./visual-container.component.html`
})
export class VisualContainerComponent implements OnInit {
  private data;
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private error = null;

  constructor(
    public appState: AppState,
    public dataService: DataVisualsService
  ) { }

  public ngOnInit() {


    this.isLoading$.next(true);


    this.dataService.getGeoData().flatMap(data => {
      this.data = {};
      this.data.data = data;
      return this.dataService.getSurveyData();
    }).subscribe(data => {
      this.data.results = data;
    },
      error => {
        console.log(error)
        this.error = error;
      }, () => {
        this.isLoading$.next(false);
        this.isLoading$.complete();
        console.log('done')
      });


    // this.dataService.getGeoData().concat(this.dataService.getSurveyData()).subscribe(
    //   data => {
    //     console.log(data)
    //     this.data = data;
    //   },
    //   error => {
    //     console.log(error)

    //     this.error = error;    //   }, () => {
    //     this.isLoading$.next(false);
    //     this.isLoading$.complete();
    //     console.log('done')
    //   });
  }


}

