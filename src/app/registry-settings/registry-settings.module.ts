import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RegistrySettingsComponent } from './registry-settings.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  TuiAvatarModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
} from '@taiga-ui/kit'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
} from '@taiga-ui/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiAvatarModule,
    TuiLoaderModule,
    TuiInputModule,
    TuiButtonModule,
  ],
  declarations: [RegistrySettingsComponent],
  exports: [RegistrySettingsComponent],
})
export class RegistrySettingsModule {}
