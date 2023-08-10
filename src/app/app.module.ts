import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, TitleStrategy } from '@angular/router';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { I18nTitleStrategy } from './i18n-title-strategy';

@NgModule({
    declarations: [
        AppComponent,
        ForbiddenComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], { bindToComponentInputs: true }),
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: i18nLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AuthModule.forRoot({
            domain: "domain",
            clientId: "clientId",
            authorizationParams: {
                redirect_uri: window.location.origin
            },
            errorPath: '/forbidden',
            useRefreshTokens: true,
            cacheLocation: 'localstorage'
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true
        },
        {
            provide: TitleStrategy,
            useClass: I18nTitleStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function i18nLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
