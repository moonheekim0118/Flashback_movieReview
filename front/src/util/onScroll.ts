interface ScrollHandler {
  (dispatch: () => void, condition1: boolean, condition2: boolean): (
    this: Window,
    ev: Event
  ) => any;
}

export const ScrollHandler: ScrollHandler = (
  dispatch,
  condition1,
  condition2
) => {
  return function (this, ev) {
    if (
      window.pageYOffset + document.documentElement.clientHeight + 10 >=
      document.documentElement.scrollHeight
    ) {
      if (condition1 && !condition2) {
        dispatch();
      }
    }
  };
};