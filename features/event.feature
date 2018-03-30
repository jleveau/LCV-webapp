Feature: Register
    Scenario: Add my name in the participants lists
        Given i am on an event page
        When i type my name 
        And I click on je viens
        Then my name must be in the participant list

    Scenario: Move my name from the participants lists to the not participants list
        Given i am on an event page
        And my name is in the participant list
        When I click on my name 
        And i click on je ne viens pas
        Then my name is no longer in the participants list
        And my name is in the not participant list