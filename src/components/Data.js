// Our product database.
const sampleProducts = [
  {
    id: 1,
    name: "Gucci - New Ace Leather Sneakers",
    category: "Shoes",
    price: 590,
    description: "",
    popular: true,
    imageUrls: ["https://image.s5a.com/is/image/saks/0400087200066_300x400.jpg"]
  },
  {
    id: 2,
    name: "iPhone11",
    category: "Electronics",
    price: 101,
    description: "",

    popular: true,
    imageUrls: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-gold-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566953859132"
    ]
  },
  {
    id: 3,
    name: "Nokia 3310",
    category: "Electronics",
    price: 10,

    popular: true,
    imageUrls: [
      "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:180&output-quality=80"
    ]
  }
];

// List of item categories.
const categories = [
  {
    name: "All categories",
    icon: "list"
  },
  {
    name: "Shoes",
    icon: "group"
  },
  {
    name: "Electronics",
    icon: "watch"
  }
];

// Generate data for rendering menu on the left.
const dataForTheMenu = (categories => {
  let items = [
    { name: "Home page", url: "/", icon: "home", id: 0 },
    {
      name: "Product categories",
      id: 1,
      children: categories.map((x, i) => {
        return {
          name: x.name,
          id: 2 + i,
          url: "/?category=" + x.name + "&directClick=true",
          icon: x.icon
        };
      })
    }
  ];

  return items;
})(categories);

export { sampleProducts, categories, dataForTheMenu };
