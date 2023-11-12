export interface Post {
    id: string;
    title: string;
    permalink: string;
    category: string;
    postImgPath: any;
    excerpt: string;
    content: string;
    isFeatured: boolean;
    views: number;
    status: number;
    createdAt: Date;
  }