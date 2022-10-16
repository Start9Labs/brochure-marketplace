import { Component } from '@angular/core'

@Component({
  selector: 'app-notes',
  template: `
    <div class="g-content">
      <ion-button routerLink=".." fill="clear" color="dark">
        <ion-icon slot="start" name="arrow-back"></ion-icon>
        Back
      </ion-button>
      <release-notes></release-notes>
    </div>
  `,
})
export class NotesComponent {}
