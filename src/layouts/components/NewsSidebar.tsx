import { NewsSidebarContent } from '@/src/features/preferences/components/news-sidebar/NewsSidebarContent'

const NewsSidebar = () => {
  return (
    <div className=" fixed h-full w-full max-w-[200px]  border-l border-accent px-5 lg:max-w-[360px] ">
      <NewsSidebarContent />
    </div>
  )
}

export default NewsSidebar
