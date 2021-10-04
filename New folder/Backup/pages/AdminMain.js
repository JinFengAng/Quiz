import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import KYCForm from './KycForm'
import AdminCustomerRecords from './AdminCustomerRecords'
import AdminHome from './AdminHome'
import AnnualReturnReminder from './AnnualReturnReminder'
import DirectorResignation from './DirectorResignation'
import DirectorRegistration from './DirectorRegistration'
import ChangeOfDetails from './changeOfDetails'
import FormBase from './FormBase'
import ShareCertModule from './ShareCertModule'
function AdminMain() {

    // The 'path' lets us build <Route> paths that are
    // relative to the parent route, while the 'url' lets
    // us build relative links. Example: if there is a page
    // at path '/users/1/posts/comments', the 'path' is just '/comments'
    // while the 'url' is the full thing '/users/1/posts/comments'
    const { path, url } = useRouteMatch();

    // TODO: Change all the routes to private (protected) routes eventually
    // Now we use normal routes for ease of testing
    return (
        <div className='w-10/12 shadow-lg mx-auto'>
            <Header />
            <Navbar />
            <Switch>
                <Route exact path={path} component={AdminHome} />
                <Route path={`${path}/customer_records`} component={AdminCustomerRecords} />
                <Route path={`${path}/annual-return-reminder`} component={AnnualReturnReminder} />
                <Route path={`${path}/director-resignation`} component={DirectorResignation} />
                <Route path={`${path}/director-registration`} component={DirectorRegistration} />
                <Route path={`${path}/director-forms`} component={FormBase} />
                <Route path={`${path}/change-details`} component={ChangeOfDetails} />
                <Route path={`${path}/share-certificate`} component={ShareCertModule} />
                <Route path={`${path}/profile`} component={AdminHome} />
                <Route path={`${path}/kyc`} component={KYCForm} />
                <Route path={`${path}/logout`} component={AdminHome} />
            </Switch>
            <Footer />
        </div>
    )
}

export default AdminMain
