import { Redirect } from "react-router-dom";

export default function Landing() {
    return (
        // Currently, we do not need a landing page. This will be added in when necessary.
        // For now, we simply redirect to the login page.
        <Redirect to='/admin' />
    )
}
