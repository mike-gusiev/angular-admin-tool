import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject, Subscription } from 'rxjs';

import { environment } from '@env/environment';
import { ApiService } from '@services/api.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'at-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss'],
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
export class ImagesListComponent implements OnInit, OnDestroy {
  public imageIcons: any = environment.imageIcons;
  public images: any = null;
  public isUpload = false;
  public subscription: Subscription[] = [];

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.subscription.push(
      this.apiService.getImages()
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: any) => this.images = data)
    );
  }

  updateImageList() {
    this.getImages();
  }

  filterImageList(id) {
    this.images.data = this.images.data.filter((image: any) => image.deletehash !== id);
  }

  handleUpload() {
    this.isUpload = !this.isUpload;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.subscription.map((item: Subscription) => item.unsubscribe());
  }
}
