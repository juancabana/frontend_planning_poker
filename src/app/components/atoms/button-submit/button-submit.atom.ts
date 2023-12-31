import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-submit',
  templateUrl: './button-submit.atom.html',
  styleUrls: ['./button-submit.atom.sass'],
})
export class ButtonSubmitComponent {
  @Output() submit = new EventEmitter<void>();

  @Input() public isActive: boolean = false;
  @Input() public isHome: boolean = false;
  @Input() public isPlayerSubmit: boolean = false;
  @Input() public isInvite: boolean = false;
  @Input() public isAdminModal: boolean = false;

  constructor() {
    this.setText();
  }

  onClick() {
    this.submit.emit();
  }

  setText() {
    return this.isHome
      ? 'Crear partida'
      : this.isPlayerSubmit
      ? 'Continuar'
      : this.isInvite
      ? 'Copiar link'
      : this.isAdminModal
      ? 'Aceptar'
      : false;
  }
}
