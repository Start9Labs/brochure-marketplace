import { Injectable } from '@angular/core'
import { BaseRouteReuseStrategy } from '@angular/router'

@Injectable()
export class RouteReuseStrategyService extends BaseRouteReuseStrategy {
  override shouldReuseRoute(): boolean {
    return false
  }
}
