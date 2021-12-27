export const Waiting = ({ title }) => {
    return (
        <div style={{ position: 'fixed', top: 0, zIndex: 99, width: '100%', height:' 100%', background: '#1122337d', color: 'white', fontSize: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            { title }
        </div>
    )
}

export default Waiting;