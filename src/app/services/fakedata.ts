export default {
  "categories": [
    { id: 1, name: "designs" },
    { id: 2, name: "wireframes" },
    { id: 3, name: "reports" },
    { id: 4, name: "photos" },
    { id: 5, name: "videos" },

  ],
  "themes": [
    { id: 1, name: "monetization" },
    { id: 2, name: "illiteracy" }
  ],
  "countries":[ 
      { id: 1, name: "nigeria" },
      { id: 2, name: "india" },
      { id: 3, name: "bangladesh" },
      { id: 4, name: "tanzania" }
  ],

  contentItems:[{
    id:1,
    name: "myImage",
    type: "image",
    source: "http://media.gettyimages.com/photos/glam-retro-diva-picture-id459962755?s=170667a",
    icon: "http://blah.ico",
    description: "this is just a test",
    dateAdded: "05/10/2016",
    state: "published",
    postedBy: { username: "testUser",email:"my@test.com"},
    theme: { id:1, name:"monetization"},
    category: {id:1 , name:"design"},
    tags: ["money", "poverty"],
    countries: [
        { id:1, name: "india"},
        { id:5, name: "tanzania"}
    ]
  }]
}