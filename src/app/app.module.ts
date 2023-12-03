import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ThemeComponent } from './components/theme/theme.component';
import { CreateThemeComponent } from './components/create-theme/create-theme.component';
import { CreateImageComponent } from './components/create-image/create-image.component';
import { ThemeCardComponent } from './components/theme-card/theme-card.component';
import {AuthGuard} from "./guards/auth.guard";
import { ImageCardComponent } from './components/image-card/image-card.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import {ImageCropperModule} from "ngx-image-cropper";
import { ImageResizerComponent } from './components/image-resizer/image-resizer.component';
import { ImagePropertiesComponent } from './components/image-properties/image-properties.component';
import { NgChartsModule } from 'ng2-charts';
import { SignupComponent } from './components/signup/signup.component';
import {NgxMasonryModule} from "ngx-masonry";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SearchComponent} from "./components/search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AuthLayoutComponent,
    HomepageComponent,
    ThemeComponent,
    CreateThemeComponent,
    CreateImageComponent,
    ThemeCardComponent,
    ImageCardComponent,
    ImageCropperComponent,
    ImageResizerComponent,
    ImagePropertiesComponent,
    SignupComponent,
    SearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    ImageCropperModule,
    NgChartsModule,
    NgxMasonryModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
