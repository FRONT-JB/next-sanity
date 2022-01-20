import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';
import Header from './Header';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;

const Container = tw.div`
	flex
	flex-col
	max-w-7xl
	mx-auto
	w-full
	h-full
	text-black
	selection:bg-transparent
`;
