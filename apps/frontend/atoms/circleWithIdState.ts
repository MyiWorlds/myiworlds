import { atomFamily, selector, } from 'recoil';

// Chnage to circle
export const circleWithId = atomFamily({
  key: `circle`,
  default: {
    title: '',
    subtitle: '',
    description: '',
    string: '',
  }
});

export const titleState = (id: string) => selector({
  key: 'titleState',
  get: ({get}) => {
    const circle = get(circleWithId(id));
    if (circle && circle.title) {
      return circle.title.length;
    }
  }
});
