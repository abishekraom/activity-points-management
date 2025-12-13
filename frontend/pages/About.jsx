import React from 'react'

function About() {
  return (
    <div className="flex justify-center py-20 bg-gray-100">
      <div className="max-w-6xl text-justify px-30 py-10 bg-white shadow-md border-transparent rounded-xl">
        <h1 className="text-5xl py-3 px-8">Mission</h1>
        <hr className="border-gray-600"/>
        <p className="text-xl indent-10 py-3 px-8">
          This project was designed and built by us for the purpose of making it easier for students to 
          keep track of their AICTE activity points for both students and faculty. It also serves as our 
          third semester Design Thinking Lab project. 
        </p>
        <p className="text-xl indent-10 py-3  px-8">
          We came up with the idea because we found that it was a problem we were facing, and wondered if
          other students had the same problem. We later found out that this is a much bigger problem than
          we had initially anticipated, and took up the task of building this platform.
        </p>
        
      </div>

    </div>
  )
}

export default About;