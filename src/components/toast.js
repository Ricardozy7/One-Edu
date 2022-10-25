  const ToastContent = ({ text, role }) => (
    <>
        <div style={{
            zIndex: 99999999999999,
            position: 'fixed',
        }}>
            <div >
                <h4>{text}</h4>
            </div>
        </div>
        
    </>
)


export default ToastContent