Feature: As an analyst, I need to log in so that I can perform a review on STIX files

Scenario: Login with valid credentials
  Given a mock instance of Axios
  And   a mock instance of the Vue router
  And   an instance of the LogIn component with our mocks injected
  When  I enter a username
  And   I enter a password
  And   I click the SignIn button
  Then  I expect the username value to be set correctly
  And   I expect the password value to be set correctly
  And   I expect that the axios client will be called with appropriate parameters
  And   I expect that the user will have been navigated to the HumanReview page
  And   I expect that the failed login alert is not visible

  Scenario: Login with invalid credentials
  Given a mock instance of Axios
  And   an instance of the LogIn component with our mocks injected
  When  I enter a username
  And   I enter a password
  And   I click the SignIn button
  Then  I expect the username value to be set correctly
  And   I expect the password value to be set correctly
  And   I expect that the axios client will be called with appropriate parameters
  And   I expect that the axios client will receive an invalid message
  And   I expect that the failed login alert is visible

  Scenario: Login failure due to a connectivity problem
  Given a mock instance of Axios
  And   an instance of the LogIn component with our mocks injected
  When  I enter a username
  And   I enter a password
  And   I click the SignIn button
  Then  I expect the username value to be set correctly
  And   I expect the password value to be set correctly
  And   I expect that the axios client will be called with appropriate parameters
  And   I expect that the failed login alert is visible