import isEmail from 'validator/lib/isEmail';
import { useState } from 'react';

const App = () => {
/*
 - Here Several things to notice:
    . multiple input fields must be an object, otherwise we can't assign dynamic property.
    . <input name='name' />      must give a name, so that assign property dynamically.
    . update fields object dynamically too 
*/

  const [fields, setFields] = useState({ name: '', email: '' });
  const [people, setPeople] = useState([]);
  const [ fieldErrors, setFieldErrors ] = useState({});


  const validate = (person) => {
    const errors = {};

    if(!person.name) errors.name = 'Name is required';
    if(!person.email) errors.email = 'Email is required';
    if( person.email && !isEmail(person.email)) errors.email = 'Invalid Email';

    return errors;
  };

  const onInputChange = (evt) => {
   const field = fields[evt.target.name] = evt.target.value;    // only object have dynamic property
   setFields({...fields, [field]: field });                     // Dynamic property
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    setFieldErrors( validate( fields ) );           // all fields => 1 Person
    if( Object.keys(fieldErrors).length ) return;     // if error found then don't update

    setPeople([...people, fields ]);     // setPeople([...people, {name: fields.name, email: fields.email}])
    setFields({ name: '', email: '' });
  };

  return (
    <main>
      <h1>Sign up Sheet</h1>
      <form onSubmit={onFormSubmit}>
        <input 
          placeholder='Name' 
          name='name'            // must give a name, so that assign property dynamically.
          value={fields.name} 
          onChange={onInputChange}
        />
        <span style={{color: 'red'}}> { fieldErrors.name } </span>

        <input 
          placeholder='Email' 
          name='email'
          value={fields.email} 
          onChange={onInputChange}
        />
        <span style={{color: 'red'}}> { fieldErrors.email } </span>

        <br />
        <input  type="submit" value="Submit"/>
      </form>

      <ul>
        <h3>People:</h3>
        {people.map( ({name, email}, index) => <li key={index}>{
          `${name ? name: 'no-name'} : ${email ? email: 'no-email'}`
        }</li>)}
      </ul>
    </main>
  );
};

export default App;
