export interface PaginatedData {
  currentPage: number;
  pageSize:    number;
  totalCount:  number;
  totalPages:  number;
  hasPrevious: boolean;
  hasNext:     boolean;
  data:        any[];
}