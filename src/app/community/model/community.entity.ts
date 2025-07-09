export class Community {
  id: number;
  name:string;
  memberQuantity:string;
  image: string;
 
  constructor(community:{id?: number, name?: string, memberQuantity?:string, image?: string}) {
    this.id = community.id || 0;
    this.name = community.name|| '';
    this.memberQuantity = community.memberQuantity || '';
    this.image = community.image || '';
  }
}
