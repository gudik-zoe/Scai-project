import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatOnMindComponent } from './what-on-mind.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WhatOnMindComponent],
  imports: [CommonModule, FormsModule],
  exports: [WhatOnMindComponent],
})
export class WhatOnMindModule {}
