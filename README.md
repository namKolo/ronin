# katana
Frontend with clean architecture

### The layers 
- Infrastructure: Rest/GraphQL/LocalStorage/State (Redux/Recoil/Mobx/VeuX), etc..
- Services: call requests to third parties/server side,..
- Entities: the core logic of business domain (does not depend to layers)
- Use Cases: A data flow — For example, when signing up a user, the use case will call UserService to check the existence of the user before creating.
- Adapters: Implement specific logic that helps the UI to interact with the infrastructure. For example: We use Redux as State Management in infrastructure, so we need implement an adapter for the Redux — we put the reducers/saga here.

The most important things in this architecture is dependency rule — The lower layer must not know about the higher layer. Then we can keep it testable. Use interface to define the methods as a communication.

Refer to https://medium.com/@indiedev/clean-architecture-in-frontend-react-redux-typescript-bd108ddd13f7
