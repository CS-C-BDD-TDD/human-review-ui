Feature: As a Human Review analyst
I need to log in to Human Review page
so that I can perform a review on STIX file

Scenario: Login page is correctly rendered
  Given I am a user with a web browser
  When  I load the default Vue JS page 
  Then I should see a username and password input
  When I input a username
  And I input a password
  Then I expect the username value to be set correctly
  And I expect the password value to be set correctly
