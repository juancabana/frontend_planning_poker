import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'button-submit',
  templateUrl: './button-submit.atom.html',
  styleUrls: ['./button-submit.atom.sass'],
})
export class ButtonSubmitComponent implements OnInit {
  @Output() submit = new EventEmitter<void>();

  @Input() public type: string = 'button';
  @Input() public isActive: boolean = false;
  @Input() public isHome: boolean = false;
  @Input() public isPlayerSubmit: boolean = false;
  @Input() public isInvite: boolean = false;
  @Input() public isAdminModal: boolean = false;

  public content: string = '';

  ngOnInit(): void {
    this.setText();
  }

  onClick() {
    if (this.type === 'submit') {
      this.submit.emit();
    }
    return;
  }

  setText() {
    this.content = this.isHome
      ? 'Crear partida'
      : this.isPlayerSubmit
      ? 'Continuar'
      : this.isInvite
      ? 'Copiar link'
      : this.isAdminModal
      ? 'Aceptar'
      : '';
  }
}
