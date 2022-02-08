// class M_ApiFeatures {
//   constructor(query, req) {
//     this.query = query;
//     this.req = req;
//   }

//   sort() {
//     if (this.req.query.sort) {
//       if (this.req.query.sort[0] !== '-')
//         this.query = this.query.findAll({
//           where: {
//             userId: this.req.session.user.userId,
//           },
//           order: [[this.req.query.sort, 'ASC']],
//         });
//       else {
//         const sliced = this.req.query.sort.slice(1);
//         this.query = this.query.findAll({
//           where: {
//             userId: this.req.session.user.userId,
//           },
//           order: [[sliced, 'DESC']],
//         });
//       }
//     } else {
//       this.query = this.query.findAll({
//         where: {
//           userId: this.req.session.user.userId,
//         },
//         order: [['itemId', 'ASC']],
//       });
//     }
//     return this;
//   }

//   paginate() {
//     if (this.req.query.page && this.req.query.limit) {
//       const page = this.req.query.page * 1 || 1;
//       const limit = this.req.query.limit * 1 || 1;
//       const skip = (page - 1) * limit;

//       this.query = this.query.findAll({
//         where: {
//           userId: this.req.session.user.userId,
//         },
//         offset: skip,
//         limit: limit,
//       });
//     }
//     return this;
//   }

//   fields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(',');
//       this.query = this.query.findAll({
//         where: {
//           userId: this.req.session.user.userId,
//         },
//         attributes: fields,
//       });
//     } else {
//       this.query = this.query.findAll();
//     }
//     return this;
//   }

// filter() {
//   const queryObj = { ...this.queryString };
//   const excludedFields = ['page', 'sort', 'limit', 'fields'];
//   excludedFields.forEach((el) => delete queryObj[el]);
//   let queryStr = JSON.stringify(queryObj);
//   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//   // console.log(typeof JSON.parse(queryStr));

//   this.query.find(JSON.parse(queryStr));

//   return this;
// }
// }
// export { M_ApiFeatures };
