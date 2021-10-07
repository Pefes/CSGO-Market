import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'snake-border-card',
  templateUrl: './snake-border-card.component.html',
  styleUrls: ['./snake-border-card.component.scss']
})
export class SnakeBorderCardComponent {

  @Output()
  public click: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public buttonClickHandler(): void {
    this.click.emit();
  }
}
