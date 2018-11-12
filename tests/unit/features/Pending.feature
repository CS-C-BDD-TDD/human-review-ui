Feature: Pending Table Component

Scenario: Displaying a table
  Given data for a table
  When  I render the table component
  Then  I should see a Stix Id Column
  And   I should see an Action Date Column
  And   I should see an Object Type Column
  And   I should see a Field Name Column
  And   I should see a Field Value Column as Popup Edit components
  And   I should see a Status Column
  And   I should see Action Combo boxes

Scenario: Modify the value of a table item
  Given data for a table
  When  I render the table component
  And   I select a table value
  And   I change a table value
  And   I click Set
  Then  the underlying table value should be updated