import {
  SchemaConversationResponseDto,
  SchemaGetAllConversationsResponseDto,
} from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useFetchCachedConversation = (
  selectedConversationId?: string | null,
) => {
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()
  const [selectedConversation, setSelectedConversation] =
    useState<SchemaConversationResponseDto | null>(null)

  useEffect(() => {
    if (!selectedConversationId) {
      setSelectedConversation(null)
      return
    }
    const conversationKey = queryKeyStore.chat.conversations({}).queryKey

    const updateSelectedConversation = () => {
      const data = queryClient.getQueryData<
        InfiniteData<SchemaGetAllConversationsResponseDto> | undefined
      >(conversationKey)
      const conversation = data?.pages
        .flatMap((page) => page.data)
        .find((conversation) => conversation.id === selectedConversationId)
      setSelectedConversation(conversation || null)
    }

    updateSelectedConversation()

    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (
        event.type === 'updated' &&
        JSON.stringify(event.query.queryKey) === JSON.stringify(conversationKey)
      ) {
        updateSelectedConversation()
      }
    })

    return () => unsubscribe()
  }, [queryClient, queryKeyStore, selectedConversationId])

  return selectedConversation
}
