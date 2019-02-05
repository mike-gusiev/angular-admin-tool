import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'at-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('EnterLeave', [
      transition(':enter', [
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(100, style({opacity: 0}))
      ])
    ])
  ]
})
export class ImageComponent implements OnInit, OnDestroy {
  public tooltipData = null;
  public subscription: Subscription[] = [];

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
  @Input() icons: any;
  @Input() image: any;
  @Output() updateImageList: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getTooltipData();
  }

  deleteImage(id: string) {
    this.subscription.push(
      this.apiService.deleteImage(id).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data => this.updateImageList.emit(id))
    );
  }

  getTooltipData() {
    this.tooltipData = JSON.parse(this.image.description);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.subscription.map((item: Subscription) => item.unsubscribe());
  }
}
