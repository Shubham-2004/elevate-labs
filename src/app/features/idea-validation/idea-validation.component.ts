import { UbCardContentDirective, UbCardDescriptionDirective, UbCardDirective, UbCardFooterDirective, UbCardHeaderDirective, UbCardTitleDirective } from '@/components/ui/card';
import { Component } from '@angular/core';

@Component({
  selector: 'app-idea-validation',
  imports: [ UbCardContentDirective,
    UbCardDescriptionDirective,
    UbCardDirective,
    UbCardFooterDirective,
    UbCardHeaderDirective,
    UbCardTitleDirective,],
  templateUrl: './idea-validation.component.html',
  styleUrl: './idea-validation.component.css'
})
export class IdeaValidationComponent {

}
