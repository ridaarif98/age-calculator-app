import React, { useState } from 'react';
import BtnSvg from '../assets/images/icon-arrow.svg';

function AgeCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [yearError, setYearError] = useState(false);
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculateAge = (e) => {
    e.preventDefault();

    if (!day || !month || !year) {
      setError('This field is required');
      setFormSubmitted(true);
      return;
    } 
    const today = new Date();
    const birthDate = new Date(`${year}-${month}-${day}`);

    if (birthDate.getFullYear() > today.getFullYear()) {
        setError('Must be in the past')
        setYearError(true)
        setFormSubmitted(true)
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      days += prevMonth.getDate();
    }

    setAge({ years, months, days });
  };

  const handleInputChange = (e) => {
    if (formSubmitted) {
      // Clear the error message when the user starts typing after a form submission
      setError('');
      setYearError(false)
    }

    // Update the state based on the input field being changed
    const { name, value } = e.target;
    switch (name) {
      case 'day':
        setDay(value);
        break;
      case 'month':
        setMonth(value);
        break;
      case 'year':
        setYear(value);
        break;
      default:
        break;
    }
  };


  return (
    <div>
      <form onSubmit={calculateAge} className='input-form'>
        <div className="input-div">
        <div className="input-detail">
          <label className={formSubmitted && !day ? 'errorLabel' : ''}>
          DAY
          </label>
          <input 
              type="number"
              name="day"
              className={formSubmitted && !day ? 'error' : ''}
              value={day}
              onChange={(e) => handleInputChange(e)} 
              placeholder='DD'
          />
          {(error && formSubmitted && !day) &&  <span className={formSubmitted && !day ? 'errorText' : ''}>{error}</span>}
        </div>
        <div className="input-detail">
          <label  className={formSubmitted && !month ? 'errorLabel' : ''}>
            MONTH
          </label>
            <input
              type="number"
              name="month"
              className={formSubmitted && !month ? 'error' : ''}
              value={month}
              onChange={(e) => handleInputChange(e)}
              placeholder='MM'
            />
            {(error && formSubmitted && !month) &&  <span className={error && formSubmitted && !month ? 'errorText' : ''}>{error}</span>}
        </div>
        <div className="input-detail">
          <label className={(formSubmitted && !year) || (formSubmitted && yearError) ? 'errorLabel' : ''}>
            YEAR
          </label>
            <input
              type="number"
              name="year"
              className={(formSubmitted && !year) || (formSubmitted && yearError) ? 'error' : ''}
              value={year}
              onChange={(e) => handleInputChange(e)}
              placeholder='YYYY'
            />
            {((error && formSubmitted && !year) ||(error && formSubmitted && yearError))&&  <span className={(error && formSubmitted && !year )||(error && formSubmitted && yearError)? 'errorText' : ''}>{error}</span>}
        </div>
        </div>
        <div className="btn-div">
        <div className="line"></div>
        <button type="submit"><img src={BtnSvg} alt="SVG" /></button>
        </div>
      </form>
      
        {age && (
        <div className="age">
       {age.years? <h1><span>{age.years}</span> years</h1> : <h1><span>--</span> years</h1>} 
       {age.months? <h1><span>{age.months}</span> months</h1> : <h1><span>--</span> months</h1>}
       {age.days? <h1><span>{age.days}</span> days</h1> : <h1><span>--</span> days</h1>} 
      </div>
       )}
    </div>
  );
}

export default AgeCalculator;
