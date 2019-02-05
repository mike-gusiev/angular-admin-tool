import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { FileSystemFileEntry, UploadEvent, UploadFile } from 'ngx-file-drop';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'at-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
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
  ],
})
export class UploadPageComponent implements OnInit, OnDestroy {
  public uploadGroup: FormGroup;
  public tooltipGroup: FormGroup;
  public icons: any = environment.imageIcons;
  public files: UploadFile[] = [];
  public selectedFile: File = null;
  public isFile = false;
  public isSuccess = false;
  public selectedTooltipPosition = 'above';
  public subscription: Subscription[] = [];

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updateImages: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private apiService: ApiService) {
  }

  ngOnInit() {
    this.generateForms();
    this.convertTooltipData();
  }

  generateForms() {
    this.uploadGroup = this.fb.group({
      uploadControl: ['', Validators.required],
      dropControl: ['', Validators.required]
    });
    this.tooltipGroup = this.fb.group({
      'description': new FormControl(
        null,
        [Validators.required]
      ),
      'side': new FormControl(
        null,
        [Validators.required]
      )
    });
  }

  handleFormValidator(formControlName: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).value !== null && formGroup.get(formControlName).invalid;
  }

  onFileChange(event) {
    this.selectedFile = event.currentTarget.files[0];
    this.isFile = true;
  }

  dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.selectedFile = file;
          this.isFile = true;
        });
      }
    }
  }

  convertTooltipData(): string {
    return JSON.stringify(this.tooltipGroup.value);
  }

  onSubmit(file: File, description: string) {
    this.subscription.push(
      this.apiService.uploadImages(file, description)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
        if (res.status === 200) {
          this.isSuccess = true;
          this.updateImages.emit(res);
        } else {
          this.isSuccess = false;
        }
      })
    );
  }

  closeUploadWindow() {
    this.closeModal.emit(true);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.subscription.map((item: Subscription) => item.unsubscribe());
  }
}
