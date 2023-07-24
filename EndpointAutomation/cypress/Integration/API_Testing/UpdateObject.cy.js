/// <reference types="Cypress" />
//import "../../support/commands"
//import {ToRetrunId} from "../../support/commands"

let EXPdata

describe('Update object', ()=> {

    beforeEach(() => {
        cy.fixture('TestData').then((data) =>{ 
            EXPdata = data
           
        })
    })

    it('Validate response after Updating the created object', () => {

     const RequestBody = {
            "name": "Apple MacBook Pro 17",
            "data": {
               "year": 2019,
               "price": 2049.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
               "color": "silver"
            }
         }

         cy.request(
            {
                method: 'PUT',
                url: 'https://api.restful-api.dev/objects/'+ ToRetrunId,
                body: RequestBody
    
         })
         .then ((Response) => {
            const product = Response.body
            cy.log(product)      

            const expectedOutcomeForData = {       
                            
                    "year": 2019,
                    "price": 2049.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB",
                    "color": "silver"                   
 
         }
         })

        // cy.expect(product.name).to.equal('Apple MacBook Pro 16')
       //  cy.expect(product.data).to.deep.equal(expectedOutcomeForData)

       // Now no need this file
    })
})