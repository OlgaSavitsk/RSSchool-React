export const transformNumber = (value: number) => {
  switch (value) {
    case 1:
      return `${value} item is selected`;
    default:
      return `${value} items are selected`;
  }
};
