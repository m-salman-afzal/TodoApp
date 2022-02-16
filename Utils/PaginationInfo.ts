import Pagination from './Pagination';

class PaginationInfo<T> extends Pagination {
  totalItems: number;
  data: T[];

  constructor(perPage: number, page: number, totalItems: any, data: T[]) {
    super(perPage, page);
    this.totalItems = totalItems;
    this.data = data;
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.limit());
  }

  hasNext(): boolean {
    return this.pageNo() < this.totalPages();
  }

  hasPrev() {
    return this.pageNo() > 1;
  }

  nextPageInfo() {
    return {
      page: this.pageNo() + 1,
      limit: this.limit(),
    };
  }

  prevPageInfo() {
    return {
      page: this.pageNo() - 1,
      limit: this.limit(),
    };
  }

  getPaginationInfo() {
    return {
      totalPages: this.totalPages(),
      hasNext: this.hasNext(),
      hasPrev: this.hasPrev(),
      nextPageInfo: this.nextPageInfo(),
      prevPageInfo: this.prevPageInfo(),
      data: this.data,
    };
  }
}
export default PaginationInfo;
