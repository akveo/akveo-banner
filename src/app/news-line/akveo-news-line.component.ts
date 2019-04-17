import { ApplicationRef, ChangeDetectorRef, Component, HostBinding, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const HIDE_BANNER_KEY = 'HIDE_AKVEO_NEWS_LINE';
const BANNER_CLASS = 'akveo-news-line';

@Component({
  selector: 'akveo-news-line',
  templateUrl: './akveo-news-line.component.html',
  styleUrls: ['./akveo-news-line.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AkveoNewsLineComponent implements OnInit {

  storage: Storage;

  @HostBinding('attr.hidden')
  isHidden: true | null = null;

  @HostBinding('attr.dir')
  dir = 'ltr';

  @Input() ctaText = '';
  @Input() ctaLink = '';
  @Input() messageStart = '';
  @Input() messageEnd = '';
  @Input() showClose = true;
  @Input() uniqueId = '';
  @Input() bgGradient = [];

  @HostBinding('style.background-color')
  @Input() bgColor = '';

  @HostBinding('style.background-image')
  get gradient() {
    return this.bgGradient ? `linear-gradient(${this.bgGradient.join(',')})` : '';
  }

  @HostBinding('style.color')
  @Input() textColor = 'white';

  get id() {
    return `${HIDE_BANNER_KEY}${this.uniqueId}`;
  }

  constructor(private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef,
              private appRef: ApplicationRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.storage = window.localStorage;
    this.listenToVisibilityChange();
  }

  closeBanner() {
    if (this.storage) {
      this.storage.setItem(this.id, 'true');
    }
    this.isHidden = true;
    this.refresh();
    this.renderer.removeClass(document.documentElement, BANNER_CLASS);
  }

  protected refresh () {
    this.cd.markForCheck();
    this.appRef.tick();
  }

  protected listenToVisibilityChange() {

    const visibilityChange = (mq) => {
      this.isHidden = mq.matches && !this.isHiddenByUser() ? null : true;

      this.refresh();

      if (!this.isHidden) {
        this.renderer.addClass(document.documentElement, BANNER_CLASS);
      } else {
        this.renderer.removeClass(document.documentElement, BANNER_CLASS);
      }
    };
    const mediaQuery = window.matchMedia('(min-width: 767px)');
    mediaQuery.addListener(visibilityChange);
    visibilityChange(mediaQuery);
  }

  protected isHiddenByUser() {
    this.storage = window.localStorage;
    return this.storage && this.storage.getItem(this.id) ? true : null;
  }
}
