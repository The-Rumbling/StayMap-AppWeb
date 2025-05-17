import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { Community } from '../model/community.entity';
import { catchError, map, Observable } from 'rxjs';

const communityResourceEndPoint = '/db.json'; // 🔁 Usa directamente el archivo estático

@Injectable({
  providedIn: 'root'
})
export class CommunityService extends BaseService<Community> {

  constructor() {
    super();
    this.resourceEndpoint = communityResourceEndPoint;
  }

  override getAll(): Observable<Community[]> {
    return this.http.get<any>(this.resourcePath(), this.httpOptions).pipe(
      map(data => {
        const communitiesArray = Array.isArray(data.communities)
          ? data.communities
          : [];

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

  // ⚠️ Estas funciones no funcionarán si usas solo un JSON estático.
  // create(), update() y delete() dependen de json-server o un backend real.
}
