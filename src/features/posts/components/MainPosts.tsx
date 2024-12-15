import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import useGetPosts from '../hooks/useGetPosts'
import { PostsFlow } from './PostsFlow'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'

const tabItems = [
  {
    name: 'For you',
    value: 'for you',
  },
  {
    name: 'Following',
    value: 'following',
  },
]

export const MainPosts = () => {
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
                className={`  box-border border-b-[3.5px] border-primary px-3 py-3.5 ${selected ? 'text-secondary' : ' border-none'}`}
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
            flowQueryKey={queryKeyStore.posts.all({}).queryKey}
            useGetPostsHook={useGetPosts}
            params={{}}
            scrollPositionKey="mainContext"
          />
        </TabPanel>
        <TabPanel>
          <PostsFlow
            flowQueryKey={
              queryKeyStore.posts.all({ filters: { isFollowing: true } })
                .queryKey
            }
            useGetPostsHook={useGetPosts}
            params={{ filters: { isFollowing: true } }}
            scrollPositionKey="followingContext"
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
