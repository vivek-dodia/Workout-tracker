import React from "react"
import AuthGuard from "./AuthGuard"

const withAuthGuard =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props: P) =>
    (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    )

export default withAuthGuard
