import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

import { Provider } from "react-redux"
import store from "./store"

import { inject } from '@vercel/analytics';
 
inject();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
