//const { data } = require("cypress/types/jquery")

let EXPdata 

// defining the single object test suite
describe('Single Object',() => { 
     
   beforeEach(() => {
    cy.fixture('TestData').then((data) =>{ // Obtain all the Test data from the TestData.json file and assign to the data paramter
        EXPdata = data                     // Assign the data to the EXPdata paramter to access in all levels.
       
    })
})

    // defining a Test case to validate the response code for id=7
    it('Single object request response code',() =>{  
             
        // Calling the common metohd for check the response code is 200 for the getEndpoint.
        cy.CheckResponseCodeGetEndPoint('https://api.restful-api.dev/objects/?:id',{
           params: {
               id: EXPdata.id7,  // Here pass the URL paramter as a seperate paramter.             
            }
        })        
    })

    // Validate the response details for id=7 
    it('Single object response data for id 7',() =>{    

        cy.request('GET','https://api.restful-api.dev/objects/7')
        .then((Response) =>{
            
            const product = Response.body
            cy.log(product)    
            
            const productData = Response.body.data
            cy.log(productData)

            expect(product.id).to.eq(EXPdata.id7)
            expect(product.name).to.eq(EXPdata.name7)          
            expect(product.data.year).to.eq(EXPdata.year7)
            expect(product.data.price).to.eq(EXPdata.price7)
            
            const expectedOutcome = {
                "year": EXPdata.year7,
                "price": EXPdata.price7,
                "CPU model": EXPdata.CPU_model7,
                "Hard disk size": EXPdata.Hard_disk_size7
              };

            // Check that the response body matches the expected outcome.
            cy.expect(productData).to.deep.equal(expectedOutcome)

            // CreatedAt paramter is not actually aivalble with this service call.
            expect(product.createdAt).not.to.eq('2022-11-21T20:06:23.986Z')
        })    

    })

     // Validate the response details for id=8
    it('Single response data for id 8',() => {

        cy.request('GET','https://api.restful-api.dev/objects/8')
        .then((Response) =>{
            
            const product = Response.body
            cy.log(product)    
            
            const productData = Response.body.data
            cy.log(productData)

            expect(product.id).to.eq(EXPdata.id8)
            expect(product.name).to.eq(EXPdata.name8)
        
            const expectedOutcome = {
                "Strap Colour": EXPdata.Strap_Colour8,
                "Case Size": EXPdata.Case_Size8                
              }
              cy.expect(productData).to.deep.equal(expectedOutcome)

    })
})

    it('Single Response data for id 9',() => {
        cy.request('GET','https://api.restful-api.dev/objects/9')
        .then((Response) =>{
            
            const product = Response.body
            cy.log(product)               
           

                   
            const expectedOutcome =  {
                "id": EXPdata.id9 ,
                "name": EXPdata.name9,
                "data": {
                   "Color": EXPdata.Color9,
                   "Description": EXPdata.Description9
                }
            }

            // Comparing the hold json object at same time.
              cy.expect(product).to.deep.equal(expectedOutcome)

    })
    })
   
})