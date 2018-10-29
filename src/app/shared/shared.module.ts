import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterializeModule } from 'angular2-materialize';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    MaterializeModule
  ],
  declarations: [
    ToolbarComponent,
    LoaderComponent,
    NotFoundComponent
  ],
  providers: [Angular2TokenService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule,
    RouterModule,
    ToolbarComponent,
    MaterializeModule,
    LoaderComponent,
    NotFoundComponent
  ]
})
export class SharedModule {}
