export interface INews {
  author: string
  category: CategoriType[]
  description: string
  id: string
  image: string
  language: string
  published: string
  title: string
  url: string
}

export interface IBanner {
  description: string
  id: string
  image: string
  title: string
  url: string
  date: string
  rate: number
}

export interface CategoriApiResponse {
  category: CategoriType[]
  description: string
  status: string
}

export interface NewsApiResponse {
  news: INews[]
  page: number
  status: string
}

export interface IPaginationProps {
  totalPage: number;
  hendlePrevPage: () => void;
  hendleNextPage: () => void;
  hendlePageClick: (page: number) => void;
  currentPage: number;
}

export interface IFilters {
  page_number: number
  page_size: number
  category: CategoriType | null
  keywords: string
}
export type ParamsType = Partial<IFilters>
export type SkeletonType = 'banner' | 'item'
export type DirectionType = 'row' | 'column'



export type CategoriType =
  | "regional"
  | "technology"
  | "lifestyle"
  | "business"
  | "general"
  | "programming"
  | "science"
  | "entertainment"
  | "world"
  | "sports"
  | "finance"
  | "academia"
  | "politics"
  | "health"
  | "opinion"
  | "food"
  | "game"
  | "fashion"
  | "academic"
  | "crap"
  | "travel"
  | "culture"
  | "economy"
  | "environment"
  | "art"
  | "music"
  | "notsure"
  | "CS"
  | "education"
  | "redundant"
  | "television"
  | "commodity"
  | "movie"
  | "entrepreneur"
  | "review"
  | "auto"
  | "energy"
  | "celebrity"
  | "medical"
  | "gadgets"
  | "design"
  | "EE"
  | "security"
  | "mobile"
  | "estate"
  | "funny";