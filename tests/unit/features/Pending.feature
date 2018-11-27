Feature: Pending Table Component

Scenario: Rendering a table on page
  Given a mock instance of Axios and Vue Router
  When  I render the table component
  Then  I should inspect the Stix Id Column
  And   I should inspect the Original Date Column
  And   I should inspect the Type Column
  And   I should inspect the Field Column
  And   I should inspect the Value Column
  And   I should inspect the Status Column
  And   I should inspect the Action Combo boxes

Scenario: Render the Confirm Risk action
  Given a mock instance of Axios and Vue Router
  Then  I render a Confirm Risk action

# Scenario: Modify the value of a table item with a group action
#   Given data for a table
#   When  I render the table component
#   And   I select a table value
#   And   I change a table value
#   And   I click Set
#   Then  the underlying table value should be updated with a group action  