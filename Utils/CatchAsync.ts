const catchAsync = (fn: any): any => {
  return (req: any, res: any, next: any): any => {
    fn(req, res, next).catch(next);
  };
};
export { catchAsync };
