import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {Community} from '../model/community.entity';
import {catchError, map, Observable} from 'rxjs';

const communityResourceEndPoint = environment.communityEndpointPath || '';

@Injectable({
  providedIn: 'root'
})
export class CommunityService extends BaseService<Community>{

  constructor() {
    super();
    this.resourceEndpoint = communityResourceEndPoint;
  }

override getAll(): Observable<Community[]> {
  return this.http.get<any>(this.resourcePath(), this.httpOptions).pipe(
    map(data => {
      let communitiesArray = [];

      if (Array.isArray(data)) {
        communitiesArray = data;
      } else if ('communities' in data && Array.isArray(data.communities)) {
        communitiesArray = data.communities;
      } else {
        console.error("❌ El JSON no tiene el formato esperado.");
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
