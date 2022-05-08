import ReactModal from 'react-modal';

export default function RecipeModal({ isOpen, onClose, children }) {
  return (
    <ReactModal 
        isOpen={isOpen}
        style={{
          content: {
            top: '100px',
            left: '10vw',
            right: '10vw',
            bottom: '100px',
          }
        }}
      >
       { children }
      </ReactModal>
  )
}
