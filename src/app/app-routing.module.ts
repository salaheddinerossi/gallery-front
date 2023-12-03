import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthLayoutComponent} from "./components/auth-layout/auth-layout.component";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {CreateThemeComponent} from "./components/create-theme/create-theme.component";
import {CreateImageComponent} from "./components/create-image/create-image.component";
import {ThemeComponent} from "./components/theme/theme.component";
import {AuthGuard} from "./guards/auth.guard";
import {ImageCropperComponent} from "./components/image-cropper/image-cropper.component";
import {ImageResizerComponent} from "./components/image-resizer/image-resizer.component";
import {ImagePropertiesComponent} from "./components/image-properties/image-properties.component";
import {SignupComponent} from "./components/signup/signup.component";
import {AuthRedirectGuard} from "./guards/auth-redirect.guard";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  {path:'login',component:LoginComponent , canActivate:[AuthRedirectGuard]},
  {path:'signup',component:SignupComponent, canActivate:[AuthRedirectGuard]},
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomepageComponent },
      {path:"add-theme",component:CreateThemeComponent},
      {path:"add-image",component:CreateImageComponent},
      {path:"theme/:themeId",component:ThemeComponent},
      {path:"image/:imageId",component:ImageCropperComponent},
      {path:"resize/:imageId",component:ImageResizerComponent},
      {path:"properties/:imageId",component:ImagePropertiesComponent},
      {path:"similarity/:imageId",component:SearchComponent}

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
