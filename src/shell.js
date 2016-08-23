/**
 * Created by rigel on 8/10/16.
 */
import toastr from 'toastr';
import moment from 'moment';
import { EventAggregator } from '../jspm_packages/npm/aurelia-event-aggregator@1.0.0/aurelia-event-aggregator';
import { NotificationPayload } from 'common/NotificationPayload';
import { inject } from 'aurelia-framework';

@inject(EventAggregator)
export class Shell {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.eventAggregator.subscribe(NotificationPayload, payload => {
            this.notification = payload.time;
        });
        setInterval(() => this.timeIs = moment().format('hh:mm.SSS'), 100);
    }

    clearNotification () {
        this.notification = null;
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