export interface Post {
  _id: string;
  publishedAt: string;
  title: string;
  author: Author;
  description: string;
  mainImage: Image;
  slug: Slug;
  body: any;
}

interface Author {
  name: string;
  image: string;
}

interface Image {
  asset: {
    url: string;
  };
}

interface Slug {
  current: string;
}
