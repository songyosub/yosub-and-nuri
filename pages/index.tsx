import { FeedEntity, RawFeedData } from '@models/Feed';
import { Feed } from '@pages/feeds/components/feed/Feed';
import { Footer } from '@pages/feeds/components/footer/Footer';
import { Header } from '@pages/feeds/components/header/Header';
import { InferGetStaticPropsType } from 'next';
import { getPlaiceholder } from 'plaiceholder';

export async function getStaticProps() {
  const feedJson = (await import('public/assets/data/feeds.json')).default;
  const feedDataset = feedJson.data as RawFeedData[];

  const feedsPromises = Promise.all(
    feedDataset.map(async feed => {
      const contents = await Promise.all(
        feed.contents.map(async content => {
          const { base64, img } = await getPlaiceholder(content.imageSrc);

          return { ...content, image: { ...img, blurDataURL: base64 } };
        })
      );

      return {
        ...feed,
        contents,
      } as FeedEntity;
    })
  );

  const feeds = await feedsPromises;

  return { props: { feeds } };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function FeedsPage({ feeds }: Props) {
  return (
    <>
      <Header />
      <Feed feeds={feeds} />
      <Footer />
    </>
  );
}
