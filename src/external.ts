export function external(num: number) {
    return new Promise<number>(res => {
      setTimeout(() => res(num + 1), 1000);
    });
  }

  