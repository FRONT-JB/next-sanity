import { Seo } from 'Components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';
import { Post } from 'typings';
import { sanityClient, urlFor } from '../sanity';

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  const router = useRouter();

  const handleDetail = (slug: string) => {
    if (!slug) return;
    router.push(`/post/${slug}`);
  };

  return (
    <Container>
      <Seo title='Main' />
      <MainVisual>
        <MainText.Container>
          <MainText.Text>
            <MainText.TextEm>Blog</MainText.TextEm> is a place to write, read, and, connect
          </MainText.Text>
          <MainText.SubText>It's easy and my thinking on any topic and connect</MainText.SubText>
        </MainText.Container>
        <img
          className='hidden object-contain md:block md:w-72'
          src='/medium.svg'
          alt='Code Block Icon'
        />
      </MainVisual>

      {/* Posts */}
      <Post.Container>
        {posts?.map(({ _id, slug, mainImage, title, description, author }) => (
          <Post.List key={_id} onClick={() => handleDetail(slug.current)}>
            <Post.MainImage>
              <img
                className='transition-transform duration-200 ease-in-out group-hover:scale-110'
                src={urlFor(mainImage).url()!}
                alt={`${title} Thumbnail`}
              />
            </Post.MainImage>
            <Post.Content>
              <div className='max-w-md'>
                <Post.Title>{title}</Post.Title>
                <Post.Description>
                  {description} <span className=''> by</span> {author.name}
                </Post.Description>
              </div>
              <Post.Author>
                <img src={urlFor(author.image).url()!} alt={`${author.name} Thumbnail`} />
              </Post.Author>
            </Post.Content>
          </Post.List>
        ))}
      </Post.Container>
    </Container>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    slug,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export const Container = tw.div`
  h-[calc(100%-40px)]
`;

const MainVisual = tw.div`
  flex
  justify-start
  items-center
  space-x-10
  py-10
  px-2
  bg-amber-400
  shadow-md
  md:px-10
  lg:justify-around
`;

const MainText = {
  Container: tw.div`
    space-y-5
    text-center
    md:max-w-4xl
    md:text-left
  `,
  TextEm: tw.span`
    underline 
    decoration-black 
    decoration-4
  `,
  Text: tw.b`
    text-5xl
    leading-tight
    font-serif
    font-normal
    whitespace-pre-wrap
    md:text-6xl
  `,
  SubText: tw.p``,
};

const Post = {
  Container: tw.ul`
    grid
    grid-cols-1
    gap-3
    p-2
    w-full
    sm:grid-cols-2
    md:gap-6
    lg:grid-cols-3
    lg:p-6
  `,
  List: tw.li`
    group
    flex
    flex-col
    overflow-hidden
    border
    border-gray-300
    rounded-lg
    cursor-pointer
    shadow-md
  `,
  MainImage: tw.div`
    flex
    flex-1
    overflow-hidden
  `,
  Content: tw.div`
    flex
    justify-between
    p-2
  `,
  Title: tw.b`
    break-all
  `,
  Description: tw.p`
    break-all
  `,
  Author: tw.span`
    inline-block
    rounded-full
    overflow-hidden
    w-12
    h-12
  `,
};
