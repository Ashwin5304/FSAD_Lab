import React from "react";

class StudentsTable extends React.Component {
  render() {
    return (
      <table border ="1">
        <tr>
          <th>Sl No</th>
          <th>Name</th>
          <th>USN</th>
          <th>Total Marks</th>
        </tr>

        {this.props.studlist.map((s) => (
          <tr key={s.slno}>
            <td>{s.slno}</td>
            <td>{s.name}</td>
            <td>{s.usn}</td>
            <td>{s.tmarks}</td>
          </tr>
        ))}
      </table>
    );
  }
}

class StudentForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    this.props.addStudent({
      name: form.name.value,
      usn: form.usn.value,
      tmarks: form.tmarks.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" placeholder="Name"/>
        <input name="usn" placeholder="USN"/>
        <input name="tmarks" placeholder="Marks"/>
        
        <button>Add Student</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = { students: [] };

  addStudent = (s) => {
    s.slno = this.state.students.length + 1;

    this.setState({
      students: [...this.state.students, s]
    });
  };

  render() {
    return (
      <>
        <h2>Student Registration Portal</h2>
        <StudentsTable studlist={this.state.students} />
        <h3>Add Student</h3>
        <StudentForm addStudent={this.addStudent} />
      </>
    );
  }
}

export default App;