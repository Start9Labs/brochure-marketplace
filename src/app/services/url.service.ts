import { inject, Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { HOSTS } from '../tokens/hosts'

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly hosts = inject(HOSTS)

  private readonly url$ = new BehaviorSubject<string>(inject(HOSTS)[0].url)
  readonly alternative$ = this.getUrl$().pipe(
    map(current => this.hosts.find(({ url }) => url !== current)),
  )

  getUrl$(): Observable<string> {
    return this.url$
  }

  getAlt$() {
    return this.alternative$
  }

  toggle(api: string) {
    this.url$.next(api)
  }
}
