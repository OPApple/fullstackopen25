sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: Browser executes submitting code
    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server ->> browser: JSON
    deactivate server

