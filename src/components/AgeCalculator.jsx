import React, { useState } from 'react';
import BtnSvg from '../assets/images/icon-arrow.svg';

function AgeCalculator() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [yearError, setYearError] = useState('')
  const [monthError, setMonthError] = useState('')
  const [dayError, setDayError] = useState('')
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 })
  const [error, setError] = useState('')
  const [ageError, setAgeError] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const calculateAge = (e) => {
    e.preventDefault()

    if (!day || !month || !year) {
      setError('This field is required')
      setFormSubmitted(true)
    } 

    const dayInt = parseInt(day, 10)
    const monthInt = parseInt(month, 10)
    const yearInt = parseInt(year, 10)
    const daysInMonth = new Date(yearInt, monthInt, 0).getDate()
    const today = new Date()
    const birthDate = new Date(`${year}-${month}-${day}`)
    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()

    if (dayInt < 1 || dayInt > daysInMonth) {
      setAgeError('Must be a valid date')
      setFormSubmitted(true)
      return
    }
    if (birthDate > today) {
      setAgeError('Must be a valid date')
      setFormSubmitted(true)
      return
    }

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--
      months += 12
    }

    if (days < 0) {
      months--
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0)
      days += prevMonth.getDate()
    }

    setAge({ years, months, days })
  }

  const handleInputChange = (e) => {
    if (formSubmitted) {
      // Clear the error message when the user starts typing after a form submission
      setError('')
      setAgeError('')
    }

    // Update the state based on the input field being changed
    const { name, value } = e.target
    switch (name) {
      case 'day':
        setDay(value)
        const dayValue = parseInt(value, 10)
        // Check if day is within valid range (1 to 31)
        if (dayValue < 1 || dayValue > 31) {
          setDayError('Must be a valid day')
        } else {
          setDayError('')
        }
        break
      case 'month':
        setMonth(value)
        const monthValue = parseInt(value, 10)
        if (monthValue< 1 || monthValue > 12) {
          setMonthError('Must be valid month')
        } else {
          setMonthError('')
        }
        break
      case 'year':
        setYear(value)
        const currentYear = new Date().getFullYear()
      // Check if year is in the future
      if (parseInt(value, 10) > currentYear) {
        setYearError('Must be in the past')
      } else {
        setYearError('')
      }
        break
      default:
        break
    }
  }


  return (
    <div>
      <form onSubmit={calculateAge} className='input-form'>
        <div className="input-div">
        <div className="input-detail">
          <label className={(formSubmitted && !day) || dayError || ageError? 'errorLabel' : ''}>
          DAY
          </label>
          <input 
              type="number"
              name="day"
              className={(formSubmitted && !day) || dayError || ageError? 'error' : ''}
              value={day}
              onChange={(e) => handleInputChange(e)} 
              placeholder='DD'
          />
           {( dayError) &&  <span className={ dayError ? 'errorText' : ''}>{dayError}</span>}
           {( ageError) &&  <span className={ ageError ? 'errorText' : ''}>{ageError}</span>}
          {(error && formSubmitted && !day) &&  <span className={formSubmitted && !day ? 'errorText' : ''}>{error}</span>}
        </div>
        <div className="input-detail">
          <label  className={(formSubmitted && !month) || monthError || ageError ? 'errorLabel' : ''}>
            MONTH
          </label>
            <input
              type="number"
              name="month"
              className={(formSubmitted && !month) || ( monthError) || ageError ? 'error' : ''}
              value={month}
              onChange={(e) => handleInputChange(e)}
              placeholder='MM'
            />
            {( monthError) &&  <span className={ monthError ? 'errorText' : ''}>{monthError}</span>}
            {(error && formSubmitted && !month) &&  <span className={error && formSubmitted && !month ? 'errorText' : ''}>{error}</span>}
        </div>
        <div className="input-detail">
          <label className={(formSubmitted && !year) || ( yearError) || ageError ? 'errorLabel' : ''}>
            YEAR
          </label>
            <input
              type="number"
              name="year"
              className={(formSubmitted && !year) || (yearError) || ageError? 'error' : ''}
              value={year}
              onChange={(e) => handleInputChange(e)}
              placeholder='YYYY'
            />
            {(yearError) &&  <span className={(yearError ) ? 'errorText' : ''}>{yearError}</span>}
            {(error && formSubmitted && !year) &&  <span className={(error && formSubmitted && !year ) ? 'errorText' : ''}>{error}</span>}
        </div>
        </div>
        <div className="btn-div">
        <div className="line" />
        <button type="submit"><img src={BtnSvg} alt="SVG" /></button>
        <div className="line" id="second-line" />
        </div>
      </form>
      
        
      <div className="age">
       {(age.years && !ageError)? <h1><span>{age.years}</span> years</h1> : <h1><span>--</span> years</h1>} 
       {(age.months&& !ageError)? <h1><span>{age.months}</span> months</h1> : <h1><span>--</span> months</h1>}
       {(age.days && !ageError)? <h1><span>{age.days}</span> days</h1> : <h1><span>--</span> days</h1>} 
      </div>
    </div>
  )
}

export default AgeCalculator;
