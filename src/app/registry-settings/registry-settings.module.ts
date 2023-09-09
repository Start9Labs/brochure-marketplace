import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RegistrySettingsComponent } from './registry-settings.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit'
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
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiLoaderModule,
    StoreIconComponentModule,
  ],
  declarations: [RegistrySettingsComponent],
  exports: [RegistrySettingsComponent],
})
export class RegistrySettingsModule {}
