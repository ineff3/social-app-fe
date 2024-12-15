import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { useApiActions } from './hooks/useApiActions'
import { AxiosRequestConfig } from 'axios'

interface IMutationProps<T, S> {
  path: string
  qKey?: QueryKey
  updater?: (oldData: T, updatedData: S) => T
  axiosOptions?: AxiosRequestConfig
  shouldInvalidate?: boolean
}

export const useOptimisticMutation = <T, S, R>(
  func: (data: S) => Promise<R>,
  qKey?: QueryKey | null,
  updater?: (oldData: T, newData: S) => T,
  shouldInvalidate?: boolean,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: func,
    onMutate: async (data) => {
      if (qKey) {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: qKey })

        // Snapshot the previous value
        const previousData = queryClient.getQueryData(qKey)

        // Optimistically update to the new value
        if (updater) {
          queryClient.setQueryData(qKey, (oldData: T) => {
            return updater ? updater(oldData, data) : data
          })
        }

        // Return a context object with the snapshotted value
        return { previousData }
      }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError(error, _, context) {
      console.log(error)
      if (qKey) {
        queryClient.setQueryData(qKey, context?.previousData)
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      if (qKey && (shouldInvalidate === undefined ? true : shouldInvalidate)) {
        queryClient.invalidateQueries({
          queryKey: qKey,
        })
      }
    },
  })
}

export const usePost = <T, S, R = void>({
  path,
  qKey,
  updater,
  axiosOptions,
  shouldInvalidate,
}: IMutationProps<T, S>) => {
  const { post } = useApiActions()
  return useOptimisticMutation(
    (data) => post<R>(path, data, axiosOptions),
    qKey,
    updater,
    shouldInvalidate,
  )
}

export const useUpdate = <T, S, R = void>({
  path,
  qKey,
  updater,
  axiosOptions,
}: IMutationProps<T, S>) => {
  const { patch } = useApiActions()
  return useOptimisticMutation(
    (data) => patch<R>(path, data, axiosOptions),
    qKey,
    updater,
  )
}

export const usePut = <T, S, R = void>({
  path,
  qKey,
  updater,
  axiosOptions = {},
}: IMutationProps<T, S>) => {
  const { put } = useApiActions()
  return useOptimisticMutation(
    (data) => put<R>(path, data, axiosOptions),
    qKey,
    updater,
  )
}

export const useDelete = <T, S, R = void>({
  path,
  qKey,
  updater,
  axiosOptions = {},
}: IMutationProps<T, S>) => {
  const { delete: del } = useApiActions()
  return useOptimisticMutation(
    (id) => del<R>(`${path}/${id}`, axiosOptions),
    qKey,
    updater,
  )
}

type KeyValuePair = {
  key: string
  value: string[]
}

export const useDeleteMultiple = <T, R = void>({
  path,
  qKey,
  updater,
  axiosOptions = {},
}: IMutationProps<T, KeyValuePair>) => {
  const { delete: del } = useApiActions()
  return useOptimisticMutation(
    ({ key, value }) => {
      if (!Array.isArray(value)) {
        throw new Error('The provided query parameter is not an array')
      }
      const urlSearchParams = new URLSearchParams()
      value.forEach((id) => urlSearchParams.append(key, id))
      return del<R>(`${path}?${urlSearchParams.toString()}`, axiosOptions)
    },
    qKey,
    updater,
  )
}
