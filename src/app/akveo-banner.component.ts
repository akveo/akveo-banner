import { ApplicationRef, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as tinycolor from 'tinycolor2';

const HIDE_BANNER_KEY = 'HIDE_AKVEO_BANNER';

@Component({
  selector: 'akveo-banner',
  templateUrl: './akveo-banner.component.html',
  styleUrls: ['./akveo-banner.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AkveoBannerComponent implements OnInit {

  storage: Storage;

  @HostBinding('attr.hidden')
  isHidden: true | null = null;

  @HostBinding('attr.dir')
  dir = 'ltr';

  @Input() heading = '';
  @Input() ctaText = '';
  @Input() ctaLink = '';
  @Input() imageUrl = '';
  @Input() imageAlt = '';
  @Input() message = '';
  @Input() showClose = true;
  @Input() uniqueId = '';
  @Input() bgGradient = [];

  @HostBinding('style.top')
  @Input() top = '';

  @HostBinding('style.left')
  @Input() left = '';

  @HostBinding('style.right')
  @Input() right = '';

  @HostBinding('style.bottom')
  @Input() bottom = '';

  @HostBinding('style.background-color')
  @Input() bgColor = '';

  @HostBinding('style.background-image')
  get gradient() {
    return this.bgGradient ? `linear-gradient(${this.bgGradient.join(',')})` : '';
  }

  @HostBinding('style.color')
  @Input() textColor = 'white';

  @Input() buttonBgColor = '#fff';
  @Input() buttonTextColor = '#000';

  @HostBinding('style.box-shadow')
  get shadow() {
    const color = this.bgGradient && this.bgGradient.length ? this.bgGradient[1] : this.bgColor;
    return this.sanitizer.bypassSecurityTrustStyle(`0 2px 4px 0 ${tinycolor(color).setAlpha(0.5)}`);
  }

  get buttonShadow() {
    return this.sanitizer.bypassSecurityTrustStyle(`2px 3px 6px 0 ${tinycolor(this.buttonBgColor).setAlpha(0.5)}`);
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

    this.refresh();
  }

  closeBanner() {
    if (this.storage) {
      this.storage.setItem(this.id, 'true');
    }
    this.isHidden = true;
    this.refresh();
  }

  protected refresh () {
    this.cd.markForCheck();
    this.appRef.tick();
  }
}
