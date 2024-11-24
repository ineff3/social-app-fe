/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactRenderer } from '@tiptap/react'
import { MentionSelectList } from '../../components/post-creation/post-form/MentionSelectList'
import Mention from '@tiptap/extension-mention'
import tippy, { Instance } from 'tippy.js'

type ComponentRef = {
  onKeyDown: (props: any) => boolean
}

export const UserMention = Mention.configure({
  HTMLAttributes: {
    class: ' text-primary bg-primary bg-opacity-20 rounded-md px-1',
  },
  suggestion: {
    render: () => {
      let component: ReactRenderer
      let popup: Instance[]

      return {
        onStart: (props) => {
          component = new ReactRenderer(MentionSelectList, {
            props,
            editor: props.editor,
          })

          if (!props.clientRect) {
            return
          }
          const clientRect = props.clientRect()
          if (!clientRect) {
            return
          }

          popup = tippy('body', {
            content: component.element,
            appendTo: () => document.body,
            getReferenceClientRect: () => clientRect,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          })
        },

        onUpdate(props) {
          component.updateProps(props)

          if (!props.clientRect) {
            return
          }
          const clientRect = props.clientRect()
          if (!clientRect) {
            return
          }

          popup[0].setProps({
            getReferenceClientRect: () => clientRect,
          })
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide()

            return true
          }
          if (
            component?.ref &&
            typeof component.ref === 'object' &&
            'onKeyDown' in component.ref
          ) {
            const ref = component.ref as ComponentRef
            return ref.onKeyDown(props)
          }

          return false
        },

        onExit() {
          popup[0].destroy()
          component.destroy()
        },
      }
    },
  },
})
