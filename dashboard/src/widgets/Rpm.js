const Rpm = (props) => {
    const {maxRpm, actualRpm} = props;
    let porcentajeRpm=(actualRpm/maxRpm)*100;
    var bgcolor='#00FF00';
    if (porcentajeRpm>60) {
        bgcolor='#CCCC00';
    }
    if (porcentajeRpm>90) {
        bgcolor='#FF0000';
    }

    const containerStyles = {
        height: 30,
        width: '100%',
        backgroundColor: "#000000",
        borderRadius: 20,
        margin: 20
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${porcentajeRpm}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    
      const labelStyles = {
        padding: 0,
        color: 'white',
        fontWeight: 'bold'
      }

    return (
        <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${actualRpm}`}</span>
      </div>
    </div>
    );
}

export default Rpm;
