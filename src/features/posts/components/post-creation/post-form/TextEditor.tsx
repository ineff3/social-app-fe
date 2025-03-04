import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { UserMention } from '../../../utils/mentions/userMention'
import { useEffect } from 'react'
import { usePostContext } from '../../../contexts/PostContext'

interface Props {
  onChange: (text: string) => void
  placeholder: string
  content?: string
  isMinimized?: boolean
}

const TextEditor = ({
  onChange,
  content,
  placeholder,
  isMinimized = false,
}: Props) => {
  const { setEditor } = usePostContext()!
  const editor = useEditor({
    content,
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

  // Clearing editor after post creation (when form resets).
  useEffect(() => {
    if (editor && content === '') {
      editor.commands.clearContent()
    }
  }, [content, editor])

  useEffect(() => {
    if (editor) setEditor(editor)
    return () => setEditor(null)
  }, [editor, setEditor])

  return <EditorContent editor={editor} />
}

export default TextEditor
