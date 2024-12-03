import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { UserMention } from '../../../utils/mentions/userMention'
import { useEffect } from 'react'

interface Props {
  onChange: (text: string) => void
  initialContent?: string
  placeholder?: string
  isMinimized?: boolean
}

export const TextEditor = ({
  onChange,
  initialContent,
  placeholder = 'What is happening?',
  isMinimized = false,
}: Props) => {
  const editor = useEditor({
    content: initialContent,
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        isAllowedUri: (url, ctx) =>
          ctx.defaultValidate(url) && !url.startsWith('./'),
        HTMLAttributes: {
          class: 'link text-primary',
        },
      }),
      UserMention,
    ],
    editorProps: {
      attributes: {
        class: `textarea ${isMinimized ? 'min-h-[47px]' : 'min-h-[85px] resize-y'} textarea-bordered  max-h-[300px]  w-full text-base overflow-y-auto cursor-text`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getText())
    },
  })

  useEffect(() => {
    if (editor && initialContent === '') {
      editor.commands.clearContent()
    }
  }, [initialContent, editor])

  return <EditorContent editor={editor} />
}
