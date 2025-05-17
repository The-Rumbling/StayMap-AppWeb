import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { Community } from '../model/community.entity';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService extends BaseService<Community> {

  constructor() {
    super();
    this.resourceEndpoint = '/db.json'; // ✅ usa archivo estático desde public/
  }

  override getAll(): Observable<Community[]> {
    return this.http.get<any>(this.resourcePath(), this.httpOptions).pipe(
      map(data => {
        const communitiesArray = Array.isArray(data)
          ? data
          : Array.isArray(data.communities)
            ? data.communities
            : [];

        if (!communitiesArray.length) {
          console.warn('⚠️ No se encontraron comunidades en el JSON');
        }

        return communitiesArray.map((item: any) => new Community({
          id: item.id,
          name: item.name || item.nombre || '',
          memberQuantity: item.memberQuantity || item.cantMiembros || '',
          image: item.image || item.imagen || ''
        }));
      }),
      catchError(this.handleError)
    );
  }
}
