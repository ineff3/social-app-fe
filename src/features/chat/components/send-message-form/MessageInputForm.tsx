import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageAttachmentOptions } from './MessageAttachmentOptions'
import { BiSend } from 'react-icons/bi'
import { MessageForm } from '../../schemas'
import { useAppSelector } from '@/src/redux/hooks'
import { selectSelectedConversation } from '@/src/redux/chat/chatSlice'
import { conversationSocketInstance } from '../../conversationSocketInstance'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'

export const MessageInputForm = () => {
  const conversationId = useAppSelector(selectSelectedConversation)!.id
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<MessageForm>({
    defaultValues: { text: '' },
  })

  const onSubmit: SubmitHandler<MessageForm> = (data) => {
    conversationSocketInstance.emit(
      'sendMessage',
      { ...data, conversationId },
      () => {
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.chat.messages({}, conversationId).queryKey,
        })
      },
    )
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex items-center gap-2 bg-base-300 p-4"
    >
      <MessageAttachmentOptions />
      <label className="input input-bordered input-primary flex flex-grow items-center gap-2 bg-base-100">
        <input
          {...register('text')}
          className="flex flex-grow"
          placeholder="Start a new message"
        />
        <button
          type="submit"
          aria-label="Send message"
          className={`btn btn-circle btn-ghost btn-sm text-primary ${!isDirty && 'btn-disabled '}`}
        >
          <BiSend size={20} />
        </button>
      </label>
    </form>
  )
}
