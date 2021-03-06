export class Category { 
  name: string;
  constructor() {
      this.name = "";   
  }
}

export class ContentItemBase {
    name:string
    type: string
    description: string
    postedBy : User
    dateAdded: string
    theme : Theme
    category: Category
    country : Country
    tags : string[]
}

export class ContentItemServer extends ContentItemBase{
    id:number
    source:string
    icon: string
    state:string    
}

export class Country{
    id:number
    name:string
}

export class Theme {
    name :string   
}


export interface User {
    username:string,
    email: string
}
export interface Selection {
    category:Category,
    theme:Theme,
    contentItem: ContentItemServer
    country: Country,
    sortBy: string
    sortAsc: boolean
}

export enum ContentType{
    IMAGE,VIDEO,REPORT,DESIGN,WIREFRAME,OTHER
}


// //
// export class Category { 
//   name: string;
//   constructor() {
//       this.name = "";   
//   }
// }

// export class ContentItemBase {
//     name:string
//     type: string
//     description: string
//     userAdded : User
//     userUpdated : User
//     dateAdded: number
//     dateUpdated: number
//     theme : Theme
//     category: Category
//     country : Country
//     tags : string[]
// }

// export class ContentItemServer extends ContentItemBase{
//     id:number
//     source:string
//     icon: string
//     state:string    
// }

// export class Country{
//     id:number
//     name:string
// }

// export class Theme {
//     name :string   
// }


// export interface User {
//     username:string,
//     email: string,
//     firstName: string,
//     lastName : string,
//     role : string
// }

// export interface Selection {
//     category:Category,
//     theme:Theme,
//     contentItem: ContentItemServer
//     country: Country,
//     sortBy: string
//     sortAsc: boolean
// }

// export enum ContentType{
//     IMAGE,VIDEO,REPORT,DESIGN,WIREFRAME,OTHER
// }
