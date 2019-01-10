Feature: Pending Component

#Scenario: Rendering a table on page
#  Given a mock instance of Axios get and Vue Router
#  When  I render the pending component
#  Then  I should inspect the Stix Id Column
#  And   I should inspect the Original Date Column
#  And   I should inspect the Type Column
#  And   I should inspect the Field Column
#  And   I should inspect the Value Column
#  And   I should inspect the Status Column
#  And   I should inspect the Action Combo boxes
#  And   I should inspect the Disseminate Combo boxes

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

Scenario Outline: Performing a group action failure
  Given a mock instance of Axios get and Vue Router
  And   another mock instance of Axios put failure
  When  I render the pending component
  And  I select a <Group Action>
  And  I submit <Group Action>
  Then I should see a group error message
  Examples:
    | Group Action       |
    | Disseminate        |
    | Do Not Disseminate |

#Scenario Outline: Performing a group action
#  Given a mock instance of Axios get and Vue Router
#  And   another mock instance of Axios put
#  When  I render the pending component
#  Then  I select a <Group Action>
#  Then  I submit <Group Action>
#  Examples:
#    | Group Action       |
#    | Disseminate        |
#    | Do Not Disseminate |

#Scenario Outline: Performing an action failure
  #Given a mock instance of Axios get and Vue Router
  #And   a mock instance of Axios put failure
  #When  I render the pending component
  #And  I select an <Action>
  #And  I update the values
  #Then I should see an error message
  #Examples:
  #  | Action       |
  #  | Confirm Risk |
  #  | Not PII      |
  #  | Redact       |
  #  | Edit         |   

#Scenario: Performing a group action axios get failure
 # Given a mock instance of Axios get failure and Vue Router
 # And   another mock instance of Axios put
 # When  I render the pending component
 # Then  I select a <Group Action>
 # Then  I submit <Group Action>