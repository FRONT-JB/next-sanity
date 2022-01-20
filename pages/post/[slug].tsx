import { Seo } from 'Components';
import { GetStaticProps } from 'next';
import tw from 'tailwind-styled-components/dist/tailwind';
import { Post } from 'typings';
import { sanityClient, urlFor } from '../../sanity';
import PortableText from 'react-portable-text';

interface Props {
  post: Post;
}
const PostDetail = ({ post }: Props) => {
  return (
    <Container>
      <Seo title={post.title} />
      <img
        className='object-cover w-full h-40'
        src={urlFor(post.mainImage).url()!}
        alt={post.description}
      />

      <div className='w-full max-w-3xl p-5 mx-auto'>
        <b className='mt-10 text-3xl'>{post.title}</b>
        <p className='mt-3 font-light text-gray-500'>{post.description}</p>
        <div className='flex items-center mt-4 space-x-4 text-sm cursor-default'>
          <img
            className='w-10 rounded-full'
            src={urlFor(post.author.image).url()!}
            alt={`${post.author.name} Thumbnail`}
          />
          <p className=' font-extralight'>Blog Post by {post.author.name} @</p> Publish at{' '}
          {new Date(post.publishedAt).toLocaleString()}
        </div>
      </div>

      <div className='w-full max-w-3xl p-5 mx-auto'>
        <PortableText
          className=''
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
          content={post.body}
          serializers={{
            h1: (props: any) => <h1 className='my-5 text-2xl font-bold' {...props} />,
            h2: (props: any) => <h2 className='my-5 text-xl font-bold' {...props} />,
            li: ({ children }: any) => <li className='ml-4 list-disc'>{children}</li>,
            link: ({ href, children }: any) => (
              <a href={href} className='text-blue-500 hover:underline'>
                {children}
              </a>
            ),
          }}
        />
      </div>
    </Container>
  );
};

export default PostDetail;

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
		_id,
		slug {
			current
		}
	}`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
		_id,
		publishedAt,
		title,
		author -> {
			name,
			image
		},
		'comments': *[
			_type == 'comment' &&
			post._ref == ^.id &&
			approved == true
		],
		description,
		mainImage,
		slug,
		body
	}`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });
  console.log(post);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60, //! after 60 seconds itll update the old cached version
  };
};

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
