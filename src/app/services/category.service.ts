import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly category$ = new BehaviorSubject<string>('featured')
  private readonly query$ = new BehaviorSubject<string>('')

  getCategory$(): Observable<string> {
    return this.category$
  }

  changeCategory(category: string) {
    this.category$.next(category)
  }

  setQuery(query: string) {
    this.query$.next(query)
  }

  getQuery$(): Observable<string> {
    return this.query$
  }

  resetQuery() {
    this.query$.next('')
  }
}
