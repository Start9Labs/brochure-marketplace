import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RegistrySettingsComponent } from './registry-settings.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
} from '@taiga-ui/core'
import { StoreIconComponentModule } from '@start9labs/marketplace'

@NgModule({
  imports: [
    CommonModule,
    TuiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiLoaderModule,
    StoreIconComponentModule,
  ],
  declarations: [RegistrySettingsComponent],
  exports: [RegistrySettingsComponent],
})
export class RegistrySettingsModule {}
