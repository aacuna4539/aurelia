/**
 * Created by rigel on 8/11/16.
 */
import { eventsData } from 'services/eventsData';
import { jobsData, states, jobTypes, jobSkills } from 'services/jobsData';
import moment from 'moment';

// find out wtf is going on here
import { BindingSignaler } from '../../jspm_packages/npm/aurelia-templating-resources@1.0.0/aurelia-templating-resources';
import { EventAggregator } from '../../jspm_packages/npm/aurelia-event-aggregator@1.0.0/aurelia-event-aggregator';

import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { HttpClient as HttpFetch, json } from 'aurelia-fetch-client';
import { NotificationPayload } from 'common/NotificationPayload';

function filterAndFormat(pastOrFuture, events) {
    var results = JSON.parse(JSON.stringify(events));
    if (pastOrFuture == 'past') {
        results = results.filter(item => moment(item.dateTime) < moment());
    }
    else if (pastOrFuture == 'future') {
        results = results.filter(item => moment(item.dateTime) > moment());
    }
    else {
        results = results;
    }

    return results;
}

@inject(BindingSignaler, HttpClient, 'apiRoot', HttpFetch, EventAggregator)
export class DataRepository {
    constructor(bindingSignaler, httpClient, apiRoot, httpFetch, eventAggregator) {
        this.httpClient = httpClient;
        this.apiRoot = apiRoot;
        this.httpFetch = httpFetch;
        this.eventAggregator = eventAggregator;


        setInterval(() => { bindingSignaler.signal('check-freshness');}, 1000);
        setTimeout(() => this.backgroundNotificationReceived(this.eventAggregator), 5000);
    }

    backgroundNotificationReceived(ea) {
        ea.publish(new NotificationPayload(moment().format('HH:mm:ss')));
    }

    getEvents(pastOrFuture) {
        var promise = new Promise((resolve, reject) => {
            if (!this.events) {
                this.httpClient.get(this.apiRoot +'api/Events')
                    .then(result => {
                        var data = JSON.parse(result.response);
                        this.events = data.sort((a,b) =>
                            a.dateTime >= b.dateTime ? 1 : -1);
                        this.events.forEach(function(item) {
                            if (item.speaker === "Brian Noyes")
                                item.isMvp = true;
                        });
                        resolve(filterAndFormat(pastOrFuture, this.events));
                    });

            } else {
                resolve(filterAndFormat(pastOrFuture, this.events));
            }
        });
        return promise;
    }


    getEvent(eventId) {
        return this.events.find(item => item.id == eventId);
    }

    addJob(job) {
        var promise = new Promise((resolve, reject) => {
            this.httpFetch.fetch(this.apiRoot + 'api/Jobs', {
                method: 'POST',
                body: json(job)
            }).then(response => response.json())
                .then(data => {
                    this.jobs.push(data);
                    resolve(data);
                }).catch(err => reject(err));
        });
        return promise;
    }

    getJobs() {
        var promise = new Promise((resolve, reject) => {
            if (!this.jobs) {
                this.httpFetch.fetch(this.apiRoot + 'api/Jobs')
                    .then(response => response.json())
                    .then(data => {
                        this.jobs = data;
                        resolve(this.jobs);
                    }).catch(err => reject(err));

            } else {
                resolve(this.jobs);
            }

        });
        return promise;
    }

    getStates() {
        var promise = new Promise((resolve, reject) => {
            if (!this.states) {
                this.states = states;
            }
            resolve(this.states);
        });
        return promise;
    }

    getJobTypes() {
        var promise = new Promise((resolve, reject) => {
            if  (!this.jobTypes) {
                this.jobTypes = jobTypes;
            };
            resolve(this.jobTypes);
        });
        return promise;
    }

    getJobSkills() {
        var promise = new Promise((resolve, reject) => {
            if (!this.jobSkills) {
                this.jobSkills = jobSkills;
            }
            resolve(this.jobSkills);
        });
        return promise;
    }
}