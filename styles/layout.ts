import tw from 'tailwind-styled-components/dist/tailwind';

export const Container = tw.div`
	flex
  flex-col
  max-w-7xl
  w-full
  mx-auto
  h-[calc(100%-40px)]
  text-black
  selection:bg-transparent
`;
