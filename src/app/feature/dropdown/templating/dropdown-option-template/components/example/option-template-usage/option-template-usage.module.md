import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
  
import { DropdownModule } from 'ornamentum';
  
import { OptionTemplateUsageComponent } from './option-template-usage.component';

@NgModule({
 bootstrap: [OptionTemplateUsageComponent],
 declarations: [OptionTemplateUsageComponent],
 imports: [
    BrowserModule, 
    DropdownModule.forRoot()
  ]
})
export class OptionTemplateUsageModule {
}
