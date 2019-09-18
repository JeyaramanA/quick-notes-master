import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SimpleNotificationsModule } from 'angular2-notifications';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppComponent } from './app.component';
import { QuickNoteDialogComponent, ConfirmDialogComponent, ConfirmationDialogService } from './dialogs';
import { NoteService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    QuickNoteDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFontAwesomeModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    StorageServiceModule
  ],
  entryComponents: [
    QuickNoteDialogComponent,
    ConfirmDialogComponent
  ],
  providers: [
    ConfirmationDialogService,
    NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
