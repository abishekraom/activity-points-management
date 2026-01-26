import React from 'react'

function About() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-5rem)] justify-center py-20 bg-gray-100">
        <div className="max-w-6xl text-justify px-30 py-10 bg-white shadow-md border-transparent rounded-xl">
          <h1 className="text-5xl py-3 px-8">About</h1>
          <hr className="border-gray-600 pb-7"/>
          <p className="text-xl indent-10 py-2 px-8">
            We came up with this idea for our third semester <i>Design Thinking Lab</i> project, because 
            it was a genuine problem we were facing that really needed a solution. 
          </p>
          <p className="text-xl indent-10 py-2  px-8">
            We had initially intended our platform to be for students only, but it was correctly 
            pointed out by our mentor, Dr. S. Anupama Kumar, that this could be of great help to faculty. 
            With that in mind, we spoke to various faculty, who unanimously agreed that this would 
            benefit them.
          </p>
          <p className="text-xl indent-10 py-2  px-8">
            As a result, we designed and built this platform for students and faculty of RVCE alike, to
            aid in the process of collecting, storing and tracking AICTE activity points. As a bonus, you can 
            also see events that fetch you activity points.
          </p>
          <p className="text-xl indent-10 py-2  px-8">
            We hope that something as simple as this can make a difference and improve the quality of life for 
            students, faculty, and the Dean of Student Affairs alike.
          </p>
        </div>
      </div>

      <div className="flex justify-center py-20 bg-amber-100">
        <div className="min-w-6xl text-justify px-30 py-10 bg-white shadow-md border-gray-100 rounded-xl">
          <h1 className="text-5xl py-3 px-8">Team</h1>
          <hr className="border-gray-600 pb-7"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <Card 
              name="Samarth Sathvik" 
              contact="XXXXXXXXXX" 
              imageUrl="/assets/images/sample_image.jpg"
            />

            <Card 
              name="Suhas Raghavendra" 
              contact="XXXXXXXXXX" 
              imageUrl="/assets/images/sample_image.jpg"
            />

            <Card 
              name="Saawan Vivek Krishnam" 
              contact="XXXXXXXXXX" 
              imageUrl="/assets/images/sample_image.jpg"
            />

            <Card 
              name="Shlok Chaudhary" 
              contact="XXXXXXXXXX" 
              imageUrl="/assets/images/sample_image.jpg"
            />

            <div className="col-span-2 flex justify-center w-full"> 
              <div className="w-full md:max-w-[calc(50%-1rem)]"> {/* 50% - half the gap (8/2 = 4 units = 1rem) */}
                <Card 
                  name="Rahul G" 
                  contact="XXXXXXXXXX" 
                  imageUrl="/assets/images/sample_image.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Card({ name, contact, imageUrl }) {

  return(
    <div className="bg-white p-6 rounded-lg shadow-lg border-transparent text-center">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`Profile picture of ${name}`}
          className="w-50 h-50 rounded-full mx-auto mb-4 object-cover" 
        />
      ) : (
        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white font-bold">
          {name[0]}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 text-sm font-medium mb-3">Contact- {contact}</p>
    </div>
  );
}
export default About;