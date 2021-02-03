import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatOnMindComponent } from './what-on-mind.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [WhatOnMindComponent],
  imports: [CommonModule, FormsModule, FlexLayoutModule],
  exports: [WhatOnMindComponent],
})
export class WhatOnMindModule {}
