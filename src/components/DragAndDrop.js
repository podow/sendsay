import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles/DragAndDrop.scss'

/**
 * File preview component
 */
const FilePreview = ({files}) => (
  <div className="file-preview">
    {Array.prototype.map.call(files, file => {
      return (
        <div
          key={file.size + file.lastModified}
          className="file-preview__item"
        >
          <div className="file-preview__item__preview">
            <img src={file.preview} alt={file.name} title={file.alt} />
          </div>
          <span className="file-preview__item__name">{`${file.name.slice(0, 17)}...`}</span>
        </div>
      )
    })}
  </div>
);

/**
 * D&D component
 */
class DragAndDrop extends Component {
  static FilePreview = FilePreview;

  static propTypes = {
    handleDrop: PropTypes.func.isRequired,
    dropText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  };

  static defaultProps = {
    dropText: 'Drop here :)'
  };

  constructor(props) {
    super(props);

    this.dropRef = React.createRef();
    this.state = {
      dragging: false
    };
  }

  componentDidMount() {
    this.dragCounter = 0;

    this.dragAndDropHandler();
  }

  componentWillUnmount() {
    this.dragAndDropHandler()
  }

  handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  handleDragIn = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dragCounter++;

    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      this.setState({dragging: true})
    }
  };

  handleDragOut = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dragCounter--;
    if (this.dragCounter > 0) {
      return;
    }

    this.setState({dragging: false})
  };

  handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({dragging: false});

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      this.props.handleDrop(event.dataTransfer.files);
      event.dataTransfer.clearData();

      this.dragCounter = 0
    }
  };

  dragAndDropHandler = () => {
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  };

  render() {
    return (
      <div ref={this.dropRef} className="drag-and-drop">
        {this.state.dragging && (
          <div className="drag-and-drop__overlay">
            <div className="drag-and-drop__overlay__text">
              <span>{this.props.dropText}</span>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

export {FilePreview};
export default DragAndDrop;
