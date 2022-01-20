import Link from 'next/link';
import tw from 'tailwind-styled-components';

const Header = () => {
  return (
    <Container>
      <Logo>
        <Link href='/'>
          <img src='/logo.svg' alt='' />
        </Link>
      </Logo>
      <Link href='/post'>Post</Link>
    </Container>
  );
};

export default Header;

const Container = tw.header`
	flex
	space-x-4
	items-center
	p-2
	shadow-md
	selection:bg-transparent
`;
const Logo = tw.h1`
	w-10
	cursor-pointer
`;
