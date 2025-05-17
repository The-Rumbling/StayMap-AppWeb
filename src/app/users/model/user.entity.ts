export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  type: string;
  location:{
    lat:number;
    lng:number;
  }

  constructor(user:{id?:number, name?:string, email?:string, profileImage?:string, type?:string, location?:{lat:number, lng:number}, password?:string}) {
    this.id = user.id || 0;
    this.name = user.name || "";
    this.email = user.email || "";
    this.profileImage = user.profileImage || "";
    this.type = user.type || "";
    this.location = user.location || {lat:0, lng:0 };
    this.password=user.password || "";
  }
}
