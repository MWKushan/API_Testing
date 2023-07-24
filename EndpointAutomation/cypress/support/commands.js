// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//import cypress = require("cypress")

//const cypress = require("cypress");


// create a common metohd for check the response code is 200 for all the get end points
Cypress.Commands.add('CheckResponseCodeGetEndPoint',(EndPoint) => {
    cy.request('GET', EndPoint)
    .its('status')
    .should('equal',200)
})

/*

let EXPdata
export let ToRetrunId

// Creating a new object
Cypress.Commands.add('CreatingNewObject',() => {

    cy.fixture('TestData').then((data) =>{ 
        EXPdata = data
       
        const RequestBody = {
            "name": EXPdata.name_Req,  //"Apple MacBook Pro 17",
            "data": {
               "year": EXPdata.year_Req, //2019,
               "price": EXPdata.price_Req, //1849.99,
               "CPU model": EXPdata.CPU_model_Req,   //"Intel Core i9",
               "Hard disk size": EXPdata.Hard_disk_size_Req   //"1 TB"
            }
         }

         const expectedOutcomeForData = {        
           // "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            //}     
        }

         cy.request(
            {
                method: 'POST',
                url: 'https://api.restful-api.dev/objects',
                body: RequestBody
            }).then((Response) => {
                const product = Response.body
                cy.log(product) 
                cy.expect(product.name).to.equal(EXPdata.name_Req)
                cy.expect(product.data).to.deep.equal(expectedOutcomeForData)
        
                const createdId = product.id
                cy.log(createdId);
                //return createdId;
                ToRetrunId = createdId
                //return ToRetrunId

            })
          

      
    }) 
       
    

})  */