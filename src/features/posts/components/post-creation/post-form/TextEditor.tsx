import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { UserMention } from '../../../utils/mentions/userMention'

interface Props {
  onChange: (text: string) => void
}

export const TextEditor = ({ onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: 'What is happening?',
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
        class:
          'textarea textarea-bordered max-h-[300px] min-h-[85px] w-full text-base resize-y overflow-y-auto cursor-text',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getText())
    },
  })

  return <EditorContent editor={editor} />
}
