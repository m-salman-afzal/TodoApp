import { pagination_I } from '../interfaces';

class Pagination implements pagination_I {
  private perPage: number;
  private page: number;

  constructor(perPage: number, page: number) {
    this.perPage = perPage;
    this.page = page;
  }

  limit() {
    return this.perPage;
  }

  offset(): number {
    return (this.page - 1) * this.perPage;
  }
}

export default Pagination;
