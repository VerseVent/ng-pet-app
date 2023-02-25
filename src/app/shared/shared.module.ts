import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  exports: [ReactiveFormsModule, CommonModule],
})
export class SharedModule {}
