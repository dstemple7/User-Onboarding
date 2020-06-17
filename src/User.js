import React from 'react'

function User({ details }) {
    if (!details) {
      return <h3>Working fetching your user&apos;s details...</h3>
    }
  
    return (
      <div>
        <h2>{details.first_name} {details.last_name}</h2>
        <p>User ID: {details.id}</p>
        <p>Email: {details.email}</p>
        <p>Spirit Animal: {details.spiritAnimal}</p>
        </div>
    )
  }
  
  export default User