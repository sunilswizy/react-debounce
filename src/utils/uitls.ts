

export function debounce(fn: (...args: any[]) => unknown, delay = 1000) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export function throttle(fn: (...args: any[]) => unknown, delay = 100) {
    let shouldWait = false;
    let waitedArgs: any;
    const timeOutFunc = () => {
        if(waitedArgs) {
            fn(...waitedArgs);
            waitedArgs = null;
            setTimeout(timeOutFunc, delay);
        }
        else {
            shouldWait = false;
        }
    };

    return function(...args: any) {
        if(shouldWait) {
            waitedArgs = args;
            return;
        };

        fn(...args);
        shouldWait = true;
        setTimeout(timeOutFunc, delay)
    }
}