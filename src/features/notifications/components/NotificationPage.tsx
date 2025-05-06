import { Helmet } from 'react-helmet-async'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { NotificationsFlow } from './NotificationsFlow'

const tabItems = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Mentions',
    value: 'mentions',
  },
]

export const NotificationPage = () => {
  return (
    <>
      <Helmet>
        <title>Notifications | Linker</title>
        <meta
          name="description"
          content="Stay updated with your latest notifications on Linker."
        />
        <meta property="og:title" content="Notifications | Linker" />
        <meta
          property="og:description"
          content="Never miss an update—check your notifications now."
        />
      </Helmet>

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
            <NotificationsFlow
              notificationsParams={{ filterMentions: false }}
            />
          </TabPanel>
          <TabPanel>
            <NotificationsFlow notificationsParams={{ filterMentions: true }} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  )
}
