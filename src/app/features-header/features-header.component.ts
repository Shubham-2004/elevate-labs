import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-features-header',
  templateUrl: './features-header.component.html',
  styleUrls: ['./features-header.component.css']
})
export class FeaturesHeaderComponent {
  @Input() selectedFeature: string = ''; // Receive selected feature from parent
  @Output() featureSelected = new EventEmitter<string>(); // Emit selected feature

  selectFeature(feature: string): void {
    this.featureSelected.emit(feature); // Emit the selected feature to the parent
  }
}