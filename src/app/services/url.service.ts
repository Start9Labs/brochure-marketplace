import { inject, Injectable } from '@angular/core'
import { StoreURL } from '@start9labs/marketplace'
import { BehaviorSubject, Observable } from 'rxjs'
import { HOSTS } from '../tokens/hosts'

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly url$ = new BehaviorSubject<StoreURL>(inject(HOSTS)[0].url)

  getUrl$(): Observable<string> {
    return this.url$
  }

  toggle(api: StoreURL) {
    this.url$.next(api)
  }
}
