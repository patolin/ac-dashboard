const Speed = (props) => {
    const {speed} = props;
    return (
        <>
            <p>{ speed | 0 } Km/h</p>
        </>
    )
}

export default Speed;