import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { EventComponent } from './views/event/event.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { PickerComponent } from './components/picker/picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { EventEditComponent } from './views/event-edit/event-edit.component';
import { DayTimePipe } from './pipes/day-time.pipe';
import { DayPipe } from './pipes/day.pipe';
import { FreqPipe } from './pipes/freq.pipe';
import { AlarmPickerComponent } from './components/alarm-picker/alarm-picker.component';
import { AlarmPipe } from './pipes/alarm.pipe';
import { DrawerComponent } from './components/drawer/drawer.component';
import { AboutComponent } from './views/about/about.component';
import { ImportExportComponent } from './views/import-export/import-export.component';
import { EventTableComponent } from './components/event-table/event-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EventComponent,
    PickerComponent,
    TimePickerComponent,
    EventEditComponent,
    DayTimePipe,
    DayPipe,
    FreqPipe,
    AlarmPickerComponent,
    AlarmPipe,
    DrawerComponent,
    AboutComponent,
    ImportExportComponent,
    EventTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TextFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
