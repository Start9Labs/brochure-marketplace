import { Injectable } from '@angular/core'
import { AbstractCategoryService } from '@start9labs/marketplace'
import { Observable } from 'rxjs'

@Injectable()
export class CategoryService extends AbstractCategoryService {
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
