import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

//angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
//time picker
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

//components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './common/nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { AddUserDialogComponent } from './pages/add-user-dialog/add-user-dialog.component';
import { DialogComponent } from './common/dialog/dialog.component';

//services
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddUserDialogComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatButtonModule, 
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      
    ])
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents:[AddUserDialogComponent, DialogComponent]
})
export class AppModule { }
