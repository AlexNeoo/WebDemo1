*** Settings ***
Library      Selenium2Library
Test Setup   Start Google Chrome
Test Teardown   Stop Google Chrome

*** Test Cases ***
Check if the capital of Spaim is displayed
    Search country      Spain
    Check capital       Capital: Madrid

Check if the capital of Ukraine is displayed
    Search country      Ukraine
    Check capital       Capital: Kiev

*** Keywords ***
Start Google Chrome
        Open Browser    http://www.google.com/search?hl=en      chrome
        Maximize Browser Window

Stop Google Chrome
        Close Browser

Search country
        [Arguments]     ${country}
        Input text      id=lst-ib           ${country}
        Set Focus to Element    name=btnK
        Click Button            name=btnK

Check Capital
        [Arguments]      ${capital}
        Set Selenium Speed      7 seconds
        Wait Until Page Contains    ${capital}
        Set Selenium Speed      0 seconds
