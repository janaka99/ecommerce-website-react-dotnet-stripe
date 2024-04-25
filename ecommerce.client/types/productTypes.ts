interface CategoryType {
  description: string;
  id: Number | number;
  name: string;
}

type ProductState = {
  Title: string;
  Price: number | undefined;
  Description: string;
  CategoryId: number | null;
  ProductId: number | null;
  Picture?: string;
  Reviews?: any[];
  Category?: CategoryType | null;
};
