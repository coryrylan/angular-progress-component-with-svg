import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ProgressComponent } from './progress/progress.component';

@Component({
  imports: [CommonModule, ProgressComponent],
  selector: 'app-root',
  template: `
  <h1>Angular Progress Component with SVG</h1>
  <a href="https://coryrylan.com/blog/angular-progress-component-with-svg">Tutorial at coryrylan.com</a>
  
  <h3>Static</h3>
  <app-progress [value]="75"></app-progress>
  
  <h3>Dynamic</h3>
  <app-progress [value]="progress | async"></app-progress>
  `,
})
export class App {
  readonly progress: Observable<number>;

  constructor() {
    this.progress = this.emulateProgress();
  }

  emulateProgress() {
    return new Observable<number>(observer => {
      let val = 0;
      const interval = setInterval(() => {
        if (val < 100) {
          val++;
        } else {
          val = 0;
        }

        observer.next(val);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    });
  }
}

bootstrapApplication(App);
