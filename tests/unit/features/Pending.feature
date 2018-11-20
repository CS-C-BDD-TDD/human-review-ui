Feature: Pending Table Component

Scenario: Displaying a table
  Given data for a table
  When  I render the table component
  Then  I should see a Stix Id Column
  And   I should see an O Date Column
  And   I should see an M Date Column
  And   I should see a Type Column
  And   I should see a Field Column
  And   I should see a Value Column
  And   I should see a Status Column
# And   I should see Action Combo boxes

Scenario: Modify the value of a table item with an action
  Given data for a table
  When  I render the table component
  And   I select a table value
  And   I change a table value
  And   I click Set
  Then  the underlying table value should be updated with an action

Scenario: Modify the value of a table item with a group action
  Given data for a table
  When  I render the table component
  And   I select a table value
  And   I change a table value
  And   I click Set
  Then  the underlying table value should be updated with a group action  