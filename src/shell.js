/**
 * Created by rigel on 8/10/16.
 */
import toastr from 'toastr';

export class Shell {
    constructor() {

    }

    configureRouter(config, router) {
        this.router = router;

        // write server side code to handle page reloads from non-root address
        // ie.  www.rootaddress.com/discussions <- reloading page from this address will
        // send throw an error on the server unless server knows to ignore 'discussions'
        config.options.pushState = true;

        config.addPipelineStep('authorize', ToastNavResult);
        config.title = 'Aurelia App';
        config.map([
            {
                route: ['', 'events'], // default route
                viewPorts: {
                    mainContent: { moduleId: 'events/events' },
                    sideBar: { moduleId: 'sideBar/sponsors' }
                },
                name: 'Events', title: 'Events', nav: true
            },
            {
                route: 'jobs',
                name: 'jobs',
                viewPorts: {
                    mainContent: { moduleId: 'jobs/jobs' },
                    sideBar: { moduleId: 'sideBar/sponsors' }
                },
                title: 'Jobs', nav: true
            },
            {
                route: 'discussion',
                viewPorts: {
                    mainContent: { moduleId: 'discussion/discussion' },
                    sideBar: { moduleId: 'sideBar/ads' }
                },
                title: 'Discussion', nav: true
            },
            {
                route: 'eventDetail/:eventId',
                viewPorts: {
                    mainContent: { moduleId: 'events/eventDetail' },
                    sideBar: { moduleId: 'sideBar/ads' }
                },
                name: 'eventDetail'
            },
            {
                route: 'addJob',
                name: 'addJob',
                viewPorts: {
                    mainContent: { moduleId: 'jobs/addJob' },
                    sideBar: { moduleId: 'sideBar/sponsors' }
                }
            }
        ]);
    }
}

class ToastNavResult {
    run(navigationInstruction, next) {
        return next().then( a => { toastr.info(a.status); return a; });
    }
}