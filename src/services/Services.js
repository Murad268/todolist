import React, { Component } from 'react';

class Services extends Component {
   getData = async () => {
      const res = await fetch("http://localhost:3001/todos", {
         method: "GET",
        
      })
      if(!res.ok) {
         console.log("error")
      }
      return await res.json()
   }

   addData = async (body) => {
      const res = await fetch("http://localhost:3001/todos", {
         method: "POST",
         body,
         headers: {'Content-Type': 'application/json'}
      })
     
      if(!res.ok) {
         console.log("error")
      }
      return await res.json()
   }

   delData = async (id) => {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
         method: "DELETE",
      })
      if(!res.ok) {
         console.log("error")
      }
      return await res.json()
   }


   dataDone = async (id, bool) => {
      
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PATCH',                                                              
          body: JSON.stringify( { done: bool } ) 
      })
      if(!res.ok) {
         console.log("error")
      }
      return await res.json()
   }
}

export default Services;