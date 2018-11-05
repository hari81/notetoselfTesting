import React, { Component } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

import Note from './Note';

const cookie_key = 'NOTES';

class App extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      notes: []
    }
  }

  componentDidMount() {
    const notes = read_cookie(cookie_key);

    this.setState({notes});
  }
  submit() {
    const  { notes, text } = this.state;

    const newNote = { text };

    notes.push(newNote);

    this.setState({notes});

    bake_cookie(cookie_key, this.state.notes);
  }

  clear() {
    delete_cookie(cookie_key);
    this.setState({notes: []})
  }
  render() {
    return (
      <div>
        <h2>Note to self</h2>
        <Form inline>
          <FormControl onChange={event => {
            this.setState({text: event.target.value});
          }} />
            { ' '}
          <Button onClick={() => this.submit()}>Submit</Button>
          { this.state.notes.map((note, i) => {
            return (
              <Note key={i} note={note} />
            );
          })}

        </Form>
        <hr />
        <Button className='btn' onClick={() => this.clear()}>Clear Notes</Button>
      </div>
    );
  }
}

export default App;