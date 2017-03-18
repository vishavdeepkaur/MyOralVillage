export class ContentItemBase {
    title:string
    type: string
    description: string
    postedBy : string
    theme : Theme
    category: Category
    countries : Country[]
    tag : string[]
}

export class ContentItemServer extends ContentItemBase{
    id:string
    source:string
    icon: string
    state:string    
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


