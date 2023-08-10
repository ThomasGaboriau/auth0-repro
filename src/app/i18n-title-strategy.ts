import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class I18nTitleStrategy extends TitleStrategy {
    public constructor(
        private translateService: TranslateService,
        private readonly title: Title) {
        super();
    }

    public override updateTitle(snapshot: RouterStateSnapshot): void {
        console.log(snapshot);
        const title = this.buildTitle(snapshot);
        if (title) {
            const translatedTitle = this.translateService.instant(title);
            this.title.setTitle(translatedTitle);
        }
    }
}
