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
  "countries": [
    { id: 1, name: "nigeria" },
    { id: 2, name: "india" },
    { id: 3, name: "bangladesh" },
    { id: 4, name: "tanzania" }
  ],

  // contentItems:[{
  //   id:1,
  //   name: "myImage",
  //   type: "image",
  //   source: "http://media.gettyimages.com/photos/glam-retro-diva-picture-id459962755?s=170667a",
  //   icon: "http://blah.ico",
  //   description: "this is just a test",
  //   dateAdded: "05/10/2016",
  //   state: "published",
  //   postedBy: { username: "testUser",email:"my@test.com"},
  //   theme: { id:1, name:"monetization"},
  //   category: {id:1 , name:"design"},
  //   tags: ["money", "poverty"],
  //   countries: [
  //       { id:1, name: "india"},
  //       { id:5, name: "tanzania"}
  //   ]
  // }]


  contentItems: [{
    id: 1,
    name: "myImage",
    type: "image",
    source: "http://media.gettyimages.com/photos/glam-retro-diva-picture-id459962755?s=170667a",
    icon: "https://www.iconfinder.com/icons/254240/document_note_paper_text_icon",
    description: "this is just a test",
    dateAdded: "05/10/2016",
    state: "published",
    postedBy: { username: "testUser", email: "my@test.com" },
    theme: { id: 1, name: "monetization" },
    category: { id: 1, name: "design" },
    tags: ["money", "poverty"],
    country: { id: 1, name: "india" }

  },
  {
    id: 2,
    name: "Image2",
    type: "image",
    source: "http://ukmodels.jd3znlzw.netdna-cdn.com/wp-content/uploads/2015/08/shutterstock_266498825.jpg",
    icon: "http://blah.ico",
    description: "counting bills ",
    dateAdded: "05/12/2016",
    state: "published",
    postedBy: { username: "testUser1", email: "my@test.com" },
    theme: { id: 1, name: "monetization" },
    category: { id: 1, name: "design" },
    tags: ["money", "poverty"],
    country: { id: 1, name: "india" }



  },
  {
    id: 3,
    name: "calculator",
    type: "image",
    source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-3.jpg",
    icon: "http://blah.ico",
    description: "counting bills ",
    dateAdded: "05/12/2015",
    state: "published",
    postedBy: { username: "testUser2", email: "my@test.com" },
    theme: { id: 1, name: "monetization" },
    category: { id: 1, name: "design" },
    tags: ["money", "poverty"],
    country: { id: 1, name: "tanzania" }



  },
  {
    id: 4,
    name: "currency",
    type: "image",
    source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-4.jpg",
    icon: "http://blah.ico",
    description: "counting bills ",
    dateAdded: "05/12/2016",
    state: "published",
    postedBy: { username: "testUser1", email: "my@test.com" },
    theme: { id: 1, name: "monetization" },
    category: { id: 1, name: "design" },
    tags: ["money", "poverty", "bills"],
    country: { id: 1, name: "bangladesh" }



  },
  {
    id: 5,
    name: "Cash box ",
    type: "image",
    source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-5.jpg",
    icon: "https://material.io/icons/#ic_add_a_photo",
    description: "counting bills ",
    dateAdded: "05/12/2016",
    state: "published",
    postedBy: { username: "testUser1", email: "my@test.com" },
    theme: { id: 1, name: "monetization" },
    category: { id: 1, name: "design" },
    tags: ["money", "poverty"],
    country: { id: 1, name: "bangladesh" }



  },
  {
    id: 6,
    name: "Illiteracy",
    type: "image",
    source: "http://ukmodels.jd3znlzw.netdna-cdn.com/wp-content/uploads/2015/08/shutterstock_266498825.jpg",
    icon: "http://blah.ico",
    description: "counting bills ",
    dateAdded: "05/12/2016",
    state: "published",
    postedBy: { username: "testUser1", email: "my@test.com" },
    theme: { id: 1, name: "monetization" },
    category: { id: 1, name: "design" },
    tags: ["money", "poverty"],
    country: { id: 1, name: "tanzania" },



  }]

}