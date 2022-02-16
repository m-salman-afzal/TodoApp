import { pagination_I } from '../interfaces';

class Pagination implements pagination_I {
  private perPage: number;
  private page: number;

  constructor(perPage: number, page: number) {
    this.perPage = perPage;
    this.page = page;
  }

  // * getter for perPage
  limit(): number {
    return this.perPage;
  }

  // * getter for page
  pageNo(): number {
    return this.page;
  }

  offset(): number {
    return (this.page - 1) * this.perPage;
  }
}

export default Pagination;
