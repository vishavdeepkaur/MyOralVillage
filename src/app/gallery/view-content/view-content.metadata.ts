export class ContentItemBase {
    title:string
    type: string
    description: string
    postedBy : string
    dateAdded: string
    theme : Theme
    category: Category
    country : Country
    tag : string[]
}

export class ContentItemServer extends ContentItemBase{
    id:string
    source:string
    icon: string  
}




export interface Category {
    name :string        
}

export interface Theme {
    name :string   
}

export interface Country {
    name :string   
}


