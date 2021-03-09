import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { saveNote, getNotes } from '../Store/actions';
import './components.css';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      showModal: false,
      selectedNote: {},
    }
  }

  async componentDidMount() {
    await getNotes();
  }

  componentDidUpdate() {
    this.autoGrowTextArea();
  }

  openCreateNoteModal = () => {
    this.setState({ showModal: true });
  }

  onSaveNote = () => {
    saveNote(this.state.selectedNote);
    this.handleCloseModal();
  }

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedNote: {} });
  }

  onClickNote = (note) => {
    this.setState({ selectedNote: { ...note }, showModal: true });
  }

  changeTitle = (e) => {
    let newNote = this.state.selectedNote;
    newNote.title = e.target.value;
    this.setState({ selectedNote: newNote })
  }

  changeText = (e) => {
    let newNote = this.state.selectedNote;
    newNote.text = e.target.value;
    this.setState({ selectedNote: newNote });
  }

  autoGrowTextArea = () => {
    if(this.textInput.current) {
      let element = this.textInput.current;
      element.style.height = '5px';
      element.style.height = (element.scrollHeight)+'px';
    }
  }

  autoGrowNote = (element) => {
    element.style.height = '5px';
    element.style.height = (element.scrollHeight)+'px';
  }

  render() {
    return (
      <Container>
        <Row className='notes-row'>
          <Col
            sm={3}
            onClick={this.openCreateNoteModal}
            key='initial'
            className='create-note'
          >
            <i className="plus fas fa-plus-circle"></i>
          </Col>
          {
            this.props.notes.map(note => {
              return (
                <Col
                  sm={3}
                  className='note-col'
                  onClick={() => this.onClickNote(note)}
                  key={note.id}
                >
                  <p className='note-title'>{note.title}</p>
                  <div>{note.text}</div>
                </Col>
              );
            })
          }
        </Row>
        <Modal
          show={this.state.showModal}
          onHide={this.handleCloseModal}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <textarea
                onChange={this.changeTitle}
                className='modal-title-textarea'
                defaultValue={this.state.selectedNote.title}
                maxLength='25'
                placeholder='title'
              >
              </textarea>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <textarea
              ref={this.textInput}
              onChange={this.changeText}
              className='modal-text-textarea'
              defaultValue={this.state.selectedNote.text}
              placeholder='text'
            >
            </textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleCloseModal}>Close</Button>
            <Button variant='primary' onClick={this.onSaveNote}>Save</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { notes: state.notes };
}

export default connect(mapStateToProps, null)(Notes);