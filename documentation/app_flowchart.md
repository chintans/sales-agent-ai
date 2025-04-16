flowchart TD
    A[Start] --> B[Display Input Form]
    B --> C[User enters customer details, conversation history, topics]
    C --> D[Submit form]
    D --> E[Store customer data in Supabase]
    E --> F[Generate sales script using LangChainJS OpenAI]
    F --> G{Script generation successful?}
    G -->|No| Z[Display error message]
    G -->|Yes| H[Initiate call with Bland AI]
    H --> I{Call initiation successful?}
    I -->|No| Z
    I -->|Yes| J[Record call and transcribe]
    J --> K{Transcript received?}
    K -->|No| Z
    K -->|Yes| L[Display transcript on UI]
    L --> M[Auto/manual refresh transcript]
    M --> N[End Demo]