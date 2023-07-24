import "../../support/commands"

let EXPdata
let createdId

// Creating a test suite for adding / updating / partial update / deleting objects 
describe('Manage new object',() => {

    beforeEach(() => {
        // Access test data json file and store all the test data to the EXPdata variable
        cy.fixture('TestData').then((data) =>{ 
            EXPdata = data
           
        })
    })

it('Adding a new object', () => {

    // Set the request body parameter by calling the TestData.json file
   const RequestBody = {
        "name": EXPdata.name_Req,  //"Apple MacBook Pro 17",
        "data": {
           "year": EXPdata.year_Req, //2019,
           "price": EXPdata.price_Req, //1849.99,
           "CPU model": EXPdata.CPU_model_Req,   //"Intel Core i9",
           "Hard disk size": EXPdata.Hard_disk_size_Req   //"1 TB"
        }
     } 

    cy.request(
       {    // Calling the post end pont.
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: RequestBody

    })
    .then ((Response) => {
        const product = Response.body // Take the response body to the product paramter.
        cy.log(product)               
       
        // Create the constant variable by adding the expected value for the Response.body.data to the deep validation
        const expectedOutcomeForData = {          
            
               "year": EXPdata.year_Req, //2019,
               "price": EXPdata.price_Req, //1849.99,
               "CPU model": EXPdata.CPU_model_Req, //"Intel Core i9",
               "Hard disk size": EXPdata.Hard_disk_size_Req //"1 TB"     

        }        
       
    // Unable to match the hold object since generated id is not pre defined.

       // Validate added product name is displayed as expected.        
        cy.expect(product.name).to.equal(EXPdata.name_Req)

        // Validate the year, price, CPU model and hard disk size using deep validation.
        cy.expect(product.data).to.deep.equal(expectedOutcomeForData)

        // Filter out the created object id and assign to the createdId paramter for update, partial update & Delete requests
         createdId = product.id
       cy.log(createdId);
    })
})

// Test case for update the above created object.
it ('Update Object after adding the object', () => {

    // Updating the price & colour
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

     // Calling the object update end point using the generated id (createdId)
     cy.request(
        {
            method: 'PUT',
            url: 'https://api.restful-api.dev/objects/'+ createdId,
            body: RequestBody

     })
     .then ((Response) => {
        const product = Response.body
        cy.log(product)   

        // Create a parameter for the expected out put for the Response.body.data object
        const expectedOutcomeForData = {       
                            
            "year": 2019,
            "price": 2049.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
            "color": "silver"                   

 }
        cy.expect(product.name).to.equal('Apple MacBook Pro 17')  // Compare the name
        cy.expect(product.data).to.deep.equal(expectedOutcomeForData) // Compare the data object
 })

})

// Creating a test case for partil update (patch)
it ('Partialy update the object',() => {

    // Updating the name
    const RequestBody = {
        "name": 'Apple MacBook Pro 18'  //"Apple MacBook Pro 17",      
        }

        cy.request(
            {
                method: 'PATCH',
                url: 'https://api.restful-api.dev/objects/'+ createdId, // past fetch ID to the URL
                body: RequestBody
    
         })

         .then ((Response) => {
            const product = Response.body
            cy.log(product)

// Expected outcome for the response.body.data parameter after complete the partial call
        const expectedOutcomeForData = {       
                            
            "year": 2019,
            "price": 2049.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
            "color": "silver"                   

 }

 cy.expect(product.name).to.equal('Apple MacBook Pro 18') // comapre name after updating the name
 cy.expect(product.data).to.deep.equal(expectedOutcomeForData) // compare the data parameter
})

})

// Test case for the delete call
it('Delete updated object', () => {
 
// Request for delete call
        cy.request(
            {
                method: 'DELETE',
                url: 'https://api.restful-api.dev/objects/'+ createdId,
                //body: RequestBody
    
         })


         .then ((Response) => {
            const product = Response.body // obtain the response for product variable
            cy.log(product)
       
    // Validtae the message after delete call     
 cy.expect(product.message).to.equal('Object with id = '+createdId+ ' has been deleted.')
  
 
 
})

})

})