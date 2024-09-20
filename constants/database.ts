// News (Berita)

type Category = {
  id: string;
  name: string;
};

type NewsArticle = {
  id: string;
  title: string;
  publicationDate: Date;
  categoryId: string; // Referensi ke kategori
  image: {
    url: string;
    altText: string;
    thumbnailUrl: string;
  };
  content: string;
};
