import Head from 'next/head'

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from '@storyblok/react'
import Layout from '../components/Layout'

export default function Home({ story, preview }) {
  story = useStoryblokState(
    story,
    {
      resolveRelations: ['popular_articles.articles'],
    },
    preview
  )

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  )
}

export async function getStaticProps(context) {
  let slug = 'home'

  let sbParams = {
    version: 'published',
    resolve_relations: ['popular_articles.articles'],
  }

  if (context.preview) {
    sbParams.version = 'draft'
  }

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      preview: context.preview || false,
    },
    revalidate: 3600,
  }
}
