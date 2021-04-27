import { useState } from 'react';

const Field = ({ type='text', name='', value='', placeholder='', handleClick=f=>f  }) => {
  const [ error, setError ] = useState(false);

  return(
    <>
      <input 
        placeholder={placeholder}
        type={type} 
        name={name}
        value={value}
        error={error}
        onChange={handleClick}
     />
     <span style={{color: 'red'}}> {error} </span>
    </>
  );
};

export default Field;