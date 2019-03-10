const hero = {
  superman: {
    name: 'Superman',
    alias: 'Clark Kent',
  },
  batman: {
    name: 'Batman',
    alias: 'Bruce Wayne',
  },
  flash: {
    name: 'The Flash',
    alias: 'Barry Allen',
  },
};

export async function getHero(handle: string) {
  return new Promise<{ name: string; alias: string }>(res => {
    setTimeout(() => {
      res(hero[handle]);
    }, 1000);
  });
}