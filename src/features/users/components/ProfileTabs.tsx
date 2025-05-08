import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { PostsFlow } from '../../posts/components/PostsFlow'
import useGetUserPosts from '../../posts/hooks/useGetUserPosts'
import useGetPosts from '../../posts/hooks/useGetPosts'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'

const tabItems = [
  {
    name: 'Posts',
    value: 'posts',
  },
  {
    name: 'Replies',
    value: 'replies',
  },
  {
    name: 'Likes',
    value: 'likes',
  },
]

export const ProfileTabs = ({ userId }: { userId: string }) => {
  const queryKeyStore = useQueryKeyStore()
  return (
    <TabGroup>
      <TabList className=" flex border-b border-accent">
        {tabItems.map((item) => (
          <Tab
            key={item.value}
            className=" flex w-1/2 items-center justify-center transition-all duration-150 ease-in-out hover:bg-base-300 "
          >
            {({ selected }) => (
              <div
                className={`  box-border border-b-[3.5px] border-primary px-3 py-3.5 text-sm ${selected ? 'text-secondary' : ' border-none'}`}
              >
                {item.name}
              </div>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <PostsFlow
            flowQueryKey={
              queryKeyStore.posts
                .all({})
                ._ctx.user(userId, { isComment: false }).queryKey
            }
            useGetPostsHook={useGetUserPosts}
            params={{ userId, filters: { isComment: false } }}
          />
        </TabPanel>
        <TabPanel>
          <PostsFlow
            flowQueryKey={
              queryKeyStore.posts.all({})._ctx.user(userId, { isComment: true })
                .queryKey
            }
            useGetPostsHook={useGetUserPosts}
            params={{ userId, filters: { isComment: true } }}
          />
        </TabPanel>
        <TabPanel>
          <PostsFlow
            flowQueryKey={
              queryKeyStore.posts.all({ filters: { liked: true } }).queryKey
            }
            useGetPostsHook={useGetPosts}
            params={{ filters: { liked: true } }}
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
