import Modal from '@/src/components/ui/Modal'

interface Props {
  isOpen: boolean
  onDiscard: () => void
  onClose: () => void
  onSave: () => void
}

const ModalSaveDialog = ({ isOpen, onDiscard, onClose, onSave }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className=" flex flex-col gap-5 ">
        <div>
          <p className="text-lg font-semibold text-secondary">Save post?</p>
          <p className=" text-sm">
            You can save this to send later from your drafts
          </p>
        </div>
        <div className=" flex flex-col gap-4">
          <button onClick={onSave} className=" btn">
            Save
          </button>
          <button className=" btn btn-error" onClick={onDiscard}>
            Discard
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalSaveDialog
