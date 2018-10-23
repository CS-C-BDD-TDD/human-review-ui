Feature: As an analyst, I need to log in so that I can perform a review on STIX files

Scenario: Login page is correctly rendered
  Given I am a user with a web browser
  When  I load the default Vue JS page
  And   I input a username
  And   I input a password
  Then  I expect the username value to be set correctly
  And   I expect the password value to be set correctly

Scenario: Verify login logic works in LogIn component
  Given a mock instance of axios
  And   a mock instance of the Vue router
  And   an instance of the LogIn component with our mocks injected
  When  I enter a valid username
  And   I enter a valid password
  And   I click the LOGIN button
  Then  I expect that the axios client will be called with appropriate parameters
  And   I expect that the user will have been navigated to the HumanReview page
  And   I expect that the failed login alert is not visible

Scenario: Verify login logic handles invalid username properly
  Given a mock instance of axios
  And   an instance of the LogIn component with our mock injected
  When  I enter an invalid username
  And   I enter a password
  And   I click the LOGIN button
  Then  I expect that the axios client will be called with appropriate parameters
  And   I expect an error message to be displayed on the Login screen