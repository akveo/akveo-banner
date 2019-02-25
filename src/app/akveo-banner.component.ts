import { ApplicationRef, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as tinycolor from 'tinycolor2';

const HIDE_BANNER_KEY = 'HIDE_AKVEO_BANNER';

@Component({
  selector: 'akveo-banner',
  templateUrl: './akveo-banner.component.html',
  styleUrls: ['./akveo-banner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AkveoBannerComponent implements OnInit {

  storage: Storage;

  @HostBinding('attr.hidden')
  isHidden: true | null = null;

  @HostBinding('attr.dir')
  dir = 'ltr';

  @Input() heading = 'Some great news today!';
  @Input() ctaText = 'Share';
  @Input() ctaLink = 'https://akveo.com';
  @Input() imageLink = '';
  @Input() imageAlt = '';
  @Input() message = 'your love';
  @Input() showClose = true;
  @Input() uniqueId = '';

  @HostBinding('style.background-color')
  @Input() bgColor = '#3366FF';

  @HostBinding('style.color')
  @Input() textColor = 'white';

  @HostBinding('style.box-shadow')
  get shadow() {
    return this.sanitizer.bypassSecurityTrustStyle(`0 2px 4px 0 ${tinycolor(this.bgColor).setAlpha(0.5)}`);
  }

  get id() {
    return `${HIDE_BANNER_KEY}${this.uniqueId}`;
  }

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef, private appRef: ApplicationRef) {
  }

  ngOnInit() {
    this.storage = window.localStorage;
    this.isHidden = this.storage && this.storage.getItem(this.id)
      ? true
      : null;

    this.cd.markForCheck();
    this.appRef.tick();
  }

  closeBanner() {
    if (this.storage) {
      this.storage.setItem(this.id, 'true');
    }
    this.isHidden = true;

    this.cd.markForCheck();
    this.appRef.tick();
  }
}
