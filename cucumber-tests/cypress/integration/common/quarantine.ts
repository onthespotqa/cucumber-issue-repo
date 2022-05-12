import {Given, Before} from "@badeball/cypress-cucumber-preprocessor"
import * as quarantine from 'cypress-quarantine';

Before(function () {
  quarantine.cucumberBefore();
})

Given(`A Step`, () =>{
 cy.log('A Step')
})
