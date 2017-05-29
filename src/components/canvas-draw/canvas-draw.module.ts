import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanvasDrawComponent } from './canvas-draw';

@NgModule({
  declarations: [
    CanvasDrawComponent,
  ],
  imports: [
    IonicPageModule.forChild(CanvasDrawComponent),
  ],
  exports: [
    CanvasDrawComponent
  ]
})
export class CanvasDrawComponentModule {}
