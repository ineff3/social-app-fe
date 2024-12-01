import { pageRoutes } from '@/src/routes'

const linkRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g

const mentionRegex = /@([a-zA-Z0-9_.]+)/g

export const convertPostTextToHTML = (text: string) => {
  const replacedLinks = text.replace(linkRegex, (match) => getLink(match))

  const replacedMentions = replacedLinks.replace(mentionRegex, (_, mention) =>
    getMention(mention),
  )

  return replacedMentions
}

const getLink = (link: string) => {
  return `<a class="link text-primary" href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>`
}

const getMention = (mention: string) => {
  const baseURL = window.location.origin
  const relPathArr = pageRoutes.profile.split(':')
  relPathArr[1] = mention
  const relPath = relPathArr.join('')
  return `<a class="text-primary bg-primary bg-opacity-20 rounded-md px-1" href="${baseURL}${relPath}">@${mention}</a>`
}
