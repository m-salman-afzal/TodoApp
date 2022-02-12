const catchAsync = (fn: any): any => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};
export { catchAsync };
