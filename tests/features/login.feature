Feature: Parabank Login Functionality

  Scenario: Valid user should print the amount displayed on the page post-login
    Given the user is on the login page
    When the user enters valid credentials
    Then print the amount displayed on the page post-login.

  Scenario: Invalid password should show error
    Given the user is on the login page
    When the user enters invalid credentials
    Then an error message should be displayed

  Scenario: Empty fields should show validation errors
    Given the user is on the login page
    When the user submits empty login form
    Then a validation error should be displayed

  Scenario: User should be able to logout successfully
    Given the user is on the login page
    When the user enters valid credentials
    Then the user clicks logout
   