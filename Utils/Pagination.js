class Pagination {
  perPage = 3;
  page = 1;
  constructor(perPage, page) {
    this.perPage = perPage;
    this.page = page;
  }

  skip() {
    this.perPage = this.perPage * 1 || 1;
    this.page = this.page * 1 || 1;
    return (this.page - 1) * this.perPage;
  }
}

export { Pagination };
