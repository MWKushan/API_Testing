/// <reference types="Cypress" />
import "../../support/commands"

let EXPdata 

//Defining the Test Suite for list all objects
describe('List All Of Objects',() =>{

    beforeEach(() => {
        cy.fixture('TestData').then((data) =>{ 
            EXPdata = data           
        })
    })

    // Defining a test case for validate the response code
    it('List All Of the Objects Request Response code',() =>{

        // Calling the common method for verify the response code is 200 (Here passing the URL for validation)
        cy.CheckResponseCodeGetEndPoint('https://api.restful-api.dev/objects')
              
    })

    // Creating a test case for list all the objects
    it('List all of the Objects Response Details', () => {

        cy.request('GET','https://api.restful-api.dev/objects')
        .then((Response) =>{
            const product1 = Response.body[0]
            cy.log(product1)

            // Validating the json first object
            const expectedOutcome1 = {            
                "id": EXPdata.id1,
                "name": EXPdata.name1, 
                "data" : {             
                   "color": EXPdata.color1,
                   "capacity": EXPdata.capacity1    
                }
                    }

            // Check that the response body matches the expected outcome.
            cy.expect(product1).to.deep.equal(expectedOutcome1)

            // Validting the json 2nd object
            const product2 = Response.body[1]
            cy.log(product2)

            const expectedOutcome2 = {  
                "id": EXPdata.id2,
                 "name": EXPdata.name2,
                 "data": EXPdata.data2
            }

             // Check that the response body matches the expected outcome.
             cy.expect(product2).to.deep.equal(expectedOutcome2)


            // Validating the 3rd object
             const product3 = Response.body[2]
            cy.log(product3)

            const expectedOutcome3 = {  
                "id": EXPdata.id3,
                 "name": EXPdata.name3,
                "data": {
                     "color": EXPdata.color3,
                     "capacity GB": EXPdata.capacity_GB

                }
            }

                // Check that the response body matches the expected outcome.
                cy.expect(product3).to.deep.equal(expectedOutcome3) 


                // We can validate the rest of the objects in same way

                // IMPORTANT :- If we want we can validate the hole json response at once using deep qual method, but I think it is not recomnded beacuse if there is a failure it is diffiulit to identify where it is failed.  
        })
    })
})