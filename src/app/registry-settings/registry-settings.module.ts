import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RegistrySettingsComponent } from './registry-settings.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  TuiAvatarModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import { StoreIconComponentModule } from '@start9labs/marketplace'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiAvatarModule,
    TuiLoaderModule,
    StoreIconComponentModule,
  ],
  declarations: [RegistrySettingsComponent],
  exports: [RegistrySettingsComponent],
})
export class RegistrySettingsModule {}
