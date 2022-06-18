import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(p => <Part part={p} key={p.id}/>)}
  </>

const Course = ({course}) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((a, b) => a + b.exercises, 0)} />
  </div>

export default Course
