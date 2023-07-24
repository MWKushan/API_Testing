/// <reference types="Cypress" />
import "../../support/commands"

let EXPdata 

// Defining the list of objects test suite
describe('List of objects by id',() => {

    beforeEach(() => {
        cy.fixture('TestData').then((data) =>{ 
            EXPdata = data
           
        })
    })

    // defining a Test case to validate the response code
    it('List of objects by id request response code',() =>{
        
        // Calling the common metohd for check the response code of the getEndpoint.
        cy.CheckResponseCodeGetEndPoint('https://api.restful-api.dev/objects?id=3&id=5&id=10')          
    })

    it('List of objects id response data',() =>{
              
        cy.request('GET','https://api.restful-api.dev/objects?id=3&id=5&id=10')
        .then((Response) =>{
            const product1 = Response.body[0]
            cy.log(product1)

            const expectedOutcome1 = {            
                 "id": EXPdata.id3,
                 "name": EXPdata.name3,
                 "data": {
                    "color": EXPdata.color3,
                    "capacity GB": EXPdata.capacity_GB                    
                         }
                      }
         
             // Check that the response body matches the expected outcome.
            cy.expect(product1).to.deep.equal(expectedOutcome1)


            const product2 = Response.body[1]
            cy.log(product2)


          const expectedOutcome2 = {         
            "id": EXPdata.id5,
            "name": EXPdata.name5,
             "data": {
                "price": EXPdata.price5,
                "color": EXPdata.color5
                      }
                    }
                    cy.expect(product2).to.deep.equal(expectedOutcome2)


                const product3 = Response.body[2]
                cy.log(product3)

                const expectedOutcome3 = {       
                            "id": EXPdata.id10,
                            "name": EXPdata.name10,
                                "data": {
                                    "Capacity": EXPdata.Capacity10,
                                    "Screen size": EXPdata.Screen_size10
                            }
                        }

                    cy.expect(product3).to.deep.equal(expectedOutcome3)
        } )
    })
})