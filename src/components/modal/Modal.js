import './Modal.css'

function Modal({ isOpen, setIsOpen, children }) {
    return (
        <div>
            <div className="modal" style={{ display: isOpen ? 'block' : 'none' }} onClick={(e) => e.target.className === "modal" && setIsOpen(false)}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
