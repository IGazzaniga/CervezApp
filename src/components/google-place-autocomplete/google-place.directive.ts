import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

declare var google:any;

@Directive({
  selector: '[googleplace]',
  providers: [NgModel],
  host: {
    '(input)' : 'onInputChange()'
  }
})
export class GoogleplaceDirective  {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  modelValue:any;
  autocomplete:any;
  private _el: HTMLInputElement;


  constructor(el: ElementRef,private model:NgModel) {
    this.modelValue = this.model;
  }

  ngAfterViewInit () {
    var input: HTMLInputElement = document.getElementById('autocomplete').getElementsByTagName('input')[0];
    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: 'ar'}
    };
    this.autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(this.autocomplete, 'place_changed', ()=> {
      var place = this.autocomplete.getPlace();
      if (place) {
        this.invokeEvent(place);
      }
    });
  }

  invokeEvent(place:Object) {
    this.setAddress.emit(place);
  }


  onInputChange() {
  }
}
