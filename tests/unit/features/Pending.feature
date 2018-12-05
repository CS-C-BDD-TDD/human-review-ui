Feature: Pending Component

Scenario: Rendering a table on page
  Given a mock instance of Axios get and Vue Router
  When  I render the pending component
  Then  I should inspect the Stix Id Column
  And   I should inspect the Original Date Column
  And   I should inspect the Type Column
  And   I should inspect the Field Column
  And   I should inspect the Value Column
  And   I should inspect the Status Column
  And   I should inspect the Action Combo boxes

 Scenario Outline: Performing an action
  Given a mock instance of Axios get and Vue Router
  And   a mock instance of Axios put
  When  I render the pending component
  Then  I select an <Action>
  Then  I update the values
  Examples:
    | Action       |
    | Confirm Risk |
    | Not PII      |
    | Redact       |
    | Edit         |

