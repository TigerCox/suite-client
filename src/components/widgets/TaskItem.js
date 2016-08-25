import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';

function getStyles() {
  const styles = {
    root: {
      display: 'block',
      fontSize: 16,
      lineHeight: '16px',
      position: 'relative',
      border: '1px solid #ddd',
      background: '#fff',
      height: '90px',
      width: '95%',
    },

    leftStyle:{
      marginTop:'20px',
      marginLeft:'40px',
      float: 'left',
    },

    textStyle:{
      marginTop:'12px',
      marginLeft:'30px',
      float: 'left'
    },

    icons: {
      height: 24,
      width: 24,
      display: 'block',
      margin: 12,
    },

    leftIcon: {
      left: 4,
    },

    label: {
      cursor: 'pointer',
    },

    primaryText: {
      marginTop: 0,
      textAlign: 'left',
      fontWeight: 'bold',
      marginBottom: 4
    },

    Button:{
      MarginTop: 32,
      float: 'Right',
      padding: '12px',
      paddingTop: 20,
    },

    secondaryText: {
      fontStyle: 'italic',
      marginTop: 0,
      textAlign: 'left',
      marginBottom: 4
    },

    alert:{
      height:90,
      borderLeft: '5px solid red',
      marginLeft:'0px',
      float: 'left',
      position: 'relative',
    },
  };
  return styles;
}

class TaskItem extends Component {
  constructor(props) {
    super(props);
  }

  pushElement(addIcon, element, baseStyles) {
    if (element) {
      const styles = Object.assign({}, baseStyles, element.props.style);
      addIcon.push(
        React.cloneElement(element, {
          key: addIcon.length,
          style: styles,
        })
      );
    }
  }

  createTextElement( styles, className, data, key) {
    return (
      <span key={key} style={{marginTop:0}}>
       <p style={styles} className={className}> {data} </p>
      </span>
    );
  }

  createButtonElement(styles, label, key) {
    return (
      <span key={key} style={styles}>
      <Button bsStyle="primary" >
        <span>{label}</span>
      </Button>
      </span>
    );
  }
  createAlert(styles, key){
    return(
    <span key={key} style={styles} />
    );
  }


  render() {
    const {
      children,
      primaryText,
      secondaryText,
      style,
      leftIcon,
      taskButtonlabel,
      typeText,
      alert
    } = this.props;

    const styles = getStyles(this.props, this.state);
    const addIcon = [];
    const addButton = [];
    const addText = [children];
    const alertspan = [];

    if(alert){
      const addAlert = this.createAlert(
        styles.alert,
        'alert'
      );
      alertspan.push(addAlert);
    }

    if (leftIcon) {
      this.pushElement(
        addIcon,
        leftIcon,
        Object.assign({}, styles.icons, styles.leftIcon)
        );
    }

    if(taskButtonlabel){
      const buttonElement = this.createButtonElement(
      styles.Button,
      taskButtonlabel,
      'taskButton'
    );
      addButton.push(buttonElement);
    }

    if (primaryText) {
      const primaryTextElement = this.createTextElement(
        styles.primaryText,
        '',
        primaryText,
        'primaryText'
      );
      addText.push(primaryTextElement);
    }

    if (secondaryText) {
      const secondaryTextElement = this.createTextElement(
        styles.secondaryText,
        "text-muted",
        secondaryText,
        'secondaryText'
      );
      addText.push(secondaryTextElement);
    }
    if (typeText) {
      const primaryTextElement = this.createTextElement(
        styles.secondaryText,
        "text-muted",
        typeText,
        'typeText'
      );
      addText.push(primaryTextElement);
    }

    return (

      <center>
        <div style={Object.assign(styles.root, style)}>
          {alertspan}
          <span style={styles.leftStyle}>
          {addIcon}
          </span>
          <span style={styles.textStyle}>
          {addText}
          </span>
          {addButton}
          <span style={styles.Button}>
          <Button>
            <span>Dismiss</span>
          </Button>
           </span>
          <span style={styles.Button}>
          <Button>
            <span>Edit</span>
          </Button></span>
        </div>
      </center>

    );
  }
}

TaskItem.propTypes = {
  children: PropTypes.node,
  taskButtonlabel: PropTypes.string,
  primaryText: PropTypes.node,
  secondaryText: PropTypes.node,
  typeText: PropTypes.node,
  style: PropTypes.object,
  leftIcon: PropTypes.element,
  alert: PropTypes.bool,
};

TaskItem.defaultProps = {
  secondaryTextLines: 1,
};

export default TaskItem;